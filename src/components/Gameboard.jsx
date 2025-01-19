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
        //place treasure
        newBoard[treasureX][treasureY] = 'T'

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
                for(let i = x-1; i <= x; i++){
                    for(let j = y-1; j <= y; j++){
                        if (i >= 0 && i < BOARD_SIZE - 1 && j >= 0 && j < BOARD_SIZE - 1){
                            const c1 = (i === x && j === y) || newBoard[i][j] === 'P';
                            const c2 = (i === x && j+1 === y) || newBoard[i][j+1] === 'P';
                            const c3 = (i+1 === x && j === y) || newBoard[i+1][j] === 'P';
                            const c4 = (i+1 === x && j+1 === y) || newBoard[i+1][j+1] === 'P';

                            if(c1 && c2 && c3 && c4){
                                return false
                            }
                        }
                    }
                }
                return true
            };

            const canPlaceMonster = (x,y) => {
                let possiblePlacements = 0
                for(const [dx,dy] of pathDirs){
                    let nx = x + dx
                    let ny = y + dy
                    if(!isValidPosition(nx,ny) 
                        || newBoard[nx][ny] === '0'
                        || newBoard[nx][ny] === 'W'
                    ){
                        possiblePlacements+=1;
                    }
                }
                if(possiblePlacements >= 3) return true;
                return false;
            }
        
            //loop until no more directions to explore
            while(true){
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
                    createPath(ni, nj);
                }
                else {
                    if(canPlaceMonster(i,j)) newBoard[i][j] = 'M';
                    return false
                }
            }
            
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