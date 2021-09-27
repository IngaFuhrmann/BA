
import {bisector, mouse} from 'd3';

function tooltip(svg, elem1Data, elem2Data, color1, color2, dimensions, xScale, yScale, value1, value2, indicator) {

var tooltipLine = svg.append('line');
var focus = tooltipLine
.attr('stroke', 'darkgrey')
.data([elem1Data])
.attr('x1', (d)=> (xScale(new Date(d.key))))
.attr('x2', (d)=> (xScale(new Date(d.key))))
.attr('y1', 0)
.attr('y2', dimensions.height);

    var focusPunkt1 = svg
    .append('g')
    .append('circle')
    .style("fill", color2)
    .attr('r', 8.5)
    .style("opacity", 0)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    var focusPunkt2 = svg
    .append('g')
    .append('circle')
    .style("fill", color1)
    .attr('r', 8.5)
    .style("opacity", 0)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    var focusBox = svg
    .append('g')
    .append('rect')
    .style("opacity", 0)
    .attr("width", dimensions.width/ 4)
    .attr("height", dimensions.height/ 4.5)
    .style("fill", "#e0e2e5")
    .style("stroke", "#e0e2e5")
    .style("stroke", "black")
    .style("stroke-width", "1" )
    .attr("rx", 4)
    .attr("ry", 4);
    var focusText = svg
   .append('g')
   .append('text')
   .append("tspan")
   .style("opacity", 0)
   .attr("text-anchor", "left")
   .attr("alignment-baseline", "middle")
   .attr("fill", "#203040")
   .style("font-size", 15)
   .style("font-weight", "bolder")
   var focusText2 = svg
   .append('g')
   .append('text')
   .append("tspan")
   .style("opacity", 0)
   .attr("text-anchor", "left")
   .attr("alignment-baseline", "middle")
   .attr("fill", color2)
   .style("font-size", 12)
   .style("font-weight", "bold")
   var focusText3 = svg
   .append('g')
   .append('text')
   .append("tspan")
   .style("opacity", 0)
   .attr("text-anchor", "left")
   .attr("alignment-baseline", "middle")
   .attr("fill", color1)
   .style("font-size", 12)
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
     
       function mousemove() {
         var x0 = xScale.invert(mouse(this)[0]);
         const bisect = bisector(d => new Date(d.key)).left;
         const idx = bisect(elem1Data, x0, 1);
         const selectedData1 = elem1Data[idx];
         console.log( selectedData1);

         const idxM = bisect(elem2Data, x0, 1);
         const selectedData2 = elem2Data[idxM];
         console.log( selectedData2);
         
         focus
         .transition()
         .duration(80)
         .attr("x1", xScale(new Date (selectedData1.key)))
         .attr("x2", xScale(new Date (selectedData1.key)))
         .attr("y", yScale(dimensions.height))
       //  .attr("y2",  dimensions.height *3)
         
         focusPunkt2
         .transition()
         .duration(80)
         .attr("cx", xScale(new Date(selectedData2.key)))
         .attr("cy", yScale(selectedData2.value))

         focusPunkt1
         .transition()
         .duration(80)
         .attr("cx", xScale(new Date(selectedData1.key)))
         .attr("cy", yScale(selectedData1.value))
         
         focusText
         .transition()
         .duration(80)
         .text(selectedData1.key)
         .attr("x", xScale(new Date (selectedData1.key)) + dimensions.width/20 )
         .attr("y", dimensions.height/2.5)
         focusText2
         .transition()
         .duration(80)
         .text(value1 + ": " + selectedData1.value + "%" + ": ")
         .attr("x", xScale(new Date (selectedData1.key))+ dimensions.width/20 )
         .attr("y", dimensions.height/2.3 )
         focusText3
         .transition()
         .duration(80)
         .text(value2 + ": " + selectedData2.value + "%" + ": ")
         .attr("x", xScale(new Date (selectedData2.key)) + dimensions.width/20)
         .attr("y", dimensions.height/2.1 )
             
         focusBox
         .transition()
         .duration(80)
         .attr("x", xScale(new Date (selectedData1.key))+20)
         .attr("y", dimensions.height/3)

}

       function mouseout() {
         focus.style("opacity", 0)
         focusPunkt2.style("opacity", 0)
         focusPunkt1.style("opacity", 0)
         focusBox.style("opacity", 0)
         focusText.style("opacity", 0)
         focusText2.style("opacity", 0)
         focusText3.style("opacity", 0)
        // focusText.style("opacity", 0)
       }
       function mouseover() {

        if(indicator != null){
            console.log("YES");
         focusPunkt2.style("opacity", 1)
         focusPunkt1.style("opacity", 1)
         focus.style("opacity", 1)
         focusBox.style("opacity",1)
         focusText.style("opacity", 1)
         focusText2.style("opacity", 1)
         focusText3.style("opacity", 1)
        }else{
            console.log("no");
            focusPunkt2.style("opacity", 0)
            focusPunkt1.style("opacity", 1)
            focus.style("opacity", 1)
            focusBox.style("opacity",1)
            focusText.style("opacity", 1)
            focusText2.style("opacity", 1)
            focusText3.style("opacity", 0)
        }
       }
    }

  export default tooltip;