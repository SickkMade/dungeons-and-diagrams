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

        const createBlock = () => {
            if(isMouseDown){
                if(isDeleting){
                    setHasBlock(false)
                } else{
                    setHasBlock(true)
                }
            }
        }

        const handleClick = () => {
            
            if(hasBlock){
                //if we click on block we are deleting
                setIsDeleting(true);
            } else{
                setIsDeleting(false);
            }

            createBlock()
        }

        tileRef.current.addEventListener("mouseover", createBlock);
        tileRef.current.addEventListener("mousedown", handleClick);

        return () => {
            tileRef.current.removeEventListener("mousedown", handleClick);
            tileRef.current.removeEventListener("mouseover", createBlock);
        }
    }, [usable, hasBlock, isMouseDown, isDeleting])

    
  return (
    <div ref={tileRef} className={`tile ${hasBlock ? 'block' : ''}`}></div>
  )
}

export default Tile