import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';

function Tile() {
    const [usable, setUsable] = useState(true);
    const [hasBlock, setHasBlock] = useState(false);
    const [hasMarker, setHasMarker] = useState(false);
    const tileRef = useRef(null);
    const {isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking, setIsMouseDown} = useContext(AppContext);

    // this useeffect is for setting blocks
    useEffect(() => {
        if(!usable) return;
        const handleMouseDown = (e) => {
            
            if(hasMarker || hasBlock){
                setIsDeleting(true);
                setHasMarker(false);
                setHasBlock(false);
            }else{
                if(e.button == 2){ //right click
                    setIsMarking(true);
                    setHasMarker(true);
                } 
                else{
                    setHasBlock(true);
                }
            }
            setIsMouseDown(true); 
            
        }
        const handleMouseOver = () => {
            if(!isMouseDown) return;
            if(isDeleting){
                setHasMarker(false);
                setHasBlock(false);
            }
            else if(isMarking && !hasBlock){
                setHasMarker(true)
            }
            else if(!isMarking && !hasMarker){
                setHasBlock(true)
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

export default Tile