import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiDatabase, FiLayout } from 'react-icons/fi'

const About = () => {
  const ref = useRef(null)
  const isInView = true // Disabled scroll animation for debugging

  const features = [
    {
      icon: <FiCode size={32} />,
      title: 'Open Source Development',
      description: 'Core contributor to Git with thousands of lines of C code modernizing internal testing frameworks.',
    },
    {
      icon: <FiDatabase size={32} />,
      title: 'Data Engineering',
      description: 'Building and automating ETL pipelines with Python, Spark, and SQL Server for large-scale data.',
    },
    {
      icon: <FiLayout size={32} />,
      title: 'Full-Stack Development',
      description: 'Developing scalable web applications using Python, Django, Flask, and modern JavaScript frameworks.',
    },
  ]

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a <span className="text-primary-400 font-semibold">software engineer</span> and{' '}
                <span className="text-primary-400 font-semibold">open-source advocate</span> with a global presence, 
                internationally recognized for my contributions to{' '}
                <span className="font-semibold text-white">Git</span>—the world's most widely-used version control 
                system powering development for over 100 million developers worldwide.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                During my time at the <span className="text-primary-400 font-semibold">Software Freedom Conservancy</span>, 
                I completely modernized Git's internal unit testing framework, writing thousands of lines of meticulously 
                crafted C code that reduced test execution time by 30% and improved reliability by 25%. My work has been 
                merged into the Git codebase and is now used by developers everywhere.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Beyond open source, I bring <span className="text-primary-400 font-semibold">4+ years of professional 
                experience</span> in data engineering and full-stack development. I've built scalable ETL pipelines 
                processing millions of records, designed AI-driven marketing systems, and optimized cloud 
                infrastructure—cutting AWS costs by 30%. I hold certifications from{' '}
                <span className="font-semibold">Stanford University</span> in AI for precision medicine and 
                cloud computing, combining cutting-edge research with practical engineering expertise.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary-500/20 shadow-2xl">
              <img 
                src="/images/seyi-kuforiji.jpg" 
                alt="Seyi Kuforiji" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="card text-center"
            >
              <div className="text-primary-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About
