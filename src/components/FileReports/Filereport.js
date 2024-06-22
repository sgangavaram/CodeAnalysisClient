// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// function Filereport() {
//     const location = useLocation();
//      const [reportLists,setReportLists]=useState([]);
//     useEffect(()=>{
//         const state = location.state;
//         const id = state.id;
//         const url = `https://localhost:7079/api/Dashboard/getReportById?id=${id}`
//         axios
//             .get(url)
//             .then(res=>{
//                  console.log(res.data.value.payload.reportsList);
//                      setReportLists(res.data.value.payload.reportsList);
//                      console.log(reportLists);
//             })
//             .catch(err=>{
//                 console.log("Error : ", err)
//             })
//     },[])
//   return (
//     <div>
//       <h2 className='text-center pt-3'>File wise Reports</h2>
//     </div>
//   )
// }
// export default Filereport

import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { TbBellRingingFilled } from "react-icons/tb";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Filereport.css'
const Filereport = () => {
  const location = useLocation();
  const [reportLists, setReportLists] = useState([]);
  const [expandedReports, setExpandedReports] = useState({});

  useEffect(() => {
    const state = location.state;
    if (state && state.id) {
      const id = state.id;
      const url = `https://localhost:7079/api/Dashboard/getReportById?id=${id}`;
      axios
        .get(url)
        .then(res => {
          console.log("API Response:", res.data);
          if (res.data && res.data.value && res.data.value.payload && res.data.value.payload.reportsList) {
            setReportLists(res.data.value.payload.reportsList);
          } else {
            console.log("Unexpected response structure:", res.data);
          }
        })
        .catch(err => {
          console.log("Error fetching report data:", err);
        });
    } else {
      console.log("No ID found in location state");
    }
  }, [location.state]);

  const toggleReport = (fileName) => {
    setExpandedReports((prevState) => ({
      ...prevState,
      [fileName]: !prevState[fileName]
    }));
  };
  console.log(reportLists)

  return (
    <div className='overflow-y-auto h-100 px-5'>
      <h2 className='text-center pt-3'>File wise Reports</h2>
      {(reportLists.length > 0) ? (
        <div className='report-list'>
          {reportLists.map((report, index) => (
            <div key={index} className='report-item'>
              <div className='report-header' onClick={() => toggleReport(report.name)}>
                <p>
                  <sapn className='me-3'>{report.name}</sapn>    
                  {expandedReports[report.name] ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                  {report.hasPrivateKeys && <span className='text-danger mx-3'><TbBellRingingFilled/></span>}
                  {report.score < 60 && <span className='text-warning mx-3'><IoWarning /></span>}
                </p>
              </div>
              {expandedReports[report.name] && (
                <div className='report-details'>
                  <p><strong>"path": </strong> <span className='g1'>{ report.path}</span>,</p>
                  <p><strong>"message":</strong> <span className='g1'>{report.message}</span>,</p>
                  <p><strong>"length":</strong> <span className='g2'>{report.length}</span>,</p>
                  <p><strong>"number of Methods":</strong> <span className='g2'>{report.numberOfMethods}</span>,</p>
                  <p><strong>"number of Comments":</strong><span className='g2'> {report.numberOfComments}</span>,</p>
                  <p><strong>"complexity":</strong> <span className='g2'>{report.complexity}</span>,</p>
                  <p><strong>"follows Naming Conventions":</strong>{
                        report.followsNamingConventions ?
                         <span className='g1'>Yes</span> : 
                         <span className='g3'>No</span>
                      },
                  </p>
                  <p><strong>"has Error Handling":</strong> {
                        report.hasErrorHandling ?
                          <span className='g1'>Yes</span> : 
                          <span className='g3'>No</span>
                      },
                  </p>
                  <p><strong>"has Code Duplication":</strong> {
                        report.hasCodeDuplication ? 
                          <span className='g3'>Yes</span> : 
                          <span className='g1'>No</span>
                      },
                  </p>
                  <p><strong>"has Good Comments":</strong> {
                        report.hasGoodComments ? 
                          <span className='g1'>Yes</span> :   
                          <span className='g3'>No</span>
                      },</p>
                  <p><strong>"has Consistent Formatting":</strong> {
                        report.hasConsistentFormatting ? 
                          <span className='g1'>Yes</span> : 
                          <span className='g3'>No</span>
                      },</p>
                  <p><strong>"has Private Keys":</strong> {
                        report.hasPrivateKeys ? 
                          <span className='g3'>Yes</span> : 
                          <span className='g1'>No</span>
                      },</p>
                  <p><strong>"follows File Name Conventions":</strong> {
                        report.followsFileNameConventions ? 
                          <span className='g1'>Yes</span> : 
                          <span className='g3'>No</span>
                      },</p>
                  <p><strong>"score":</strong><span className={report.score >= 60 ?'g1':'g3'}>{report.score}</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
}

export default Filereport;
