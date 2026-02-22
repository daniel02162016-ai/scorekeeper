'use client'

import { motion } from 'framer-motion'
import { Player } from '@/app/page'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface VictoryOverlayProps {
  winner: Player
  onClose: () => void
  onNewGame: () => void
}

export default function VictoryOverlay({ winner, onClose, onNewGame }: VictoryOverlayProps) {
  useEffect(() => {
    // Additional confetti burst when overlay appears
    const timer = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ffed4e', '#fbbf24', '#f59e0b', '#d97706']
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleNewGame = () => {
    onNewGame()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          delay: 0.2 
        }}
        className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Victory!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xl text-gray-800 mb-4"
        >
          <span className="font-bold">{winner.name}</span> wins with{' '}
          <span className="font-bold text-2xl">{winner.score}</span> points!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="space-y-3"
        >
          <motion.button
            onClick={handleNewGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start New Game
          </motion.button>

          <motion.button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Viewing
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 text-sm text-gray-700"
        >
          Great game everyone! 🎉
        </motion.div>
      </motion.div>

      {/* Background confetti elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 ${
              i % 4 === 0 ? 'bg-yellow-400' :
              i % 4 === 1 ? 'bg-orange-400' :
              i % 4 === 2 ? 'bg-red-400' : 'bg-pink-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}