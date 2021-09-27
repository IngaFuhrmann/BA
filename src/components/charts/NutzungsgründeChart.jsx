import React, { useRef, useEffect} from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand,} from 'd3';
import useResizeObserver from "./useReziseObserver";


function BarNutzungsGründe({ data, property, year }) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);
  
   useEffect(() => {

    const svg = select(svgRef.current);
     
    if(!dimensions) return;

    const xScale = scaleLinear()
    .domain([0, 100])
   .range([0, dimensions.width])
   
  
    const yScale =  scaleBand()
   .domain(data.map((value, index) => value.geo))
   .range([20, dimensions.height ])
   .padding(0.1)

   const xAxis = axisBottom(xScale).ticks(4);
       svg
       .style('font-size', '10')
       .style('color', 'grey')
     .select(".x-axis")
     .call(xAxis);
    
     const yAxis = axisLeft(yScale)
           
          .tickPadding(5)
          .tickSizeOuter(0)
          .tickSizeInner(0);
          svg
            .select(".y-axis")
            .style('font-size', '10')
            .style('color', 'grey')
            .call(yAxis)
          
            
          const nutzBars = svg.selectAll(".bar")
          .data(data)
          .join("rect")
          .attr("class", "bar")
          .attr("fill", "grey")
          .style("margin-top", "10px")

          nutzBars
          .transition()
          .duration(500)
          .attr('x', xScale(0))
          .attr('y', (s) => yScale(s.geo))
          .attr('width', (s) => xScale(s[property][Object.keys(s[property])[year]]))
          .attr('height', yScale.bandwidth)
          
          nutzBars.on("mouseenter", (value, index) => {
            svg
              .selectAll(".tooltip")
              .data([value])
              .join(enter => enter.append("text"))
              .attr("class", "tooltip")
              .text(value[property][Object.keys(value[property])[year]] + "%")
              .attr("x", xScale(value[property][Object.keys(value[property])[year]]) - 30)
              .attr("y", yScale(value.geo) + yScale.bandwidth() / 1.4)
              .attr("opacity", 1)
              .transition()
              .attr("fill", "white")
            })
            .on("mouseleave", () => 
              svg.select(".tooltip").remove()
              .transition() )
            
            .on("click", clicked)

            function clicked(d,i) {
              svg.selectAll('rect').attr('fill', "grey");
              select(this).transition().attr("fill", "#2770bc");
            }
   
}, [data, dimensions, property, year]);
return (
 <div className="chartWrap" ref={wrapperRef} style={{height: 650, width: 600}} >
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
);
}

export default BarNutzungsGründe;