import React from 'react'

const avatars = [
  'https://i.pravatar.cc/100?img=5',
  'https://i.pravatar.cc/100?img=12',
  'https://i.pravatar.cc/100?img=32',
  'https://i.pravatar.cc/100?img=45',
]

export default function GlassAboutButton({ className = '', onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.02] hover:text-white ${className}`}
    >
      {/* glow highlight */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(200px_80px_at_30%_-40%,rgba(168,85,247,0.28),transparent_60%)]" />

      {/* Avatars */}
      <div className="relative z-[1] flex items-center">
        {avatars.map((src, i) => (
          <div
            key={i}
            className={`relative h-9 w-9 rounded-full border border-white/20 bg-white/20 overflow-hidden shadow-md transition-transform duration-300 will-change-transform ${
              i === 0 ? 'translate-x-0' : i === 1 ? '-translate-x-[8px]' : i === 2 ? '-translate-x-[16px]' : '-translate-x-[24px]'
            } group-hover:${i === 0 ? 'translate-x-0' : i === 1 ? '-translate-x-[6px]' : i === 2 ? '-translate-x-[12px]' : '-translate-x-[18px]'} group-hover:scale-110`}
            style={{ zIndex: 10 - i }}
          >
            <img src={src} alt="avatar" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Label */}
      <span className="relative z-[1] text-lg font-medium select-none">About us</span>
    </button>
  )
} 