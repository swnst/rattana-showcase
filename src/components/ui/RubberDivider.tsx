'use client'

// --- Imports ---
import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

// --- RubberDivider Component ---
interface RubberDividerProps {
  className?: string
}

export function RubberDivider({ className = '' }: RubberDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const currentY = useRef(25)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !pathRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * 1000
    const relY = e.clientY - rect.top
    const pullY = Math.max(-10, Math.min(60, relY))

    if (tweenRef.current) {
      tweenRef.current.kill()
    }

    currentY.current = pullY
    pathRef.current.setAttribute('d', `M 0 25 Q ${relX} ${pullY} 1000 25`)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !pathRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * 1000

    const obj = { y: currentY.current }
    tweenRef.current = gsap.to(obj, {
      y: 25,
      duration: 1.1,
      ease: 'elastic.out(1.2, 0.2)',
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute('d', `M 0 25 Q ${relX} ${obj.y} 1000 25`)
        }
      },
    })
  }

  useEffect(() => {
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-visible py-2 select-none cursor-pointer flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10 overflow-visible pointer-events-none"
      >
        <defs>
          <linearGradient id="rubberStringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0" />
            <stop offset="20%" stopColor="#FB7185" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#E11D48" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#FB7185" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 0 25 Q 500 25 1000 25"
          stroke="url(#rubberStringGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
