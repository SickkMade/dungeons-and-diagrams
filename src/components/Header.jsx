import '../css/Header.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../App'

function Header() {
    const {setRandomSeed} = useContext(AppContext)
    const seedInput = useRef(null)

    const inputToSeed = () => setRandomSeed(Number(seedInput.current.value))
    const setSeedToRandom = () => {
        let random = Math.floor(Math.random() * 100000000)
        setRandomSeed(random)
        seedInput.current.value = random;
    }
  return (
    <section className="header">
        <h1>The Shadow Caverns</h1>
        <div className="header--bottom-row">
            <div>
                <span>Room</span>
                <input ref={seedInput} maxLength={8} type="text" />
            </div>
            <button onClick={inputToSeed}>Choose</button>
            <button onClick={setSeedToRandom}>Random</button>
        </div>
    </section>
  )
}

export default Header