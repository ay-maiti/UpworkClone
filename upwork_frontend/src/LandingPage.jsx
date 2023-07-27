import "./LandingPage.css"

export default function LandingPage(){
    return(
        <>
            <nav className="nav_bar">
                <div className="nav_left">
                    <img id="home_logo" src="./src/assets/upwork-logo.png" alt="logo"/>
                    <ul className="nav_links">
                        <li>Find Talent</li>
                        <li>Find Work</li>
                        <li>Why Upwork</li>
                        <li>Enterprise</li>
                    </ul>
                </div>
                <div className="nav_right">
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
            </nav>
            <hr/>
        </>
    )
}