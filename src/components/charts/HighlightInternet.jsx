import React, { useEffect, useState } from "react";
import BarHighKeinInternet from './HighlightInternetChart'
import '../../styles/highlight.css'


export default function HighInternetNutzung() {
    const [data, setData] = useState([]);
    const [number, setNumber] = useState("2008"); 
  
      useEffect(() => {
        fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/HighKI")
          .then(response => response.ok && response.json())
          .then(datazugang => {
            setData(datazugang);
            
          })
          .catch(console.error);
      }, [number]); 

      return (
        <div className="highlightWrap">
          <div className="buttonWrap">
                    <button onClick={() => setNumber("2008") } className="buttonIn"  type="submit" >2008</button>
                    <button onClick={() => setNumber("2014") } className="buttonIn"  type="submit" >2014</button>
                    <button onClick={() => setNumber("2019") } className="buttonIn"  type="submit" >2019</button>
          </div>
          <BarHighKeinInternet data={data} property={number}></BarHighKeinInternet>
        </div>
        );
}
