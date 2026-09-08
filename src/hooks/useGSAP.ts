'use client'

// --- GSAP Context Hook ---
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

type GSAPCallback = (context: gsap.Context) => void | (() => void)

export function useGSAP(
  callback: GSAPCallback,
  dependencies: React.DependencyList = [],
  scope?: React.RefObject<Element | null>
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const ctx = gsap.context((self) => {
      return savedCallback.current(self)
    }, scope?.current ?? undefined)

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
