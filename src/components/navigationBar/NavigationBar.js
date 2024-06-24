import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import React, { useEffect, useState } from 'react';

function NavigationBar() {
  const [user_id, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const memory = localStorage.getItem('user_id');
    setUserId(memory);
    if (memory == null) {
      if (window.location.pathname !== '/signup') {
        navigate('/login');
      }
    }
  }, [localStorage.getItem('user_id')]);  

  return (
    <div className='nav-main'>

      <div className='nav-brand'>
        <h2>
          <img 
            src="https://i.ibb.co/tcQL7VC/logo2.png" 
            alt="Logo" 
            className='nav-logo'
          />
          CodeGuardian
        </h2>
      </div>

      <ul className='nav-list'>

        {user_id && (
          <li className='nav-item'>
            <a className='nav-link' href='/'>Home</a>
          </li>
        )}

        {user_id && (
          <li className='nav-item'>
            <button className='nav-btn' onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}>Logout</button>
          </li>
        )}

        {!user_id && (
          <li className='nav-item'>
            <a className='nav-link' href='/signup'>Signup</a>
          </li>
        )}

        {!user_id && (
          <li className='nav-item'>
            <a className='nav-link' href='/login'>Login</a>
          </li>
        )}

      </ul>

    </div>
  );
}

export default NavigationBar;
