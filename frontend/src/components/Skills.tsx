import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillsAPI } from '../services/api'
import type { Skill } from '../types'
import LoadingSpinner from './LoadingSpinner'

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showAll, setShowAll] = useState(false)
  const ref = useRef(null)
  const isInView = true // Disabled scroll animation for debugging

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll()
        console.log('Skills fetched:', response.data)
        setSkills(response.data)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return <LoadingSpinner message="Loading skills" />
  }

  const categories = ['All', ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)
  
  // Show only first 12 skills initially, or all if showAll is true
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 12)
  const hasMore = filteredSkills.length > 12

  console.log('Skills:', skills.length, 'Filtered:', filteredSkills.length, 'Category:', selectedCategory)

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-green-600'
    if (level >= 80) return 'from-blue-500 to-blue-600'
    if (level >= 70) return 'from-yellow-500 to-yellow-600'
    return 'from-orange-500 to-orange-600'
  }

  const getLevelBadge = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 80) return 'Advanced'
    if (level >= 70) return 'Intermediate'
    return 'Proficient'
  }

  return (
    <section id="skills" className="section-container bg-gray-900/50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Skills & <span className="gradient-text">Technologies</span>
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50 scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-100 group-hover:text-primary-400 transition-colors">
                  {skill.name}
                </h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  skill.level >= 90 ? 'bg-green-500/20 text-green-400' :
                  skill.level >= 80 ? 'bg-blue-500/20 text-blue-400' :
                  skill.level >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {getLevelBadge(skill.level)}
                </span>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{skill.category}</span>
                  <span className="text-sm font-medium text-primary-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-primary px-8 py-3"
            >
              {showAll ? 'Show Less' : `Show All (${filteredSkills.length} skills)`}
            </button>
          </div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold gradient-text mb-2">{skills.length}</div>
            <div className="text-gray-400 text-sm">Total Skills</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold gradient-text mb-2">
              {skills.filter(s => s.level >= 90).length}
            </div>
            <div className="text-gray-400 text-sm">Expert Level</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold gradient-text mb-2">
              {categories.length - 1}
            </div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%
            </div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
