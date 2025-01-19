import Gameboard from "./components/Gameboard"
import { createContext, useState, useRef, useEffect } from "react"
export const AppContext = createContext();

function App() {
  const gameBoard = useRef(Array.from(Array(8), () => new Array(8).fill(0)));
  const [solutionBoard, setSolutionBoard] = useState(Array.from(Array(8), () => new Array(8).fill(0)));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const appContextValue = {
    gameBoard,
    isMouseDown,
    isDeleting,
    setIsDeleting,
    isMarking,
    setIsMarking,
    setIsMouseDown,
    solutionBoard,
    setSolutionBoard
  }

  useEffect(() => {
    
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu)
      

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [])

  return (
    <AppContext.Provider value={appContextValue}>
    <Gameboard />
    </AppContext.Provider>
  )
}

export default App