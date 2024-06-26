import './Login.css'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [btnState, setBtnState] = useState(true);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setBtnState(false);

    axios.post('https://codeanalysis.azurewebsites.net/api/Dashboard/Login', data)
    .then(res => {
      if(res.data.success) {
        localStorage.setItem('user_id', res.data.user_id);
        navigate('/');
      } else {
        window.alert(`Login Failed.\n${res.data.message}`);
        localStorage.clear();
      }
      setTimeout(() => setBtnState(true), 1000);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => setBtnState(true), 1000);
    });
  }

  return (
    <div className='login-main'>
      <div className='login-left'>
        <img 
          src='https://i.ibb.co/f4kzzQP/logo1.png' 
          alt='Logo'
          className='login-logo'
        />
      </div>

      <div className='login-right'>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1> 

          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Username'
              {...register("username", { required: true })} 
            />
            {errors.username && <span className='login-error'>Enter the username</span>}
          </div >

          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password'
              {...register("password", { required: true })}
            />
            {errors.password && <span className='login-error'>Enter the password</span>}
          </div>

          <div className='input-box mt-5'>
            <input 
              className='login-btn' 
              type={btnState ? 'submit' : 'button'}  
              value={btnState ? 'Login' : 'Verifying...'}
              disabled={!btnState}
            />
          </div>

          <div>
            <a className='create-account-link' href='/signup'>Create New Account</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
