'use client'

import { useCVStore } from '../store/useCVStore'
import ModernTemplate from '../templates/ModernTemplate'
import CompactTemplate from '../templates/CompactTemplate'

export default function Preview() {
  const { cv, updateTemplateStyle } = useCVStore()

  const TemplateComponent = cv.templateStyle === 'modern' ? ModernTemplate : CompactTemplate

  // Debug: Log CV data
  console.log('Preview CV data:', cv)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Previzualizare CV
          </h3>
          <select
            value={cv.templateStyle}
            onChange={(e) => updateTemplateStyle(e.target.value as 'modern' | 'compact')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="compact">Compact</option>
            <option value="modern">Modern</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto" style={{ width: '21cm', minHeight: '29.7cm' }}>
          <div id="cv-preview" className="print-page">
            <TemplateComponent cv={cv} />
          </div>
        </div>
      </div>
    </div>
  )
}