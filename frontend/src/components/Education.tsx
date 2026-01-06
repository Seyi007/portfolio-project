import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBookOpen, FiAward, FiCalendar } from 'react-icons/fi'

interface EducationItem {
  id: number
  institution: string
  degree: string
  location: string
  startDate: string
  endDate: string
  highlights: string[]
}

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: 'Stanford University',
    degree: 'Data Science – Machine Learning and AI for Precision Medicine',
    location: 'San Francisco, California, USA',
    startDate: '2025-05',
    endDate: '2025-07',
    highlights: [
      'Explored advanced statistical methods for evaluating complex health data sets',
      'Conducted research on ML algorithms for automated healthcare solutions',
      'Specialized in precision medicine and AI applications'
    ]
  },
  {
    id: 2,
    institution: 'Holberton School',
    degree: 'Software Engineering (Certification)',
    location: 'San Francisco, California, USA',
    startDate: '2022-02',
    endDate: '2023-03',
    highlights: [
      'Completed 12-month hands-on project-based full-stack software engineering program',
      'Gained proficiency in C programming, Python, and Shell scripting',
      'Focused on algorithmic problem-solving and version control with Git/GitHub'
    ]
  },
  {
    id: 3,
    institution: 'University of Lagos',
    degree: 'Geography - Geographic Information Systems (GIS)',
    location: 'Lagos, Nigeria',
    startDate: '2016-11',
    endDate: '2021-01',
    highlights: [
      'Explored spatial data analysis and applications in urban planning',
      'Developed proficiency in GIS software tools for mapping and visualization',
      'Supported decision-making for local government projects'
    ]
  }
]

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  return (
    <section id="education" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="gradient-text">Education</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="text-primary-400 mt-1">
                  <FiBookOpen size={28} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{edu.institution}</h3>
                      <div className="flex items-center gap-2 text-primary-400 mb-2">
                        <FiAward size={16} />
                        <p className="font-medium">{edu.degree}</p>
                      </div>
                      <p className="text-gray-400 text-sm">{edu.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <FiCalendar size={16} />
                    <span className="text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Education
