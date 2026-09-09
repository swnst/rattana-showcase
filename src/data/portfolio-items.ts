// --- Portfolio Items Data ---
export type ContentCategory = 'all' | 'education' | 'lifestyle' | 'cosplay'
export type Platform = 'instagram' | 'tiktok' | 'lemon8'

export interface PortfolioItem {
  id: string
  title: { en: string; th: string }
  description: { en: string; th: string }
  category: ContentCategory
  platform: Platform
  embedUrl?: string
  thumbnailUrl: string
  date: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: { en: 'Engineering Study Tips', th: 'เทคนิคเรียนวิศวะ' },
    description: { en: 'Tips for studying engineering effectively', th: 'เทคนิคการเรียนวิศวะให้ได้ผล' },
    category: 'education',
    platform: 'tiktok',
    thumbnailUrl: '/images/placeholder-1.svg',
    date: '2025-01-15',
  },
  {
    id: '2',
    title: { en: 'Daily Campus Vlog', th: 'ชีวิตประจำวันในมหาลัย' },
    description: { en: 'A day in the life of an engineering student', th: 'หนึ่งวันกับการเรียนวิศวะและกิจกรรม' },
    category: 'lifestyle',
    platform: 'instagram',
    thumbnailUrl: '/images/placeholder-2.svg',
    date: '2025-01-20',
  },
  {
    id: '3',
    title: { en: 'Anime Cosplay Showcase', th: 'โชว์เคสคอสเพลย์อนิเมะ' },
    description: { en: 'Costume crafting and creative presentation', th: 'การทำชุดและนำเสนอผลงานคอสเพลย์' },
    category: 'cosplay',
    platform: 'tiktok',
    thumbnailUrl: '/images/placeholder-3.svg',
    date: '2025-01-28',
  },
  {
    id: '5',
    title: { en: 'Study Vlog & Productivity', th: 'จัดโต๊ะอ่านหนังสือ & โฟกัสการเรียน' },
    description: { en: 'Study routine and productivity tips', th: 'แชร์เทคนิคการจัดเวลาอ่านหนังสือและโฟกัส' },
    category: 'education',
    platform: 'lemon8',
    thumbnailUrl: '/images/placeholder-5.svg',
    date: '2025-02-10',
  },
  {
    id: '6',
    title: { en: 'Cafe Hopping & Photography', th: 'ตะลุยคาเฟ่และถ่ายภาพ' },
    description: { en: 'Aesthetic photo composition and color grading', th: 'มุมมองการถ่ายภาพและการจัดโทนสีสุดคูล' },
    category: 'lifestyle',
    platform: 'instagram',
    thumbnailUrl: '/images/placeholder-6.svg',
    date: '2025-02-18',
  },
  {
    id: '7',
    title: { en: 'Fantasy Character Transformation', th: 'แปลงโฉมตัวละครแฟนตาซี' },
    description: { en: 'Makeup and visual effects breakdown', th: 'ขั้นตอนแต่งหน้าและเอฟเฟกต์ภาพสุดอลังการ' },
    category: 'cosplay',
    platform: 'tiktok',
    thumbnailUrl: '/images/placeholder-7.svg',
    date: '2025-02-25',
  },
]
