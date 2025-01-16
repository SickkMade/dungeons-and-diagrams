import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext } from 'react'

function Gameboard() {

    const {gameBoard} = useContext(AppContext);

  return (
    <section className="gameboard">
    {gameBoard.map((row, i) => (
        row.map((value, j) => (
            <Tile key={`gameboard ${i}-${j}`} />
        ))
    ))}
    </section>
  )
}

export default Gameboard