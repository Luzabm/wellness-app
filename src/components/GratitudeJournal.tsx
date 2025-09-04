
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Heart, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const GratitudeJournal: React.FC = () => {
  const { gratitudeEntries, addGratitudeEntry } = useWellnessStore()
  const [newEntry, setNewEntry] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.trim()) {
      addGratitudeEntry(newEntry.trim())
      setNewEntry('')
      setShowForm(false)
    }
  }

  const gratitudePrompts = [
    "Pelo que você é grato hoje?",
    "Que momento especial aconteceu hoje?", 
    "Quem fez diferença na sua vida hoje?",
    "Que conquista pequena você celebra hoje?",
    "Que beleza você notou ao seu redor?"
  ]

  const randomPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]

  return (
    <motion.div
      className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-sm border border-rose-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div>
            <h3 className="font-semibold text-rose-900">Diário de Gratidão</h3>
            <p className="text-sm text-rose-600">
              {gratitudeEntries.length} registros este mês
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

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
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-rose-200">
              <p className="text-sm text-rose-700 mb-3 font-medium">
                💭 {randomPrompt}
              </p>
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Escreva algo pelo qual você é grato..."
                className="w-full p-3 border border-rose-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-700"
                rows={3}
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-rose-500">
                  {newEntry.length}/200 caracteres
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!newEntry.trim()}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-lg transition-colors text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Entradas recentes */}
      {gratitudeEntries.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          <div className="flex items-center space-x-2 text-rose-700 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Suas reflexões recentes:</span>
          </div>
          {gratitudeEntries.slice(0, 5).map((entry, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-rose-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                "{entry.text}"
              </p>
              <div className="text-xs text-rose-500 font-medium">
                {new Date(entry.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <motion.div
            className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4"
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
            <Heart className="w-8 h-8 text-rose-400" />
          </motion.div>
          <p className="text-rose-600 text-sm">
            Comece seu diário de gratidão hoje! ✨
          </p>
          <p className="text-rose-500 text-xs mt-1">
            Pequenos momentos de gratidão fazem grandes diferenças
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default GratitudeJournal
