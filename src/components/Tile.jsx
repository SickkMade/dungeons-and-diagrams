import '../css/Tile.css'
import React, { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';
import PropTypes from 'prop-types';

const tileTypes = Object.freeze({
    MONSTER: 'MONSTER',
    TREASURE: 'TREASURE',
    BLOCK: 'BLOCK',
    MARKER: 'MARKER',
    EMPTY: ''
})

const Tile = React.memo(({i, j}) => {
    const [currentTileType, setCurrentTileType] = useState(tileTypes.EMPTY);
    const tileRef = useRef(null);
    const {randomSeed, solutionBoard, isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking, setIsMouseDown, setCorrectWalls} = useContext(AppContext);


    useEffect(()=>{
        if(solutionBoard[i][j]==='M'){
            setCurrentTileType(tileTypes.MONSTER)
        }
        else if (solutionBoard[i][j]==='T'){
            setCurrentTileType(tileTypes.TREASURE)
        }
    },[solutionBoard])

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
    }, [isMouseDown, currentTileType])

    useEffect(()=>{
        if(currentTileType === tileTypes.BLOCK){
            if(solutionBoard[i][j] === 0 || solutionBoard[i][j] === 'W'){
                setCorrectWalls(prevValue => prevValue += 1)
            }
            else {
                setCorrectWalls(prevValue => prevValue -= 1)
            }
        }
        else if(currentTileType === tileTypes.EMPTY){
            if(solutionBoard[i][j] === 0 || solutionBoard[i][j] === 'W'){
                setCorrectWalls(prevValue => prevValue -= 1)
            }
            else {
                setCorrectWalls(prevValue => prevValue += 1)
            }
        }
    }, [currentTileType])

    useEffect(()=>{
        setCurrentTileType(tileTypes.EMPTY)
    }, [randomSeed])



  return (
    <div ref={tileRef} className={`tile ${currentTileType}`}></div>
  )
})

Tile.displayName="Tile"

Tile.propTypes = {
    i: PropTypes.number,
    j: PropTypes.number,
}

export default Tile