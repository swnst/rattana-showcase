'use client'

// --- Animated Text Component ---
import React, { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

export interface AnimatedTextProps {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  animationType?: 'reveal' | 'fade' | 'slide'
  className?: string
  delay?: number
}

export function AnimatedText({
  text,
  tag = 'h2',
  animationType = 'reveal',
  className = '',
  delay = 0,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | null>(null)
  const Tag = tag

  const words = text.split(' ')

  useGSAP(
    () => {
      if (!containerRef.current) return

      const targets = containerRef.current.querySelectorAll('.animated-word')
      if (!targets.length) return

      let fromVars: gsap.TweenVars = { opacity: 0 }

      if (animationType === 'reveal') {
        fromVars = {
          y: 40,
          opacity: 0,
          rotateX: -45,
        }
      } else if (animationType === 'slide') {
        fromVars = {
          y: 30,
          opacity: 0,
        }
      } else if (animationType === 'fade') {
        fromVars = {
          opacity: 0,
        }
      }

      gsap.fromTo(
        targets,
        fromVars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          delay,
          stagger: 0.04,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    },
    [text, animationType, delay],
    containerRef
  )

  return (
    // @ts-expect-error Tag dynamic element ref
    <Tag ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden mr-[0.25em] align-top"
        >
          <span className="animated-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
