import { z } from 'zod'

export const personalInfoSchema = z.object({
  numeComplet: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  functieInProiect: z.string().min(1, 'Funcția în proiect este obligatorie'),
  email: z.string().email('Email invalid')
})

export const profileSchema = z.object({
  descriere: z.string().optional()
})

export const experienceSchema = z.object({
  experientaCurenta: z.object({
    functie: z.string(),
    perioada: z.object({
      start: z.string(),
      end: z.string(),
      prezent: z.boolean().optional()
    }),
    responsabilitati: z.string()
  }).optional(),
  experienteAnterioare: z.array(z.object({
    functie: z.string(),
    perioada: z.object({
      start: z.string(),
      end: z.string(),
      prezent: z.boolean().optional()
    }),
    responsabilitati: z.string()
  }))
}).refine((data) => {
  const hasCurrent = data.experientaCurenta?.functie?.trim()
  const hasPrevious = data.experienteAnterioare.some(exp => exp.functie?.trim())
  return hasCurrent || hasPrevious
}, {
  message: 'Cel puțin o experiență profesională este obligatorie',
  path: ['root']
})

export const educationSchema = z.object({
  educatie: z.array(z.object({
    diploma: z.string(),
    anAbsolvire: z.string(),
    universitate: z.string(),
    specializare: z.string()
  })).min(1, 'Cel puțin o intrare de educație este obligatorie')
})

export const skillsSchema = z.object({
  categoriiSelectate: z.array(z.string()),
  detalii: z.array(z.string())
}).refine((data) => {
  return data.categoriiSelectate.length > 0 || data.detalii.length >= 3
}, {
  message: 'Selectați cel puțin o categorie sau adăugați minim 3 competențe',
  path: ['root']
})