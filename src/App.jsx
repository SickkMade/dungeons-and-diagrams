import Gameboard from "./components/Gameboard"
import { createContext, useState, useEffect } from "react"
export const AppContext = createContext();

function App() {
  const [gameBoard, setGameBoard] = useState(Array.from(Array(8), () => new Array(8).fill(0)));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const appContextValue = {
    gameBoard,
    setGameBoard,
    isMouseDown,
    isDeleting,
    setIsDeleting,
  }

  useEffect(() => {
    const mouseDown = () => setIsMouseDown(true);
    const mouseUp = () => setIsMouseDown(false);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [])

  return (
    <AppContext.Provider value={appContextValue}>
    <Gameboard />
    </AppContext.Provider>
  )
}

export default App