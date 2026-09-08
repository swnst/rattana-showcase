'use client'

// --- Count Up Hook ---
import { useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface UseCountUpOptions {
  end: number
  start?: number
  duration?: number
  triggerRef?: React.RefObject<Element | null>
}

export function useCountUp({
  end,
  start = 0,
  duration = 2,
  triggerRef,
}: UseCountUpOptions) {
  const [count, setCount] = useState<number>(start)

  useEffect(() => {
    const triggerEl = triggerRef?.current
    const obj = { val: start }

    const anim = gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: triggerEl
        ? {
            trigger: triggerEl,
            start: 'top 85%',
            once: true,
          }
        : undefined,
      onUpdate: () => {
        setCount(Math.round(obj.val))
      },
    })

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === triggerEl) {
          trigger.kill()
        }
      })
    }
  }, [end, start, duration, triggerRef])

  return count
}
