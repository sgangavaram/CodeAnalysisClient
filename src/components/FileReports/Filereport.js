import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Filereport() {
    const location = useLocation();
     const [reportLists,setReportLists]=useState([]);
    useEffect(()=>{
        const state = location.state;
        const id = state.id;
        const url = `https://localhost:7079/api/Dashboard/getReportById?id=${id}`
        axios
            .get(url)
            .then(res=>{
                 console.log(res.data.value.payload.reportsList);
                     setReportLists(res.data.value.payload.reportsList);
                     console.log(reportLists);
            })
            .catch(err=>{
                console.log("Error : ", err)
            })

    },[])
  return (
    <div>Filereport</div>
  )
}

export default Filereport