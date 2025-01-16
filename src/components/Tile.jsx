import '../css/Tile.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { AppContext } from '../App';

function Tile() {
    const [usable, setUsable] = useState(true);
    const [hasBlock, setHasBlock] = useState(false);
    const tileRef = useRef(null);
    const {isMouseDown, setIsDeleting, isDeleting} = useContext(AppContext);

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

        //seperated out because handle click state doesnt change isMouseDown fast enough
        const handleMouseDown = () => {
            if(isMouseDown){
                createBlock(isDeleting)
            }
        }

        const handleClick = () => {
            
            //i need to fix these state issues, these are silly workarounds
            if(hasBlock){
                //if we click on block we are deleting
                setIsDeleting(true);
                createBlock(true);

            } else{
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

    
  return (
    <div ref={tileRef} className={`tile ${hasBlock ? 'block' : ''}`}></div>
  )
}

export default Tile