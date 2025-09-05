import type { CV } from '../store/useCVStore'

export async function exportToPDF(cv: CV) {
  const html2pdf = (await import('html2pdf.js')).default
  
  const element = document.getElementById('cv-preview')
  
  if (!element) {
    throw new Error('CV preview element not found')
  }

  const opt = {
     margin: [10, 8, 15, 8], // top, left, bottom, right în mm
    filename: `${cv.informatiiPersonale.numeComplet || 'CV'}_INTERMAX.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  }

  try {
    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('PDF export failed:', error)
    throw error
  }
}