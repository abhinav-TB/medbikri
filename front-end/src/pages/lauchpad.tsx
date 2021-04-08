import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/lauchpad.css';
import axios from 'axios';


interface content {
  name: string,
  status: string,
  details: string,
  launches: string[]

}

const Lauchpad: React.FC = () => {

  const [data, setdata] = useState<content[]>([]);

  useEffect(() => {

    axios.get('https://api.spacexdata.com/v4/launchpads')
      .then((res) => {
        var datas = res.data;
        datas.forEach((resp: any) => {

          const obj: content = { name: resp.name, status: resp.status, details: resp.details, launches: resp.launches.slice(0, 3) }
          // data.push(obj)
          setdata(data => [...data, obj])

        });
        console.log(data)
      })



  }, []);




  return (
    <div>
      <div>
        <h1><span className="blue">&lt;</span>Spacex<span className="blue">&gt;</span> <span className="yellow">LauchPad</span></h1>

        <table className="container">
          <thead>
            <tr>
              <th><h1>Name</h1></th>
              <th><h1>Status</h1></th>
              <th><h1>Details</h1></th>
              <th><h1>Launches</h1></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item: content) => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>{item.details}</td>
                    <td>
                      {
                        item.launches.length === 0 ?

                          <div>
                            No Launch Available

                      </div>

                          :
                          item.launches.map((launch: any) => {
                            return (
                              <Link to={
                                { pathname: '/details', state: { launch: launch } }

                              }>
                                <div key={launch}>
                                  {launch}
                                </div>
                              </Link>
                            )
                          })}
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Lauchpad;
