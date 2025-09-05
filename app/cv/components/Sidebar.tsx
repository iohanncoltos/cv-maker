import { Check } from 'lucide-react'
import { useCVStore } from '../store/useCVStore'
import { cn } from '../utils/cn'

interface SidebarProps {
  sections: Array<{
    id: string
    title: string
    component: React.ComponentType
  }>
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ sections, activeSection, onSectionChange }: SidebarProps) {
  const { cv } = useCVStore()

  const isCompleted = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'personal':
        return !!(cv.informatiiPersonale.numeComplet && cv.informatiiPersonale.functieInProiect && cv.informatiiPersonale.email)
      case 'profile':
        return !!cv.profil.descriere
      case 'experience':
        return !!(cv.experientaCurenta?.functie || cv.experienteAnterioare.length > 0)
      case 'education':
        return cv.educatie.length > 0
      case 'skills':
        return cv.competente.categoriiSelectate.length > 0 || cv.competente.detalii.length > 0
      default:
        return false
    }
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Secțiuni CV
      </h2>
      <nav className="space-y-2">
        {sections.map((section) => {
          const completed = isCompleted(section.id)
          const active = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                active
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              <span className="font-medium">{section.title}</span>
              {completed && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          Progress
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(sections.filter(s => isCompleted(s.id)).length / sections.length) * 100}%`
              }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {sections.filter(s => isCompleted(s.id)).length}/{sections.length}
          </span>
        </div>
      </div>
    </div>
  )
}