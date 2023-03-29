/* displays the second static image about relative and absolut quantifers */

var crisp_mf = [
    {type: "crisp", variable: "smaller than 3", line: [{x:0, y:1}, {x:3, y:1}, {x:3, y:0}, {x:6, y:0}], label_pos: 200}
]
var fuzzy_mf = [
    {type: "fuzzy", variable: "around 3", line: [{x:0, y:0}, {x:2, y:0}, {x:3, y:1}, {x:4, y:0}, {x:6, y:0}], label_pos: 200}
]

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = (global_height - margin.top - margin.bottom);


var crisp = d3.select("#crisp_set")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");


var fuzzy = d3.select("#fuzzy_set")
    .append("svg")
    .attr("height", height + margin.top)
    .attr("width", function() { return this.parentNode.offsetWidth })
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");


// y axis
const y_cf = d3.scaleLinear()
    .domain([0, 1])
    .range([height,  75]);

// x axis rel
const x_cf = d3.scaleLinear()
    .domain([0, 6])
    .range([0, width/100*85]);

// add y axis
crisp.append("g").call(d3.axisLeft(y_s1));
fuzzy.append("g").call(d3.axisLeft(y_s1));

// add x axis
crisp.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_cf))
fuzzy.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_cf))

// x axis label
crisp.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")

// x axis label
fuzzy.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")

// y axis label
crisp.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")

// y axis label
fuzzy.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")

// method to read the data as line
var abs_lineGenerator = d3.line()
    .x(function(d) { return x_cf(d.x);})
    .y(function(d) { return y_cf(d.y);})

var rel_lineGenerator = d3.line()
    .x(function(d) { return x_cf(d.x);})
    .y(function(d) { return y_cf(d.y);})

// draw
crisp.append("g").selectAll("abs_s2_mfs")
    .data(crisp_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return abs_lineGenerator(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

fuzzy.append("g").selectAll("rel_s2_mfs")
    .data(fuzzy_mf)
    .enter()
    .append("path")
    .attr("d", function (d) { return rel_lineGenerator(d.line);})
    .attr("fill", "none")
    .attr("stroke", d3.color("steelblue"))
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)

// texts
crisp.selectAll("abs_s2_texts")
    .data(crisp_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)

fuzzy.selectAll("rel_s2_texts")
    .data(fuzzy_mf)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.label_pos} )
    .attr("y", itemHeight/2 + height/5)
    .attr("fill", d3.color("steelblue"))
    .text(function(d) { return d.variable})
    .attr('font-size', 12)
