import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';
import PropTypes from 'prop-types';

function Tile({i, j}) {
    const tileTypes = Object.freeze({
        MONSTER: 'MONSTER',
        TREASURE: 'TREASURE',
        BLOCK: 'BLOCK',
        MARKER: 'MARKER',
        EMPTY: ''
    })
    const [currentTileType, setCurrentTileType] = useState(tileTypes.EMPTY);
    const tileRef = useRef(null);
    const {solutionBoard, isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking, setIsMouseDown, gameBoard} = useContext(AppContext);


    useEffect(()=>{
        if(solutionBoard[i][j]==='M'){
            setCurrentTileType(tileTypes.MONSTER)
        }
        else if (solutionBoard[i][j]==='T'){
            setCurrentTileType(tileTypes.TREASURE)
        }
    },[solutionBoard, i, j])

    // this useeffect is for setting blocks
    useEffect(() => {
        if(currentTileType === tileTypes.MONSTER ||
            currentTileType === tileTypes.TREASURE
        ) return;

        const handleMouseDown = (e) => {
            
            if(currentTileType === tileTypes.BLOCK ||
                currentTileType === tileTypes.MARKER
            ){
                setIsDeleting(true);
                setCurrentTileType(tileTypes.EMPTY)
            }else{
                if(e.button == 2){ //right click
                    setIsMarking(true);
                    setCurrentTileType(tileTypes.MARKER)
                } 
                else{
                    setCurrentTileType(tileTypes.BLOCK)
                }
            }
            setIsMouseDown(true); 
            
        }
        const handleMouseOver = () => {
            if(!isMouseDown) return;
            if(isDeleting){
                setCurrentTileType(tileTypes.EMPTY)
            }
            else if(currentTileType==tileTypes.EMPTY){
                if(isMarking){
                    setCurrentTileType(tileTypes.MARKER)
                }else{
                    setCurrentTileType(tileTypes.BLOCK)
                }
            }
        }
        const handleMouseUp = () => {
            setIsMouseDown(false);
            setIsMarking(false);
            setIsDeleting(false);
        }

        tileRef.current.addEventListener("mouseover", handleMouseOver);
        tileRef.current.addEventListener("mousedown", handleMouseDown);
        tileRef.current.addEventListener("mouseup", handleMouseUp);

        return () => {
            tileRef.current.removeEventListener("mousedown", handleMouseDown);
            tileRef.current.removeEventListener("mouseover", handleMouseOver);
            tileRef.current.removeEventListener("mouseup", handleMouseUp);
        }
    }, [isMarking, isDeleting, currentTileType, isMouseDown])
    

  return (
    <div ref={tileRef} className={`tile ${currentTileType}`}></div>
  )
}

Tile.propTypes = {
    i: PropTypes.number,
    j: PropTypes.number,
}

export default Tile