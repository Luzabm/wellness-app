
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, Waves, Wind, Zap } from 'lucide-react'
import React, { useRef, useState } from 'react'

const RelaxationPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement>(null)

  const tracks = [
    {
      id: 1,
      name: "Chuva Suave",
      icon: <Waves className="w-5 h-5" />,
      duration: "15:00",
      color: "from-blue-400 to-blue-600",
      description: "Sons relaxantes de chuva"
    },
    {
      id: 2,
      name: "Floresta Zen",
      icon: <Wind className="w-5 h-5" />,
      duration: "20:00", 
      color: "from-green-400 to-green-600",
      description: "Natureza e pássaros"
    },
    {
      id: 3,
      name: "Ondas do Mar",
      icon: <Waves className="w-5 h-5" />,
      duration: "25:00",
      color: "from-cyan-400 to-cyan-600", 
      description: "Ondas suaves na praia"
    },
    {
      id: 4,
      name: "Música Ambiente",
      icon: <Music className="w-5 h-5" />,
      duration: "18:00",
      color: "from-purple-400 to-purple-600",
      description: "Melodias relaxantes"
    }
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // Simular controle de áudio
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const selectTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-violet-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
          <Music className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-violet-900">Sons Relaxantes</h3>
          <p className="text-sm text-violet-600">
            Música e sons para relaxar
          </p>
        </div>
      </div>

      {/* Player principal */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-violet-200">
        <div className="flex items-center space-x-4 mb-4">
          <motion.div
            className={`w-16 h-16 bg-gradient-to-br ${tracks[currentTrack].color} rounded-2xl flex items-center justify-center text-white relative overflow-hidden`}
            animate={isPlaying ? { 
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ 
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {tracks[currentTrack].icon}
            
            {/* Efeito de ondas sonoras */}
            <AnimatePresence>
              {isPlaying && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ 
                        scale: [1, 1.5, 2],
                        opacity: [0.7, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {tracks[currentTrack].name}
            </h4>
            <p className="text-sm text-gray-600">
              {tracks[currentTrack].description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Duração: {tracks[currentTrack].duration}
            </p>
          </div>

          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 bg-violet-500 hover:bg-violet-600 text-white rounded-full flex items-center justify-center transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* Controle de volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-violet-600" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(139 92 246) 0%, rgb(139 92 246) ${volume}%, rgb(196 181 253) ${volume}%, rgb(196 181 253) 100%)`
              }}
            />
          </div>
          <span className="text-sm text-violet-600 w-8">
            {volume}%
          </span>
        </div>
      </div>

      {/* Lista de faixas */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-violet-700 mb-3">
          Escolha seu ambiente sonoro:
        </h4>
        {tracks.map((track, index) => (
          <motion.button
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all ${
              currentTrack === index
                ? 'bg-violet-100 border-violet-300 shadow-sm'
                : 'bg-white/50 border-violet-200 hover:border-violet-300 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${track.color} rounded-xl flex items-center justify-center text-white`}>
              {track.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 text-sm">
                {track.name}
              </p>
              <p className="text-xs text-gray-600">
                {track.description} • {track.duration}
              </p>
            </div>
            {currentTrack === index && isPlaying && (
              <motion.div
                className="flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-violet-500 rounded-full"
                    animate={{
                      scaleY: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Mensagem motivacional */}
      <motion.div
        className="mt-4 bg-gradient-to-r from-violet-100 to-purple-100 p-4 rounded-xl border border-violet-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-violet-600" />
          <p className="text-sm text-violet-700 font-medium">
            💡 Dica: Use fones de ouvido para uma experiência mais imersiva
          </p>
        </div>
      </motion.div>

      {/* Elemento de áudio (simulado) */}
      <audio ref={audioRef} loop>
        <source src="#" type="audio/mpeg" />
      </audio>
    </motion.div>
  )
}

export default RelaxationPlayer
