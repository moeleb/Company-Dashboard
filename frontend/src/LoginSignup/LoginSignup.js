import React from 'react'
import { useState } from 'react';
import "./LoginSignup.css";
import API_ENDPOINTS from '../config/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const LoginSignup = () => {
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isConfirmPassword, setIsConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit =  async(e) => {
        e.preventDefault();
        if (!isLogin && isPassword !== isConfirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const endpoint = isLogin ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;
        const requestBody = isLogin ? { email: isEmail, password: isPassword } : { email: isEmail, password: isPassword, confirmPassword: isConfirmPassword };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                if(isLogin && data.token) {
                    login(isEmail, data.token);
                    navigate('/dashboard');
                } else if(!isLogin && data.message === "User registered successfully") {
                    alert("User registered successfully. Please login.");
                    setIsLogin(true);
                    setIsPassword("");
                    setIsConfirmPassword("");
                } else {
                    alert(data.message || "An error occurred");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("An error occurred");
            });
    };

  return (
    
    <div className='auth-container'>

        <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && <h2>Signup</h2>}
            {isLogin && <h2>Login</h2>}
                <input type="email" placeholder='Email' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={isPassword} onChange={(e) => setIsPassword(e.target.value)} />
                {!isLogin && <input type="password" placeholder='Confirm Password' value={isConfirmPassword} onChange={(e) => setIsConfirmPassword(e.target.value)} />}
                <button type='submit'>{isLogin ? "Login" : "Signup"}</button>
                <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}</p>
                <button className='skip-button' type='button' onClick={() => navigate('/dashboard')}>
                    Skip (Skip login and Signup)
                </button>
        </form>
    </div>
  )
}

export default LoginSignup
