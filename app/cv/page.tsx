// app/cv/page.tsx (COMPLETE - With PrivacyIndicator included)
'use client'

import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
import Sidebar from './components/Sidebar'
import PersonalInfoForm from './components/PersonalInfoForm'
import ProfileForm from './components/ProfileForm'
import ExperienceForm from './components/ExperienceForm'
import EducationForm from './components/EducationForm'
import SkillsForm from './components/SkillsForm'
import Preview from './components/Preview'
import ExportButtons from './components/ExportButtons'
import PrivacyIndicator from './components/PrivacyIndicator'
import { useCVStore } from './store/useCVStore'
import useAutosave from './hooks/useAutosave'

const sections = [
  { id: 'personal', title: 'Informații personale', component: PersonalInfoForm },
  { id: 'profile', title: 'Profil profesional', component: ProfileForm },
  { id: 'experience', title: 'Experiență profesională', component: ExperienceForm },
  { id: 'education', title: 'Educație', component: EducationForm },
  { id: 'skills', title: 'Competențe tehnice', component: SkillsForm },
]

export default function CVEditorPage() {
  const [activeSection, setActiveSection] = useState('personal')
  const [darkMode, setDarkMode] = useState(false)
  const { cv, resetCV, initializeSession } = useCVStore()

  useAutosave(cv)

  useEffect(() => {
    // Initialize new session (clears all previous user data)
    initializeSession()

    // Setup dark mode
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }

    // Add exit warning
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'Datele CV-ului vor rămâne în browser. Pentru siguranță, folosește butonul "Șterge toate datele" înainte de plecare.'
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [initializeSession])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleReset = () => {
    if (confirm('Ești sigur că vrei să resetezi formularul? Toate datele vor fi pierdute.')) {
      resetCV()
    }
  }

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || PersonalInfoForm

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
              Editor CV - Sesiune Privată
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ExportButtons />
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Resetează formularul
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <Sidebar 
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Form Area */}
        <div className="flex-1 flex">
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="max-w-2xl">
              <ActiveComponent />
            </div>
          </div>

          {/* Preview Area */}
          <div className="w-1/2 p-6 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
            <Preview />
          </div>
        </div>
      </div>

      {/* Privacy Indicator - Fixed position bottom right */}
      <PrivacyIndicator />
    </div>
  )
}