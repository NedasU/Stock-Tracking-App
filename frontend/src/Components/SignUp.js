import React from 'react';

const SignUp = () => {
    return (
        <div className='signup-container'>
            <div className='sign-in-up-card'>
                <h2>Getting Started</h2>
                <input type='text'
                    placeholder='Username'
                    >
                </input>
                <input type='text'
                    placeholder='Password'>
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