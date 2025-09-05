import { useEffect } from 'react'
import type { CV } from '../store/useCVStore'

export default function useAutosave(cv: CV) {
  // Auto-save disabled for maximum privacy
  // Users must manually save their drafts
  
  useEffect(() => {
    console.log('Auto-save disabled for privacy. Use manual save button.')
  }, [])
  
  // Empty hook - no automatic saving
  // This ensures data is only saved when user explicitly chooses to
}