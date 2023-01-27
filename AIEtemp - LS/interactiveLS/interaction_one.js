/* displays the first interactive element about the iris scatter plot */

// set the dimensions and margins of the graph
var setWidth = global_width;
var setHeight = global_height;
var margin = {top: global_top, right: global_right, bottom: global_bottom, left: global_left};
var width = setWidth - margin.left - margin.right;
var height = setHeight - margin.top - margin.bottom;

var feat_names = [
    {id: "pw", name: "Petal width"},
    {id: "pl", name: "Petal length"},
    {id: "sw", name: "Sepal width"},
    {id: "sl", name: "Sepal length"}]

// keeps track of which feature the axis represents
x_feat = "pl"
y_feat = "pw"

// append the svg object to the body of the page
var svg = d3.select("#irisScatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "scatter_svg")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x Axis
const iris_x = d3.scaleLinear()
    .domain([eval(x_feat + "_min"), eval(x_feat + "_max")])
    .range([0, width]);

svg.append("g")
    .attr('class', 'iris_xaxis')
    .attr('value', 'pl')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(iris_x))

// x axis label:
svg.append("text")
    .attr('class', 'iris_xaxis_label')
    .attr("text-anchor", "end")
    .attr("x", width / 2 + margin.left)
    .attr("y", height + margin.top - 10)
    .text(feat_names.find(obj => obj.id === x_feat).name)

// y Axis
const iris_y = d3.scaleLinear()
    .domain([eval(y_feat + "_min"), eval(y_feat + "_max")])
    .range([height, 0]);

svg.append("g")
    .attr('class', 'iris_yaxis')
    .attr('value', 'pw')
    .call(d3.axisLeft(iris_y));

// y axis label:
svg.append("text")
    .attr('class', 'iris_yaxis_label')
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .text(feat_names.find(obj => obj.id === y_feat).name)

var colour = d3.scaleOrdinal(d3.schemeCategory10);

update_irisScatter()

function update_irisScatter() {
    svg.selectAll("circle")
        .data(iris)
        .join("circle")
            .attr("cx", function (d) { return iris_x(eval("d." + x_feat)); })
            .attr("cy", function (d) { return iris_y(eval("d." + y_feat)); })
            .attr("r", 3)
            .style("fill", function (d) { return colour(d.class); })
}



// checkbox stuff
$('.feature_checkbox').on('change', function() {
    // jquery to check whether max 2 checkboxes have been checked
    var checked_boxes = $('.feature_checkbox:checked')
    if(checked_boxes.length > 2) {
        this.checked = false;
    }

    // now update the graph based on the selected checkboxes
    if(checked_boxes.length == 2) {
        // get the two checked values
        y_feat = checked_boxes[0].id.toString()
        x_feat = checked_boxes[1].id.toString()

        // update the axis
        iris_y.domain([eval(y_feat+"_min"), eval(y_feat+"_max")])
        iris_x.domain([eval(x_feat+"_min"), eval(x_feat+"_max")])

        // do it for this svg
        svg.select('.iris_yaxis')
            .call(d3.axisLeft(iris_y));
        svg.select('.iris_xaxis')
            .call(d3.axisBottom(iris_x));
        svg.select('.iris_yaxis_label')
            .text(checked_boxes[0].value)
        svg.select('.iris_xaxis_label')
            .text(checked_boxes[1].value)

        // and also for the one of the next interactive part
        d3.select("#lower").select('.iris_yaxis')
            .call(d3.axisLeft(iris_y));
        d3.select("#lower").select('.iris_xaxis')
            .call(d3.axisBottom(iris_x));
        d3.select("#lower").select('.iris_yaxis_label')
            .text(checked_boxes[0].value)
        d3.select("#lower").select('.iris_xaxis_label')
            .text(checked_boxes[1].value)

        update_irisScatter()
        update_scatter_display(iris)
    }
});

$('.axis_switch').click(function () {

    // swap the features per axis
    [x_feat, y_feat] = [y_feat, x_feat];

    // first update the axis
    var checked_boxes = $('.feature_checkbox:checked');

    // update the axis
    iris_y.domain([eval(y_feat+"_min"), eval(y_feat+"_max")])
    iris_x.domain([eval(x_feat+"_min"), eval(x_feat+"_max")])

    // do it for this svg
    svg.select('.iris_yaxis')
        .call(d3.axisLeft(iris_y));
    svg.select('.iris_xaxis')
        .call(d3.axisBottom(iris_x));
    svg.select('.iris_yaxis_label')
        .text(feat_names.find(obj => obj.id === y_feat).name)
    svg.select('.iris_xaxis_label')
        .text(feat_names.find(obj => obj.id === x_feat).name);

    // and also for the one of the next interactive part
    d3.select("#lower").select('.iris_yaxis')
        .call(d3.axisLeft(iris_y));
    d3.select("#lower").select('.iris_xaxis')
        .call(d3.axisBottom(iris_x));
    d3.select("#lower").select('.iris_yaxis_label')
        .text(feat_names.find(obj => obj.id === y_feat).name)
    d3.select("#lower").select('.iris_xaxis_label')
        .text(feat_names.find(obj => obj.id === x_feat).name);

    update_irisScatter()
    update_scatter_display(iris)
});
