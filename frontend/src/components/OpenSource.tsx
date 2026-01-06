import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMic, FiHeart, FiGithub, FiExternalLink, FiMapPin, FiCalendar } from 'react-icons/fi'
import { openSourceAPI } from '../services/api'
import type { OpenSourceContribution } from '../types'

const OpenSource = () => {
  const [contributions, setContributions] = useState<OpenSourceContribution[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('All')
  const ref = useRef(null)
  const isInView = true

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await openSourceAPI.getAll()
        setContributions(response.data)
      } catch (error) {
        console.error('Error fetching open source contributions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  if (loading) {
    return (
      <section id="opensource" className="section-container">
        <div className="text-center">Loading contributions...</div>
      </section>
    )
  }

  const types = [
    { value: 'All', icon: null, label: 'All' },
    { value: 'speaking', icon: <FiMic size={18} />, label: 'Speaking' },
    { value: 'volunteering', icon: <FiHeart size={18} />, label: 'Volunteering' },
    { value: 'contribution', icon: <FiGithub size={18} />, label: 'Contributions' }
  ]

  const filteredContributions = selectedType === 'All'
    ? contributions
    : contributions.filter(c => c.type === selectedType)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'speaking':
        return <FiMic className="text-purple-400" size={32} />
      case 'volunteering':
        return <FiHeart className="text-pink-400" size={32} />
      case 'contribution':
        return <FiGithub className="text-green-400" size={32} />
      default:
        return <FiGithub className="text-primary-400" size={32} />
    }
  }

  const getTypeBadge = (type: string) => {
    const badges = {
      speaking: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Speaking' },
      volunteering: { bg: 'bg-pink-500/20', text: 'text-pink-400', label: 'Volunteering' },
      contribution: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Contribution' }
    }
    return badges[type as keyof typeof badges] || badges.contribution
  }

  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return month ? `${monthNames[parseInt(month) - 1]} ${year}` : year
  }

  return (
    <section id="opensource" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Open Source & <span className="gradient-text">Community</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Speaking engagements, volunteer work, and contributions to open source projects
        </p>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {types.map((type, index) => (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedType(type.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedType === type.value
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50 scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Contributions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredContributions.map((contribution, index) => {
            const badge = getTypeBadge(contribution.type)
            return (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all"
              >
                {/* Images - Multiple or Single */}
                {contribution.images && contribution.images.length > 0 ? (
                  <div className={`grid ${contribution.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mb-4`}>
                    {contribution.images.map((img, idx) => (
                      <div key={idx} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`${contribution.title} - ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : contribution.image_url ? (
                  <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={contribution.image_url}
                      alt={contribution.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null}

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                    {getTypeIcon(contribution.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-100 group-hover:text-primary-400 transition-colors">
                        {contribution.title}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-primary-400 font-medium mb-2">{contribution.organization}</p>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{contribution.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={16} />
                    <span>{formatDate(contribution.date)}</span>
                  </div>
                  {contribution.location && (
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} />
                      <span>{contribution.location}</span>
                    </div>
                  )}
                </div>

                {contribution.technologies && contribution.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contribution.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-primary-500/10 text-primary-300 px-3 py-1 rounded-full border border-primary-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {contribution.url && (
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <FiExternalLink size={16} />
                    <span className="text-sm">Learn More</span>
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default OpenSource
