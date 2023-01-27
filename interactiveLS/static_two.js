/* displays the second static image about relative and absolut quantifers */

var abs_mf = [
    {type: "Triangular", variable: "about 5", line: [{x:-2, y:0},{x:3, y:0}, {x:5, y:1}, {x:7, y:0}, {x:15, y:0}], label_pos: 105},
    {type: "S-shaped", variable: "at least 10", line: [{x:-2, y:0}, {x:9, y:0}, {x:10, y:1}, {x:15, y:1}], label_pos: 235}
]
var rel_mf = [
    {type: "Z-shaped", variable: "at most half", line: [{x:0, y:1}, {x:0.5, y:1}, {x:0.6, y:0}, {x:1, y:0}], label_pos: 50},
    {type: "S-shaped", variable: "most", line: [{x:0, y:0}, {x:0.7, y:0}, {x:0.85, y:1}, {x:1, y:1}], label_pos: 270}
]

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = (global_height - margin.top - margin.bottom);


var absolute = d3.select("#static_two_absolute")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");


var relative = d3.select("#static_two_relative")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");


// y axis
const y_s2 = d3.scaleLinear()
    .domain([0, 1])
    .range([height,  75]);

// x axis rel
const abs_x_s2 = d3.scaleLinear()
    .domain([-2, 15])
    .range([0, width/100*85]);

const rel_x_s2 = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width/100*85]);

// add y axis
absolute.append("g").call(d3.axisLeft(y_s1));
relative.append("g").call(d3.axisLeft(y_s1));

// add x axis
absolute.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(abs_x_s2))
relative.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(rel_x_s2))

// method to read the data as line
var abs_lineGenerator = d3.line()
    .x(function(d) { return abs_x_s2(d.x);})
    .y(function(d) { return y_s2(d.y);})

var rel_lineGenerator = d3.line()
    .x(function(d) { return rel_x_s2(d.x);})
    .y(function(d) { return y_s2(d.y);})

// draw
absolute.append("g").selectAll("abs_s2_mfs")
    .data(abs_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return abs_lineGenerator(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

relative.append("g").selectAll("rel_s2_mfs")
    .data(rel_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return rel_lineGenerator(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
absolute.selectAll("abs_s2_texts")
    .data(abs_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)

relative.selectAll("rel_s2_texts")
    .data(rel_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)
