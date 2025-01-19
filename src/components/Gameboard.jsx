import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext, useEffect } from 'react'
import CounterTile from './CounterTile';
import Shuffle from '../misc/HelperFunctions.js'

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
        let treasureWalls = [] //temp solution
        for(let i = Math.max(0, treasureX-2); i <= Math.min(7, treasureX+2); i++){
            for(let j = Math.max(0, treasureY-2); j <= Math.min(7, treasureY+2); j++){
                if(j === treasureY-2 || j === treasureY+2 || i === treasureX-2 || i === treasureX+2){
                    newBoard[i][j] = 'W' //wall
                    if(i!== treasureX-2 || i!== treasureX+2){
                        treasureWalls.push([i,j])
                    }
                } else {
                    newBoard[i][j] = 'S' //safe
                }
            }
        }
        const [openWallX, openWallY] = treasureWalls[Math.floor(treasureWalls.length * Math.random())]
        newBoard[openWallX][openWallY] = 'P' //open up treasure wall

        const createPath = (i, j) => {
            const BOARD_SIZE = 8;
            
            // check if in gameBoard
            const isValidPosition = (x, y) => {
                return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
            };
        
            // check if allowed tile
            const isSafePosition = (x, y) => {
                let pathNeighbors = 0;
                for(let dx = -1; dx <= 1; dx++) {
                    for(let dy = -1; dy <= 1; dy++) {
                        //skip middle tile
                        if(i === 0 && j === 0) continue;
                        
                        const nx = x + dx;
                        const ny = y + dy;
                        if(!isValidPosition(nx, ny)) continue;

                        if(newBoard[nx][ny] === 'P') pathNeighbors++;
                        else pathNeighbors = 0

                        if (pathNeighbors >= 3) return false
                    }
                }
                return true
            };
        
            let possibleDirs = [];
            const shuffledDirs = Shuffle([...pathDirs]);
        
            // find all valid dirs
            for(const [dx, dy] of shuffledDirs) {
                const ni = i + dx;
                const nj = j + dy;
        
                if(!isValidPosition(ni, nj)) continue;
                if(newBoard[ni][nj] !== 0) continue;
                if(!isSafePosition(ni, nj)) continue;
        
                possibleDirs.push([dx, dy]);
            }
        
            // magic
            if(possibleDirs.length > 0) {
                const [dx, dy] = possibleDirs[0];
                const ni = i + dx;
                const nj = j + dy;
                newBoard[ni][nj] = 'P';
                return createPath(ni, nj);
            }
        
            return false;
        };

        createPath(openWallX,openWallY);
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