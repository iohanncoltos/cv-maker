'use client'

import { ArrowRight, FileText, Download, Users, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Team CV Builder
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Privacy Notice */}
      <div className="mx-6 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                Confidențialitate și Securitate
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Datele CV-ului sunt stocate local în browser-ul tău și nu sunt trimise pe niciun server. 
                Pentru securitate maximă, aplicația se resetează automat la fiecare acces nou și oferă opțiuni de ștergere completă a datelor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Creează CV-uri profesionale
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">pentru echipa INTERMAX</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Construiește CV-uri elegante și moderne pentru membrii echipei tale. 
              Export în PDF și DOCX, design responsive și interfață intuitivă cu protecție completă a datelor.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <Users className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pentru echipe</h3>
              <p className="text-gray-600 dark:text-gray-300">Creat special pentru echipele de proiect și companii</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <Download className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export PDF & Word</h3>
              <p className="text-gray-600 dark:text-gray-300">Descarcă CV-urile în format PDF sau DOCX</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <Shield className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Securitate totală</h3>
              <p className="text-gray-600 dark:text-gray-300">Datele rămân private și se șterg automat</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/cv">
            <button className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg">
              Creează CV
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 INTERMAX. Made with ❤️ | Datele tale sunt private și securizate</p>
      </footer>
    </div>
  )
}
