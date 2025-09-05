import { Mail } from 'lucide-react'
import type { CV } from '../store/useCVStore'

interface CompactTemplateProps {
  cv: CV
}

export default function CompactTemplate({ cv }: CompactTemplateProps) {
  const formatPeriod = (perioada: { start: string; end: string; prezent?: boolean }) => {
    if (!perioada.start) return ''
    
    // Create date with proper Romanian locale
    const startDate = new Date(perioada.start + '-01')
    const start = startDate.toLocaleDateString('ro-RO', { 
      month: 'short', 
      year: 'numeric' 
    }).replace('.', '') // Remove dot from Romanian month abbreviation
    
    let end = ''
    if (perioada.prezent) {
      end = 'Prezent'
    } else if (perioada.end) {
      const endDate = new Date(perioada.end + '-01')
      end = endDate.toLocaleDateString('ro-RO', { 
        month: 'short', 
        year: 'numeric' 
      }).replace('.', '') // Remove dot from Romanian month abbreviation
    }
    
    return `${start} - ${end}`
  }

  const projectName = "Platforma aeriana fără pilot (UAV) telecomandata, dotată cu lansator de grenade fără recul cal. 40 mm (UAV - RPG-7*)"
  const footerText = 'Acest CV este destinat exclusiv colaborării în cadrul proiectului "UAV - RPG-7*" © 2025 S.C. INTER MAX S.R.L. - Toate drepturile rezervate'

  return (
    <div className="bg-white text-black min-h-full flex flex-col">
      {/* Project Header - Updated with black background and white text */}
      <div className="bg-black p-4 text-center text-white" style={{backgroundColor: 'black', color: 'white'}}>
        <h2 className="text-xs font-semibold mb-2 uppercase tracking-wider text-white" style={{color: 'white'}}>
          PROIECT:
        </h2>
        <h1 className="text-sm font-bold leading-tight text-white" style={{color: 'white'}}>
          {projectName}
        </h1>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Header with Logo Above Name */}
        <div className="text-center border-b-2 border-gray-800 pb-4">
          {/* INTERMAX Logo - Above Name */}
          <div className="mb-4">
            <img 
              src="/intermax-logo.png" 
              alt="INTERMAX"
              className="h-12 w-auto mx-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <h1 className="text-2xl font-bold mb-1 text-gray-900">
            {cv.informatiiPersonale.numeComplet || 'Nume Complet'}
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            {cv.informatiiPersonale.functieInProiect || 'Funcție'}
          </p>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {cv.informatiiPersonale.email || 'email@example.com'}
          </div>
        </div>

        {/* Profile */}
        {cv.profil?.descriere && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              PROFIL PROFESIONAL
            </h2>
            <p className="text-sm leading-relaxed text-justify text-gray-700">
              {cv.profil.descriere}
            </p>
          </div>
        )}

        {/* Experience */}
        {(cv.experientaCurenta?.functie || cv.experienteAnterioare?.length > 0) && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              EXPERIENȚĂ PROFESIONALĂ
            </h2>
            
            {/* Current Experience */}
            {cv.experientaCurenta?.functie && (
              <div className="mb-4 border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {cv.experientaCurenta.functie}
                  </h3>
                  <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                    {formatPeriod(cv.experientaCurenta.perioada)}
                  </span>
                </div>
                {cv.experientaCurenta.responsabilitati && (
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {cv.experientaCurenta.responsabilitati}
                  </p>
                )}
              </div>
            )}

            {/* Previous Experiences */}
            {cv.experienteAnterioare?.map((exp, index) => (
              <div key={index} className="mb-4 border-l-4 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {exp.functie}
                  </h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {formatPeriod(exp.perioada)}
                  </span>
                </div>
                {exp.responsabilitati && (
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {exp.responsabilitati}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cv.educatie?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              EDUCAȚIE
            </h2>
            <div className="space-y-2">
              {cv.educatie.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {edu.diploma} - {edu.specializare}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {edu.universitate}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                    {edu.anAbsolvire}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(cv.competente?.categoriiSelectate?.length > 0 || cv.competente?.detalii?.length > 0) && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              COMPETENȚE TEHNICE
            </h2>
            
            {cv.competente.categoriiSelectate?.length > 0 && (
              <div className="mb-3">
                <h3 className="text-sm font-semibold mb-2 text-gray-800">Categorii:</h3>
                <div className="flex flex-wrap gap-1">
                  {cv.competente.categoriiSelectate.map((cat, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cv.competente.detalii?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-800">Competențe:</h3>
                <div className="flex flex-wrap gap-1">
                  {cv.competente.detalii.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Footer */}
      <div className="border-t-2 border-gray-300 p-4 bg-gray-50">
        <p className="text-xs text-gray-600 text-center leading-relaxed">
          {footerText}
        </p>
      </div>
    </div>
  )
}