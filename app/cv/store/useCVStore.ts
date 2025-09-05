import { create } from 'zustand'

export interface InformatiiPersonale {
  numeComplet: string
  functieInProiect: string
  email: string
}

export interface Profil {
  descriere?: string
}

export interface Experienta {
  functie: string
  perioada: { 
    start: string
    end: string
    prezent?: boolean 
  }
  responsabilitati: string
}

export interface Educatie {
  diploma: string
  anAbsolvire: string
  universitate: string
  specializare: string
}

export interface CompetenteTehnice {
  categoriiSelectate: string[]
  detalii: string[]
}

export interface CV {
  informatiiPersonale: InformatiiPersonale
  profil: Profil
  experientaCurenta?: Experienta
  experienteAnterioare: Experienta[]
  educatie: Educatie[]
  competente: CompetenteTehnice
  templateStyle: 'modern' | 'compact'
}

interface CVStore {
  cv: CV
  sessionId: string
  updatePersonalInfo: (info: InformatiiPersonale) => void
  updateProfile: (profile: Profil) => void
  updateExperience: (experience: { experientaCurenta?: Experienta; experienteAnterioare: Experienta[] }) => void
  updateEducation: (education: Educatie[]) => void
  updateSkills: (skills: CompetenteTehnice) => void
  updateTemplateStyle: (style: 'modern' | 'compact') => void
  resetCV: () => void
  initializeSession: () => void
  saveToStorage: () => void
  loadFromStorage: () => void
  clearAllUserData: () => void
}

const initialCV: CV = {
  informatiiPersonale: {
    numeComplet: '',
    functieInProiect: '',
    email: ''
  },
  profil: {
    descriere: ''
  },
  experienteAnterioare: [],
  educatie: [],
  competente: {
    categoriiSelectate: [],
    detalii: []
  },
  templateStyle: 'compact'
}

// Generate unique session ID for each app load
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useCVStore = create<CVStore>((set, get) => ({
  cv: initialCV,
  sessionId: '',

  // Initialize new session and clear any previous data
  initializeSession: () => {
    const newSessionId = generateSessionId()
    
    // Clear ALL previous CV data from localStorage
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('team-cv-draft')) {
          localStorage.removeItem(key)
        }
      })
    }
    
    set({ 
      sessionId: newSessionId,
      cv: initialCV 
    })
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      cv: { ...state.cv, informatiiPersonale: info }
    })),

  updateProfile: (profile) =>
    set((state) => ({
      cv: { ...state.cv, profil: profile }
    })),

  updateExperience: (experience) =>
    set((state) => ({
      cv: { 
        ...state.cv, 
        experientaCurenta: experience.experientaCurenta,
        experienteAnterioare: experience.experienteAnterioare 
      }
    })),

  updateEducation: (education) =>
    set((state) => ({
      cv: { ...state.cv, educatie: education }
    })),

  updateSkills: (skills) =>
    set((state) => ({
      cv: { ...state.cv, competente: skills }
    })),

  updateTemplateStyle: (style) =>
    set((state) => ({
      cv: { ...state.cv, templateStyle: style }
    })),

  resetCV: () => set((state) => ({ cv: initialCV, sessionId: state.sessionId })),

  saveToStorage: () => {
    try {
      const { sessionId, cv } = get()
      if (sessionId && typeof window !== 'undefined') {
        const sessionKey = `team-cv-draft-${sessionId}`
        localStorage.setItem(sessionKey, JSON.stringify(cv))
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  loadFromStorage: () => {
    try {
      const { sessionId } = get()
      if (sessionId && typeof window !== 'undefined') {
        const sessionKey = `team-cv-draft-${sessionId}`
        const saved = localStorage.getItem(sessionKey)
        if (saved) {
          const parsedCV = JSON.parse(saved)
          set({ cv: { ...initialCV, ...parsedCV } })
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  },

  clearAllUserData: () => {
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('team-cv-draft')) {
          localStorage.removeItem(key)
        }
      })
    }
    set({ cv: initialCV })
  }
}))