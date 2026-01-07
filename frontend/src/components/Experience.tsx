import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCalendar, FiBriefcase } from 'react-icons/fi'
import { experienceAPI } from '../services/api'
import type { Experience as ExperienceType } from '../types'

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = true // Disabled scroll animation for debugging

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await experienceAPI.getAll()
        setExperiences(response.data)
      } catch (error) {
        console.error('Error fetching experience:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [])

  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  if (loading) {
    return (
      <section id="experience" className="section-container">
        <div className="text-center">Loading experience...</div>
      </section>
    )
  }

  return (
    <section id="experience" className="section-container bg-gray-900/50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-700"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-1/2 border-4 border-gray-950"></div>

                <div className="ml-16 md:ml-0">
                  <div className="card">
                    <div className="flex items-center gap-3 mb-3">
                      <FiBriefcase className="text-primary-400" size={24} />
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                    </div>

                    <h4 className="text-lg text-primary-400 mb-2">{exp.company}</h4>
                    <p className="text-sm text-gray-500 mb-3">{exp.location}</p>

                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <FiCalendar size={16} />
                      <span className="text-sm">
                        {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-primary-500/10 text-primary-300 px-3 py-1 rounded-full border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
