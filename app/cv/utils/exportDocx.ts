import type { CV } from '../store/useCVStore'

export async function exportToDocx(cv: CV) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, Footer, Header } = await import('docx')
  
  const children: any[] = []
  const projectName = "Platforma aeriana fără pilot (UAV) telecomandata, dotată cu lansator de grenade fără recul cal. 40 mm (UAV - RPG-7*)"
  const footerText = 'Acest CV este destinat exclusiv colaborării în cadrul proiectului "Sistem UAV cu Lansator Grenade Termobarice" © 2025 S.C. INTER MAX S.R.L. - Toate drepturile rezervate'

  // Project Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "PROIECT:",
          bold: true,
          size: 18,
          color: "1f2937"
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: projectName,
          bold: true,
          size: 20,
          color: "1f2937"
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  )

  // INTERMAX Logo Header
  try {
    const logoResponse = await fetch('/intermax-logo.png')
    const logoBuffer = await logoResponse.arrayBuffer()
    
    children.push(
      new Paragraph({
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: {
              width: 120,
              height: 48,
            },
          })
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 300 }
      })
    )
  } catch (error) {
    console.log('Logo not found, continuing without logo')
  }

  // CV Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: cv.informatiiPersonale.numeComplet,
          bold: true,
          size: 32
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: cv.informatiiPersonale.functieInProiect,
          size: 24
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: cv.informatiiPersonale.email,
          size: 20
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  )

  // Profile
  if (cv.profil.descriere) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROFIL PROFESIONAL',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: cv.profil.descriere,
            size: 20
          })
        ],
        spacing: { after: 300 }
      })
    )
  }

  // Experience
  if (cv.experientaCurenta?.functie || cv.experienteAnterioare.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'EXPERIENȚĂ PROFESIONALĂ',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      })
    )

    // Current experience
    if (cv.experientaCurenta?.functie) {
      const exp = cv.experientaCurenta
      const period = exp.perioada.prezent ? 
        `${exp.perioada.start} - Prezent` : 
        `${exp.perioada.start} - ${exp.perioada.end}`

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.functie,
              bold: true,
              size: 22
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: period,
              italics: true,
              size: 18
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: exp.responsabilitati,
              size: 20
            })
          ],
          spacing: { after: 300 }
        })
      )
    }

    // Previous experiences
    cv.experienteAnterioare.forEach(exp => {
      const period = `${exp.perioada.start} - ${exp.perioada.end}`
      
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.functie,
              bold: true,
              size: 22
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: period,
              italics: true,
              size: 18
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: exp.responsabilitati,
              size: 20
            })
          ],
          spacing: { after: 300 }
        })
      )
    })
  }

  // Education
  if (cv.educatie.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'EDUCAȚIE',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      })
    )

    cv.educatie.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.diploma} - ${edu.specializare}`,
              bold: true,
              size: 22
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.universitate} (${edu.anAbsolvire})`,
              size: 20
            })
          ],
          spacing: { after: 300 }
        })
      )
    })
  }

  // Skills
  if (cv.competente.categoriiSelectate.length > 0 || cv.competente.detalii.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'COMPETENȚE TEHNICE',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      })
    )

    if (cv.competente.categoriiSelectate.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Categorii: ',
              bold: true,
              size: 20
            }),
            new TextRun({
              text: cv.competente.categoriiSelectate.join(', '),
              size: 20
            })
          ],
          spacing: { after: 200 }
        })
      )
    }

    if (cv.competente.detalii.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Competențe: ',
              bold: true,
              size: 20
            }),
            new TextRun({
              text: cv.competente.detalii.join(', '),
              size: 20
            })
          ],
          spacing: { after: 400 }
        })
      )
    }
  }

  // Create footer
  const footerParagraph = new Paragraph({
    children: [
      new TextRun({
        text: footerText,
        size: 16,
        color: "666666"
      })
    ],
    alignment: AlignmentType.CENTER
  })

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
      footers: {
        default: new Footer({
          children: [footerParagraph]
        })
      }
    }]
  })

  try {
    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${cv.informatiiPersonale.numeComplet || 'CV'}_UAV_Project_INTERMAX.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('DOCX export failed:', error)
    throw error
  }
}
