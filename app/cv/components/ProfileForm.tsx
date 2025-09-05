'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCVStore } from '../store/useCVStore'
import { profileSchema } from '../utils/validators'
import SectionHeader from './SectionHeader'
import type { Profil } from '../store/useCVStore'

export default function ProfileForm() {
  const { cv, updateProfile } = useCVStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Profil>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      descriere: cv.profil.descriere || ''
    },
    mode: 'onChange'
  })

  // Watch only the field we need
  const descriere = watch('descriere')

  React.useEffect(() => {
    updateProfile({ descriere })
  }, [descriere, updateProfile])

  return (
    <div>
      <SectionHeader 
        title="Profil profesional"
        description="Scrie o descriere scurtă despre experiența și obiectivele tale profesionale"
      />

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descrierea profilului
          </label>
          <textarea
            {...register('descriere')}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Ex: Developer cu 5+ ani experiență în dezvoltarea aplicațiilor web moderne. Specializat în React, Node.js și arhitecturi cloud. Pasionat de tehnologii inovatoare și lucrul în echipă pentru livrarea de soluții de calitate."
          />
          {errors.descriere && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.descriere.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
