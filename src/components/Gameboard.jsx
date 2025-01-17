import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext, useEffect } from 'react'
import CounterTile from './CounterTile';

function Gameboard() {

    const {gameBoard, solutionBoard, setSolutionBoard} = useContext(AppContext);

    const pathDirs = [[-1,0],[1,0],[0,1],[0,-1]]

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
                    if(!deletedWall && Math.floor(Math.random() * 4) == 0 
                    && i > treasureX-2 && i < treasureX+2)
                    {
                        deletedWall = [i,j]; //x, y
                        newBoard[i][j] = 'X'
                    }
                    else{
                        newBoard[i][j] = 'W'
                    }
                } else {
                    newBoard[i][j] = 'S' //safe
                }
            }
        }
        const getDirection = (i, j) => {
            let dir = pathDirs[Math.floor(Math.random() * pathDirs.length)]
            let ni = i+dir[0]
            let nj = j+dir[1]
            let willCreateFour = false;
            //if outside of board
            if(ni < 0 || ni > 7 || nj < 0 || nj > 7)return;

            let currentTile = newBoard[ni][nj]
            if(currentTile == 'W' || currentTile =='S' || currentTile == 'P') return;

            let counter = 0;
            for(let i = ni-1; i <= ni+1; i++){
                for(let j = nj-1; j <=nj+1; j++){
                    if(ni === 0 && nj=== 0) return; //skip center
                    if(newBoard[ni][nj] === 'P'){
                        counter+=1;
                        if(counter >= 3)willCreateFour=true;
                    }
                    else{
                        counter = 0;
                    }
                }
            }
            if(willCreateFour) return;
            return [ni,nj]
        }

        const createPath = (i,j) => {
            let loc = getDirection(i, j);
            if(loc !== undefined){ //if not null
            newBoard[loc[0]][loc[1]] = 'P' //Path
            createPath(loc[0], loc[1])
            }
        }

        createPath(0, 0);
        setSolutionBoard(newBoard);
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
                <Tile i={i} j={j} key={`gameboard ${i}-${j}`} />
            ))
        ))}
        </div>
    </div>
    </section>
  )
}

export default Gameboard