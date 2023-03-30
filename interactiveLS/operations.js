var a_mf = {type: "a", variable: "A", line: [{x:0, y:0}, {x:10, y:0}, {x:30, y:1}, {x:50, y:0}, {x:100, y:0}], label_pos: 75}
var b_mf = {type: "b", variable: "B", line: [{x:0, y:0}, {x:30, y:0}, {x:50, y:1}, {x:60, y:1}, {x:80, y:0}, {x:100, y:0}], label_pos: 250}

var intersection_mf = {type: "i", variable: "intersection", line: [{x:0, y:0}, {x:30, y:0}, {x:40, y:0.5}, {x:50, y:0}, {x:100, y:0}], label_pos: 200}
var negation_mf = {type: "n", variable: "not A", line: [{x:0, y:1}, {x:10, y:1}, {x:30, y:0}, {x:50, y:1}, {x:100, y:1}], label_pos: 75}

// set the dimensions and margins of the graph
var width = (global_width - margin.left - margin.right)//100*80;
var height = (global_height - margin.top - margin.bottom);

var u_svg = d3.select("#union")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");
var i_svg = d3.select("#intersection")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");
var n_svg = d3.select("#negation")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");

// x axis rel
const x_ops = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);
// y axis
const y_ops = d3.scaleLinear()
    .domain([0, 1])
    .range([height,  10]);

u_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_ops))
i_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_ops))
n_svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_ops))
u_svg.append("g").call(d3.axisLeft(y_ops));
i_svg.append("g").call(d3.axisLeft(y_ops));
n_svg.append("g").call(d3.axisLeft(y_ops));

// method to read the data as line
var lineGenerator_o = d3.line()
    .x(function(d) { return x_ops(d.x);})
    .y(function(d) { return y_ops(d.y);})

// x axis label
u_svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")
i_svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")
n_svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")

// y axis label
u_svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")
i_svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")
n_svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")


//draw  a and b's
u_svg.append("g").selectAll("foo")
    .data([a_mf, b_mf])
    .enter()
    .append("path")
    .attr("d", function (d) {return lineGenerator_o(d.line);})
    .attr("fill", "lightsteelblue")
    .attr("stroke", function (d, i) { return d3.color(d3.schemeCategory10[i+1])})
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
i_svg.append("g").selectAll("foo")
    .data([a_mf, b_mf])
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_o(d.line);})
    .attr("fill", "none")
    .attr("stroke", function (d, i) { return d3.color(d3.schemeCategory10[i+1])})
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
i_svg.append("g").selectAll("foo")
    .data([intersection_mf])
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_o(d.line);})
    .attr("fill", "lightsteelblue")
    .attr("stroke", "none")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
n_svg.append("g").selectAll("foo")
    .data([negation_mf])
    .enter()
    .append("path")
    .attr("d", function (d) { return lineGenerator_o(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.schemeCategory10[1])
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
u_svg.selectAll("abs_s2_texts")
    .data([a_mf, b_mf])
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", function (d, i) { return d3.color(d3.schemeCategory10[i+1])})
    .text(function(d) { return d.variable})
    .attr('font-size', 12)
i_svg.selectAll("abs_s2_texts")
    .data([a_mf, b_mf])
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", function (d, i) { return d3.color(d3.schemeCategory10[i+1])})
    .text(function(d) { return d.variable})
    .attr('font-size', 12)
n_svg.selectAll("abs_s2_texts")
    .data([negation_mf])
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.schemeCategory10[1])
    .text(function(d) { return d.variable})
    .attr('font-size', 12)

