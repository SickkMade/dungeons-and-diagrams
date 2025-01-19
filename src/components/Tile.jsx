import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';
import PropTypes from 'prop-types';

function Tile({i, j}) {
    const [usable, setUsable] = useState(false);
    const [hasBlock, setHasBlock] = useState(false);
    const [hasMarker, setHasMarker] = useState(false);
    const tileRef = useRef(null);
    const {solutionBoard, isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking, setIsMouseDown, gameBoard} = useContext(AppContext);

    useEffect(()=>{
        if(solutionBoard[i][j]==='M')
            setUsable(false)
        else
            setUsable(true)
    },[solutionBoard, i, j])

    // this useeffect is for setting blocks
    useEffect(() => {
        if(!usable) return;
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
        if(!usable) return 'monster'
        if(hasBlock){
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