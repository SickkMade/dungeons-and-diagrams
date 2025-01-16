import Gameboard from "./components/Gameboard"
import { createContext, useState, useEffect } from "react"
export const AppContext = createContext();

function App() {
  const [gameBoard, setGameBoard] = useState(Array.from(Array(8), () => new Array(8).fill(0)));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const appContextValue = {
    gameBoard,
    setGameBoard,
    isMouseDown,
    isDeleting,
    setIsDeleting,
    isMarking,
    setIsMarking,
  }

  useEffect(() => {
    const mouseDown = () => setIsMouseDown(true);
    const mouseUp = () => {
      setIsMarking(false);
      setIsMouseDown(false);
    }
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener('contextmenu', handleContextMenu)
      

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