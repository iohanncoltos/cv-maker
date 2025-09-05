'use client'

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useCVStore } from '../store/useCVStore'
import { experienceSchema } from '../utils/validators'
import SectionHeader from './SectionHeader'
import DatePicker from './DatePicker'
import type { Experienta } from '../store/useCVStore'

interface ExperienceFormData {
  experientaCurenta?: Experienta
  experienteAnterioare: Experienta[]
}

export default function ExperienceForm() {
  const { cv, updateExperience } = useCVStore()
  
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experientaCurenta: cv.experientaCurenta || { functie: '', perioada: { start: '', end: '' }, responsabilitati: '' },
      experienteAnterioare: cv.experienteAnterioare || []
    },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experienteAnterioare'
  })

  const currentExperience = watch('experientaCurenta')
  const previousExperiences = watch('experienteAnterioare')

  const updateExperienceData = React.useCallback((data: {
    experientaCurenta?: Experienta
    experienteAnterioare: Experienta[]
  }) => {
    updateExperience(data)
  }, [updateExperience])

  React.useEffect(() => {
    updateExperienceData({
      experientaCurenta: currentExperience,
      experienteAnterioare: previousExperiences || []
    })
  }, [
    JSON.stringify(currentExperience),
    JSON.stringify(previousExperiences),
    updateExperienceData
  ])

  const addPreviousExperience = React.useCallback(() => {
    append({
      functie: '',
      perioada: { start: '', end: '' },
      responsabilitati: ''
    })
  }, [append])

  const handleCurrentIsPresentChange = React.useCallback((checked: boolean) => {
    if (checked) {
      setValue('experientaCurenta.perioada.end', '')
      setValue('experientaCurenta.perioada.prezent', true)
    } else {
      setValue('experientaCurenta.perioada.prezent', false)
    }
  }, [setValue])

  const removeExperience = React.useCallback((index: number) => {
    remove(index)
  }, [remove])

  return (
    <div>
      <SectionHeader 
        title="Experiență profesională"
        description="Adaugă informații despre poziția actuală și experiențele anterioare"
      />

      <form className="space-y-8">
        {/* Current Experience */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Funcția actuală
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Funcția
              </label>
              <input
                {...register('experientaCurenta.functie')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ex: Senior Software Developer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Început"
                value={watch('experientaCurenta.perioada.start') || ''}
                onChange={(value) => setValue('experientaCurenta.perioada.start', value)}
                placeholder="Selectează luna începerii"
              />
              
              <div>
                <DatePicker
                  label="Sfârșit"
                  value={watch('experientaCurenta.perioada.end') || ''}
                  onChange={(value) => setValue('experientaCurenta.perioada.end', value)}
                  placeholder="Selectează luna sfârșitului"
                  disabled={watch('experientaCurenta.perioada.prezent')}
                />
                <label className="flex items-center mt-2">
                  <input
                    {...register('experientaCurenta.perioada.prezent')}
                    type="checkbox"
                    onChange={(e) => handleCurrentIsPresentChange(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Prezent
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrierea responsabilităților
              </label>
              <textarea
                {...register('experientaCurenta.responsabilitati')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Descrie principalele responsabilități și realizări..."
              />
            </div>
          </div>
        </div>

        {/* Previous Experiences */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Funcții anterioare
            </h3>
            <button
              type="button"
              onClick={addPreviousExperience}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adaugă funcție anterioară
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Experiență #{index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Funcția
                    </label>
                    <input
                      {...register(`experienteAnterioare.${index}.functie`)}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: Frontend Developer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                      label="Început"
                      value={watch(`experienteAnterioare.${index}.perioada.start`) || ''}
                      onChange={(value) => setValue(`experienteAnterioare.${index}.perioada.start`, value)}
                      placeholder="Selectează luna începerii"
                    />
                    
                    <DatePicker
                      label="Sfârșit"
                      value={watch(`experienteAnterioare.${index}.perioada.end`) || ''}
                      onChange={(value) => setValue(`experienteAnterioare.${index}.perioada.end`, value)}
                      placeholder="Selectează luna sfârșitului"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrierea responsabilităților
                    </label>
                    <textarea
                      {...register(`experienteAnterioare.${index}.responsabilitati`)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Descrie principalele responsabilități..."
                    />
                  </div>
                </div>
              </div>
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
