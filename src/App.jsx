import Gameboard from "./components/Gameboard"
import { createContext, useState } from "react"
export const AppContext = createContext();

function App() {
  const [gameBoard, setGameBoard] = useState(Array.from(Array(8), () => new Array(8).fill(0)));
  const appContextValue = {
    gameBoard,
    setGameBoard,
  }

  return (
    <AppContext.Provider value={appContextValue}>
    <Gameboard />
    </AppContext.Provider>
  )
}

export default App