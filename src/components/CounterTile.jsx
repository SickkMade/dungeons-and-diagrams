import { useContext } from "react"
import { AppContext } from "../App"
import "../css/Tile.css"

function CounterTile({isRow, index}) {
    const {solutionBoard} = useContext(AppContext);
    const getBlockValue = () => {
        let counter = 0
        if(isRow){
            solutionBoard[index].map((value) => {
                if(value=== 'W'){
                    counter += 1;
                }
            })
        }
        else{
            solutionBoard.map((row) => {
                if(row[index] === 'W'){
                    counter += 1;
                }
            })
        }
        return counter
    }
  return (
    <div className="tile">{getBlockValue()}</div>
  )
}

export default CounterTile