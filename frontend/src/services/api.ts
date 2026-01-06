import axios from 'axios'
import type { Project, Skill, Experience, ContactMessage, OpenSourceContribution } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const projectsAPI = {
  getAll: () => api.get<Project[]>('/api/projects'),
  getById: (id: number) => api.get<Project>(`/api/projects/${id}`),
}

export const skillsAPI = {
  getAll: () => api.get<Skill[]>('/api/skills'),
  getByCategory: (category: string) => api.get<Skill[]>(`/api/skills/${category}`),
}

export const experienceAPI = {
  getAll: () => api.get<Experience[]>('/api/experience'),
}

export const contactAPI = {
  send: (message: ContactMessage) => api.post('/api/contact', message),
}

export const openSourceAPI = {
  getAll: () => api.get<OpenSourceContribution[]>('/api/opensource'),
  getByType: (type: string) => api.get<OpenSourceContribution[]>(`/api/opensource/${type}`),
}

export default api
