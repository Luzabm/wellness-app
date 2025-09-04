
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Eye, Pause, RotateCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const BreakReminder: React.FC = () => {
  const { lastBreakTime, breakInterval, updateBreakTime } = useWellnessStore()
  const [timeUntilBreak, setTimeUntilBreak] = useState(0)
  const [showBreakModal, setShowBreakModal] = useState(false)
  const [breakType, setBreakType] = useState<'stretch' | 'eyes' | 'breathing'>('stretch')
  const [breakTimer, setBreakTimer] = useState(0)
  const [isBreakActive, setIsBreakActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const timeSinceLastBreak = now - lastBreakTime
      const breakIntervalMs = breakInterval * 60 * 1000
      const remaining = breakIntervalMs - timeSinceLastBreak

      if (remaining <= 0) {
        setTimeUntilBreak(0)
        if (!showBreakModal) {
          setShowBreakModal(true)
        }
      } else {
        setTimeUntilBreak(remaining)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastBreakTime, breakInterval, showBreakModal])

  useEffect(() => {
    let timer: number
    if (isBreakActive && breakTimer > 0) {
      timer = setTimeout(() => {
        setBreakTimer(breakTimer - 1)
      }, 1000)
    } else if (isBreakActive && breakTimer === 0) {
      setIsBreakActive(false)
      setShowBreakModal(false)
      updateBreakTime()
    }
    return () => clearTimeout(timer)
  }, [isBreakActive, breakTimer])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const startBreak = (type: 'stretch' | 'eyes' | 'breathing') => {
    setBreakType(type)
    setBreakTimer(type === 'eyes' ? 20 : type === 'breathing' ? 180 : 300) // 20s, 3min, 5min
    setIsBreakActive(true)
  }

  const breakExercises = {
    stretch: [
      "Alongue os braços acima da cabeça",
      "Gire os ombros para trás 5 vezes",
      "Incline a cabeça para cada lado",
      "Estique as pernas sob a mesa",
      "Faça rotação do pescoço suavemente"
    ],
    eyes: [
      "Olhe para um ponto distante por 20 segundos",
      "Pisque deliberadamente 20 vezes",
      "Feche os olhos e relaxe"
    ],
    breathing: [
      "Inspire profundamente por 4 segundos",
      "Segure a respiração por 4 segundos", 
      "Expire lentamente por 6 segundos",
      "Repita o ciclo com calma"
    ]
  }

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-sm border border-indigo-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900">Pausas Inteligentes</h3>
            <p className="text-sm text-indigo-600">
              {timeUntilBreak > 0 
                ? `Próxima pausa em ${formatTime(timeUntilBreak)}`
                : 'Hora de fazer uma pausa!'
              }
            </p>
          </div>
        </div>

        {/* Indicador de progresso */}
        <div className="bg-indigo-100 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.max(0, 100 - (timeUntilBreak / (breakInterval * 60 * 1000)) * 100)}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Botões de pausa rápida */}
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            onClick={() => setShowBreakModal(true)}
            className="flex flex-col items-center space-y-1 bg-white hover:bg-indigo-50 text-indigo-700 py-3 px-2 rounded-xl border border-indigo-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-xs font-medium">Alongar</span>
          </motion.button>

          <motion.button
            onClick={() => startBreak('eyes')}
            className="flex flex-col items-center space-y-1 bg-white hover:bg-indigo-50 text-indigo-700 py-3 px-2 rounded-xl border border-indigo-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
            <span className="text-xs font-medium">Olhos</span>
          </motion.button>

          <motion.button
            onClick={() => startBreak('breathing')}
            className="flex flex-col items-center space-y-1 bg-white hover:bg-indigo-50 text-indigo-700 py-3 px-2 rounded-xl border border-indigo-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pause className="w-5 h-5" />
            <span className="text-xs font-medium">Respirar</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal de pausa */}
      <AnimatePresence>
        {showBreakModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {!isBreakActive ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Hora da Pausa! 🌟
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Escolha uma atividade para recarregar suas energias
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => startBreak('stretch')}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      🤸‍♀️ Alongamento (5 min)
                    </button>
                    <button
                      onClick={() => startBreak('eyes')}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      👁️ Descanso dos Olhos (20s)
                    </button>
                    <button
                      onClick={() => startBreak('breathing')}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      🫁 Respiração Guiada (3 min)
                    </button>
                  </div>

                  <button
                    onClick={() => setShowBreakModal(false)}
                    className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Pular desta vez
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      className="text-white text-2xl font-bold"
                      key={breakTimer}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {Math.floor(breakTimer / 60)}:{(breakTimer % 60).toString().padStart(2, '0')}
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {breakType === 'stretch' ? '🤸‍♀️ Alongamento' : 
                     breakType === 'eyes' ? '👁️ Descanso dos Olhos' : 
                     '🫁 Respiração Guiada'}
                  </h3>

                  <div className="space-y-2 mb-6">
                    {breakExercises[breakType].map((exercise, index) => (
                      <motion.div
                        key={index}
                        className="text-gray-700 bg-gray-50 py-2 px-4 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {exercise}
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setIsBreakActive(false)
                      setShowBreakModal(false)
                      updateBreakTime()
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl transition-colors"
                  >
                    Finalizar Pausa
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BreakReminder
