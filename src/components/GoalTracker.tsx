
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus, Target, Trophy } from 'lucide-react'
import React, { useState } from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const GoalTracker: React.FC = () => {
  const { goals, addGoal, toggleGoal } = useWellnessStore()
  const [newGoal, setNewGoal] = useState('')
  const [showForm, setShowForm] = useState(false)

  const completedGoals = goals.filter(goal => goal.completed).length
  const completionRate = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoal.trim()) {
      addGoal(newGoal.trim())
      setNewGoal('')
      setShowForm(false)
    }
  }

  const motivationalMessages = [
    "Você está no caminho certo! 🌟",
    "Cada pequeno passo conta! 👣",
    "Sua dedicação é inspiradora! 💪",
    "Continue assim, você consegue! 🚀",
    "Progresso é progresso! 📈"
  ]

  return (
    <motion.div
      className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-amber-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900">Metas Pessoais</h3>
            <p className="text-sm text-amber-600">
              {completedGoals} de {goals.length} concluídas
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Progresso geral */}
      {goals.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-amber-700">
              Progresso Geral
            </span>
            <span className="text-sm text-amber-600">
              {Math.round(completionRate)}%
            </span>
          </div>
          <div className="bg-amber-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          {completionRate >= 50 && (
            <motion.div
              className="flex items-center space-x-1 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-700 font-medium">
                {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
              </span>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Ex: Beber 8 copos de água hoje..."
                className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-700"
                maxLength={100}
                autoFocus
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-amber-500">
                  {newGoal.length}/100 caracteres
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!newGoal.trim()}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg transition-colors text-sm"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Lista de metas */}
      {goals.length > 0 ? (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {goals.slice(-5).reverse().map((goal, index) => (
            <motion.div
              key={goal.id}
              className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                goal.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white/70 border-amber-200 hover:border-amber-300'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => toggleGoal(goal.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  goal.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-amber-300 hover:border-amber-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence>
                  {goal.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex-1">
                <p className={`text-sm ${
                  goal.completed 
                    ? 'text-green-700 line-through' 
                    : 'text-gray-700'
                }`}>
                  {goal.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(goal.date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              {goal.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-green-500"
                >
                  🎉
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <motion.div
            className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
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
            <Target className="w-8 h-8 text-amber-400" />
          </motion.div>
          <p className="text-amber-600 text-sm">
            Defina suas primeiras metas! 🎯
          </p>
          <p className="text-amber-500 text-xs mt-1">
            Pequenos objetivos levam a grandes conquistas
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default GoalTracker
