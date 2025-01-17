import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext, useEffect } from 'react'
import CounterTile from './CounterTile';

function Gameboard() {

    const {gameBoard, solutionBoard, setSolutionBoard} = useContext(AppContext);
    const createRandomSolutionBoard = () => {
        let newBoard = Array.from(Array(8), () => new Array(8).fill(0))

        //create treasure
        let treasureX = Math.round(Math.random() * 5)+1
        let treasureY = Math.round(Math.random() * 5)+1
        //place treasure
        newBoard[treasureX][treasureY] = 'T'
        //place treasure walls
        let deletedWall = null;
        for(let i = Math.max(0, treasureX-2); i <= Math.min(7, treasureX+2); i++){
            for(let j = Math.max(0, treasureY-2); j <= Math.min(7, treasureY+2); j++){
                if(j === treasureY-2 || j === treasureY+2 || i === treasureX-2 || i === treasureX+2){
                    if(!deletedWall && Math.floor(Math.random() * 4) == 0){
                        deletedWall = [i,j]; //x, y
                        newBoard[i][j] = 'X'
                    }
                    else{
                        newBoard[i][j] = 'W'
                    }
                }
            }
        }



        console.log(newBoard);
    }

    useEffect(()=>{
        createRandomSolutionBoard()
    }, [])

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