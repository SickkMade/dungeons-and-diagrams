import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';
import PropTypes from 'prop-types';

function Tile({i, j}) {
    const usable = useRef(false);
    const isTreasure = useRef(false);
    const [hasBlock, setHasBlock] = useState(false);
    const [hasMarker, setHasMarker] = useState(false);
    const tileRef = useRef(null);
    const {solutionBoard, isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking, setIsMouseDown, gameBoard} = useContext(AppContext);


    useEffect(()=>{
        if(solutionBoard[i][j]==='M'){
            usable.current = false
            isTreasure.current = false
        }
        else if (solutionBoard[i][j]==='T'){
            usable.current = false
            isTreasure.current = true
        }
        else{
            isTreasure.current = false
            usable.current = true
        }
    },[solutionBoard, i, j])

    // this useeffect is for setting blocks
    useEffect(() => {
        if(!usable.current) return;
        const handleSetHasBlock = (value) => {
            setHasBlock(value);
            gameBoard[j][i] = 'W'
        }

        const handleMouseDown = (e) => {
            
            if(hasMarker || hasBlock){
                setIsDeleting(true);
                setHasMarker(false);
                handleSetHasBlock(false);
            }else{
                if(e.button == 2){ //right click
                    setIsMarking(true);
                    setHasMarker(true);
                } 
                else{
                    handleSetHasBlock(true);
                }
            }
            setIsMouseDown(true); 
            
        }
        const handleMouseOver = () => {
            if(!isMouseDown) return;
            if(isDeleting){
                setHasMarker(false);
                handleSetHasBlock(false);
            }
            else if(isMarking && !hasBlock){
                setHasMarker(true)
            }
            else if(!isMarking && !hasMarker){
                handleSetHasBlock(true)
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
    }, [usable, hasMarker, hasBlock, isMouseDown])


    const handleClassAttribution = () => {
        if(!usable.current){
            if(isTreasure.current) return 'treasure'
            return 'monster'
        } 
        else if(hasBlock){
            return 'block'
        } else if(hasMarker){
            return 'marker'
        }
        return ''
    }

    
  return (
    <div ref={tileRef} className={`tile ${handleClassAttribution()}`}></div>
  )
}

Tile.propTypes = {
    i: PropTypes.number,
    j: PropTypes.number,
}

export default Tile