import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import OpenSource from './components/OpenSource'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import api from './services/api'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if backend is alive on initial load
  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Make a simple health check request
        await api.get('/api/projects')
        setIsInitialLoad(false)
      } catch (error) {
        console.error('Initial backend check failed:', error)
        // Still set to false to let individual components handle retries
        setIsInitialLoad(false)
      }
    }

    checkBackend()
  }, [])

  // Show full-page loading spinner during initial backend wake-up
  if (isInitialLoad) {
    return <LoadingSpinner fullPage message="Waking up the server" />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <OpenSource />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
