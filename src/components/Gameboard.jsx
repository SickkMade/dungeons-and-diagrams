import { AppContext } from '../App';
import "../css/Gameboard.css"
import Tile from './Tile'
import { useContext, useEffect, useRef } from 'react'
import CounterTile from './CounterTile';
import Shuffle from '../misc/HelperFunctions.js'
import seedrandom from 'seedrandom';

function Gameboard() {

    const {setCorrectWalls, randomSeed, solutionBoard, setSolutionBoard, correctWalls} = useContext(AppContext);
    const correctWallsSolution = useRef(0)
    const myrng = seedrandom(randomSeed);

    const pathDirs = [[-1,0],[1,0],[0,1],[0,-1]]

    const createRandomSolutionBoard = () => {
        let newBoard = Array.from(Array(8), () => new Array(8).fill(0))
        let treasureOpenings = []

        const createTreasure = (numOfTreasures) => {
            const isValid4x4 = (i, j) => { 
                if((newBoard[i+2]?.[j+2] ?? 0) == 0 &&
                (newBoard[i-2]?.[j-2] ?? 0) == 0 &&
                (newBoard[i+2]?.[j-2] ?? 0) == 0 &&
                (newBoard[i-2]?.[j+2] ?? 0) == 0 
                ){
                    return true
                }
                return false
            }


            for(let n = 0; n < numOfTreasures; n++){
            //create treasure room
            let treasureX = 0
            let treasureY = 0
            for(let k = 0; k < 100; k++){ //sorry this is so bad
                treasureX = Math.floor(myrng() * 6)+1
                treasureY = Math.floor(myrng() * 6)+1
                if(isValid4x4(treasureX, treasureY)) break;
            }
            //place treasure walls
            let treasureWalls = [] //temp solution
            for(let i = Math.max(0, treasureX-2); i <= Math.min(7, treasureX+2); i++){
                for(let j = Math.max(0, treasureY-2); j <= Math.min(7, treasureY+2); j++){
                    if(j === treasureY-2 || j === treasureY+2 || i === treasureX-2 || i === treasureX+2){
                        newBoard[i][j] = 'W' //wall
                        if(i!== treasureX-2 && i!== treasureX+2 && i!==0 && i!== 7 && j!== 0 & j!==7){
                            treasureWalls.push([i,j])
                        }
                    } else {
                        newBoard[i][j] = 'S' //safe
                    }
                }
            }
            //place and rotate
            treasureX += Math.floor(myrng()*3)-1
            treasureY += Math.floor(myrng()*3)-1
            newBoard[treasureX][treasureY] = 'T'

            const [openWallX, openWallY] = treasureWalls[Math.floor(treasureWalls.length * myrng())]
            treasureOpenings.push([openWallX, openWallY])
            newBoard[openWallX][openWallY] = 'P' //open up treasure wall
            }
        }
        
        const createPath = (i, j) => {
            const BOARD_SIZE = 8;
            
            // check if in gameBoard
            const isValidPosition = (x, y) => {
                return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
            };
        
            // check if allowed tile
            //4 2x2 checks to check 3x3 area
            const isSafePosition = (x, y) => {
                for(let i = x-1; i <= x; i++){
                    for(let j = y-1; j <= y; j++){
                        if (i >= 0 && i < BOARD_SIZE - 1 && j >= 0 && j < BOARD_SIZE - 1){
                            const c1 = (i === x && j === y) || newBoard[i][j] === 'P' || newBoard[i][j] === 'M';
                            const c2 = (i === x && j+1 === y) || newBoard[i][j+1] === 'P' || newBoard[i][j+1] === 'M';
                            const c3 = (i+1 === x && j === y) || newBoard[i+1][j] === 'P' || newBoard[i+1][j] === 'M';
                            const c4 = (i+1 === x && j+1 === y) || newBoard[i+1][j+1] === 'P' || newBoard[i+1][j+1] === 'M';

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
                        || newBoard[nx][ny] === 0
                        || newBoard[nx][ny] === 'W'
                    ){
                        possiblePlacements+=1;
                    }
                }
                if(possiblePlacements == 3) return true;
                return false;
            }
            
            //loop until no more directions to explore
            while(true){
                let possibleDirs = [];
                const shuffledDirs = Shuffle([...pathDirs], myrng);
            
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
                    if(canPlaceMonster(i,j)){
                        newBoard[i][j] = 'M';
                    }
                    return false
                }
            }
            
        };

        createTreasure(Math.floor(myrng()*2))

        if(treasureOpenings.length === 0){
            treasureOpenings.push([0,0])
        }
        for(const [x, y] of treasureOpenings){
            createPath(x,y);
        }

        correctWallsSolution.current = 0
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(newBoard[i][j] == 0 || newBoard[i][j] === 'W') {
                    correctWallsSolution.current+=1
                }
            }
        }

        setSolutionBoard(newBoard);
        console.log(newBoard);
    }

    useEffect(()=>{
        createRandomSolutionBoard()
        setCorrectWalls(0)
    }, [randomSeed])

    useEffect(()=>{
        if(correctWalls===correctWallsSolution.current){
            console.log('yahoo')
        }
    },[correctWalls])
    
  return (
    <section className="gameboard--container">
    <div className="countertile--col">
        {solutionBoard[0].map((value,i)=>(
            <CounterTile key={`countertile-col-${i}`} isRow={false} index={i}/>
        ))}
    </div>
    <div className="countertile--wrapper">
        <div className="countertile--row">
        {solutionBoard[0].map((value,i)=>(
            <CounterTile key={`countertile-row-${i}`} isRow={true} index={i}/>
        ))}
        </div>
        <div className="gameboard">
        {solutionBoard.map((row, i) => (
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