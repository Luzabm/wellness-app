import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WellnessState {
  // Hidratação
  waterIntake: number
  waterGoal: number
  
  // Humor
  currentMood: number
  moodHistory: Array<{ date: string; mood: number }>
  
  // Pausas e exercícios
  lastBreakTime: number
  breakInterval: number // em minutos
  eyeRestReminders: boolean
  
  // Diário de gratidão
  gratitudeEntries: Array<{ date: string; text: string }>
  
  // Metas
  goals: Array<{ id: string; title: string; completed: boolean; date: string }>
  
  // Treinos
  workoutEntries: Array<{
    date: string // formato: "YYYY-MM-DD"
    exercises: string[]
    notes: string
  }>
  
  // Configurações
  notifications: boolean
  relaxingMusic: boolean
  
  // Actions
  addWater: (amount: number) => void
  setMood: (mood: number) => void
  addGratitudeEntry: (text: string) => void
  addGoal: (title: string) => void
  toggleGoal: (id: string) => void
  removeGoal: (id: string) => void
  updateBreakTime: () => void
  toggleNotifications: () => void
  toggleMusic: () => void
  addWorkoutEntry: (date: string, exercises: string[], notes: string) => void
  getWorkoutByDate: (date: string) => { exercises: string[]; notes: string } | undefined
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      waterIntake: 0,
      waterGoal: 2000,
      currentMood: 5,
      moodHistory: [],
      lastBreakTime: Date.now(),
      breakInterval: 60,
      eyeRestReminders: true,
      gratitudeEntries: [],
      goals: [],
      workoutEntries: [],
      notifications: true,
      relaxingMusic: false,

      // Actions
      addWater: (amount) =>
        set((state) => ({
          waterIntake: Math.min(state.waterIntake + amount, state.waterGoal)
        })),

      setMood: (mood) =>
        set((state) => ({
          currentMood: mood,
          moodHistory: [
            ...state.moodHistory.slice(-6),
            { date: new Date().toISOString().split('T')[0], mood }
          ]
        })),

      addGratitudeEntry: (text) =>
        set((state) => ({
          gratitudeEntries: [
            { date: new Date().toISOString().split('T')[0], text },
            ...state.gratitudeEntries.slice(0, 9)
          ]
        })),

      addGoal: (title) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              id: Date.now().toString(),
              title,
              completed: false,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        })),

      toggleGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
          )
        })),

      removeGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        })),

      updateBreakTime: () =>
        set(() => ({
          lastBreakTime: Date.now()
        })),

      toggleNotifications: () =>
        set((state) => ({
          notifications: !state.notifications
        })),

      toggleMusic: () =>
        set((state) => ({
          relaxingMusic: !state.relaxingMusic
        })),

      addWorkoutEntry: (date, exercises, notes) =>
        set((state) => {
          const existingEntryIndex = state.workoutEntries.findIndex(entry => entry.date === date)
          
          if (existingEntryIndex >= 0) {
            // Atualiza entrada existente
            const updatedEntries = [...state.workoutEntries]
            updatedEntries[existingEntryIndex] = { date, exercises, notes }
            return { workoutEntries: updatedEntries }
          }
          
          // Adiciona nova entrada
          return {
            workoutEntries: [...state.workoutEntries, { date, exercises, notes }]
          }
        }),

      getWorkoutByDate: (date) => {
        return get().workoutEntries.find(entry => entry.date === date)
      }
    }),
    {
      name: 'wellness-storage'
    }
  )
)
