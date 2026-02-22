'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Player, RoundScore } from '@/app/page'

interface GameBoardProps {
  players: Player[]
  onSubmitRound: (scores: RoundScore[]) => void
  disabled: boolean
}

export default function GameBoard({ players, onSubmitRound, disabled }: GameBoardProps) {
  const [roundScores, setRoundScores] = useState<{ [playerId: string]: string }>({})

  const updateScore = (playerId: string, value: string) => {
    // Allow negative numbers and empty string
    if (value === '' || value === '-' || (!isNaN(Number(value)) && Number(value) >= -999 && Number(value) <= 999)) {
      setRoundScores({ ...roundScores, [playerId]: value })
    }
  }

  const handleSubmitRound = () => {
    const scores: RoundScore[] = players.map(player => {
      const scoreStr = roundScores[player.id] || '0'
      const change = scoreStr === '' || scoreStr === '-' ? 0 : Number(scoreStr)
      return {
        playerId: player.id,
        change: isNaN(change) ? 0 : change
      }
    })

    // Check if at least one player has a non-zero score
    const hasChanges = scores.some(score => score.change !== 0)
    if (!hasChanges) {
      return // Don't submit if no changes
    }

    onSubmitRound(scores)
    setRoundScores({}) // Clear scores for next round
  }

  const hasValidScores = Object.values(roundScores).some(score => {
    const num = Number(score)
    return !isNaN(num) && num !== 0
  })

  return (
    <div className="space-y-6">
      {/* Current Scores Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-center mb-4 text-blue-400">
          Current Scores
        </h3>
        <div className="space-y-2">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex justify-between items-center p-3 rounded-lg ${
                index === 0 
                  ? 'bg-yellow-600/20 border border-yellow-600/30' 
                  : 'bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400">
                  #{index + 1}
                </span>
                <span className="text-lg font-semibold">
                  {player.name}
                </span>
              </div>
              <motion.div
                className={`text-3xl font-bold ${
                  player.score >= 75 
                    ? 'text-green-400' 
                    : player.score >= 50 
                    ? 'text-yellow-400' 
                    : player.score < 0 
                    ? 'text-red-400' 
                    : 'text-white'
                }`}
                key={player.score}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {player.score}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Round Scoring */}
      {!disabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-center mb-4 text-green-400">
            Round Scoring
          </h3>
          <div className="space-y-4">
            {players.map(player => (
              <motion.div
                key={player.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-lg font-semibold flex-1">
                  {player.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">+/-</span>
                  <input
                    type="text"
                    value={roundScores[player.id] || ''}
                    onChange={(e) => updateScore(player.id, e.target.value)}
                    placeholder="0"
                    className="w-20 bg-gray-600 text-white text-center px-2 py-1 rounded border border-gray-500 focus:border-blue-400 focus:outline-none"
                    inputMode="numeric"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleSubmitRound}
            disabled={!hasValidScores}
            className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold transition-colors ${
              hasValidScores
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={hasValidScores ? { scale: 1.02 } : {}}
            whileTap={hasValidScores ? { scale: 0.98 } : {}}
          >
            Submit Round
          </motion.button>

          <p className="text-xs text-gray-400 text-center mt-2">
            Enter positive or negative numbers for each player's round score
          </p>
        </motion.div>
      )}
    </div>
  )
}