'use client'

// --- Imports ---
import React, { useState } from 'react'
import { motion } from 'framer-motion'

// --- Audio Visualizer Component ---
export function AudioVisualizer({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(true)

  const bars = [
    { id: 1, minH: 6, maxH: 20, duration: 0.65 },
    { id: 2, minH: 10, maxH: 26, duration: 0.85 },
    { id: 3, minH: 8, maxH: 28, duration: 0.55 },
    { id: 4, minH: 12, maxH: 24, duration: 0.75 },
    { id: 5, minH: 6, maxH: 22, duration: 0.95 },
  ]

  return (
    <div
      onClick={() => setIsPlaying(!isPlaying)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-rose-200/80 shadow-[0_2px_12px_rgba(232,74,116,0.08)] cursor-pointer select-none transition-all duration-300 hover:shadow-md hover:border-pink-300 hover:scale-105 active:scale-95 ${className}`}
      title={isPlaying ? 'rattana_music Beat: Active' : 'rattana_music Beat: Paused'}
      aria-label="Interactive music beat visualizer"
    >
      <div className="flex items-end gap-[3px] h-5 px-0.5">
        {bars.map((bar) => (
          <motion.span
            key={bar.id}
            animate={
              isPlaying
                ? {
                    height: [bar.minH, bar.maxH, bar.minH],
                  }
                : { height: bar.minH }
            }
            transition={
              isPlaying
                ? {
                    duration: bar.duration,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
            className="w-[3px] rounded-full bg-gradient-to-t from-pink-accent to-pink-light shadow-[0_0_8px_rgba(232,74,116,0.35)]"
          />
        ))}
      </div>
      <span className="text-[11px] font-display font-semibold tracking-wider text-rose-950/80">
        beats
      </span>
    </div>
  )
}
