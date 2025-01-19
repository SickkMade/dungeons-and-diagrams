import { useContext, useMemo } from "react"
import React from "react"
import { AppContext } from "../App"
import "../css/Tile.css"

const CounterTile = React.memo( ({isRow, index}) => {
    const {solutionBoard} = useContext(AppContext);
    const getBlockValue = useMemo(() => {
        let counter = 0
        if(!isRow){
            solutionBoard[index].map((value) => {
                if(value=== 'W' || value === 0){
                    counter += 1;
                }
            })
        }
        else{
            solutionBoard.map((row) => {
                if(row[index] === 'W' || row[index] === 0){
                    counter += 1;
                }
            })
        }
        return counter
    }, [solutionBoard])
  return (
    <div className="tile">{getBlockValue}</div>
  )
})

CounterTile.displayName="CounterTile"
export default CounterTile