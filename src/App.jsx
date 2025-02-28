import Gameboard from "./components/Gameboard"
import { createContext, useState, useRef, useEffect } from "react"
import Header from "./components/Header";
export const AppContext = createContext();

function App() {
  const [solutionBoard, setSolutionBoard] = useState(Array.from(Array(8), () => new Array(8).fill(0)));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [correctWalls, setCorrectWalls] = useState(128);
  const [randomSeed, setRandomSeed] = useState(12345678);
  const appContextValue = {
    correctWalls,
    setCorrectWalls,
    isMouseDown,
    isDeleting,
    setIsDeleting,
    isMarking,
    setIsMarking,
    setIsMouseDown,
    solutionBoard,
    setSolutionBoard,
    randomSeed,
    setRandomSeed
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
      <section id="main">
      <Header />
      <Gameboard />
      </section>
    </AppContext.Provider>
  )
}

export default App