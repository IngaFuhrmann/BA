import React, { useEffect, useState } from "react";
import LineChartContainer from './MobilnutzungChart'
import BarChartContainer from './MobilChartAlter'
import PieChartContainer from './MobilChartBildung'
import NumberContainer from './MobilChartGeschlecht'
import '../../styles/charts.css'

function Mobilnutzung(props) {
  
  const [data, setData] = useState([]);
  const [dataAge, setDataAge] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [dataG, setDataG] = useState([]);
  const [property, setProperty] = useState("Europäische Union");
  const [colorline, setColor] = useState("#2671bb");
  const [number, setNumber] = useState(1);
  const genF = "Frauen";
  const genM = "Männer";
  


  useEffect(() => {
    fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/webhook1")
      .then(response => response.ok && response.json())
      .then(datazugang => {
        setData(datazugang);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/MN-Age")
      .then(response => response.ok && response.json())
      .then(datazugang1 => {
        setDataAge(
          datazugang1.sort((a, b) => a.age.localeCompare(b.age))
        );
      })
      .catch(console.error);
  }, [number]);

  useEffect(() => {
    fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/MN-Edu")
      .then(response => response.ok && response.json())
      .then(datazugang2 => {
        setDataB(datazugang2);
      })
      .catch(console.error);
  }, [number]);

  useEffect(() => {
    fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/MN-Gen")
      .then(response => response.ok && response.json())
      .then(datazugang3 => {
        setDataG(datazugang3);
      })
      .catch(console.error);
  }, [number]);


  return (
    <React.Fragment>
      <div className="chart2">
        <div className="HeadlineWrapp">
          <div className="HeadMobildichte">
            <div className ="MobildichteHeadline">
              <h1>{props.headline}</h1>
            </div>
            <div className ="MobildichteText">
              <p> {props.mobilText}</p>
            </div>
            </div>
            <select value={property} onChange={e => setProperty(e.target.value)}>
              {data.map(dataZugang => (
                   <option key={dataZugang.geo}>{dataZugang.geo}</option>
              ))}
            </select>
          </div>
          <div className="chartBody">
             <LineChartContainer property={property} data={data} colorline={colorline}/>
          </div>
          <div className="Jahre">
              <button onClick={() => setNumber(0) } type="submit" className="jButton">2012</button>
              <button onClick={() => setNumber(1) } type="submit" className="jButton">2013</button>
              <button onClick={() => setNumber(2) } type="submit" className="jButton">2014</button>
              <button onClick={() => setNumber(3) } type="submit" className="jButton">2015</button>
              <button onClick={() => setNumber(4) } type="submit" className="jButton">2016</button>
              <button onClick={() => setNumber(5) } type="submit" className="jButton">2017</button>
              <button onClick={() => setNumber(6) } type="submit" className="jButton">2018</button>
              <button onClick={() => setNumber(7) } type="submit" className="jButton">2019</button>
            </div>
          <div className="specialCharts">
           
            <div className="BarAge">
              <h5>Alter</h5>
                <BarChartContainer property={property} data={dataAge} number={number}/>
            </div>
            <div className="PieEd">
            <div className="ChartEd">
              <h5>Bildung</h5>
              <PieChartContainer property={property} data={dataB} number={number}/>
              </div>
              </div>
          <div className="MaleFemale">
          <div className="NumberHeader">
            <h5>Geschlecht</h5>
          </div>
          <div className="Number">
              <div className="Frau">
                  <NumberContainer property={property} data={dataG} gen={genF} number={number}/>
                  <div className="frauenName">
                    <p className="gender">Frauen</p>
                    <p className="alter">16 bis 74 Jahre</p>
                  </div>
              </div>
              <div className="Mann">
                 <NumberContainer property={property} data={dataG} gen={genM} number={number}/>
              <div className="männerName">
                <p className="gender">Männer</p>
                <p className="alter">16 bis 74 Jahre</p>
              </div>
              </div>
          </div>
            
          </div>
              </div>
          <div className="NutzungTextWrap">
            <div className="NutzungText"></div>
            {props.mobilText2}
            <br></br>
            <br></br>
            {props.mobilText3}
            <br></br>
            <br></br>
            {props.mobilText4}

          </div>
          </div>
      </React.Fragment>
  )

}

export default Mobilnutzung;