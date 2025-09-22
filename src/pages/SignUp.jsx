import { useState } from 'react';

import imagePassword from '../assets/password.png'
import imageUser from '../assets/person.png'

function SignUp() {

    const [action, setAction] = useState('Sign Up');

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={imageUser} alt="username" />
                    <input type="text" placeholder="Username" name="Username" />
                </div>
                <div className="input">
                    <img src={imagePassword} alt="password" />
                    <input type="password" placeholder="Password" name="Password" />
                </div>
                <div className="input">
                    <img src={imagePassword} alt="password" />
                    <input type="password" placeholder="Re enter password" name="Re enter password" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Register</div>
                <div className="login-existing-account">Already have an account? <span>Click here</span></div>
            </div>
            <div className="message">Login successfully!</div>
        </div>
    )
}

export default SignUp