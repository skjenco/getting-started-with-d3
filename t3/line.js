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

// //Need to make our domain x axis scale.  //Just use this as a cookie cutter for setting axis
// let xAxisFunction = d3.scaleTime()  //d3 will create for us  and x axis based on dates
//     .domain(d3.extent(data, function (d) { return d.date }))  //extent will use the data to compute the minimum and maximum value in an iterable.
//     .range([0, width])
// ;
//
// //need to make our range y axis scale
// let yAxisFunction = d3.scaleLinear()
//     .domain(d3.extent(data, function (d) { return d.value })) // use values to compute a y axis scale
//     .range([height, 0])
// ;
//
//
//
// //Using d3 line function.  My json is and array of objects that have fields date and value.
// let line = d3.line();
// line.x(d => xAxisFunction(d.date)); // so a line is x1,y1 to x2,y2   I will have my x axis be dates  this function takes a function that will pass in the date field from my json above
// line.y(d => yAxisFunction(d.value));  // my y axis will be values.  passes in my value from the json above


//Use D3 parses time so we can line up our data dates to points on the x axis
let parseTimeForMyXaxis =  d3.timeParse("%m/%d/%Y");
data.forEach( d => {
    console.log(d.date); //date is a string
    d.date = parseTimeForMyXaxis(d.date); // pass in my string date and make it a date I can use along the x axis
    console.log(d.date); //date has now be converted into a date
})

let x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.date }))
    .range([0, width])
;

let y = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.value }))
    .range([height, 0])
;

let line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))
;

dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", line);




