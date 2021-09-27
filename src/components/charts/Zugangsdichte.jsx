import React, { useEffect, useState } from "react";
import LineChartContainer from './ZugangsdichteChart'
import '../../styles/charts.css'


export default function Zugangsdichte(props) {

  const [colorline, setColor] = useState("#2671bb");
  const [colorline2, setColor2] = useState("#da26da");
  const [data, setData] = useState([]);
  const [property, setProperty] = useState("Europäische Union");
  const [change, setChange] = useState("ZD");
  const [value, setValue] = useState("alle");

  const handleAlle = () => {
    setChange("ZD");
    setColor("#2671bb");
    setValue("alle");
  }  
  const handleBB = () => {
    setChange("ZD-BB");
    setColor2("#da26da");
    setValue("BB");
  }


  useEffect(() => {
    fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/ZD`)
      .then(response => response.ok && response.json())
      .then(datazugang => {
        setData(datazugang);
      })
      .catch(console.error);
  }, [change, colorline]);

    return (
        <div className="chart1">
        <div className="Zugangsdichte">     
        </div>
        
        <React.Fragment>
        <div className="elementsWrap">
        <div className="buttonWrap">
                    
                  <button className="btn-default" onClick={handleAlle} >alle</button>
                  <button className="btn-primary" onClick={handleBB}>Breitband</button> 

          </div>
          <select value={property} onChange={e => setProperty(e.target.value)}>
              {data.map(dataZugang => (
                  <option key={dataZugang.geo}>{dataZugang.geo}</option>
               ))}
         </select>
                </div>      
        <LineChartContainer property={property} data={data} colorline={colorline} colorline2={colorline2} value={value}/>  
        </React.Fragment>
        {//InfoBoxen
        }
        <div className="infobox">
            <div className="infoWrap">
              <div className="numberBox">
                <p className="numberAlle">{props.numberAlle}</p>
                    <p className="numberText2">{props.numberAlleText}</p>
              </div>
              <div className="numberBox">
                  <p className="numberBB">{props.numberBB}</p>
                      <p className="numberText2">{props.numberBBText}</p></div>
        </div> 

                <p className="box1">{props.infoBoxAlle}</p>   
                    </div>
        </div>
    );

}