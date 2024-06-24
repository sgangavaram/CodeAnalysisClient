import './Signup.css'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [btnState, setBtnState] = useState(true);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setBtnState(false)
    axios.post('https://localhost:7079/api/Dashboard/InsertUser', data)
    .then(res=>{
      console.log(res.data)
      if(res.data.success) {
        localStorage.setItem('user_id',res.data.user_id)
        navigate('/')
      }
      else{
         window.alert(`Signup Failed.\n${res.data.message}`)
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
    <div className='signup-main'> 

        <div className='signup-left '>

            <form className='signup-form  ' onSubmit={handleSubmit(onSubmit)}>
              <h1>Signup</h1> 

              {/* User name */}
              <div className='input-box'>
                <input 
                  type='text' 
                  placeholder='Username'
                  {...register("username", { required: true })} 
                />
              </div >
              {errors.username && <span className='signup-error'>Enter the username</span>}

              {/* Github Id */}
              <div className='input-box'>
                <input 
                  type='text' 
                  placeholder='Github ID'
                  {...register("user_id",{required: true})}
                />
                {errors.user_id && <span className='signup-error'>Enter Github Id</span>}
              </div>

              {/* email */}
              <div className='input-box'>
                <input 
                  type='email' 
                  placeholder='Email'
                  {...register("email",{required: true})}
                />
                {errors.eamil && <span className='signup-error'>Enter email</span>}
              </div>

              {/* Password */}
              <div className='input-box'>
                <input 
                  type='password' 
                  placeholder='Password'
                  {...register("password",{required: true})}
                />
                {errors.password && <span className='signup-error'>Enter the password</span>}
              </div>

              <div  className='input-box mt-5'>
                <input 
                  className='bg-info fw-bold text-white' 
                  type={btnState === true ? 'submit' : 'button'}  
                  value={btnState === true ? 'Signup' : 'verifying...'}
                  disabled= {!btnState}
                />
              </div>

              <div>
                <a className='text-primary text-decoration-none' href='/login'>Login to existing account</a>
              </div>

            </form>

        </div>

        <div className='signup-right'>
           <img 
              src='https://cdn.dribbble.com/users/133545/screenshots/1220668/glowing-lines.gif' 
              width={'100%'} 
              height={'100%'}
            ></img>
        </div>

    </div>
  )
} 

export default Signup