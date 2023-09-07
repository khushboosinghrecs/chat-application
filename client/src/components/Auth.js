import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';
// import { signup } from '../../../server/controllers/auth';
// const Cookies = new Cookies();
const cookies = new Cookies();
const signinImage ="https://media.istockphoto.com/id/1125716911/vector/party-popper-with-confetti.jpg?s=612x612&w=0&k=20&c=sAyofM-MQ5TL-pLyFseV9Vke_W2zyYX1btP90oGJQZE=";
function Auth() {
    const initialState = {
        fullName: '',
        userName : '',
        password : '',
        confirmPassword : "",
        phoneNumber : '',
        avatarUrl : ''
    }
    const [form, setForm] = useState(initialState);

    const [isSignUp, setIsSignUp] = useState(true);
    const handleChange = (e) => {
      //  console.log({...form})
        setForm({...form, [e.target.name]: e.target.value});
       // console.log(form);
      

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';
        // const URL = 'https://medical-pager.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignUp) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }
    
    const switchMode = () => {
        setIsSignUp((prev) => !prev)
    }
    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields' >
                <div className='auth__form-container_fields-content'>
                    <p>
                        {isSignUp ? 'SignUp' : "Sign In"}
                    </p>
                    <form onSubmit={handleSubmit} >
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor='fullName'>Full Name</label>
                                <input name='fullName' type='text' placeholder='fullName' onChange={handleChange} required />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='userName'>User Name</label>
                            <input name='userName' type='text' placeholder='userName' onChange={handleChange} required />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input name='phoneNumber' type='text' placeholder='PhoneNumber' onChange={handleChange} required />
                            </div>
                        )}
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor='avatarUrl'>avtarUrl</label>
                                <input name='avatarUrl' type='text' placeholder='avtarUrl' onChange={handleChange} required />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='password'>password </label>
                            <input name='password' type='text' placeholder='password ' onChange={handleChange} required />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor='confirmPassword'>confirm Password</label>
                                <input name='confirmPassword' type='text' placeholder='confirmPassword' onChange={handleChange} required />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp ? "Already have an account?" : "Don't have an account"}
                        </p>
                        <span onClick={switchMode}>
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>

        </div>
    )
}

export default Auth