import { Mail } from 'lucide-react'
import type { CV } from '../store/useCVStore'

interface ModernTemplateProps {
  cv: CV
}

export default function ModernTemplate({ cv }: ModernTemplateProps) {
  const formatPeriod = (perioada: { start: string; end: string; prezent?: boolean }) => {
    if (!perioada.start) return ''
    
    const start = new Date(perioada.start + '-01').toLocaleDateString('ro-RO', { 
      month: 'short', 
      year: 'numeric' 
    })
    const end = perioada.prezent ? 'Prezent' : 
      (perioada.end ? new Date(perioada.end + '-01').toLocaleDateString('ro-RO', { 
        month: 'short', 
        year: 'numeric' 
      }) : '')
    
    return `${start} - ${end}`
  }

  const projectName = "Platforma aeriana fără pilot (UAV) telecomandata, dotată cu lansator de grenade fără recul cal. 40 mm (UAV - RPG-7*)"
  const footerText = 'Acest CV este destinat exclusiv colaborării în cadrul proiectului "Sistem UAV cu Lansator Grenade Termobarice" © 2025 S.C. INTER MAX S.R.L. - Toate drepturile rezervate'

  return (
    <div className="bg-amber-50 text-black min-h-full flex flex-col" style={{backgroundColor: '#fffbeb', maxWidth: '100%', overflow: 'hidden'}}>
      {/* Project Header - Updated with black background and white text */}
      <div className="bg-black p-4 text-center text-white" style={{backgroundColor: 'black', color: 'white'}}>
        <h2 className="text-xs font-semibold mb-2 uppercase tracking-wider text-white" style={{color: 'white'}}>
          PROIECT:
        </h2>
        <h1 className="text-sm font-bold leading-tight text-white" style={{color: 'white'}}>
          {projectName}
        </h1>
      </div>

      <div className="flex flex-1" style={{maxWidth: '100%'}}>
        {/* Sidebar - Fixed width for PDF */}
        <div className="bg-gray-800 text-white p-3 flex flex-col" style={{backgroundColor: '#1f2937', width: '32%', minWidth: '200px', maxWidth: '250px'}}>
          {/* INTERMAX Logo - Above Name */}
          <div className="mb-3 text-center">
            <img 
              src="/intermax-logo.png" 
              alt="INTERMAX" 
              className="h-6 w-auto mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          {/* Header in Sidebar */}
          <div className="mb-4">
            <h1 className="text-lg font-bold mb-2 break-words text-white" style={{color: 'white', lineHeight: '1.2'}}>
              {cv.informatiiPersonale.numeComplet || 'Nume Complet'}
            </h1>
            <p className="text-white text-xs mb-2" style={{color: 'white', lineHeight: '1.3'}}>
              {cv.informatiiPersonale.functieInProiect || 'Funcție'}
            </p>
            <div className="flex items-center text-xs" style={{flexWrap: 'wrap'}}>
              <Mail className="h-3 w-3 mr-1 flex-shrink-0 text-white" style={{color: 'white'}} />
              <span className="break-all text-white" style={{color: 'white', fontSize: '10px', lineHeight: '1.2'}}>{cv.informatiiPersonale.email || 'email@example.com'}</span>
            </div>
          </div>

          {/* Skills */}
          {(cv.competente?.categoriiSelectate?.length > 0 || cv.competente?.detalii?.length > 0) && (
            <div className="mb-4">
              <h2 className="text-xs font-semibold mb-2 uppercase tracking-wider border-b border-gray-600 pb-1 text-white" style={{color: 'white'}}>
                Competențe
              </h2>
              
              {cv.competente.categoriiSelectate?.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-xs font-medium mb-1 text-white" style={{color: 'white'}}>Categorii</h3>
                  <div className="space-y-1">
                    {cv.competente.categoriiSelectate.map((cat, index) => (
                      <div key={index} className="text-xs bg-gray-700 px-2 py-1 rounded text-white" style={{color: 'white', fontSize: '10px'}}>
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cv.competente.detalii?.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium mb-1 text-white" style={{color: 'white'}}>Tehnologii</h3>
                  <div className="flex flex-wrap gap-1">
                    {cv.competente.detalii.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-blue-600 px-1 py-1 rounded text-white"
                        style={{color: 'white', fontSize: '9px'}}
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

        {/* Main Content - Optimized for PDF */}
        <div className="flex-1 p-4 flex flex-col" style={{width: '68%', maxWidth: '68%', overflow: 'hidden'}}>
          <div className="flex-1">
            {/* Profile */}
            {cv.profil?.descriere && (
              <div className="mb-4">
                <h2 className="text-base font-semibold mb-2 text-gray-800 border-b-2 border-gray-300 pb-1">
                  PROFIL PROFESIONAL
                </h2>
                <p className="text-xs leading-relaxed text-justify text-gray-700" style={{lineHeight: '1.4'}}>
                  {cv.profil.descriere}
                </p>
              </div>
            )}

            {/* Experience */}
            {(cv.experientaCurenta?.functie || cv.experienteAnterioare?.length > 0) && (
              <div className="mb-4">
                <h2 className="text-base font-semibold mb-2 text-gray-800 border-b-2 border-gray-300 pb-1">
                  EXPERIENȚĂ PROFESIONALĂ
                </h2>
                
                {/* Current Experience */}
                {cv.experientaCurenta?.functie && (
                  <div className="mb-3">
                    <div className="mb-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold text-xs text-gray-900" style={{flex: '1', minWidth: '60%'}}>
                          {cv.experientaCurenta.functie}
                        </h3>
                        <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded whitespace-nowrap" style={{fontSize: '10px'}}>
                          {formatPeriod(cv.experientaCurenta.perioada)}
                        </span>
                      </div>
                    </div>
                    {cv.experientaCurenta.responsabilitati && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1" style={{lineHeight: '1.3'}}>
                        {cv.experientaCurenta.responsabilitati}
                      </p>
                    )}
                  </div>
                )}

                {/* Previous Experiences */}
                {cv.experienteAnterioare?.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="mb-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold text-xs text-gray-900" style={{flex: '1', minWidth: '60%'}}>
                          {exp.functie}
                        </h3>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded whitespace-nowrap" style={{fontSize: '10px'}}>
                          {formatPeriod(exp.perioada)}
                        </span>
                      </div>
                    </div>
                    {exp.responsabilitati && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1" style={{lineHeight: '1.3'}}>
                        {exp.responsabilitati}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education - Fixed layout for PDF */}
            {cv.educatie?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-base font-semibold mb-2 text-gray-800 border-b-2 border-gray-300 pb-1">
                  EDUCAȚIE
                </h2>
                {cv.educatie.map((edu, index) => (
                  <div key={index} className="mb-3" style={{width: '100%', overflow: 'visible'}}>
                    <div className="flex items-start gap-3" style={{alignItems: 'flex-start'}}>
                      <div style={{flex: '1', minWidth: '0', paddingRight: '8px'}}>
                        <h3 className="font-semibold text-xs text-gray-900" style={{lineHeight: '1.3', marginBottom: '2px', wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                          {edu.diploma} - {edu.specializare}
                        </h3>
                        <p className="text-xs text-gray-600" style={{lineHeight: '1.3', wordWrap: 'break-word', overflowWrap: 'break-word', margin: '0'}}>
                          {edu.universitate}
                        </p>
                      </div>
                      <div style={{flexShrink: 0, marginLeft: 'auto'}}>
                        <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded whitespace-nowrap" style={{fontSize: '10px', display: 'inline-block'}}>
                          {edu.anAbsolvire}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Footer */}
          <div className="border-t-2 border-gray-300 pt-2 mt-4 bg-gray-50" style={{marginTop: 'auto'}}>
            <p className="text-xs text-gray-600 text-center leading-relaxed px-1" style={{fontSize: '9px', lineHeight: '1.3'}}>
              {footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}