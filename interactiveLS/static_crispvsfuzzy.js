var fuzzy_mf = [
    {type: "Trapezoidal", variable: "small", line: [{x:0, y:1}, {x:20, y:1}, {x:40, y:0}, {x:100, y:0}], label_pos: 25 },
    {type: "Trapezoidal", variable: "medium", line: [{x:0, y:0}, {x:20, y:0}, {x:40, y:1}, {x:60, y:1}, {x:80, y:0}, {x:100, y:0}], label_pos: 155 },
    {type: "Trapezoidal", variable: "large", line: [{x:0, y:0}, {x:60, y:0}, {x:80, y:1}, {x:100, y:1}], label_pos: 310 }
]
const mapping = (value, min1, max1, min2, max2) => (value - min1) * (max2 - min2) / (max1 - min1) + min2;

// map from the percentage to range of the chosen feature, in this case sepal length
fuzzy_mf.forEach( function (d) {
    d.line.map(function (element) {
        element.x = mapping(element.x, 0, 100, sl_min, sl_max)
    })
})

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = global_height - margin.top - margin.bottom;

// append the svg object to the body of the page
var f_svg = d3.select("#fuzzy_example")
    .append("svg")
    .attr("width", width + margin.left + 3*margin.right)
    .attr("height", height + margin.top + margin.bottom);

// add group for all other graph stuff
var inner_f = f_svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis
const x_f = d3.scaleLinear()
    .domain([sl_min, sl_max])
    .range([0, width]);

inner_f.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_f))

// x axis label
inner_f.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")

// y axis
const y_f = d3.scaleLinear()
    .domain([0, 1])
    .range([height, height/4]);

inner_f.append("g")
    .call(d3.axisLeft(y_f));

// y axis label
inner_f.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")

// method to read the data as line
var lineGenerator_fc = d3.line()
    .x(function(d) { return x_f(d.x);})
    .y(function(d) { return y_f(d.y);})

// mf lines
inner_f.append("g").selectAll("mfs")
    .data(fuzzy_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_fc(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
inner_f.selectAll("legend_s1")
    .data(fuzzy_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)

// ----------------------------------

var crisp_mf = [
    {type: "Trapezoidal", variable: "small", line: [{x:mapping(0, 0, 100, sl_min, sl_max), y:1}, {x:mapping(0, 0, 100, sl_min, sl_max), y:1.1}], label_pos: 25 },
    {type: "Trapezoidal", variable: "medium", line: [{x:mapping(30, 0, 100, sl_min, sl_max), y:1}, {x:mapping(30, 0, 100, sl_min, sl_max), y:1.1}], label_pos: 155 },
    {type: "Trapezoidal", variable: "large", line: [{x:mapping(70, 0, 100, sl_min, sl_max), y:1}, {x:mapping(70, 0, 100, sl_min, sl_max), y:1.1}], label_pos: 310 },
    {type: "Trapezoidal", variable: " ", line: [{x:mapping(100, 0, 100, sl_min, sl_max), y:1}, {x:mapping(100, 0, 100, sl_min, sl_max), y:1.1}], label_pos: 100 }
]

// append the svg object to the body of the page
var c_svg = d3.select("#crisp_example")
    .append("svg")
    .attr("width", width + margin.left + 3*margin.right)
    .attr("height", height/4 + margin.top + margin.bottom);

// add group for all other graph stuff
var inner_c = c_svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis
const x_c = d3.scaleLinear()
    .domain([sl_min, sl_max])
    .range([0, width]);

inner_c.append("g")
    .attr("transform", "translate(0," + height/4 + ")")
    .call(d3.axisBottom(x_c))

// x axis label
inner_c.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height/4 + margin.top - 10)
    .text("X")

// mf lines
inner_c.append("g").selectAll("mfs")
    .data(crisp_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_fc(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
inner_c.selectAll("legend_s1")
    .data(crisp_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)
