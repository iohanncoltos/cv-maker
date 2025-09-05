'use client'

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useCVStore } from '../store/useCVStore'
import { educationSchema } from '../utils/validators'
import SectionHeader from './SectionHeader'
import DatePicker from './DatePicker'
import type { Educatie } from '../store/useCVStore'

interface EducationFormData {
  educatie: Educatie[]
}

export default function EducationForm() {
  const { cv, updateEducation } = useCVStore()
  
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educatie: cv.educatie.length > 0 ? cv.educatie : [
        { diploma: '', anAbsolvire: '', universitate: '', specializare: '' }
      ]
    },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educatie'
  })

  // Watch specific field instead of entire formData
  const educatieData = watch('educatie')

  // Memoize the update function
  const updateEducationData = React.useCallback((educatieArray: Educatie[]) => {
    updateEducation(educatieArray)
  }, [updateEducation])

  // Update store only when educatie data changes, with stable comparison
  React.useEffect(() => {
    updateEducationData(educatieData || [])
  }, [
    JSON.stringify(educatieData), // Stable comparison
    updateEducationData
  ])

  const addEducation = React.useCallback(() => {
    append({
      diploma: '',
      anAbsolvire: '',
      universitate: '',
      specializare: ''
    })
  }, [append])

  const removeEducation = React.useCallback((index: number) => {
    remove(index)
  }, [remove])

  return (
    <div>
      <SectionHeader 
        title="Educație"
        description="Adaugă informații despre studiile tale"
      />

      <form className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Studii
          </h3>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adaugă educație
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Studiu #{index + 1}
                </h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Diploma
                  </label>
                  <select
                    {...register(`educatie.${index}.diploma`)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selectează diploma</option>
                    <option value="Licență">Licență</option>
                    <option value="Masterat">Masterat</option>
                    <option value="Doctorat">Doctorat</option>
                    <option value="Diplomă de Inginer">Diplomă de Inginer</option>
                    <option value="Certificat">Certificat</option>
                    <option value="Curs de specializare">Curs de specializare</option>
                    <option value="Altă diplomă">Altă diplomă</option>
                  </select>
                </div>

                <DatePicker
                  label="Data absolvirii"
                  value={watch(`educatie.${index}.anAbsolvire`) || ''}
                  onChange={(value) => setValue(`educatie.${index}.anAbsolvire`, value)}
                  placeholder="Selectează luna absolvirii"
                />

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Universitatea / Instituția
                  </label>
                  <input
                    {...register(`educatie.${index}.universitate`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Universitatea Tehnică din Cluj-Napoca, Academia de Studii Economice"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specializarea / Domeniul de studiu
                  </label>
                  <input
                    {...register(`educatie.${index}.specializare`)}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Calculatoare și Tehnologia Informației, Inginerie Electronică"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {errors.educatie && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Cel puțin o intrare de educație este obligatorie
          </p>
        )}
      </form>
    </div>
  )
}