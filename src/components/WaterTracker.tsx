
import { motion } from 'framer-motion'
import { Droplets, Plus } from 'lucide-react'
import React from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const WaterTracker: React.FC = () => {
  const { waterIntake, waterGoal, addWater } = useWellnessStore()
  const percentage = Math.min((waterIntake / waterGoal) * 100, 100)

  const waterAmounts = [250, 500, 750] // ml

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-sm border border-blue-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Hidratação</h3>
            <p className="text-sm text-blue-600">Meta diária: {waterGoal}ml</p>
          </div>
        </div>
      </div>

      {/* Indicador de progresso com onda */}
      <div className="relative h-32 bg-blue-100 rounded-2xl overflow-hidden mb-4">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300"
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Efeito de onda */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-4 bg-blue-500 opacity-30"
          animate={{
            x: [-20, 20, -20],
            scaleY: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            clipPath: "polygon(0% 50%, 25% 100%, 50% 50%, 75% 100%, 100% 50%, 100% 100%, 0% 100%)"
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-blue-900"
              key={waterIntake}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {waterIntake}ml
            </motion.div>
            <div className="text-sm text-blue-700">
              {Math.round(percentage)}% da meta
            </div>
          </div>
        </div>
      </div>

      {/* Botões de adição rápida */}
      <div className="grid grid-cols-3 gap-2">
        {waterAmounts.map((amount) => (
          <motion.button
            key={amount}
            onClick={() => addWater(amount)}
            className="flex items-center justify-center space-x-1 bg-white hover:bg-blue-50 text-blue-700 py-3 px-4 rounded-xl border border-blue-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">{amount}ml</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default WaterTracker
