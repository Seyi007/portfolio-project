import axios, { AxiosError } from 'axios'
import type { Project, Skill, Experience, ContactMessage, OpenSourceContribution } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for cold starts
})

// Retry configuration
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

// Exponential backoff retry logic
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const shouldRetry = (error: AxiosError): boolean => {
  // Retry on network errors or 5xx server errors
  return !error.response || (error.response.status >= 500 && error.response.status < 600)
}

// Add response interceptor for retry logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as any
    
    // Initialize retry count
    config.retryCount = config.retryCount || 0
    
    // Check if we should retry
    if (config.retryCount < MAX_RETRIES && shouldRetry(error)) {
      config.retryCount += 1
      
      // Calculate delay with exponential backoff
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, config.retryCount - 1)
      
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES}) after ${delay}ms...`)
      
      await sleep(delay)
      
      return api(config)
    }
    
    return Promise.reject(error)
  }
)

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
