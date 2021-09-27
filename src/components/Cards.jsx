import React from 'react';
import '../styles/charts.css'

export default function Cards(props) {

    return (
        <button className="Cards" onClick={props.handle}>
        <p className="headIKT">{props.headCard}</p>
        <div className="DataWrap">
            <div className={props.classFirst}>{props.firstValue}</div>
            <div className={props.classSecond}>{props.secondValue}</div>
        </div>
        <p className="CardText">
        {props.cardText}
        </p>
    </button>
    );
}