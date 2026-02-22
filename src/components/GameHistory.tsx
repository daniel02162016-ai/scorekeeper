'use client'

import { motion } from 'framer-motion'
import { Player, GameRound } from '@/app/page'

interface GameHistoryProps {
  rounds: GameRound[]
  players: Player[]
  onClose: () => void
}

export default function GameHistory({ rounds, players, onClose }: GameHistoryProps) {
  if (rounds.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-gray-800 rounded-xl p-6 mb-6 overflow-hidden"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-400">Game History</h3>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
        <p className="text-gray-400 text-center py-8">No rounds played yet</p>
      </motion.div>
    )
  }

  const getPlayerName = (playerId: string) => {
    const player = players.find(p => p.id === playerId)
    return player?.name || 'Unknown Player'
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gray-800 rounded-xl p-6 mb-6 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-400">Game History</h3>
        <motion.button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-4">
        {rounds.map((round, roundIndex) => (
          <motion.div
            key={round.roundNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: roundIndex * 0.1 }}
            className="bg-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-400">
                Round {round.roundNumber}
              </h4>
              <span className="text-xs text-gray-400">
                {round.scores.filter(s => s.change !== 0).length} player(s) scored
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {round.scores
                .filter(score => score.change !== 0)
                .map((score, scoreIndex) => (
                <motion.div
                  key={score.playerId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: scoreIndex * 0.05 }}
                  className="flex justify-between items-center bg-gray-600 px-3 py-2 rounded"
                >
                  <span className="text-sm">
                    {getPlayerName(score.playerId)}
                  </span>
                  <span 
                    className={`font-bold ${
                      score.change > 0 
                        ? 'text-green-400' 
                        : score.change < 0 
                        ? 'text-red-400' 
                        : 'text-gray-400'
                    }`}
                  >
                    {score.change > 0 ? '+' : ''}{score.change}
                  </span>
                </motion.div>
              ))}
            </div>

            {round.scores.every(s => s.change === 0) && (
              <p className="text-gray-400 text-sm text-center py-2">
                No score changes this round
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Total Rounds: {rounds.length}</span>
          <span>
            Total Score Changes: {rounds.reduce((sum, round) => 
              sum + round.scores.filter(s => s.change !== 0).length, 0
            )}
          </span>
        </div>
      </div>
    </motion.div>
  )
}