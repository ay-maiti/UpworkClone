import './SignUp.css'

export default function SignUp(){
    return(
        <div className="main-box">
            <h1>Sign up to hire talent</h1>
            
            <div className="name-box">
                <input placeholder="First Name"/>
                <input placeholder="Last Name"/>
            </div>
            <input placeholder="Email"/>
            <input placeholder="Password"/>
            <input placeholder="Country"/>
        </div>
    )
}