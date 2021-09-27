import React, { useRef, useEffect} from "react";
import { select, line, curveCardinal, axisBottom, axisLeft, scaleTime, scaleLinear, min, max, bisector, mouse, entries} from 'd3';
import '../../styles/charts.css'
import useResizeObserver from './useReziseObserver'

function LineLivingOnline({ data, property, colorline}) {
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef);
   useEffect(() => {
      if(!dimensions) return;

      const svg = select(svgRef.current);
      var filter;
     
      //Daten filtern
         var filtered = data.filter(a=>a.geo===property);         
            for(var i = 0; i < filtered.length; i ++) {
             filter = filtered[i].time; 
            }
        var vales= entries(filter);

      //Sortieren nach Jahreszahl
      const minDate = new Date (min(vales, value => value.key));
      const maxDate = new Date (max(vales, value => value.key));     

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
      svg.select("g").append("g")
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

     //Tooltip-Elemente
     var focusBox = svg
      .append('g')
      .append('rect')
      .style("opacity", 0)
      .attr("width", 90)
      .attr("height", 30)
      .style("fill", "#e0e2e5")
      .style("stroke", "#e0e2e5")
      .style("stroke", colorline)
      .style("stroke-width", "1" )
      .attr("rx", 4)
      .attr("ry", 4);

      var focus = svg
      .append('g')
      .append('circle')
      .style("fill", colorline)
      .attr('r', 8.5)
      .style("opacity", 0);

      var focusText = svg
      .append('g')
      .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#203040")
      .style("font-size", 13)
      .style("font-weight", "bold")
      
      svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout); 
      
     
    //Lines
      const myLine = line()
      .x((d)=> (xScale(new Date(d.key))))
      .y((d)=> (yScale(d.value)))
      .defined((d)=> d.value != 0)
      .curve(curveCardinal);
    
      //herausfiltern der fehlenden Werte
      filtered = vales.filter(myLine.defined());
      
        svg
         .selectAll(".newline")
         .data([filtered])
         .join("path")
         .attr("class", "newline")
         .transition()
         .duration(500)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline)
         .attr("stroke-dasharray", ("3, 3"))
        
      svg
         .selectAll(".newerline")
         .data([vales])
         .join("path")
         .attr("class", "newerline")
         .transition()
         .duration(500)
         .attr("d", (value, index) => myLine(value))
         .transition()
         .attr("fill", "none")
         .attr("stroke", colorline)
         .attr("stroke-width", "5" )
         .attr("stroke-linecap", "round")

   
      //Tooltip
      function mouseover() {
         focus.style("opacity", 1)
         focusText.style("opacity",1)
         focusBox.style("opacity",1)
       }
       
       function mousemove() {
         var x0 = xScale.invert(mouse(this)[0]);
         const bisect = bisector(d => new Date(d.key)).left;
         const idx = bisect(filtered, x0, 1);
         const selectedData = filtered[idx];
           
       focus
         .transition()
         .duration(50)
         .attr("cx", xScale(new Date(selectedData.key)))
         .attr("cy", yScale(selectedData.value))
      
         focusText
         .transition()
         .duration(50)
            .text(selectedData.key + ": " + selectedData.value + "%")
            .attr("x", xScale(new Date (selectedData.key)))
            .attr("y", yScale(selectedData.value) - 30)
            
         focusBox
         .transition()
         .duration(50)
            .attr("x", xScale(new Date (selectedData.key))- 15)
            .attr("y", yScale(selectedData.value) - 45)

         }
       function mouseout() {
         focus.style("opacity", 0)
         focusText.style("opacity", 0)
         focusBox.style("opacity", 0)
       }


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

export default LineLivingOnline;