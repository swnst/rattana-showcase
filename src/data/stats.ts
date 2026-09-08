// --- Stats Data ---
export interface StatItem {
  label: string
  value: number
  suffix: string
  platform: 'instagram' | 'tiktok' | 'lemon8' | 'all'
}

export const stats: readonly StatItem[] = [
  { label: 'Instagram Followers', value: 10000, suffix: '+', platform: 'instagram' },
  { label: 'TikTok Followers', value: 5000, suffix: '+', platform: 'tiktok' },
  { label: 'Lemon8 Followers', value: 3000, suffix: '+', platform: 'lemon8' },
  { label: 'Content Created', value: 200, suffix: '+', platform: 'all' },
] as const
