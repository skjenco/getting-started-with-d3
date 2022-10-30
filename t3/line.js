let data = [{ date: "10/25/2018", value: 1 },
    { date: "10/26/2018", value: 3 },
    { date: "10/27/2018", value: 1 },
    { date: "10/28/2018", value: 3 },
    { date: "10/29/2018", value: 5 },
    { date: "10/30/2018", value: 8 },
    { date: "10/31/2018", value: 7 },
    { date: "11/01/2018", value: 11 },
    { date: "11/02/2018", value: 23 },
    { date: "11/03/2018", value: 13 },
    { date: "11/04/2018", value: 15 },
    { date: "11/05/2018", value: 37 },
    { date: "11/06/2018", value: 32 },
    { date: "11/07/2018", value: 38 },
    { date: "11/08/2018", value: 42 },
    { date: "11/09/2018", value: 43 },
    { date: "11/10/2018", value: 21 },
    { date: "11/11/2018", value: 24 },
    { date: "11/12/2018", value: 50 },
    { date: "11/13/2018", value: 53 },
    { date: "11/14/2018", value: 59 },
    { date: "11/15/2018", value: 61 },
    { date: "11/16/2018", value: 62 }];




let margin = 50;

let width = 1024;
let height = 768;

let mysvg = d3.select("body").append("svg");
mysvg.attr("width", width + margin) //width of the svg needs to be the width I want plus the margin so its not right on the edge.
      .attr("height", height + (2*margin) );  // height needs to have both top and bottom so two times the height

let dataGroup = mysvg.append("g");
dataGroup.attr("transform", "translate("+ margin + "," + margin + ")" ); // so translate("50","50") move the group from the upper left corner over 50 and down 50.

let parseTimeForMyXaxis =  d3.timeParse("%m/%d/%Y");
data.forEach( d => {
    console.log(d.date); //date is a string
    d.date = parseTimeForMyXaxis(d.date); // pass in my string date and make it a date I can use along the x axis
    console.log(d.date); //date has now be converted into a date
})

//Need to make our domain x axis scale.  //Just use this as a cookie cutter for setting axis
let xAxisFunction = d3.scaleTime()  //d3 will create for us  and x axis based on dates
    .domain(d3.extent(data, function (d) { return d.date }))  //extent will use the data to compute the minimum and maximum value in an iterable.
    .range([0, width])
;

//need to make our range y axis scale
let yAxisFunction = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.value })) // use values to compute a y axis scale
    .range([height, 0]) //Note this is reverse of what is normal if just graphing on graph paper.  svg is reversed  you start at the top and go down so we specify are range in reverse to make go from the bottom up
;

//Using d3 line function.  My json is and array of objects that have fields date and value.
let line = d3.line();
line.x(d => xAxisFunction(d.date)); // so a line is x1,y1 to x2,y2   I will have my x axis be dates  this function takes a function that will pass in the date field from my json above
line.y(d => yAxisFunction(d.value));  // my y axis will be values.  passes in my value from the json above


dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", line);

// now need to display our x axis for our datagroup
let xAxisGroup = dataGroup.append("g");  //making a group for the my x-axis then add what I need to display and x-axis
xAxisGroup.attr("class", "xAxisGroup");  //if I want to style it in my css give it a class
xAxisGroup.attr("transform", "translate(0," + height + ")"); //Since svg is backwards I need to move this down the height of my svg
let xAxis = d3.axisBottom(xAxisFunction);  //create a new bottom-oriented axis generator. but remember svg are backwards so I will have to move it to the bottom
xAxis.tickFormat(d3.timeFormat("%m-%d-%y"));  //how I want to display my ticks along the x axis.  this case it will be dates

xAxis(xAxisGroup);  //run it.  pass in your group to d3 axis bottom you created.

// now need to display our y axis for our datagroup
let yAxisGroup = dataGroup.append("g");  //making a group for the my x-axis then add what I need to display and x-axis
yAxisGroup.attr("class", "yAxisGroup");  //if I want to style it in my css give it a class
let yAxis = d3.axisLeft(yAxisFunction);  //create a new bottom-oriented axis generator. but remember svg are backwards so I will have to move it to the bottom

yAxis(yAxisGroup);  //run it.  pass in your group to d3 axis bottom you created.






