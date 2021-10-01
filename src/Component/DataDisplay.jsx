import React, { useState, useEffect } from "react";
import "./DataDisplay.css";

const DataDisplay = () => {
  const [stateData, setStateData] = useState([]);

  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      const { statewise } = await res.json();
      setStateData(statewise);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCovidData();

    return () => {
      setStateData([]);
    };
  }, []);
  return (
    <>
      <div className="mainDiv"></div>
      <div className="headingDiv">
        <h1>
          COVID-<span className="text-danger">19</span> Live data Statewise
        </h1>

        <hr className="hrS" />
      </div>
      <div className="container table-border">
        <table className="table table-hover ">
          <thead className="table-dark text-align-center position">
            <tr className="text-align-center text-capitalize">
              <th>state</th>
              <th>confirmed</th>
              <th>recovered</th>
              <th>deaths</th>
              <th>active</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {stateData.length >=1 ? (
              stateData.map((creValue, index) => {
                return (
                  <>
                    <tr key={index} className="tableData">
                      <td className="greenHover">{creValue.state}</td>
                      <td className="greenHover">{creValue.confirmed}</td>
                      <td className="greenHover">{creValue.recovered} </td>
                      <td className="redHover"> {creValue.deaths} </td>
                      <td className="greenHover">{creValue.active}</td>
                      <td className="greenHover">{creValue.lastupdatedtime}</td>
                    </tr>
                  </>
                );
              })
            ):(
              <p className="text-danger pera">no data found</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DataDisplay;
