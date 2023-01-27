/* displays the first static image about linguistic variables of the sepal length feature */
// definition of displayed mf's
var mf_s1 = [
    {type: "Z-shaped", variable: "small", line: [{x:0, y:1}, {x:20, y:1}, {x:40, y:0}, {x:100, y:0}], label_pos: 25 },
    {type: "Trapezoidal", variable: "medium", line: [{x:0, y:0}, {x:20, y:0}, {x:40, y:1}, {x:60, y:1}, {x:80, y:0}, {x:100, y:0}], label_pos: 155 },
    {type: "S-shaped", variable: "large", line: [{x:0, y:0}, {x:60, y:0}, {x:80, y:1}, {x:100, y:1}], label_pos: 310 }
]
const mapping = (value, min1, max1, min2, max2) => (value - min1) * (max2 - min2) / (max1 - min1) + min2;

// map from the percentage to range of the chosen feature, in this case sepal length
mf_s1.forEach( function (d) {
    d.line.map(function (element) {
        element.x = mapping(element.x, 0, 100, sl_min, sl_max)
    })
})

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = global_height - margin.top - margin.bottom;

var texts = [
    {text: "Sepal length",          x: mf_s1[1].label_pos - 10, y: itemHeight, colour: d3.color("steelblue")},
    {text: "Linguistic variable",   x: width + margin.right,    y: itemHeight, colour: d3.color("black")},
    {text: "Semantic rule",         x: width + margin.right,    y: itemHeight/2 + height/5, colour: d3.color("black")},
    {text: "Fuzzy sets",            x: width + margin.right,    y: height/2, colour: d3.color("black")}
]

// append the svg object to the body of the page
var svg_s1 = d3.select("#static_one")
    .append("svg")
    .attr("width", width + margin.left + 3*margin.right)
    .attr("height", height + margin.top + margin.bottom);

// add group for all other graph stuff
var inner_s1 = svg_s1
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis
const x_s1 = d3.scaleLinear()
    .domain([sl_min, sl_max])
    .range([0, width]);

inner_s1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_s1))

// x axis label
inner_s1.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("v")

// y axis
const y_s1 = d3.scaleLinear()
    .domain([0, 1])
    .range([height, height/4]);

inner_s1.append("g")
    .call(d3.axisLeft(y_s1));

// method to read the data as line
var lineGenerator_s1 = d3.line()
    .x(function(d) { return x_s1(d.x);})
    .y(function(d) { return y_s1(d.y);})

// mf lines
inner_s1.append("g").selectAll("s1_mfs")
    .data(mf_s1)
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_s1(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
inner_s1.selectAll("legend_s1")
    .data(mf_s1)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)

inner_s1.selectAll("texts")
    .data(texts)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.x} )
    .attr("y", function (d) { return d.y} )
    .attr("fill", function (d) { return d.colour} )
    .text(function(d) { return d.text})
    .attr('font-size', 12)
