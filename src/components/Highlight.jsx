import React from 'react';
import '../styles/highlight.css'

export default function Highlight(probs) {    
    return (
    <div className="highlight">
        <div className="highlightwrapper">
    <h3> {probs.├╝berschrifth3}</h3>
    <h4 > {probs.├╝berschrift}</h4>
    <p >{probs.text}</p>
        {probs.hichart1}
    </div>  
    </div>
    );
}