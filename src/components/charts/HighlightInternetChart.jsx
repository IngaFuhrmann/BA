import React, { useRef, useEffect} from "react";
import { select,entries, axisBottom, axisLeft, scaleLinear, scaleOrdinal, scaleBand} from 'd3';
import useResizeObserver from "./useReziseObserver";
import '../../styles/highlight.css'


function BarHighKeinInternet({data, property}) {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
 
    useEffect(() => {

      if(!dimensions) return;

     const svg = select(svgRef.current);
     var filterme; 

     //Daten sortieren
     var filtered = data.filter(a=>a.time==property);
                
        for(var i = 0; i < filtered.length; i ++) {
            filterme = filtered[i].gründe; 
             }

       var vales = entries(filterme);

       //Achsen
        const xScale = scaleLinear()
        .domain([0, 50])
       .range([0, dimensions.width])
       
        const yScale =  scaleBand()
       .domain(vales.map((value, index) => value.key))
       .range([0, dimensions.height])
       .padding(0.3)
       
       var color = scaleOrdinal()
       .domain(vales.map((value, index) => value.value))
       .range(["#d57be8"])

       const xAxis = axisBottom(xScale);
       svg
          .select(".x-axis")
          .remove()

       const yAxis = axisLeft(yScale)
          .tickSizeOuter(0)
          .tickSizeInner(0)
          .tickPadding(10)
          
      svg
          .select(".y-axis")
          .style('font-size', '80%')
          .style('color', 'white')
          .call(yAxis);
      svg.select(".domain").remove()
      svg.transition()

            //Balken zeichnen
      const barInternt = svg
          .selectAll(".bar")
          .data(vales)
          .join("rect")
          .attr("class", "bar")
          .attr("fill", color)

       barInternt
          .transition()
          .duration(1000)
          .attr('x', xScale(0))
          .attr('y', (s) => yScale(s.key))
          .attr('width', (s) => xScale(s.value))
          .attr('height', yScale.bandwidth)

         barInternt.on("mouseenter", (value, index) => {
              svg
                  .selectAll(".tooltip")
                  .data([value])
                  .join(enter => enter.append("text"))
                  .attr("class", "tooltip")
                  .text((value.value) + " %")
                  .attr("x", xScale(value.value) + 5)
                  .attr("y", yScale(value.key) + yScale.bandwidth() / 1.5)
                  .attr("opacity", 1)
                  .transition()
                  .attr("fill", "white")
                })
                
                .on("mouseleave", () => 
                  svg.select(".tooltip").remove()
                  .transition() 
       )
}, [data, dimensions]);
return (
 <div className="chartHighKeinInternet" ref={wrapperRef}>
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
);
}

export default BarHighKeinInternet;