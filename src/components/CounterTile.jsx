import { useContext } from "react"
import { AppContext } from "../App"
import "../css/Tile.css"

function CounterTile({isRow, index}) {
    const {gameBoard} = useContext(AppContext);
    const getBlockValue = () => {
        let counter = 0
        if(isRow){
            gameBoard[index].map((value) => (
                counter += value
            ))
        }
        else{
            gameBoard.map((row) => (
                counter += row[index]
            ))
        }
        return counter
    }
  return (
    <div className="tile">{getBlockValue()}</div>
  )
}

export default CounterTile