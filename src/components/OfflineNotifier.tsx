'use client'

import { useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

export default function OfflineNotifier() {
  useEffect(() => {
    function handleOffline() {
      toast({
        title: 'Offline mode',
        description: 'You are now offline. Your progress will be saved locally.'
      })
    }

    function handleOnline() {
      toast({
        title: 'Back online',
        description: 'Connected to the internet again.'
      })
    }

    if (!navigator.onLine) {
      handleOffline()
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return null
}
