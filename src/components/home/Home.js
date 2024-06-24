import './Home.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function Home() {
  const { register, handleSubmit } = useForm();
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const user_id = localStorage.getItem('user_id');
    const repo_name = data.repo_name;
    const url = `https://localhost:7079/api/Dashboard/getAllReports?user_id=${user_id}&repo_name=${repo_name}`;

    axios.get(url)
      .then((res) => {
        if (res.data.value.success) setReports(res.data.value.payload);
        else setReports([]);
      })
      .catch(err => {
        console.log('Error occurred: ', err);
      });
  }

  return (
    <div className='home-main'>
      {/* SEARCH FORM */}
      <div className='search-bar'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='search-input'>
            <input
              type='search'
              placeholder='Search Repository'
              {...register("repo_name", { required: true })}
            />
          </div>
          <div className='search-btn'>
            <input type='submit' value='Search' />
          </div>
        </form>
      </div>

      {/* Report displayer */}
      <table className='reports-table'>
        <thead className='reports-head'>
          <tr>
            <th>Time Stamp</th>
            <th>Average Score (*req:60)</th>
            <th>Critical Error</th>
            <th>Pipeline Status</th>
            <th>See More</th>
          </tr>
        </thead>
        <tbody className='reports-body'>
          {reports?.length > 0 && reports.map(report => (
            <tr key={report.id} className='reports-row'>
              <td>{report.timestamp}</td>
              <td>
                <span className={(+report.avgScore >= 60) ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                  {report.avgScore}
                </span>
              </td>
              <td>
                {report.criticalErrors ? <span className='text-danger fw-bold'>YES</span> : <span className='text-success fw-bold'>NO</span>}
              </td>
              <td>
                {(+report.avgScore >= 60 && !report.criticalErrors) ? <span className='text-success fw-bold'>Passed</span> : <span className='text-danger fw-bold'>Failed</span>}
              </td>
              <td>
                <button
                  className='btn py-1 border-none'
                  onClick={() => navigate('/filereports', { state: { id: report.id } })}
                >
                  See More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
