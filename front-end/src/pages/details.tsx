import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/details.css'

interface Option {
  name: string;
  date: string;
  details: string;
  reused: string;

}
const Details: React.FC = () => {
  let location: any = useLocation()
  var launch: any = location.state.launch;
  const [data, setdata] = useState<Option>({ name: "", date: "", details: "", reused: "" });

  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/launches/${launch}`)
      .then((res) => {
        var datas = res.data;
        let reused: string = datas.fairings != null ? datas.fairings.reused : ""
        const obj: Option = { name: datas.name, date: datas.date_local, details: datas.details, reused: reused }
        // data.push(obj)
        setdata(obj)


        console.log(data)
      })



  }, [])
  return (
    <>
      <h1>Details</h1>
      <div className="top">

        <p>Name : {data.name}</p>
        <p>Date : {data.date}</p>
        <p>Details : {data.details}</p>
        <p>reused : {data.reused ? data.reused : "no info "}</p>

      </div>
    </>
  );
}

export default Details;
