import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="section-container relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm <span className="gradient-text">Seyi Kuforiji</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              Software Engineer & Open Source Contributor
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Internationally recognized for contributions to Git, the world's most popular
              version control system. Specialized in building scalable data-intensive systems,
              full-stack development, and data engineering with precision and reproducibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="/resume/Seyi_Kuforiji_Resume.pdf" download className="btn-secondary">
              Download Resume
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-6 justify-center mb-16"
          >
            <a
              href="https://github.com/Seyi007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FiGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/seyi-kuforiji-3a591b130"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FiLinkedin size={28} />
            </a>
            <a
              href="mailto:seyi.kuforiji@example.com"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <FiMail size={28} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <FiArrowDown className="animate-bounce" size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
