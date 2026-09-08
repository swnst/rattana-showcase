// --- Social Links Data ---
export interface SocialLink {
  platform: 'instagram' | 'tiktok' | 'lemon8' | 'linkedin' | 'line'
  url: string
  label: string
  icon: string
}

export const socialLinks: readonly SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/rattana_music/', label: 'Instagram', icon: 'instagram' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@rattana_music', label: 'TikTok', icon: 'tiktok' },
  { platform: 'lemon8', url: 'https://s.lemon8-app.com/s/GgMYxQFywe', label: 'Lemon8', icon: 'lemon8' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/in/nuntanarat-jitpapatsorn-00aa433a4/', label: 'LinkedIn', icon: 'linkedin' },
  { platform: 'line', url: 'https://line.me/R/ti/p/@701zbckv', label: 'Line (For Work)', icon: 'line' },
] as const
