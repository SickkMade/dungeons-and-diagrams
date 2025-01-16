import '../css/Tile.css'
import { useState } from 'react'

function Tile({key}) {
  return (
    <div className="tile" key={key}></div>
  )
}

export default Tile