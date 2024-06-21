import './Login.css'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [btnState, setBtnState] = useState(true);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setBtnState(false);
    
    axios.post('https://localhost:7079/api/Dashboard/Login', data)
    .then(res=>{
      console.log(res.data.user_id)
      if(res.data.success) {
        localStorage.setItem('user_id',res.data.user_id)
        navigate('/')
      }
      else{
         window.alert(`Login Failed.\n${res.data.message}`)
         localStorage.clear();
      }
      setTimeout(()=>setBtnState(true),1000);
    })
    .catch(err=>{
      console.log(err)
      setTimeout(()=>setBtnState(true),1000);
    })
  }
  
 
  return (
    <div className='login-main'> 
        <div className='login-left'>
           {/* <h1> Left Div</h1> */}
           <img 
              src='https://media.licdn.com/dms/image/C4E12AQFT7_JRQ29POA/article-cover_image-shrink_720_1280/0/1629407472717?e=1724284800&v=beta&t=GW6fiNLmx8xqlFcHGEy0fUoAunm2MODuTnkgkVEfgDI' 
              width={'100%'} 
              height={'100%'}
            ></img>
        </div>

        <div className='login-right'>

            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
              <h1>Login</h1> 

              {/* User name */}
              <div className='input-box'>
                <input 
                  type='text' 
                  placeholder='User name'
                  {...register("username", { required: true })} 
                />
              </div >
              {errors.username && <span className='login-error'>Enter the username</span>}

              {/* Password */}
              <div className='input-box'>
                <input 
                  type='password' 
                  placeholder='password'
                  {...register("password",{required: true})}
                />
                {errors.password && <span className='login-error'>Enter the password</span>}
              </div>

              <div  className='input-box mt-5'>
                <input 
                  className='bg-info fw-bold text-white' 
                  type={btnState === true ? 'submit' : 'button'}  
                  value={btnState === true ? 'Login' : 'verifying...'}
                  disabled= {!btnState}
                />
              </div>

              <div>
                <a className='text-primary text-decoration-none' href='/signup'>Create New Account</a>
              </div>

            </form>

        </div>
    </div>
  )
}

export default Login