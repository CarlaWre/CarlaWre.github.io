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

    d3.select("#scatter_svg").selectAll("circle")
        .data(iris)
        .join("circle")
            .attr("cx", function (d) { return iris_x(eval("d." + x_feat)); })
            .attr("cy", function (d) { return iris_y(eval("d." + y_feat)); })
            .attr("r", 3)
            .style("fill", function (d) { return colour(d.class); })
}


function feature_change(dropdown) {
    if (dropdown.id == "x_axis_feature") {
        $("#y_axis_feature").find("option:disabled").prop("disabled", false)
        $("#y_axis_feature option[value='"+ dropdown.value +"']").prop("disabled", true)
        // console.log(dropdown.value)
        // console.log(document.getElementById("y_axis_feature").value)
        window.x_feat = dropdown.value
        window.y_feat = document.getElementById("y_axis_feature").value
    } else {
        $("#x_axis_feature").find("option:disabled").prop("disabled", false)
        $("#x_axis_feature option[value='"+ dropdown.value +"']").prop("disabled", true)
        // console.log(document.getElementById("x_axis_feature").value)
        // console.log(dropdown.value)
        window.x_feat = document.getElementById("x_axis_feature").value
        window.y_feat = dropdown.value
    }

    console.log(x_feat)
    console.log(window.x_feat)
    console.log(y_feat)
    console.log(window.y_feat)

    console.log(iris_x.domain())

    // update the axis
    iris_y.domain([eval(y_feat+"_min"), eval(y_feat+"_max")])
    iris_x.domain([eval(x_feat+"_min"), eval(x_feat+"_max")])

    console.log(iris_x.domain())

    // do it for this svg
    d3.select("#irisScatter").select('.iris_yaxis')
        .call(d3.axisLeft(iris_y));
    d3.select("#irisScatter").select('.iris_xaxis')
        .call(d3.axisBottom(iris_x));
    d3.select("#irisScatter").select('.iris_yaxis_label')
        .text($("#y_axis_feature option:selected").text().slice(1))
    d3.select("#irisScatter").select('.iris_xaxis_label')
        .text($("#x_axis_feature option:selected").text().slice(1))

    console.log(d3.select("#lower").select('.iris_yaxis_label').text())

    // and also for the one of the next interactive part
    d3.select("#lower").select('.iris_yaxis')
        .call(d3.axisLeft(iris_y));
    d3.select("#lower").select('.iris_xaxis')
        .call(d3.axisBottom(iris_x));
    d3.select("#lower").select('.iris_yaxis_label')
        .text($("#y_axis_feature option:selected").text().slice(1))
    d3.select("#lower").select('.iris_xaxis_label')
        .text($("#x_axis_feature option:selected").text().slice(1))

    console.log(d3.select("#lower").select('.iris_yaxis_label').text().slice(1))
    console.log(d3.select("#lower"))
    console.log($("#x_axis_feature option:selected").text().slice(1))
    console.log("hey>")
    update_irisScatter()
    update_scatter_display(iris)

}

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
