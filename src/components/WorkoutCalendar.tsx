import { motion } from 'framer-motion'
import { Calendar, Dumbbell, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { useWellnessStore } from '../store/wellnessStore'

const WorkoutCalendar: React.FC = () => {
  const { workoutEntries, addWorkoutEntry, getWorkoutByDate } = useWellnessStore()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [exercises, setExercises] = useState<string[]>([''])
  const [notes, setNotes] = useState('')

  // Gera dias do mês atual
  const generateCalendarDays = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const days = []
    const daysInMonth = lastDay.getDate()
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const workout = getWorkoutByDate(dateStr)
      
      days.push({
        date: dateStr,
        day: i,
        hasWorkout: !!workout,
        workoutDetails: workout
      })
    }
    
    return days
  }

  const handleDateSelect = (date: string) => {
    const workout = getWorkoutByDate(date)
    setSelectedDate(date)
    setExercises(workout?.exercises || [''])
    setNotes(workout?.notes || '')
    setShowModal(true)
  }

  const handleSaveWorkout = () => {
    if (selectedDate) {
      addWorkoutEntry(
        selectedDate,
        exercises.filter(ex => ex.trim() !== ''),
        notes
      )
      setShowModal(false)
    }
  }

  const addExerciseField = () => {
    setExercises([...exercises, ''])
  }

  const removeExerciseField = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index))
    }
  }

  const updateExercise = (index: number, value: string) => {
    const newExercises = [...exercises]
    newExercises[index] = value
    setExercises(newExercises)
  }

  const calendarDays = generateCalendarDays()

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl shadow-sm border border-purple-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-900">Calendário de Treinos</h3>
            <p className="text-sm text-purple-600">
              Registre seus exercícios diários
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-purple-700 py-1">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day) => (
            <motion.button
              key={day.date}
              onClick={() => handleDateSelect(day.date)}
              className={`p-2 rounded-lg text-center transition-all ${
                day.hasWorkout
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-100'
              } ${
                day.date === selectedDate ? 'ring-2 ring-purple-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {day.day}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-purple-600">
            {workoutEntries.length} dias de treino este mês
          </p>
        </div>
      </motion.div>

      {/* Modal de registro de treino */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Treino do dia {selectedDate.split('-').reverse().join('/')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercícios *
                </label>
                {exercises.map((exercise, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={exercise}
                      onChange={(e) => updateExercise(index, e.target.value)}
                      placeholder={`Exercício ${index + 1}`}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExerciseField(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExerciseField}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar exercício</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Como foi o treino? Como se sentiu?"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveWorkout}
                disabled={exercises.every(ex => ex.trim() === '')}
                className="flex-1 py-2 px-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-lg transition-colors"
              >
                Salvar Treino
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default WorkoutCalendar
