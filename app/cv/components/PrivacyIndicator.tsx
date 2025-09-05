'use client'

import { Shield, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function PrivacyIndicator() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Sesiune Privată Activă
          </span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
          >
            {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-2 text-xs text-green-700 dark:text-green-300">
            <p>• Datele sunt stocate local</p>
            <p>• Sesiune izolată per utilizator</p>
            <p>• Auto-curățare la închidere</p>
          </div>
        )}
      </div>
    </div>
  )
}
