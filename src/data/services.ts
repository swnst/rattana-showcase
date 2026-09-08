// --- Services & Process Data ---
export interface Service {
  id: string
  title: { en: string; th: string }
  description: { en: string; th: string }
  icon: string
  popular?: boolean
  features: { en: string[]; th: string[] }
}

export const services: Service[] = [
  {
    id: 'video-editing',
    title: { en: 'Video Editing', th: 'ตัดต่อวิดีโอระดับพรีเมียม' },
    description: {
      en: 'High-retention video editing tailored for TikTok, Reels, YouTube, and digital brand campaigns.',
      th: 'ตัดต่อวิดีโอคุณภาพสูง เน้นอัตราการดูจบ สำหรับ TikTok, Reels, YouTube และแคมเปญโฆษณา',
    },
    icon: 'video',
    popular: true,
    features: {
      en: [
        'Short-form retention hook (TikTok / IG Reels / Shorts)',
        'Dynamic captions, text animations & motion graphics',
        'Professional sound design & trending audio mixing',
        'Color correction & cinematic color grading',
      ],
      th: [
        'ตัดต่อคลิปสั้นดึงดูดสายตาตั้งแต่ 3 วินาทีแรก',
        'ใส่ซับไตเติลเคลื่อนไหวและโมชันกราฟิกตามเทรนด์',
        'ออกแบบเสียงประกอบ (Sound FX) และมิกซ์เสียงอย่างลงตัว',
        'เกรดดิ้งปรับแต่งโทนสีให้มู้ดแอนด์โทนสวยงามระดับโปร',
      ],
    },
  },
  {
    id: 'content-creation',
    title: { en: 'Content Creation & Storytelling', th: 'สร้างสรรค์คอนเทนต์ & สตอรี่เทลลิง' },
    description: {
      en: 'Creative concept development, engaging scriptwriting, and multi-platform digital production.',
      th: 'วางกลยุทธ์คอนเทนต์ เขียนบทที่เข้าถึงใจผู้ชม และผลิตงานภาพเล่าเรื่องอย่างมีเสน่ห์',
    },
    icon: 'sparkles',
    popular: false,
    features: {
      en: [
        'Concept development & creative scriptwriting',
        'Lifestyle, study tips & engineering tech storytelling',
        'Multi-platform distribution (TikTok, Instagram, Lemon8)',
        'Authentic brand integration & organic engagement',
      ],
      th: [
        'คิดค้นคอนเซ็ปต์ วางโครงเรื่อง และเขียนบทที่น่าติดตาม',
        'ถ่ายทอดเรื่องราวไลฟ์สไตล์ การเรียน และเทคโนโลยีให้เข้าใจง่าย',
        'วางแผนคอนเทนต์ครอบคลุมหลายแพลตฟอร์มโซเชียลมีเดีย',
        'ผสานแบรนด์เข้ากับเนื้อหาอย่างเป็นธรรมชาติและน่าเชื่อถือ',
      ],
    },
  },
  {
    id: 'web-development',
    title: { en: 'Web Development & Design', th: 'พัฒนาเว็บไซต์ & โชว์เคส' },
    description: {
      en: 'Fast, responsive, and aesthetically stunning portfolio and brand showcase web applications.',
      th: 'สร้างและออกแบบเว็บไซต์พอร์ตโฟลิโอ โชว์เคสแบรนด์ ที่โหลดไว ดีไซน์หรูหรา และลื่นไหล',
    },
    icon: 'code',
    popular: false,
    features: {
      en: [
        'Modern Next.js App Router & TypeScript architecture',
        'Fluid responsive layout for mobile, tablet & desktop',
        'High-speed performance, SEO & accessibility optimized',
        'Smooth micro-interactions & GSAP animations',
      ],
      th: [
        'พัฒนาด้วย Next.js App Router และ TypeScript มาตรฐานสากล',
        'รองรับทุกขนาดหน้าจออย่างสมบูรณ์แบบ ทั้งมือถือและคอมพิวเตอร์',
        'โหลดเร็ว ประสิทธิภาพสูง พร้อมวางโครงสร้าง SEO ครบครัน',
        'แอนิเมชันลื่นไหล นุ่มนวล สไตล์โมเดิร์นพรีเมียม',
      ],
    },
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
