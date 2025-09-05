'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useCVStore } from '../store/useCVStore'
import { skillsSchema } from '../utils/validators'
import SectionHeader from './SectionHeader'
import type { CompetenteTehnice } from '../store/useCVStore'

const categoriiPredefinite = [
  'Software/Programare',
  'CAD/CAM/CAE',
  'Electronică/Embedded',
  'Management proiect',
  'Testare/QA',
  'DevOps/CI-CD'
]

export default function SkillsForm() {
  const { cv, updateSkills } = useCVStore()
  const [newSkill, setNewSkill] = useState('')
  
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CompetenteTehnice>({
    resolver: zodResolver(skillsSchema),
    defaultValues: cv.competente,
    mode: 'onChange'
  })

  // Watch specific fields
  const categoriiSelectate = watch('categoriiSelectate') || []
  const detalii = watch('detalii') || []

  // Memoize the update function to prevent re-renders
  const updateSkillsData = React.useCallback((skills: CompetenteTehnice) => {
    updateSkills(skills)
  }, [updateSkills])

  React.useEffect(() => {
    updateSkillsData({ categoriiSelectate, detalii })
  }, [categoriiSelectate, detalii, updateSkillsData])

  const handleCategoryChange = React.useCallback((category: string, checked: boolean) => {
    if (checked) {
      setValue('categoriiSelectate', [...categoriiSelectate, category])
    } else {
      setValue('categoriiSelectate', categoriiSelectate.filter(c => c !== category))
    }
  }, [categoriiSelectate, setValue])

  const addSkill = React.useCallback(() => {
    if (newSkill.trim()) {
      setValue('detalii', [...detalii, newSkill.trim()])
      setNewSkill('')
    }
  }, [newSkill, detalii, setValue])

  const removeSkill = React.useCallback((index: number) => {
    setValue('detalii', detalii.filter((_, i) => i !== index))
  }, [detalii, setValue])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <SectionHeader 
        title="Competențe tehnice"
        description="Selectează categoriile și adaugă competențele tale specifice"
      />

      <form className="space-y-8">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Categorii
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {categoriiPredefinite.map((categoria) => (
              <label key={categoria} className="flex items-center">
                <input
                  type="checkbox"
                  checked={categoriiSelectate.includes(categoria)}
                  onChange={(e) => handleCategoryChange(categoria, e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {categoria}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Competențe specifice
          </h3>
          
          {/* Add new skill */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: React, Python, Docker..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Skills list */}
          <div className="flex flex-wrap gap-2">
            {detalii.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {errors.root && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  )
}