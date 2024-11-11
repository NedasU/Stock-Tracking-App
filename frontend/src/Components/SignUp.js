import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitInfo = async ()=> {
        if (username.trim() && password.trim()){
            await fetch
        }
    }
    return (
        <div className='signup-container'>
            <div className='sign-in-up-card'>
                <h2>Getting Started</h2>
                <input type='text'
                    placeholder='Username'
                    value={username}
                    maxLength={255}
                    onChange={(e) => setUsername(e.target.value)}
                    >
                </input>
                <input type='text'
                    placeholder='Password'
                    value={password}
                    maxLength={255}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                
                <div className='submit-switch-container'>
                    <h4>
                        Already have an account? Sign in
                    </h4>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;