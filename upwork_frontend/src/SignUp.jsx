import React from "react"
import './SignUp.css'

export default function SignUp() {
    const [role, setRole] = React.useState("");
    const [submit, setSubmit] = React.useState(false);
    const client_btn_style = {

        backgroundColor: role === "c" ? "lightgreen" : "white",
        border: role === "c" ? "2px solid green" : "1px solid lightgray"
    }
    const freelancer_btn_style = {
        backgroundColor: role === "f" ? "lightgreen" : "white",
        border: role === "f" ? "2px solid green" : "1px solid lightgray"
    }

    function selectRole(user) {
        setRole(user);
    }

    function confirmRole() {
        setSubmit(true);
    }

    if (!submit) {
        return (
            <div className="main-box">
                <h1 className="form-title">Join as a client or freelancer</h1>
                <form className="role-form">
                    <div className="role-btn" style={client_btn_style} onClick={() => { selectRole("c") }}>
                        <h3>I'm a client, hiring for a project</h3>
                    </div>
                    <div className="role-btn" style={freelancer_btn_style} onClick={() => { selectRole("f") }}>
                        <h3>I'm a freelancer, looking for work</h3>
                    </div>
                </form>
                <button className="submit-role-btn" onClick={confirmRole} disabled={!role}>Create Account</button>
                <p className='login-text'>Already have an account? <span><a href="/login">Log In</a></span></p>
            </div>
        )
    }

    const form_title = role === "c" ? "Sign up to hire talent" : "Sign up to find work you love";
    return (
        <div className="main-box">
            <h1>{form_title}</h1>
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