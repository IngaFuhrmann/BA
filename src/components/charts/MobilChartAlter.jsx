import React, { useRef, useEffect} from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleOrdinal, scaleBand} from 'd3';
import useResizeObserver from "./useReziseObserver";


function BarMobilNutzung({ data, property, number }) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);

   useEffect(() => {

    const svg = select(svgRef.current);
     
         if(!dimensions) return;

        //Daten filtern
        var filtered = data.filter(a=>a.geo==property);

         const xScale = scaleLinear()
         .domain([0, 100])
        .range([0, dimensions.width])
        
         const yScale =  scaleBand()
        .domain(data.map((value, index) => value.age))
        .range([0, dimensions.height - 100])
        .padding(0.2)

        var color = scaleOrdinal()
        .domain(data.map((value, index) => value.age))
        .range(["#2770bc","#5d8dbe","#9aadc2"])

         const xAxis = axisBottom(xScale);
         svg
          .select(".x-axis")
          .remove()

          const yAxis = axisLeft(yScale)
          .tickSizeOuter(0)
          .tickSizeInner(0);
          svg
            .select(".y-axis")
            .style('font-size', '14')
            .style("font-weight", "bold")
            .style('color', 'grey')
            .call(yAxis);

            //Background der Balken
            svg.selectAll(".bars")
            .data(filtered)
            .join("rect")
            .attr("class", "bars")
            .attr("fill",  '#cdcdcd')
            .style("margin-top", "10px")
            
            .attr('x', xScale(0))
            .attr('y', (s) => yScale(s.age))
            .attr('width', xScale(100))
            .attr('height', yScale.bandwidth) 

          //Balken zeichnen
         var barsEd= svg
          .selectAll(".bar")
          .data(filtered)
          .join("rect")
          .attr("class", "bar")
          .attr("fill",  function(d, i) { return color(i) })
          .style("margin-top", "10px")

          barsEd
          .transition()
          .duration(300)
          .attr('x', xScale(0))
          .attr('y', (s) => yScale(s.age))
          .attr('width', (s) => xScale(s.time[Object.keys(s.time)[number]]))
          .attr('height', yScale.bandwidth)
          
          barsEd.on("mouseenter", (value, index) => {
            svg
              .selectAll(".tooltip")
              .data([value])
              .join(enter => enter.append("text"))
              .attr("class", "tooltip")
              .text((s) => s.time[Object.keys(s.time)[number]] + "%")
              .attr("x", xScale(value.time[Object.keys(value.time)[number]]) + 5)
              .attr("y", yScale(value.age) + yScale.bandwidth() / 1.5)
              .attr("opacity", 1)
              .attr("font-size", "16px")
              .attr("font-weight", "bold")
              .attr("fill", "#4e4f50")
              .transition() 
            })
            
            .on("mouseleave", () => 
              svg.select(".tooltip").remove()
              .transition()
   )
         
  }, [data, dimensions, property]);
  return (
   <div ref={wrapperRef} >
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
);
}

export default BarMobilNutzung;