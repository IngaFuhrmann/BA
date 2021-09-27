import React, { useRef, useEffect} from "react";
import { select, arc, scaleOrdinal, pie} from 'd3';
import useResizeObserver from "./useReziseObserver";


function PieMobilNutzung({ data, property, number }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    
    useEffect(() => {
        const svg = select(svgRef.current);

        if(!dimensions) return;

        //Daten filtern
        var filtered = data.filter(a=>a.geo==property);

        var width = dimensions.width /1.5 ;
        var outerRadius = width/2;
        var innerRadius = 0;

        var pied = pie().value((d) => d.time[Object.keys(d.time)[ number]])(filtered);

        var color = scaleOrdinal()
        .domain(pied)
        .range(["#2770bc","#5d8dbe","#9aadc2"])

        function update(pied) {
        var piechart = svg.selectAll("path").data(pied)
        
            var arcGenerator = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
           
            piechart
            .enter()
            .append('path')
            .merge(piechart)
            .transition()
            .duration(500)
            .attr('d', arcGenerator)
            .attr('fill', function(d, i) { return color(i) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 1)
         
            piechart
            .enter()
            .append("text")
            .attr("transform", function(d) {
            return "translate(" + arcGenerator.centroid(d) + ")";})
            .attr("text-anchor", "middle")
            .text(function(d) {return d.data.ed})
            .attr("fill", "white")
            .attr("font-size", 11)
            piechart
            .enter()
            .append("text")
            .attr("transform", function(d) {
            return "translate(" + arcGenerator.centroid(d) + ")";})
            .attr("text-anchor", "end")
            .text(function(d) {return d.data.value})
            .attr("fill", "white")
            .attr("font-size", 11)
            
            piechart
            .exit()
            .remove()
        
        }
        
        update(pied)

    }, [data, dimensions, property]);


return (
    <div ref={wrapperRef} >
       <svg ref={svgRef}>
       </svg>
     </div>
 );
 }
 
 export default PieMobilNutzung;