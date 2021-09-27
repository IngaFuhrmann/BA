import React, { useEffect, useState } from "react";
import AreaChartContainer from './IKTBeschäftigungChart'
import Card from '../Cards'
import '../../styles/charts.css'


export default function IKTBeschäftigung(props) {
  
    const [data, setData] = useState([]);
    const [id, setID] = useState(["IKTGen"]);
    const [value1, setValue1] = useState(["Männer"]);
    const [value2, setValue2] = useState(["Frauen"]);
    const [color1, setColor1] = useState(["#6810d4"]);
    const [color2, setColor2] = useState(["#d043ee"]);
    const [property, setProperty] = useState("Europäische Union");

    const handleFirst = () => {
        setValue1("Männer");
        setValue2("Frauen");
        setColor1("#6810d4");
        setColor2("#d043ee");
        setID("IKTGen")
      } 
     
      const handleSecond = () => {
        setValue1("Beschäftigung");
        setValue2("Einstellung");
        setColor1("#203040");
        setColor2("#2671bb");
        setID("IKTBesch")
      } 

    useEffect(() => {
        fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/dataviztest-bbcvc/service/viz/incoming_webhook/${id}`)
         .then(response => response.ok && response.json())
         .then(dataResp => {
           setData(
              dataResp
            );
          })
          .catch(console.error);
      }, [id, value1, value2, color1, color2]);


    return (
            <div className="chart4">
                <div className="IKTWrapping">
                        <div className="IKTHeadLine">
                            <div className="IKTgHead">
                            <h1>{props.headLine}</h1>
                            </div>
                            <div className="IKTText">
                                <p>
                                {props.iktText1}
                                <br></br> <br></br>
                                {props.iktText2}
                                <br></br> <br></br>
                                {props.iktText3}
                                </p>
                            </div>
                        </div>
                        <div className="SelBox">
                        <select value={property} onChange={e => setProperty(e.target.value)}>
                            {data.map(dataZugang => (
                            <option key={dataZugang.geo}>{dataZugang.geo}</option>
                            ))}
                        </select>
                        </div>
                        </div>
                        <div className="ChartIKTWrap">
                            <div className="ChartIKT">
                            <AreaChartContainer property={property} data={data} value1={value1} value2={value2} color1={color1} color2={color2}></AreaChartContainer>
                            </div>
                        <div className="ChartIKTCards">
                            <Card handle={handleFirst} 
                            headCard="IKT-Spezialisten nach Geschlecht"
                            classFirst="dataRecordM"
                            classSecond="dataRecordF"
                            firstValue="Männer"
                            secondValue="Frauen"
                            cardText=" Diese Visualisierung zeigt die Unterschiede bei den erwerbstätigen IKT-Spezialisten aufgeschlüsselt nach Geschlecht.">
                                
                            </Card>
                            <Card handle={handleSecond} 
                            headCard="IKT-Beschäftigung in Unternehmen"
                            classFirst="dataRecordBesch"
                            classSecond="dataRecordBes"
                            firstValue="beschäftigt"
                            secondValue="eingestellt"
                            cardText=" Die Visualisierung zeigt den Anteil von Unternehmen, die IKT-Fachkräfte versucht haben einzustellen oder tatsächlich eingestellt haben. Die Daten beziehen sich auf alle Unternehmen mit 10 Beschäftigten oder mehr (ohne Bankensektor).">

                            </Card>
                            <div></div>
                        </div>
                        </div>
            </div>

    );
}