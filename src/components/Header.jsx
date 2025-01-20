import '../css/Header.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../App'

function Header() {
    const {setRandomSeed} = useContext(AppContext)
    const seedInput = useRef(null)

    const inputToSeed = () => setRandomSeed(seedInput.current)
    const setSeedToRandom = () => setRandomSeed(Math.floor(Math.random() * 100000000))
  return (
    <section className="header">
        <h1>The Shadow Caverns</h1>
        <div className="header--bottom-row">
            <div>
                <span>Room</span>
                <input ref={seedInput} type="numbers" />
            </div>
            <button onClick={inputToSeed}>Choose</button>
            <button onClick={setSeedToRandom}>Random</button>
        </div>
    </section>
  )
}

export default Header