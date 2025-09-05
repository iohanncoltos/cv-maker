'use client'

import { Download, FileText, Save, Upload, Trash2, Shield } from 'lucide-react'
import { useCVStore } from '../store/useCVStore'

export default function ExportButtons() {
  const { cv, saveToStorage, loadFromStorage, clearAllUserData } = useCVStore()

  const handleExportPDF = async () => {
    if (typeof window === 'undefined') return
    
    try {
      const { exportToPDF } = await import('../utils/exportPdf')
      await exportToPDF(cv)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      alert('Eroare la exportul PDF. Încearcă din nou.')
    }
  }

  const handleExportDocx = async () => {
    if (typeof window === 'undefined') return
    
    try {
      const { exportToDocx } = await import('../utils/exportDocx')
      await exportToDocx(cv)
    } catch (error) {
      console.error('Error exporting to DOCX:', error)
      alert('Eroare la exportul Word. Încearcă din nou.')
    }
  }

  const handleSaveDraft = () => {
    saveToStorage()
    alert('Draft salvat în sesiunea curentă!')
  }

  const handleLoadDraft = () => {
    if (confirm('Vrei să încarci draft-ul salvat din sesiunea curentă?')) {
      loadFromStorage()
      alert('Draft încărcat!')
    }
  }

  const handleClearAllData = () => {
    if (confirm('ATENȚIE: Ștergi toate datele CV din acest browser? Această acțiune nu poate fi anulată și va proteja confidențialitatea datelor tale.')) {
      clearAllUserData()
      alert('Toate datele au fost șterse permanent! Browser-ul este acum curat pentru următorul utilizator.')
    }
  }

  const hasSavedDraft = () => {
    try {
      if (typeof window === 'undefined') return false
      return Object.keys(localStorage).some(key => key.startsWith('team-cv-draft'))
    } catch {
      return false
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleExportPDF}
        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
      >
        <Download className="h-4 w-4 mr-2" />
        Exportă PDF
      </button>
      
      <button
        onClick={handleExportDocx}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
      >
        <FileText className="h-4 w-4 mr-2" />
        Exportă Word
      </button>
      
      <button
        onClick={handleSaveDraft}
        className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
      >
        <Save className="h-4 w-4 mr-2" />
        Salvează draft
      </button>

      {hasSavedDraft() && (
        <button
          onClick={handleLoadDraft}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          Încarcă draft
        </button>
      )}

      <button
        onClick={handleClearAllData}
        className="inline-flex items-center px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg shadow-sm transition-colors text-sm border-2 border-red-300"
      >
        <Shield className="h-4 w-4 mr-2" />
        Șterge toate datele
      </button>
    </div>
  )
}
