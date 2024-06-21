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
    <div className='overflow-y-auto h-100'>
      <h2 className='text-center pt-3'>File wise Reports</h2>
      {(reportLists.length > 0) ? (
        <div className='report-list'>
          {reportLists.map((report, index) => (
            <div key={index} className='report-item'>
              <div className='report-header' onClick={() => toggleReport(report.name)}>
                <p>{report.name}</p>
              </div>
              {expandedReports[report.name] && (
                <div className='report-details'>
                  <p><strong>"path": </strong> <span className='g1'>{ report.path}</span>,</p>
                  <p><strong>"message":</strong> <span className='g1'>{report.message}</span>,</p>
                  <p><strong>"length":</strong> <span className='g3'>{report.length}</span>,</p>
                  <p><strong>"number of Methods":</strong> <span className='g3'>{report.numberOfMethods}</span>,</p>
                  <p><strong>"number of Comments":</strong><span className='g3'> {report.numberOfComments}</span>,</p>
                  <p><strong>"complexity":</strong> <span className='g3'>{report.complexity}</span>,</p>
                  <p><strong>"follows Naming Conventions":</strong> <span className='g2'>{report.followsNamingConventions ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"has Error Handling":</strong> <span className='g2'>{report.hasErrorHandling ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"has Code Duplication":</strong><span className='g2'> {report.hasCodeDuplication ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"has Good Comments":</strong> <span className='g2'>{report.hasGoodComments ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"has Consistent Formatting":</strong> <span className='g2'>{report.hasConsistentFormatting ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"has Private Keys":</strong> <span className='g2'>{report.hasPrivateKeys ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"follows File Name Conventions":</strong> <span className='g2'>{report.followsFileNameConventions ? 'Yes' : 'No'}</span>,</p>
                  <p><strong>"score":</strong><span className='g3'>{report.score}</span></p>
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
