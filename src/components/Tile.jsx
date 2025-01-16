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
        const handleBlocks = () => {
            if(isDeleting){
                setHasBlock(false)
            } else{
                setHasBlock(true)
            }
        }

        const handleMarkers = () => {
            if(isDeleting){
                setHasMarker(false)
            } else {
                setHasMarker(true)
            }
        }

        //seperated out because handle click state doesnt change isMouseDown fast enough
        const handleMouseDown = () => {
            if(isMouseDown){
                if(isMarking){ //if right click
                    handleMarkers(isDeleting)
                } 
                else{
                    handleBlocks(isDeleting)
                }
            }
        }

        const handleClick = (e) => {
            setIsMouseDown(true);
            if(e.button === 2){
                setIsMarking(true);
            }
            
            //i need to fix these state issues, these are silly workarounds
            if(hasBlock || hasMarker){
                //if we click on block we are deleting
                setIsDeleting(true);
            } else {
                setIsDeleting(false);
            }

            handleMouseDown()
        }

        const mouseUp = () => {
            setIsMarking(false);
            setIsMouseDown(false);
        }

        tileRef.current.addEventListener("mouseover", handleMouseDown);
        tileRef.current.addEventListener("mousedown", handleClick);
        tileRef.current.addEventListener("mouseup", mouseUp);

        return () => {
            tileRef.current.removeEventListener("mousedown", handleClick);
            tileRef.current.removeEventListener("mouseover", handleMouseDown);
            tileRef.current.removeEventListener("mouseup", mouseUp);
        }
    }, [usable, hasBlock, isMouseDown, isDeleting, isMarking])

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