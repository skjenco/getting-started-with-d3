let data = [{ date: "10/25/2018", value1: 1, value2: 0 },
    { date: "10/26/2018", value1: 3, value2: 0 },
    { date: "10/27/2018", value1: 0, value2: 25 },
    { date: "10/28/2018", value1: 0, value2: 62 },
    { date: "10/29/2018", value1: 5, value2: 5 },
    { date: "10/30/2018", value1: 8, value2: 37 },
    { date: "10/31/2018", value1: 7, value2: 12 },
    { date: "11/01/2018", value1: 11, value2: 55 },
    { date: "11/02/2018", value1: 23, value2: 44 },
    { date: "11/03/2018", value1: 13, value2: 53 },
    { date: "11/04/2018", value1: 15, value2: 18 },
    { date: "11/05/2018", value1: 37, value2: 12 },
    { date: "11/06/2018", value1: 32, value2: 60 },
    { date: "11/07/2018", value1: 38, value2: 60 },
    { date: "11/08/2018", value1: 42, value2: 60 },
    { date: "11/09/2018", value1: 43, value2: 3 },
    { date: "11/10/2018", value1: 21, value2: 3 },
    { date: "11/11/2018", value1: 24, value2: 2 },
    { date: "11/12/2018", value1: 50, value2: 15 },
    { date: "11/13/2018", value1: 53, value2: 3 },
    { date: "11/14/2018", value1: 59, value2: 15 },
    { date: "11/15/2018", value1: 61, value2: 3 },
    { date: "11/16/2018", value1: 62, value2: 19 }];




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
let yAxisFunction = d3.scalePow()
    .domain(d3.extent(data, function (d) { return d.value1 })) // use values to compute a y axis scale
    .range([height, 0]) //Note this is reverse of what is normal if just graphing on graph paper.  svg is reversed  you start at the top and go down so we specify are range in reverse to make go from the bottom up
    .exponent(1.5) //Use smaller value i.e .3 to emphasize the lower range (x <1)  big values i.e 1.5 to emphasize  upper range (x > 1)
;

//Using d3 line function.  My json is and array of objects that have fields date and value1.
let line1 = d3.line();
line1.x(d => xAxisFunction(d.date)); // so a line is x1,y1 to x2,y2   I will have my x axis be dates  this function takes a function that will pass in the date field from my json above
line1.y(d => yAxisFunction(d.value1));  // my y axis will be values.  passes in my value from the json above

let line2 = d3.line();
line2.x(d => xAxisFunction(d.date)); // so a line is x1,y1 to x2,y2   I will have my x axis be dates  this function takes a function that will pass in the date field from my json above
line2.y(d => yAxisFunction(d.value2));  // my y axis will be values.  passes in my value from the json above




dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", line1);

dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("d", line2);


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


//Note https://stackoverflow.com/questions/34707536/two-sets-of-parentheses-in-a-javascript-function-call
// shortcut of a function that returns a function then passing a parameter into that returned function
// functionReturnsAFuntion(somearg)(parmforFunctionthatwasReturned);
yAxis.tickFormat(d => yAxisFunction.tickFormat(62, d3.format(",d"))(d));
//Is equivellent to:
// returnedFunc = yAxisFunction.tickFormat(62, d3.format(",d"));
// yAxis.tickFormat(d => returnedFunc(d));


yAxis(yAxisGroup);  //run it.  pass in your group to d3 axis bottom you created.






