import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  message?: string
  fullPage?: boolean
}

const LoadingSpinner = ({ message = 'Loading...', fullPage = false }: LoadingSpinnerProps) => {
  const containerClass = fullPage 
    ? 'min-h-screen flex items-center justify-center bg-gray-950' 
    : 'section-container flex items-center justify-center'

  return (
    <div className={containerClass}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 border-4 border-primary-500/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-transparent border-t-primary-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Loading message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-2">{message}</h3>
          <motion.div
            className="flex gap-1 justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          >
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">•</span>
          </motion.div>
          
          {/* Wake-up hint for cold starts */}
          <motion.p
            className="text-sm text-gray-500 mt-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            First visit may take up to 60 seconds while the server wakes up
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
