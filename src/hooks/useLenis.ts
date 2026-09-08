'use client'

// --- Lenis Controller Hook ---
import { useCallback } from 'react'
import { useLenisContext } from '@/components/providers/LenisProvider'

export function useLenis() {
  const { lenis } = useLenisContext()

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: Parameters<NonNullable<typeof lenis>['scrollTo']>[1]) => {
      lenis?.scrollTo(target, options)
    },
    [lenis]
  )

  const stop = useCallback(() => {
    lenis?.stop()
  }, [lenis])

  const start = useCallback(() => {
    lenis?.start()
  }, [lenis])

  return {
    lenis,
    scrollTo,
    stop,
    start,
  }
}
