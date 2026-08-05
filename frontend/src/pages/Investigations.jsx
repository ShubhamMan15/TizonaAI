import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";


const API_BASE = "http://127.0.0.1:8000/api";


function Investigations() {


  const [investigations, setInvestigations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const loadInvestigations = async () => {


    try {


      setLoading(true);

      setError("");



      const response = await axios.get(
        `${API_BASE}/investigations`
      );


      setInvestigations(
        response.data
      );


    }


    catch(error) {


      console.error(
        "Investigation API Error:",
        error
      );


      setError(
        "Unable to load investigations"
      );


    }


    finally {


      setLoading(false);


    }


  };



  useEffect(()=>{


    loadInvestigations();


  },[]);




  const severityClass = (risk)=>{


    if(risk >= 90)
      return "critical";


    if(risk >= 70)
      return "high";


    return "medium";


  };




  return (


    <div className="dashboard">



      <h1>
        🔎 Investigation Center
      </h1>



      <p>
        Manage security investigations, IOC analysis and analyst findings.
      </p>




      <div className="card">


        <div className="section-header">


          <h2>
            Active Investigations
          </h2>


          <button
            className="investigate-btn"
            onClick={loadInvestigations}
          >

            Refresh

          </button>


        </div>





        {
          loading &&

          <p>
            Loading investigations...
          </p>

        }





        {
          error &&

          <p className="error">

            {error}

          </p>

        }





        {
          !loading &&
          investigations.length === 0 &&

          <p>

            No investigations found.

          </p>

        }






        {

        !loading &&
        investigations.length > 0 &&



        <table>


          <thead>


            <tr>


              <th>
                ID
              </th>


              <th>
                IOC
              </th>


              <th>
                Type
              </th>


              <th>
                Risk Score
              </th>


              <th>
                Status
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>






          <tbody>


          {

            investigations.map(
              (item)=>(


              <tr key={item.id}>


                <td>
                  {item.id}
                </td>



                <td>
                  {item.ioc}
                </td>



                <td>
                  {item.ioc_type}
                </td>




                <td>


                  <span
                  className={
                    `severity ${severityClass(item.risk_score)}`
                  }
                  >

                    {item.risk_score}

                  </span>


                </td>




                <td>

                  {item.reputation || "Unknown"}

                </td>





                <td>


                  <div className="action-group">


                  <button
                  className="investigate-btn"
                  onClick={()=>{

                    window.open(
                    `${API_BASE}/investigations/${item.id}/report`,
                    "_blank"
                    );

                  }}

                  >

                    Report

                  </button>





                  <button
                  className="investigate-btn"
                  onClick={()=>{

                    window.open(
                    `${API_BASE}/investigations/${item.id}/report/pdf`,
                    "_blank"
                    );

                  }}

                  >

                    PDF

                  </button>





                  <button
                  className="investigate-btn"
                  onClick={()=>{

                    window.open(
                    `${API_BASE}/investigations/${item.id}/report/json`,
                    "_blank"
                    );

                  }}

                  >

                    JSON

                  </button>



                  </div>


                </td>




              </tr>


              )

            )

          }



          </tbody>



        </table>


        }



      </div>


    </div>


  );


}



export default Investigations;
