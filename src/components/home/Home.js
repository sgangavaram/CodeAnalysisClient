import './Home.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const { register, handleSubmit } = useForm();
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [passedReports, setPassedReports] = useState(0);
  const [failedReports, setFailedReports] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    axios.get(`https://codeanalysis.azurewebsites.net/api/Dashboard/getAllReports?user_id=${user_id}`)
      .then((res) => {
        const allReports = res.data.value.payload || [];
        setReports(allReports);
        setTotalReports(allReports.length);
        const passed = allReports.filter(report => (+report.avgScore >= 60 && !report.criticalErrors)).length;
        setPassedReports(passed);
        setFailedReports(allReports.length - passed);
      })
      .catch(err => {
        console.log('Error occurred: ', err);
      });
  }, []);

  const onSubmit = (data) => {
    const user_id = localStorage.getItem('user_id');
    const repo_name = data.repo_name;
    const url = `https://codeanalysis.azurewebsites.net/api/Dashboard/getAllReports?user_id=${user_id}&repo_name=${repo_name}`;

    axios.get(url)
      .then((res) => {
        const repoReports = res.data.value.payload || [];
        setReports(repoReports);
        setTotalReports(repoReports.length);
        const passed = repoReports.filter(report => (+report.avgScore >= 60 && !report.criticalErrors)).length;
        setPassedReports(passed);
        setFailedReports(repoReports.length - passed);
      })
      .catch(err => {
        console.log('Error occurred: ', err);
      });
  }

  const data = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: '# of Reports',
        data: [passedReports, failedReports],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

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

      {/* Statistics */}
      <div className='statistics'>
        <h6>Total Reports Generated: {totalReports}</h6>
        <div className='chart-container'>
          <Pie data={data} />
        </div>
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
