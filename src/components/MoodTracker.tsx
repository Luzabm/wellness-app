
import { motion } from 'framer-motion'
import { Smile } from 'lucide-react'
import React from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const MoodTracker: React.FC = () => {
  const { currentMood, setMood, moodHistory } = useWellnessStore()

  const moods = [
    { value: 1, emoji: '😢', label: 'Muito triste', color: 'text-red-500' },
    { value: 2, emoji: '😞', label: 'Triste', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutro', color: 'text-yellow-500' },
    { value: 4, emoji: '😊', label: 'Bem', color: 'text-lime-500' },
    { value: 5, emoji: '😄', label: 'Muito bem', color: 'text-green-500' }
  ]

  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length
    : currentMood

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-sm border border-purple-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
          <Smile className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-purple-900">Como você está?</h3>
          <p className="text-sm text-purple-600">
            Média da semana: {averageMood.toFixed(1)}/5
          </p>
        </div>
      </div>

      {/* Seletor de humor */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            onClick={() => setMood(mood.value)}
            className={`p-3 rounded-xl border-2 transition-all ${
              currentMood === mood.value
                ? 'border-purple-400 bg-purple-100 shadow-md'
                : 'border-purple-200 bg-white hover:border-purple-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-center"
              animate={currentMood === mood.value ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className={`text-xs font-medium ${mood.color}`}>
                {mood.label}
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Histórico visual simplificado */}
      {moodHistory.length > 0 && (
        <div className="bg-white/70 rounded-xl p-3">
          <div className="text-sm text-purple-700 font-medium mb-2">
            Últimos registros:
          </div>
          <div className="flex space-x-1">
            {moodHistory.slice(-7).map((entry, index) => (
              <motion.div
                key={index}
                className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                  style={{ width: `${(entry.mood / 5) * 100}%` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default MoodTracker
