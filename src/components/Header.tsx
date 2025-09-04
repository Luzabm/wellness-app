
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import React from 'react'

const Header: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <motion.header 
      className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl mb-6 shadow-sm border border-emerald-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </motion.div>
          
          <div>
            <h1 className="text-2xl font-bold text-emerald-800">
              {getGreeting()}! 👋
            </h1>
            <p className="text-emerald-600 text-sm">
              Como você está se sentindo hoje?
            </p>
          </div>
        </div>

        <motion.div
          className="hidden sm:flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-700 font-medium">
            Modo Bem-estar Ativo
          </span>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
