'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCVStore } from '../store/useCVStore'
import { personalInfoSchema } from '../utils/validators'
import SectionHeader from './SectionHeader'
import type { InformatiiPersonale } from '../store/useCVStore'

export default function PersonalInfoForm() {
  const { cv, updatePersonalInfo } = useCVStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<InformatiiPersonale>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cv.informatiiPersonale,
    mode: 'onChange'
  })

  // Watch specific fields instead of entire form
  const numeComplet = watch('numeComplet')
  const functieInProiect = watch('functieInProiect')
  const email = watch('email')

  // Update store only when specific values change
  React.useEffect(() => {
    updatePersonalInfo({ numeComplet, functieInProiect, email })
  }, [numeComplet, functieInProiect, email, updatePersonalInfo])

  return (
    <div>
      <SectionHeader 
        title="Informații personale"
        description="Completează datele tale de contact și poziția în proiect"
      />

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nume complet *
          </label>
          <input
            {...register('numeComplet')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Ex: Ion Popescu"
          />
          {errors.numeComplet && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.numeComplet.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Funcția în proiect *
          </label>
          <input
            {...register('functieInProiect')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Ex: Senior Software Developer"
          />
          {errors.functieInProiect && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.functieInProiect.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            E-mail *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Ex: ion.popescu@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
