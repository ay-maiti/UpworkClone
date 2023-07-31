import './SignUp.css'

export default function SignUp() {
    return (
        <div className="main-box">
            <h1>Sign up to hire talent</h1>
            <form className="signup-form">
                <input className='name' placeholder="First Name" />
                <input className='name' placeholder="Last Name" />
                <input className='email' placeholder="Email" />
                <input className='password' placeholder="Password" />
                <input className='country' placeholder="Country" />
            </form>
            <form className='subs'>
                <input type="checkbox" id="subscribe" />
                <label for="subscribe">Send me helpful emails to find rewarding work and job leads.</label>
            </form>
            <form className='tnc'>
                <input type="checkbox" id="read_tc" />
                <label for="read_tc">Yes, I understand and agree to the Upwork Terms of Service, including the User Agreement       and Privacy Policy .</label>
            </form>
            <button className="create-account-btn">Create my account</button>
            <p className='login-text'>Already have an account? <span><a href="/login">Log In</a></span></p>
        </div>
    )
}