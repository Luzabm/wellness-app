
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
  
  // Configurações
  notifications: boolean
  relaxingMusic: boolean
  
  // Actions
  addWater: (amount: number) => void
  setMood: (mood: number) => void
  addGratitudeEntry: (text: string) => void
  addGoal: (title: string) => void
  toggleGoal: (id: string) => void
  updateBreakTime: () => void
  toggleNotifications: () => void
  toggleMusic: () => void
}

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      waterIntake: 0,
      waterGoal: 2000, // 2L em ml
      currentMood: 5,
      moodHistory: [],
      lastBreakTime: Date.now(),
      breakInterval: 60, // 1 hora
      eyeRestReminders: true,
      gratitudeEntries: [],
      goals: [],
      notifications: true,
      relaxingMusic: false,

      addWater: (amount) =>
        set((state) => ({
          waterIntake: Math.min(state.waterIntake + amount, state.waterGoal)
        })),

      setMood: (mood) =>
        set((state) => ({
          currentMood: mood,
          moodHistory: [
            ...state.moodHistory.slice(-6), // Manter apenas os últimos 7 dias
            { date: new Date().toISOString().split('T')[0], mood }
          ]
        })),

      addGratitudeEntry: (text) =>
        set((state) => ({
          gratitudeEntries: [
            { date: new Date().toISOString().split('T')[0], text },
            ...state.gratitudeEntries.slice(0, 9) // Manter apenas as últimas 10
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

      removeGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        }))
    }),
    {
      name: 'wellness-storage'
    }
  )
)
