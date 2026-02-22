'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PlayerSetupProps {
  onStartGame: (playerNames: string[]) => void
}

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [playerNames, setPlayerNames] = useState<string[]>([''])
  const [error, setError] = useState('')

  const addPlayer = () => {
    if (playerNames.length < 6) {
      setPlayerNames([...playerNames, ''])
    }
  }

  const removePlayer = (index: number) => {
    if (playerNames.length > 1) {
      setPlayerNames(playerNames.filter((_, i) => i !== index))
    }
  }

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...playerNames]
    updated[index] = name
    setPlayerNames(updated)
    setError('')
  }

  const handleStartGame = () => {
    const validNames = playerNames.filter(name => name.trim() !== '')
    
    if (validNames.length < 2) {
      setError('At least 2 players are required')
      return
    }

    const uniqueNames = new Set(validNames.map(name => name.trim().toLowerCase()))
    if (uniqueNames.size !== validNames.length) {
      setError('Player names must be unique')
      return
    }

    onStartGame(validNames.map(name => name.trim()))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
        Add Players
      </h2>

      <div className="space-y-4 mb-6">
        {playerNames.map((name, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => updatePlayerName(index, e.target.value)}
              placeholder={`Player ${index + 1} name`}
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none transition-colors"
              maxLength={20}
            />
            
            {playerNames.length > 1 && (
              <motion.button
                onClick={() => removePlayer(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {playerNames.length < 6 && (
          <motion.button
            onClick={addPlayer}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Player
          </motion.button>
        )}

        <motion.button
          onClick={handleStartGame}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex-1 sm:flex-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center mt-4"
        >
          {error}
        </motion.p>
      )}

      <div className="mt-6 text-sm text-gray-400 text-center">
        <p>• 2-6 players</p>
        <p>• First to 75 points wins</p>
        <p>• Highest score wins if multiple players reach 75+</p>
      </div>
    </motion.div>
  )
}