import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink, FiCpu, FiDatabase, FiLayers } from 'react-icons/fi'
import { SiGit, SiPython, SiR, SiApachespark } from 'react-icons/si'
import { AiOutlineExperiment } from 'react-icons/ai'
import { projectsAPI } from '../services/api'
import type { Project } from '../types'

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = true // Disabled scroll animation for debugging

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="section-container">
        <div className="text-center">Loading projects...</div>
      </section>
    )
  }

  const getProjectIcon = (title: string, technologies: string[]) => {
    const titleLower = title.toLowerCase()
    const techString = technologies.join(' ').toLowerCase()
    
    if (titleLower.includes('gpu') || titleLower.includes('opengl')) {
      return <FiCpu className="text-primary-400" size={64} />
    }
    if (titleLower.includes('git') || techString.includes('git')) {
      return <SiGit className="text-orange-400" size={64} />
    }
    if (titleLower.includes('evolv') || techString.includes('bioinformatics') || techString.includes('genomics')) {
      return <AiOutlineExperiment className="text-green-400" size={64} />
    }
    if (titleLower.includes('etl') || titleLower.includes('pipeline') || techString.includes('spark')) {
      return <SiApachespark className="text-yellow-400" size={64} />
    }
    if (titleLower.includes('ai') || titleLower.includes('machine learning')) {
      return <FiLayers className="text-purple-400" size={64} />
    }
    if (techString.includes('python')) {
      return <SiPython className="text-blue-400" size={64} />
    }
    if (techString.includes('r programming')) {
      return <SiR className="text-blue-500" size={64} />
    }
    return <FiDatabase className="text-primary-400" size={64} />
  }

  const getProjectGradient = (title: string) => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('gpu') || titleLower.includes('opengl')) {
      return 'from-blue-500/20 via-purple-500/20 to-pink-500/20'
    }
    if (titleLower.includes('git')) {
      return 'from-orange-500/20 via-red-500/20 to-orange-600/20'
    }
    if (titleLower.includes('evolv')) {
      return 'from-green-500/20 via-emerald-500/20 to-teal-500/20'
    }
    if (titleLower.includes('etl') || titleLower.includes('pipeline')) {
      return 'from-yellow-500/20 via-orange-500/20 to-red-500/20'
    }
    if (titleLower.includes('ai') || titleLower.includes('machine learning')) {
      return 'from-purple-500/20 via-pink-500/20 to-indigo-500/20'
    }
    return 'from-primary-500/20 to-primary-700/20'
  }

  return (
    <section id="projects" className="section-container bg-gray-900/50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <div className={`aspect-video bg-gradient-to-br ${getProjectGradient(project.title)} rounded-lg mb-4 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300`}>
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    {getProjectIcon(project.title, project.technologies)}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-primary-500/10 text-primary-300 px-3 py-1 rounded-full border border-primary-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <FiGithub size={20} />
                    <span className="text-sm">Code</span>
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <FiExternalLink size={20} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
