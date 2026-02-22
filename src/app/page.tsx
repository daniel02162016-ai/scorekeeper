'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PlayerSetup from '@/components/PlayerSetup'
import GameBoard from '@/components/GameBoard'
import GameHistory from '@/components/GameHistory'
import VictoryOverlay from '@/components/VictoryOverlay'

export interface Player {
  id: string
  name: string
  score: number
}

export interface RoundScore {
  playerId: string
  change: number
}

export interface GameRound {
  roundNumber: number
  scores: RoundScore[]
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [rounds, setRounds] = useState<GameRound[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [winner, setWinner] = useState<Player | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  // Load game state from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('dutch-blitz-game')
    if (savedData) {
      const gameState = JSON.parse(savedData)
      setPlayers(gameState.players || [])
      setGameStarted(gameState.gameStarted || false)
      setRounds(gameState.rounds || [])
      setCurrentRound(gameState.currentRound || 1)
      setWinner(gameState.winner || null)
    }
  }, [])

  // Save game state to localStorage
  useEffect(() => {
    const gameState = {
      players,
      gameStarted,
      rounds,
      currentRound,
      winner
    }
    localStorage.setItem('dutch-blitz-game', JSON.stringify(gameState))
  }, [players, gameStarted, rounds, currentRound, winner])

  const startGame = (playerNames: string[]) => {
    const newPlayers = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      score: 0
    }))
    setPlayers(newPlayers)
    setGameStarted(true)
    setRounds([])
    setCurrentRound(1)
    setWinner(null)
  }

  const submitRound = (roundScores: RoundScore[]) => {
    // Update player scores
    const updatedPlayers = players.map(player => {
      const playerScore = roundScores.find(rs => rs.playerId === player.id)
      return {
        ...player,
        score: player.score + (playerScore?.change || 0)
      }
    })

    // Sort players by score (highest first)
    const sortedPlayers = [...updatedPlayers].sort((a, b) => b.score - a.score)

    // Check for winner (75+ points)
    const potentialWinners = sortedPlayers.filter(p => p.score >= 75)
    if (potentialWinners.length > 0) {
      const gameWinner = potentialWinners[0] // Highest score wins
      setWinner(gameWinner)
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        })
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        })
      }, 250)
    }

    // Save round data
    const newRound: GameRound = {
      roundNumber: currentRound,
      scores: roundScores
    }

    setPlayers(sortedPlayers)
    setRounds([...rounds, newRound])
    setCurrentRound(currentRound + 1)
  }

  const undoLastRound = () => {
    if (rounds.length === 0) return

    const lastRound = rounds[rounds.length - 1]
    
    // Revert player scores
    const revertedPlayers = players.map(player => {
      const lastScore = lastRound.scores.find(rs => rs.playerId === player.id)
      return {
        ...player,
        score: player.score - (lastScore?.change || 0)
      }
    })

    // Sort by score again
    const sortedPlayers = [...revertedPlayers].sort((a, b) => b.score - a.score)

    setPlayers(sortedPlayers)
    setRounds(rounds.slice(0, -1))
    setCurrentRound(currentRound - 1)
    setWinner(null) // Clear winner in case we undid a winning round
  }

  const resetGame = () => {
    setPlayers([])
    setGameStarted(false)
    setRounds([])
    setCurrentRound(1)
    setWinner(null)
    setShowHistory(false)
    localStorage.removeItem('dutch-blitz-game')
  }

  const closeVictoryOverlay = () => {
    setWinner(null)
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-blue-400 mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Dutch Blitz
          </motion.h1>
          <p className="text-gray-300 text-lg">Scorekeeper</p>
        </header>

        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <PlayerSetup key="setup" onStartGame={startGame} />
          ) : (
            <div key="game">
              <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="bg-gray-800 px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-blue-400 font-semibold">
                      Round {currentRound}
                    </span>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setShowHistory(!showHistory)}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showHistory ? 'Hide' : 'Show'} History
                  </motion.button>
                </div>

                <div className="flex gap-2">
                  {rounds.length > 0 && (
                    <motion.button
                      onClick={undoLastRound}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Undo Last Round
                    </motion.button>
                  )}
                  
                  <motion.button
                    onClick={resetGame}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    New Game
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {showHistory && (
                  <GameHistory 
                    rounds={rounds} 
                    players={players}
                    onClose={() => setShowHistory(false)}
                  />
                )}
              </AnimatePresence>

              <GameBoard
                players={players}
                onSubmitRound={submitRound}
                disabled={!!winner}
              />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {winner && (
            <VictoryOverlay
              winner={winner}
              onClose={closeVictoryOverlay}
              onNewGame={resetGame}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}