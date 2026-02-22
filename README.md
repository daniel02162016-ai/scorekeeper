# Dutch Blitz Scorekeeper

A modern, responsive web app for keeping track of Dutch Blitz game scores.

## Features

### Core Features
- **Add/Remove Players**: Support for 2-6 players by name
- **Round-by-round Scoring**: Input positive or negative score changes for each player
- **Win Condition**: First player to reach 75+ points wins (highest score wins if multiple reach 75+)
- **Celebratory Confetti**: Animated confetti burst when someone wins

### Extra Features
- **Score History**: Collapsible panel showing each round's changes
- **Undo Last Round**: Revert the most recent round
- **Round Counter**: Display current round number
- **Leaderboard Sorting**: Always sorted by score, highest first
- **Game Reset**: "New Game" button to start over
- **Local Storage Persistence**: Game state automatically saved

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Confetti**: canvas-confetti
- **Storage**: Client-side localStorage (no backend required)

## UI Design

- Clean modern dark theme
- Mobile-friendly responsive design
- Smooth animations and transitions
- Large, clear score display
- Color-coded score changes (green for positive, red for negative)
- Victory overlay with confetti animation

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## How to Play

1. **Setup**: Add 2-6 players by entering their names
2. **Start Game**: Click "Start Game" to begin
3. **Score Rounds**: Enter score changes for each player per round
4. **Track Progress**: View the leaderboard and round history
5. **Win**: First player to 75+ points wins!

## Game Rules

- Players start at 0 points
- Scores can be positive or negative
- Game ends when any player reaches 75+ points at the end of a round
- If multiple players reach 75+, the highest score wins
- Use the "Undo Last Round" feature to correct mistakes

## Repository

This project is available on GitHub: [scorekeeper](https://github.com/daniel02162016-ai/scorekeeper)

## License

This project is open source and available under the MIT License.