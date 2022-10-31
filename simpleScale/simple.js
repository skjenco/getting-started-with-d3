/*
The key to scale is making a scale  i.e.

                                            d3.scaleLinear()
                                                .domain(d3.extent(data, (d) => d.xvalue))
                                                .range([MARGIN,WIDTH]);

You use that scale to:
   (1) make a scale that you display
   (2) when placing Items on what you have scaled  i.e a graph


 */


const WIDTH = 1000;
const HEIGHT = 800;
const MARGIN = 50;
const SCALE =1;
runMe = (data) => {
    console.log(data);
    let mainGroup = d3.select("body").append("svg")
        .attr("width",WIDTH + MARGIN*2)
        .attr("height", HEIGHT + MARGIN*2)
         .append("g");

    mainGroup.attr("transform", "translate(" + MARGIN + "," + MARGIN + ")")



    let xscale = createXaxisScale(data);
    let yscale = createYaxisScale(data);

    yscale.nice(); //this just makes so their is not an empty tick without a number

    yscale.ticks(32);

    displayScales(mainGroup, xscale, yscale);

    createLine(data,mainGroup, xscale, yscale);


    data.forEach(dataItem => createPoint(mainGroup, dataItem.xvalue, dataItem.yvalue, xscale, yscale));

}

displayScales = (group, xscale, yscale) => {
    let xAxisGroup = group.append("g");
    xAxisGroup.attr("transform", "translate(0," + HEIGHT + ")");  //move the xaxis down to the bottom

    let axisBottomFunc = d3.axisBottom(xscale);
    axisBottomFunc(xAxisGroup);  //runit to draw xaxis                 //NOTE: I could combing both lines d3.axisBottom(xscale)(xAxisGroup)

    let yAxisGroup = group.append("g")
        .attr("transform", "translate(" + MARGIN + ",0)");
    let yAxis = d3.axisLeft(yscale);
    yAxis(yAxisGroup);
}

createXaxisScale = (data) => {
    return d3.scaleLinear()
                    .domain(d3.extent(data, (d) => d.xvalue))
                    .range([MARGIN,WIDTH]);
}

createYaxisScale = (data) => {
    return d3.scaleLinear()
        .domain(d3.extent(data, d => d.yvalue))
        .range([HEIGHT,0]);
}


//the scale is what figures out where to place the point in the svg.  Using the scale will line it up with the scale you display
createPoint = (group,cx, cy, xScale, yScale) => {
    group.append("circle").attr("cx", xScale(cx)).attr("cy", yScale(cy)).attr("r", 3).style("fill","green");

}

createLine = (data, group, xScale, yScale) => {
    let line = d3.line();
    line.x(d => xScale(d.xvalue));
    line.y(d => yScale(d.yvalue))
       // .curve(d3.curveMonotoneX);   //If I want to smooth out the

    group.append("path")
        .data([data])
        .attr("fill", "none") //note this is generic.  We are just creating a bunch of lines we could close off and want to fill
        .attr("stroke", "orange")
        .attr("d", line);


}


d3.json("simple.json").then(data =>  runMe(data)); // note csv file did not work properly had to convert to json.  did not work with extent getting array








