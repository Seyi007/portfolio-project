export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
}

export interface Skill {
  name: string
  category: string
  level: number
}

export interface Experience {
  id: number
  company: string
  position: string
  description: string
  start_date: string
  end_date?: string
  technologies: string[]
}

export interface ContactMessage {
  name: string
  email: string
  message: string
  subject?: string
}
export interface OpenSourceContribution {
  id: number
  type: 'speaking' | 'volunteering' | 'contribution'
  title: string
  organization: string
  description: string
  date: string
  location?: string
  url?: string
  image_url?: string
  images?: string[]
  technologies?: string[]
}