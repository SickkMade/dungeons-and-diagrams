import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';

function Tile() {
    const [usable, setUsable] = useState(true);
    const [hasBlock, setHasBlock] = useState(false);
    const [hasMarker, setHasMarker] = useState(false);
    const tileRef = useRef(null);
    const {isMouseDown, setIsDeleting, isDeleting, isMarking, setIsMarking} = useContext(AppContext);

    // this useeffect is for setting blocks
    useEffect(() => {
        if(!usable) return;
        const createBlock = (isDeleting) => {
            if(isDeleting){
                setHasBlock(false)
            } else{
                setHasBlock(true)
            }
        }

        const createMarker = (isDeleting) => {
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
                    createMarker(isDeleting)
                } 
                else{
                    createBlock(isDeleting)
                }
            }
        }

        const handleClick = (e) => {
            if(e.button === 2){
                setIsMarking(true);
            }
            
            //i need to fix these state issues, these are silly workarounds
            if(hasBlock){
                //if we click on block we are deleting
                setIsDeleting(true);
                createBlock(true);

            } else if (e.button === 2){
                setIsDeleting(false);
                createMarker(false)
            } else {
                createBlock(false);
                setIsDeleting(false);
            }
        }

        tileRef.current.addEventListener("mouseover", handleMouseDown);
        tileRef.current.addEventListener("mousedown", handleClick);

        return () => {
            tileRef.current.removeEventListener("mousedown", handleClick);
            tileRef.current.removeEventListener("mouseover", handleMouseDown);
        }
    }, [usable, hasBlock, isMouseDown, isDeleting])

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