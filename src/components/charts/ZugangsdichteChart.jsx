import React, { useRef, useEffect} from "react";
import { select, line, curveCardinal, axisBottom, axisLeft, scaleTime, scaleLinear, min, max, entries} from 'd3';
import '../../styles/charts.css'
import useResizeObserver from './useReziseObserver'
import Tooltip from "./tooltips";

function LineCharts({ data, property, colorline, colorline2, value}) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);
   
   useEffect(() => {
      var value1 = "Alle"
      var value2 = "Breitband"
      const svg = select(svgRef.current);
      var filterAlle;
      var filterBB;
      var indicator;

         if(!dimensions) return;

      //Daten filtern
         var filtered = data.filter(a=>a.geo==property);         
            for(var i = 0; i < filtered.length; i ++) {
             var filterAlle = filtered[i].alle; 
            }

            for(var i = 0; i < filtered.length; i ++) {
               var filterBB = filtered[i].bb; 
                }
            var valesAlle = entries(filterAlle);
            var valesBB = entries(filterBB);

      //Sortieren nach Jahreszahl
      const minDate = new Date (min(valesAlle, value => value.key));
      const maxDate = new Date (max(valesAlle, value => value.key));     
       
      const xScale = scaleTime()
      .domain([minDate - 2.628e+9,maxDate])   
      .range([-1, dimensions.width]) 
        
      const yScale =  scaleLinear()
      .domain([0, 100])
      .range([dimensions.height, 0]);

      
      const yAxis = axisLeft(yScale).tickSize(0);   
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
      //Lines
      const myLine = line()
      .x((d)=> (xScale(new Date(d.key))))
      .y((d)=> (yScale(d.value)))
      .defined((d)=> d.value != 0)
      .curve(curveCardinal);
    
      //herausfiltern der fehlenden Werte
      var filteredAlle = valesAlle.filter(myLine.defined());
      var filteredBB = valesBB.filter(myLine.defined());
      
      var lineAlle1 = svg 
         .selectAll(".newline")
         .data([filteredAlle])
         .join("path")
         .attr("class", "newline")
         .transition()
         .duration(200)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline)
         .attr("stroke-dasharray", ("3, 3"))
        
      var lineAlle2 =    svg
         .selectAll(".newerline")
         .data([valesAlle])
         .join("path")
         .attr("class", "newerline")
         .transition()
         .duration(200)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline)
         .attr("stroke-width", "5" )
         .attr("stroke-linecap", "round")

      var lineBB1 = svg
         .selectAll(".newlineBB")
         .data([filteredBB])
         .join("path")
         .attr("class", "newlineBB")
         .transition()
         .duration(200)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline2)
         .attr("stroke-dasharray", ("3, 3"))
         .attr("opacity", "0")    
        
      var lineBB2 = svg
         .selectAll(".newerlineBB")
         .data([valesBB])
         .join("path")
         .attr("class", "newerlineBB")
         .transition()
         .duration(200)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline2)
         .attr("stroke-width", "5" )
         .attr("stroke-linecap", "round")
         .attr("opacity", "0")

         if(value == "BB"){
            lineBB1.attr("opacity", "1")
            lineBB2.attr("opacity", "1")
            indicator = "exist";
         }
         else{
            console.log("Error: " + indicator)
         }

    Tooltip(svg, valesAlle, valesBB,  colorline2, colorline, dimensions, xScale, yScale, value1, value2, indicator);

   }, [data, dimensions, property]);
   return (
         <div ref={wrapperRef}>
            <svg ref={svgRef}>
               <g className='x-axis' />
               <g className="y-axis" />
            </svg>
            </div>
   );
}

export default LineCharts;