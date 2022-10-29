console.log("testing")


let z = d3.csvParse("a,b,c,d");
console.log(z);



runMe = (data) => {
    console.log("see mee")
    console.log(data);

    data.forEach(d => {
        console.log(d.date)
    })

    d3.select("body")
        .append("svg")
        .append("text")
        .text("hello world ")
        .attr("x", "150")
        .attr("y", "150")
    ;

    d3.select("body")
        .append("svg")
        .append("circle")
        .attr("class", "greenCircle")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("r", 25)
    ;

    d3.select("body")
        .append("svg")
        .append("ellipse")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("rx", 30)
        .attr("ry", 25)
        .style("fill","blue");

    d3.select("body")
        .append("svg")
        .append("line")
        .attr("d", [[1, 3], [2, 7], [3, 2], [5, 2]])
        .attr("stroke", "black")


    // Making a line Generator
    let Gen = d3.line();
    let points = [
        [0, 100],
        [200, 400],
        [200,200]

    ];

    let pathOfLine = Gen(points);

    d3.select("body")
        .append("svg")
        .append("path")
        .attr('d', pathOfLine)
        .style("stroke", "green")
        .style("fill", "none")


}




d3.csv(`./test.csv`)
    .then(data => {
        console.log('here')
        console.log(data);
        runMe(data);
    } );






