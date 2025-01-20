import '../css/Header.css'

function Header() {
  return (
    <section className="header">
        <h1>The Shadow Caverns</h1>
        <div className="header--bottom-row">
            <div>
                <span>Room</span>
                <input type="numbers" />
            </div>
            <button>Choose</button>
            <button>Random</button>
        </div>
    </section>
  )
}

export default Header