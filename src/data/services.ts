// --- Services & Process Data ---
export interface Service {
  id: string
  title: { en: string; th: string }
  description: { en: string; th: string }
  icon: string
}

export const services: Service[] = [
  {
    id: 'video-editing',
    title: { en: 'Video Editing', th: 'ตัดต่อวิดีโอ' },
    description: { en: 'Professional video editing for social media content', th: 'ตัดต่อวิดีโอคุณภาพสำหรับ social media' },
    icon: 'video',
  },
  {
    id: 'content-creation',
    title: { en: 'Content Creation', th: 'สร้างสรรค์คอนเทนต์' },
    description: { en: 'Storytelling, scriptwriting, and visual production', th: 'การเล่าเรื่อง เขียนบท และโปรดักชันภาพ' },
    icon: 'sparkles',
  },
  {
    id: 'web-development',
    title: { en: 'Web Development', th: 'พัฒนาเว็บไซต์' },
    description: { en: 'Modern, high-performance portfolio and showcase sites', th: 'พัฒนาเว็บไซต์พอร์ตโฟลิโอและโชว์เคสประสิทธิภาพสูง' },
    icon: 'code',
  },
]

export interface ProcessStep {
  step: number
  title: { en: string; th: string }
  description: { en: string; th: string }
}

export const processSteps: ProcessStep[] = [
  { step: 1, title: { en: 'Brief', th: 'รับบรีฟ' }, description: { en: 'Discuss requirements and vision', th: 'พูดคุยความต้องการและวิสัยทัศน์' } },
  { step: 2, title: { en: 'Edit', th: 'ตัดต่อ' }, description: { en: 'Create the first draft', th: 'สร้างร่างแรก' } },
  { step: 3, title: { en: 'Review', th: 'รีวิว' }, description: { en: 'Feedback and revisions', th: 'รับ feedback และแก้ไข' } },
  { step: 4, title: { en: 'Deliver', th: 'ส่งมอบ' }, description: { en: 'Final delivery', th: 'ส่งมอบงานสำเร็จ' } },
]
