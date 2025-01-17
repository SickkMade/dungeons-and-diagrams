import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext } from 'react'
import CounterTile from './CounterTile';

function Gameboard() {

    const {gameBoard} = useContext(AppContext);

  return (
    <section className="gameboard--container">
    <div className="countertile--col">
        {gameBoard[0].map((value,i)=>(
            <CounterTile key={`countertile-col-${i}`} isRow={false} index={i}/>
        ))}
    </div>
    <div className="countertile--wrapper">
        <div className="countertile--row">
        {gameBoard[0].map((value,i)=>(
            <CounterTile key={`countertile-row-${i}`} isRow={true} index={i}/>
        ))}
        </div>
        <div className="gameboard">
        {gameBoard.map((row, i) => (
            row.map((value, j) => (
                <Tile key={`gameboard ${i}-${j}`} />
            ))
        ))}
        </div>
    </div>
    </section>
  )
}

export default Gameboard