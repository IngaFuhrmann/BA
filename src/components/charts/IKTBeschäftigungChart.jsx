import React, { useRef, useEffect} from "react";
import { select, axisBottom, axisLeft, scaleTime, scaleLinear, min, max, entries,curveLinear, area, } from 'd3';
import useResizeObserver from "./useReziseObserver";
import Tooltip from "./tooltips";

function AreaIKTBeschäftigung({ data, property, value1, value2, color1, color2 }) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);
 
   useEffect(() => {

      const svg = select(svgRef.current);
     var filterme;
     var filterMann;
      if(!dimensions) return;

      //Daten filtern
      var filtered = data.filter(a=>a.geo==property);
     
      if(value1 == "Männer"){
    for(var i = 0; i < filtered.length; i ++) {
       filterme = filtered[i].Frauen;
       filterMann = filtered[i].Männer;  
    }
  }else{
    for(var i = 0; i < filtered.length; i ++) {
       filterme = filtered[i].Einstellung;
      filterMann = filtered[i].Beschäftigung;  
   }
  }
    var valesFrau = entries(filterme);
    var valesMann = entries(filterMann);

    var objectsIKT = {gen: valesFrau, gens: valesMann};

    const minDate = new Date (min(objectsIKT.gen, value => value.key));
    const maxDate = new Date (max(objectsIKT.gen, value => value.key));     

      const xScale = scaleTime()
          .domain([minDate,maxDate])
         .range([0, dimensions.width])
        
      const yScale =  scaleLinear()
         .domain([0, 100])
         .range([dimensions.height, 30]);

      
         const yAxis = axisLeft(yScale);   
         svg
         .select('.y-axis')
         .style('color', 'grey')
         .style('font-size', '14')
         .call(yAxis);
   
        const xAxis = axisBottom(xScale)
        svg
         .select(".x-axis")
         .join(".x-axis")
         .style('transform', `translateY(${dimensions.height}px)`)
         .style('color', 'grey')
         .style('font-size', '14')
         .style('stroke-width', 1)
         .call(xAxis);
   
         //Grids
         var grids = svg.select("g").append("g")
            .join("g")
            .attr("class", "grid")
            .attr('transform', 'translate(0,' + -dimensions.height + ')')
            .call(axisLeft(yScale)
               .tickSize(-dimensions.width)
               .tickFormat("")
               )
         
         //X-Achsen-Beschriftung
         svg.select("text").join("text")
         .attr("text-anchor", "end")
         .attr("fill", "grey")
         .attr("x", dimensions.width)
          .attr("y", + dimensions.height/ 8)
          .attr("font-weight", "bold")
          .text("Jahr");      
         //Y-Achsen-Beschrifzung
         svg.append("text")
         .attr("text-anchor", "end")
         .attr("transform", "rotate(-90)")
         .attr("fill", "grey")
         .attr("y", - 50)
         .attr("x", 0)
         .text("Prozent")

      const curve = curveLinear;

      const myArea = area()
      .x((d)=> (xScale(new Date(d.key))))
      .y0(dimensions.height)
      .y1((d)=> (yScale(d.value)))
      .curve(curve)

        svg
         .selectAll(".newArea")
         .data([valesMann])
         .join("path")
         .attr("class", "newArea")
         .transition()
         .duration(300)
         .attr("d", (value, index) => myArea(value))
         .transition()
         .attr("fill", color1)
         
         svg
         .selectAll(".newerArea")
         .data([valesFrau])
         .join("path")
         .attr("class", "newerArea")
         .transition()
         .duration(300)
         .attr("d", (value, index) => myArea(value))
         .attr("fill", "none")
         .attr("fill", color2)

         Tooltip(svg, valesFrau, valesMann, color1, color2, dimensions, xScale, yScale, value2, value1, value1 );

   }, [data, dimensions, property]);
    return (
     <div  className="IKTWarapperRef" ref={wrapperRef} >
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    );
    }
    
    export default AreaIKTBeschäftigung;