
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, Sparkles, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const MotivationalMessage: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  const messages = [
    {
      text: "Cada pequeno passo te leva mais perto dos seus objetivos! 🌟",
      author: "Motivação Diária",
      color: "from-yellow-400 to-orange-500"
    },
    {
      text: "Sua saúde mental é tão importante quanto sua saúde física. Cuide-se! 💚",
      author: "Bem-estar",
      color: "from-green-400 to-emerald-500"
    },
    {
      text: "Respire fundo. Você tem tudo o que precisa para superar hoje! 🌸",
      author: "Mindfulness",
      color: "from-pink-400 to-rose-500"
    },
    {
      text: "O descanso não é preguiça, é um investimento na sua produtividade! ⚡",
      author: "Produtividade",
      color: "from-blue-400 to-cyan-500"
    },
    {
      text: "Celebre suas pequenas vitórias. Elas constroem grandes conquistas! 🎉",
      author: "Sucesso",
      color: "from-purple-400 to-violet-500"
    },
    {
      text: "Você é mais forte do que imagina e mais capaz do que acredita! 💪",
      author: "Força Interior",
      color: "from-red-400 to-pink-500"
    },
    {
      text: "Hoje é uma nova oportunidade para ser a melhor versão de si mesmo! ✨",
      author: "Crescimento",
      color: "from-indigo-400 to-purple-500"
    },
    {
      text: "Gratidão transforma o que temos em suficiente e o suficiente em abundância! 🙏",
      author: "Gratidão",
      color: "from-amber-400 to-yellow-500"
    }
  ]

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 8000) // Troca a cada 8 segundos

    return () => clearInterval(interval)
  }, [isAutoRotating, messages.length])

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length)
    setIsAutoRotating(false)
    // Reativar auto-rotação após 30 segundos
    setTimeout(() => setIsAutoRotating(true), 30000)
  }

  const currentMsg = messages[currentMessage]

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-full h-full text-gray-400" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div
              className={`w-10 h-10 bg-gradient-to-r ${currentMsg.color} rounded-full flex items-center justify-center`}
              key={currentMessage}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Star className="w-5 h-5 text-white" fill="currentColor" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">Mensagem do Momento</h3>
              <p className="text-sm text-gray-600">
                Inspiração para seu dia
              </p>
            </div>
          </div>

          <motion.button
            onClick={nextMessage}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Mensagem principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Aspas decorativas */}
              <div className={`absolute -top-2 -left-2 text-4xl font-bold bg-gradient-to-r ${currentMsg.color} bg-clip-text text-transparent opacity-50`}>
                "
              </div>
              
              <blockquote className="text-gray-800 font-medium leading-relaxed text-lg pl-6 pr-6">
                {currentMsg.text}
              </blockquote>
              
              <div className={`absolute -bottom-2 -right-2 text-4xl font-bold bg-gradient-to-r ${currentMsg.color} bg-clip-text text-transparent opacity-50 rotate-180`}>
                "
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <cite className="text-sm text-gray-600 font-medium not-italic">
                — {currentMsg.author}
              </cite>
              
              <div className="flex space-x-1">
                {messages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentMessage(index)
                      setIsAutoRotating(false)
                      setTimeout(() => setIsAutoRotating(true), 30000)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMessage
                        ? 'bg-gray-600 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Indicador de auto-rotação */}
        <motion.div
          className="mt-4 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={`w-2 h-2 rounded-full ${isAutoRotating ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`} />
          <span className="text-xs text-gray-500">
            {isAutoRotating ? 'Rotação automática ativa' : 'Rotação pausada'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MotivationalMessage
