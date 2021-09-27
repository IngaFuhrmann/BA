import React, { useRef, useEffect} from "react";
import { select, scaleOrdinal, scaleLinear, scaleBand, axisBottom, axisLeft, entries } from 'd3';
import useResizeObserver from "./useReziseObserver";
import '../../styles/highlight.css'


function BarHighInternet({ data, number}) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);

   useEffect(() => {

    const svg = select(svgRef.current);
  var filter;
    if(!dimensions) return;

    for(var i = 0; i < data.length; i ++) {
     filter = data[i].time; 
    }
    var vales= entries(filter);

    const xScale = scaleLinear()
    .domain([0, 100])
   .range([0, dimensions.width])
   
    const yScale =  scaleBand()
   .domain(data.map((value, index) => value.age))
   .range([0, dimensions.height - 100])
   .padding(0.2)

   var color = scaleOrdinal()
   .domain(data.map((value, index) => value.age))
   .range(["#2770bc", "#6810d4", "#ca27cb"])

   const xAxis = axisBottom(xScale).ticks(5).tickSize(0).tickPadding(10);
       svg
       .style('font-size', '11')
       .style('color', 'white')
        .select(".x-axis")
        .call(xAxis);
    
        svg.select(".domain").remove()

        svg.select(".x-axis")
        .attr('transform', 'translate(0,' + dimensions.height + ')')

     const yAxis = axisLeft(yScale)  
          svg
            .select(".y-axis")
            .remove()

    

   
}, [data, dimensions]);
return (
 <div className="chartHigh" ref={wrapperRef}>
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
);
}

export default BarHighInternet;