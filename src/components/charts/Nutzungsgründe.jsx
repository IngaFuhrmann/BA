import React, { useEffect, useState } from "react";
import ToggleSlider from '../ToggleSlider'
import BarChartContainer from './NutzungsgründeChart'
import '../../styles/charts.css'


export default function Nutzungsgründe(props) {

    const [data, setData] = useState([]);
    const [property, setProperty] = useState("SocialMedia");
    const [year, setYear] = useState("0");


    const toggle = () => {
        setYear(year === "0"? "1" : "0");
      }

    useEffect(() => {
        fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/NG")
          .then(response => response.ok && response.json())
          .then(datazugang => {
            setData(
              datazugang.sort((a, b) => a.geo.localeCompare(b.geo))
            );
          })
          .catch(console.error);
      }, [year]);

    return (
        <div className="chart3">
            <div className="NutzungHeadLine">
                <div className="NutzungHead">
            <h1>{props.headLine}</h1>
                </div>
                <div className="NutzungsText">
                    <p>
                    {props.nutzText1} 
                     <br></br>
                     <br></br>
                     {props.nutzText2} 
                     <br></br> 
                     <br></br>
                     {props.nutzText3}
                     <br></br>
                    </p>
                </div>
            </div>
            <div className="ChartBodyWrap">
                <div className="ChartBodyNutzung">
                    <BarChartContainer property={property} data={data} year={year}/>
                </div>
                <div className="ChartBodyIcons">
                    <div className="IconWrap">
                    <button onClick={() => setProperty("SocialMedia") } type="submit" className="iconButton">
                        <i className="fas fa-user fa-border"></i>
                        <div className="IconText">SocialMedia</div>
                        </button>
                    </div>

                    <div className="IconWrap">
                    <button onClick={() => setProperty("EMail") } type="submit" className="iconButton">
                        <i className="fas fa-envelope fa-border"></i>
                        <div className="IconText">E-Mail</div>
                    </button>
                    </div>

                    <div className="IconWrap">
                    <button onClick={() => setProperty("Banking") } type="submit" className="iconButton">
                        <i className="fas fa-money-bill-wave fa-border"></i>
                        <div className="IconText">Banking</div>
                        </button>
                    </div>

                    <div className="IconWrap">
                    <button onClick={() => setProperty("Services") } type="submit" className="iconButton">
                        <i className="fas fa-dolly fa-border"></i>
                        <div className="IconText">Services</div>
                        </button>
                    </div>

                    <div className="IconWrap">
                    <button onClick={() => setProperty("Gesundheit") } type="submit" className="iconButton">
                        <i className="fas fa-heartbeat fa-border"></i>
                        <div className="IconText">Gesundheit</div>
                        </button>
                    </div>

                    <div className="IconWrap">
                    <button onClick={() => setProperty("Website") } type="submit" className="iconButton">
                        <i className="fas fa-globe fa-border"></i>
                        <div className="IconText">Website</div>
                        </button>
                      
                    </div>
                </div>
               
            </div>

            <ToggleSlider textLinks={2011} textRechts={2019} handleClick={toggle}></ToggleSlider>
            
        </div>    
    );
}