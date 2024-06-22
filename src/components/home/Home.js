// all reports link : 'https://localhost:7079/api/Dashboard/getAllReports?user_id=Thoparam-sai-nithish&repo_name=CodeAnalysis'
import './Home.css'
import axios from 'axios';
import './Home.css'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';


function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [reports, setReports] = useState([]);
   const navigate= useNavigate();
  const onSubmit = (e)=>{
    console.log(e)
    const user_id = localStorage.getItem('user_id')
    const repo_name = e.target.value;
    const url = `https://localhost:7079/api/Dashboard/getAllReports?user_id=${user_id}&repo_name=${repo_name}`
    console.log(url)
    axios.get(url)
    .then((res)=>{
      console.log('response : ', res.data)
      if(res.data.value.success) setReports(res.data.value.payload)
      else setReports([])
    })
    .catch(err=>{
      console.log('error occured : ', err)
    })

  }

  return (
    <div className='home-main'>

      {/* SEARCH FORM */}
      <div className='search-bar'>
        <form onSubmit={handleSubmit(onSubmit)} >

        <div className='search-btn'>
            <h2>Repo Name :</h2>
          </div>

          {/* Search Box */}
          <div className='search-input'>
              <input
                type='search' 
                placeholder='Search Repository'
                {...register("repo_name", { required: true })}
                onChange={(e)=>onSubmit(e)} 
              />
              {/* {errors.repo_name && <span>Enter the Repository Name</span>} */}
          </div >
          {/* Search Button */}
          {/* <div className='search-btn'>
            <input
              type='submit'
              value={'Search'}
            />
          </div> */}
        </form>
      </div>

      {/* Report displayer */}
      <table 
        className='reports-table '
      >
        <thead className='reports-head'>
  
          <th>Time Stamp</th>
          <th>Average Score (*req:60)</th>  
          <th>Critical Error</th>
          <th>Pipeline Status</th>
          <th>See More</th>
          
        </thead>
        <tbody className='reports-body'>
        {reports?.length>0 && reports?.map(report=>(
          <tr 
            key={report.id}
            className='reports-row'             
          >
            <td>{report.timestamp}</td>
            <td>{<span className={((+report.avgScore)>=60)?'text-success':'text-danger'}>{report.avgScore}</span>}</td>
            <td>{report.criticalErrors ? <span className='text-danger'>YES</span> : <span className='text-success'>NO</span>}</td>
            <td>{((+report.avgScore) >=60 && report.criticalErrors===false)?<span className='text-success'>Passed</span>:<span className='text-danger'>Failed</span>}</td>
            <td>
              <button 
                className='btn py-1 border-none' 
                onClick={()=>navigate('/filereports', { state: { id: report.id } })}
                >
                  See More
                </button>
              </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  )
}

export default Home