import { useNavigate } from 'react-router-dom';
import './NavigationBar.css'
import React, { useEffect, useState } from 'react'

function NavigationBar() {
  const [user_id, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const memory = localStorage.getItem('user_id');
    setUserId(memory)
    if(memory == null ){
      if(window.location.pathname != '/signup')
       navigate('/login')
    }
    else navigate('/')
  },[localStorage.getItem('user_id')])  

  return (
    <div className='nav-main'>

      <div className='Nav-brand'>
        <h2>Code Analysis</h2>
      </div>

      <ul className='Nav-list'>

        {user_id && <li className='Nav-item'>
          <a className='Nav-link' href='/'>Home</a>
        </li>}

        {user_id && <li className='Nav-item'>
          <button className='Nav-btn'onClick={()=>{
            localStorage.clear();
            navigate('/login')
          }} >Logout</button>
        </li>}

       {!user_id &&  <li className='Nav-item'>
          <a className='Nav-link' href='/signup'>Signup</a>
        </li>}

        {!user_id && <li className='Nav-item'>
          <a className='Nav-link' href='/login'>Login</a>
        </li>}

      </ul>

    </div>
  )
}

export default NavigationBar