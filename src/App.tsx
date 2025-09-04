
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import BreakReminder from './components/BreakReminder'
import GoalTracker from './components/GoalTracker'
import GratitudeJournal from './components/GratitudeJournal'
import Header from './components/Header'
import MoodTracker from './components/MoodTracker'
import MotivationalMessage from './components/MotivationalMessage'
import RelaxationPlayer from './components/RelaxationPlayer'
import WaterTracker from './components/WaterTracker'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '16px',
            color: '#065f46',
          },
        }}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Primeira coluna */}
          <div className="space-y-6">
            <WaterTracker />
            <BreakReminder />
            <RelaxationPlayer />
          </div>

          {/* Segunda coluna */}
          <div className="space-y-6">
            <MoodTracker />
            <GratitudeJournal />
            <MotivationalMessage />
          </div>

          {/* Terceira coluna */}
          <div className="space-y-6 lg:col-span-2 xl:col-span-1">
            <GoalTracker />
            
            {/* Card de estatísticas rápidas */}
            <motion.div
              className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl shadow-sm border border-slate-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="font-semibold text-slate-900 mb-4">
                📊 Resumo do Dia
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                  <span className="text-sm text-slate-600">💧 Hidratação</span>
                  <span className="text-sm font-medium text-slate-900">Em progresso</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                  <span className="text-sm text-slate-600">😊 Humor</span>
                  <span className="text-sm font-medium text-slate-900">Registrado</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                  <span className="text-sm text-slate-600">⏰ Pausas</span>
                  <span className="text-sm font-medium text-slate-900">Ativas</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                  <span className="text-sm text-slate-600">🎯 Metas</span>
                  <span className="text-sm font-medium text-slate-900">Acompanhando</span>
                </div>
              </div>

              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl border border-emerald-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✨</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Continue assim!
                    </p>
                    <p className="text-xs text-emerald-600">
                      Você está cuidando bem da sua saúde mental
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer inspiracional */}
        <motion.footer
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
            <p className="text-emerald-700 font-medium mb-2">
              💚 Bem-estar no Trabalho
            </p>
            <p className="text-sm text-emerald-600">
              Cuidar de si mesmo não é luxo, é necessidade. 
              Pequenos hábitos diários criam grandes transformações.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default App
