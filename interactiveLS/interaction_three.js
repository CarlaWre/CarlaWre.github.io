/* displays the third interactive element about truth value calculation */
var mf_Q = [JSON.parse(JSON.stringify(mf_data[0]))]
var mf_R = [JSON.parse(JSON.stringify(mf_data[0]))]
var mf_P = [JSON.parse(JSON.stringify(mf_data[0]))]

mf_Q.variable = "Almost all"
mf_R.variable = "Medium"
mf_P.variable = "Small"

// initiate the respective drag behaviour for lines and points
let point_Q_drag = d3.drag()
    .subject(function() {return window.mf_Q;})
    .on('start', dragstarted_three)
    .on('drag', point_Q_dragged)
    .on('end', dragended_three);

let point_R_drag = d3.drag()
    .subject(function() {return window.mf_R;})
    .on('start', dragstarted_three)
    .on('drag', point_R_dragged)
    .on('end', dragended_three);

let point_P_drag = d3.drag()
    .subject(function() {return window.mf_P;})
    .on('start', dragstarted_three)
    .on('drag', point_P_dragged)
    .on('end', dragended_three);

let line_Q_drag = d3.drag()
    .subject(function() {return window.mf_Q;})
    .on('start', dragstarted_three)
    .on('drag', line_Q_dragged)
    .on('end', dragended_three);

let line_R_drag = d3.drag()
    .subject(function() {return window.mf_R;})
    .on('start', dragstarted_three)
    .on('drag', line_R_dragged)
    .on('end', dragended_three);

let line_P_drag = d3.drag()
    .subject(function() {return window.mf_P;})
    .on('start', dragstarted_three)
    .on('drag', line_P_dragged)
    .on('end', dragended_three);

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = global_height - margin.top - margin.bottom;

var svg_Q = d3.select("#draw_Q")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "svg_Q")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")" );

var svg_R = d3.select("#draw_R")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "svg_R")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")" );

var svg_P = d3.select("#draw_P")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "svg_P")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")" );

const x_3 = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

const y_3 = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

svg_Q.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_3))
svg_R.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_3))
svg_P.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_3))
svg_Q.append("g")
    .call(d3.axisLeft(y_3));
svg_R.append("g")
    .call(d3.axisLeft(y_3));
svg_P.append("g")
    .call(d3.axisLeft(y_3));

var lineGenerator_3 = d3.line()
    .x(function(d) { return x_3(d.x);})
    .y(function(d) { return y_3(d.y);})

mf_definition("Q")
mf_definition("R")
mf_definition("P")

update_Q()
update_R()
update_P()

function update_ls() {
    console.log(d3.select("#variable_Q"))
    console.log(d3.select("#variable_Q").node())
    var quantifierQ = d3.select("#variable_Q").node().value
    quantifierQ = quantifierQ.charAt(0).toUpperCase() + quantifierQ.slice(1).toLowerCase()

    var qualifierR = d3.select("#variable_R").node().value
    qualifierR = qualifierR.toLowerCase()

    var summarizerP = d3.select("#variable_P").node().value
    summarizerP = summarizerP.toLowerCase()

    var checked_R = d3.select('input[class="featureR"]:checked').node().value
    var checked_P = d3.select('input[class="summmarizer_radio"]:checked').node().value

    var simple_sentence = quantifierQ + " flowers have " + summarizerP + " " + checked_P + "."
    var extended_sentence = quantifierQ + " flowers with " + qualifierR + " " + checked_R + " have " + summarizerP + " " + checked_P + "."

    var final_sentence = ($("input[name=protoform]:checked").val()=="simple protoform") ? simple_sentence : extended_sentence

    d3.select('#final_ls').node().innerHTML = final_sentence

    update_truth()
}

function quantifier_visibility(selection){
    document.getElementById("div_quantifier").style.display = selection.value == "simple protoform" ? 'none' : 'block';
}

function quantifier_options(selection){
    [...div_quantifier_radio.getElementsByTagName("div")].filter(function (ids){
        console.log(ids)
        if (ids.id.slice(0,2) == selection.id.slice(0,2)) {
            ids.style.display = 'none'
        }
        else {
            ids.style.display = 'block'
        }
    })
    update_ls()
}

function update_truth() {
    var zadeh = calc_Zadeh_truth()
    var gd = calc_GD_truth()
}

function calc_Zadeh_truth(extended){
    var selected_feature = $("input[name=featureR]:checked").attr('id').slice(0,2)
    var selected_summarizer = $("input[name=summmarizer_radio]:checked").attr('id').slice(0,2)
    console.log(selected_feature)
    console.log(selected_summarizer)
    // console.log(iris.map(e => e[selected_feature]))
    var mu_P = iris.map(e => calc_mf_value_relative(window.mf_P[0].type, selected_summarizer,[e[selected_summarizer], ...window.mf_P[0].points.map(p => p.x)]) )

    if (extended) {
        var mu_R = iris.map(e => calc_mf_value_relative(window.mf_R[0].type, selected_feature,[e[selected_feature], ...window.mf_R[0].points.map(p => p.x)]) )
        var sum_mu_R = d3.sum(mu_R)
        var min_RP = d3.min([mu_R, mu_P])
        var sum_min = d3.sum(min_RP)

        d3.select('#truth_value_zadeh').node().innerHTML = "Truth value (Zadeh): " + (sum_min/sum_mu_R)
    } else {
        console.log(mu_P)
        console.log(iris.length)
        d3.select('#truth_value_zadeh').node().innerHTML = "Truth value (Zadeh): " + (d3.sum(mu_P)/iris.length)
    }
}

// function calc_GD_truth(extended){
//     if (extended) {
//
//     } else {
//
//     }
// }

function update_Q() {
    var group_Q = d3.select("#svg_Q").selectAll(".group")
        .data(window.mf_Q)

    var group_Q_enter = group_Q.enter().append("g")
        .attr("class", "group")

    group_Q_enter.append("path")
        .attr("d", function (d) { return lineGenerator_3(d.line);})
        .attr("fill", "none")
        .attr("stroke", d3.color("steelblue"))
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('cursor', 'move')
        .call(line_Q_drag)


    group_Q.select("path")
        .attr("d", function (d) { return lineGenerator_3(d.line); })

    var merge_Q_enter = group_Q.merge(group_Q_enter).selectAll("circle")
        .data(function (d) { return d.points;})
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )

    merge_Q_enter.enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("id", function (d, i) { return ("circle_Q_"+i)})
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )
        .call(point_Q_drag)

    // exit
    group_Q.exit().remove();
    merge_Q_enter.exit().remove();

    update_ls()
}

function update_R() {
    var group_R = d3.select("#svg_R").selectAll(".group")
        .data(window.mf_R)

    var group_R_enter = group_R.enter().append("g")
        .attr("class", "group")

    group_R_enter.append("path")
        .attr("d", function (d) { return lineGenerator_3(d.line);})
        .attr("fill", "none")
        .attr("stroke", d3.color("steelblue"))
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('cursor', 'move')
        .call(line_R_drag)


    group_R.select("path")
        .attr("d", function (d) { return lineGenerator_3(d.line); })

    var merge_R_enter = group_R.merge(group_R_enter).selectAll("circle")
        .data(function (d) { return d.points;})
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )

    merge_R_enter.enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("id", function (d, i) { return ("circle_R_"+i)})
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )
        .call(point_R_drag)

    // exit
    group_R.exit().remove();
    merge_R_enter.exit().remove();

    update_ls()
}

function update_P() {
    var group_P = d3.select("#svg_P").selectAll(".group")
        .data(window.mf_P)

    var group_P_enter = group_P.enter().append("g")
        .attr("class", "group")

    group_P_enter.append("path")
        .attr("d", function (d) { return lineGenerator_3(d.line);})
        .attr("fill", "none")
        .attr("stroke", d3.color("steelblue"))
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('cursor', 'move')
        .call(line_P_drag)


    group_P.select("path")
        .attr("d", function (d) { return lineGenerator_3(d.line); })

    var merge_P_enter = group_P.merge(group_P_enter).selectAll("circle")
        .data(function (d) { return d.points;})
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )

    merge_P_enter.enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("id", function (d, i) { return ("circle_P_"+i)})
        .attr("fill", d3.color("steelblue"))
        .attr('cursor', 'pointer' )
        .call(point_P_drag)

    // exit
    group_P.exit().remove();
    merge_P_enter.exit().remove();

    update_ls()
}

function dragstarted_three() {
    /* defines the behaviour when starting to drag */
    d3.select(this).classed('active', true);
}

function line_Q_dragged(event, d) {
    /* defines the behaviour when dragging a line */

    // check whether boundary conditions are met
    var [axis_min, axis_max] = x_3.domain()

    d.points.map(function (p) {
        var new_point = p.x + x_3.invert(event.dx);
        p.x = new_point > axis_max ? axis_max : new_point < axis_min ? axis_min : new_point
    })

    // replace the points from the lines with the updated points from this dragging (except for first and last points)
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points);

    //update the corresponding text box values

    [...d3.select("#Q").node().childNodes[2].getElementsByClassName("parameterinput_Q")]
        .map(function (d, i) {
            d.value = parseInt(window.mf_Q[0].points[i].x)
    })

    update_Q()
}

function line_R_dragged(event, d) {
    /* defines the behaviour when dragging a line */

    // check whether boundary conditions are met
    var [axis_min, axis_max] = x_3.domain()

    d.points.map(function (p) {
        var new_point = p.x + x_3.invert(event.dx);
        p.x = new_point > axis_max ? axis_max : new_point < axis_min ? axis_min : new_point
    })

    // replace the points from the lines with the updated points from this dragging (except for first and last points)
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points);

    //update the corresponding text box values
    [...d3.select("#R").node().childNodes[2].getElementsByClassName("parameterinput_R")]
        .map(function (d, i) {
            d.value = parseInt(window.mf_R[0].points[i].x)
        })

    update_R()
}

function line_P_dragged(event, d) {
    /* defines the behaviour when dragging a line */

    // check whether boundary conditions are met
    var [axis_min, axis_max] = x_3.domain()

    d.points.map(function (p) {
        var new_point = p.x + x_3.invert(event.dx);
        p.x = new_point > axis_max ? axis_max : new_point < axis_min ? axis_min : new_point
    })

    // replace the points from the lines with the updated points from this dragging (except for first and last points)
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points);

    //update the corresponding text box values
    [...d3.select("#P").node().childNodes[2].getElementsByClassName("parameterinput_P")]
        .map(function (d, i) {
            d.value = parseInt(window.mf_P[0].points[i].x)
        })

    update_P()
}

function point_Q_dragged(event, d) {
    /* defines the behaviour when dragging a point */
    var new_point = x_3.invert(event.x)
    var [axis_min, axis_max] = x_3.domain()

    // check if the previous sibling is of type path, if yes, axis min is bound, otherwise the circle value is
    var left_bound = d3.select(this).node().previousSibling.nodeName == "path" ? axis_min : d3.select(this).node().previousSibling.__data__.x
    // check if there is no next sibling, then axis max is limit, otherwise its next circle value is
    var right_bound = d3.select(this).node().nextSibling == null ? axis_max : d3.select(this).node().nextSibling.__data__.x

    d.x = new_point > right_bound ? right_bound : new_point < left_bound ? left_bound : new_point

    // replace the points from the lines with the updated points from this dragging (except for first and last points
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points)

    // update the corresponding text box value
    // id of circle elements holds info about parent (mf) id and index of the circle itself
    var mf_num = d3.select(this).node().id.slice(0, 1)
    var param_num = d3.select(this).node().id.slice(-1)

    d3.select("#Q").node().childNodes[2].getElementsByClassName("parameterinput_Q")[param_num].value = parseInt(d.x)

    update_Q()
}

function point_R_dragged(event, d) {
    /* defines the behaviour when dragging a point */
    var new_point = x_3.invert(event.x)
    var [axis_min, axis_max] = x_3.domain()

    // check if the previous sibling is of type path, if yes, axis min is bound, otherwise the circle value is
    var left_bound = d3.select(this).node().previousSibling.nodeName == "path" ? axis_min : d3.select(this).node().previousSibling.__data__.x
    // check if there is no next sibling, then axis max is limit, otherwise its next circle value is
    var right_bound = d3.select(this).node().nextSibling == null ? axis_max : d3.select(this).node().nextSibling.__data__.x

    d.x = new_point > right_bound ? right_bound : new_point < left_bound ? left_bound : new_point

    // replace the points from the lines with the updated points from this dragging (except for first and last points
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points)

    // update the corresponding text box value
    // id of circle elements holds info about parent (mf) id and index of the circle itself
    var param_num = d3.select(this).node().id.slice(-1)

    d3.select("#R").node().childNodes[2].getElementsByClassName("parameterinput_R")[param_num].value = parseInt(d.x)

    update_R()
}

function point_P_dragged(event, d) {
    /* defines the behaviour when dragging a point */
    var new_point = x_3.invert(event.x)
    var [axis_min, axis_max] = x_3.domain()

    // check if the previous sibling is of type path, if yes, axis min is bound, otherwise the circle value is
    var left_bound = d3.select(this).node().previousSibling.nodeName == "path" ? axis_min : d3.select(this).node().previousSibling.__data__.x
    // check if there is no next sibling, then axis max is limit, otherwise its next circle value is
    var right_bound = d3.select(this).node().nextSibling == null ? axis_max : d3.select(this).node().nextSibling.__data__.x

    d.x = new_point > right_bound ? right_bound : new_point < left_bound ? left_bound : new_point

    // replace the points from the lines with the updated points from this dragging (except for first and last points
    d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points)

    // update the corresponding text box value
    // id of circle elements holds info about parent (mf) id and index of the circle itself
    var param_num = d3.select(this).node().id.slice(-1)

    d3.select("#P").node().childNodes[2].getElementsByClassName("parameterinput_P")[param_num].value = parseInt(d.x)

    update_P()
}

function dragended_three() {
    /* defines the behaviour when ending a drag */
    d3.select(this).classed('active', false);
}

function mf_definition(ls) {

    var selected_div = d3.select("#" + ls).node()

    if (selected_div !== null) {
        // add the event listeners
        // add event listener to dropdown menu
        selected_div.addEventListener("change", function (e) {
            if (e.target.id === "ddown_Q") {
                // get the new type of mf
                var new_mf = mf_data.find(x => x.type === e.target.value)
                window.mf_Q[0].type = JSON.parse(JSON.stringify(new_mf.type))
                window.mf_Q[0].points = JSON.parse(JSON.stringify(new_mf.points))
                window.mf_Q[0].line = JSON.parse(JSON.stringify(new_mf.line))
                update_Q()

                // replace that (old) one with the new one according to the chosen mf option
                e.target.parentNode.getElementsByClassName('parameterdiv_Q')[0].replaceWith(create_params(e.target.value, "Q"))
            }
            if (e.target.id === "ddown_R") {
                // get the new type of mf
                var new_mf = mf_data.find(x => x.type === e.target.value)
                window.mf_R[0].type = JSON.parse(JSON.stringify(new_mf.type))
                window.mf_R[0].points = JSON.parse(JSON.stringify(new_mf.points))
                window.mf_R[0].line = JSON.parse(JSON.stringify(new_mf.line))
                update_R()

                // replace that (old) one with the new one according to the chosen mf option
                e.target.parentNode.getElementsByClassName('parameterdiv_R')[0].replaceWith(create_params(e.target.value, "R"))
            }
            if (e.target.id === "ddown_P") {
                // get the new type of mf
                var new_mf = mf_data.find(x => x.type === e.target.value)
                window.mf_P[0].type = JSON.parse(JSON.stringify(new_mf.type))
                window.mf_P[0].points = JSON.parse(JSON.stringify(new_mf.points))
                window.mf_P[0].line = JSON.parse(JSON.stringify(new_mf.line))
                update_P()

                // replace that (old) one with the new one according to the chosen mf option
                e.target.parentNode.getElementsByClassName('parameterdiv_P')[0].replaceWith(create_params(e.target.value, "P"))
            }
        })
        // add event listener to parameter textboxes
        selected_div.addEventListener("change", function (e) {
            if (e.target.className === 'parameterinput_Q') {
                // get the index of the parameter that was changed
                var currParam = parseInt(e.target.previousSibling.wholeText.slice(-3, -2))
                // get the total number of parameters for this mf
                var totalParam = window.mf_Q[0].points.length - 1
                // next, do the boundary check
                // if the current param is the first, then bound is 0, otherwise it is the value from the next left input
                var left_bound = (currParam==0) ? 0 : window.mf_Q[0].points[currParam-1].x
                // if the current param is the last, then bound is 100, otherwise it is the value from the next right input
                var right_bound = (currParam==totalParam) ? 100 : window.mf_Q[0].points[currParam+1].x

                var target_value = parseInt(e.target.value)
                var new_value = target_value > right_bound ? right_bound : target_value < left_bound ? left_bound : target_value
                e.target.value = new_value
                // get changed parameter from html text written before text field
                var param_pos = parseInt(e.target.previousSibling.data.slice(-3, -2))
                // now change the x value in the corresponding array/object position
                window.mf_Q[0].points[param_pos].x = new_value
                window.mf_Q[0].line[param_pos+1].x = new_value

                update_Q()
            }
            if (e.target.className === 'parameterinput_R') {
                // get the index of the parameter that was changed
                var currParam = parseInt(e.target.previousSibling.wholeText.slice(-3, -2))
                // get the total number of parameters for this mf
                var totalParam = window.mf_R[0].points.length - 1
                // next, do the boundary check
                // if the current param is the first, then bound is 0, otherwise it is the value from the next left input
                var left_bound = (currParam==0) ? 0 : window.mf_R[0].points[currParam-1].x
                // if the current param is the last, then bound is 100, otherwise it is the value from the next right input
                var right_bound = (currParam==totalParam) ? 100 : window.mf_R[0].points[currParam+1].x

                var target_value = parseInt(e.target.value)
                var new_value = target_value > right_bound ? right_bound : target_value < left_bound ? left_bound : target_value
                e.target.value = new_value
                // get changed parameter from html text written before text field
                var param_pos = parseInt(e.target.previousSibling.data.slice(-3, -2))
                // now change the x value in the corresponding array/object position
                window.mf_R[0].points[param_pos].x = new_value
                window.mf_R[0].line[param_pos+1].x = new_value

                update_R()
            }
            if (e.target.className === 'parameterinput_P') {
                // get the index of the parameter that was changed
                var currParam = parseInt(e.target.previousSibling.wholeText.slice(-3, -2))
                // get the total number of parameters for this mf
                var totalParam = window.mf_P[0].points.length - 1
                // next, do the boundary check
                // if the current param is the first, then bound is 0, otherwise it is the value from the next left input
                var left_bound = (currParam==0) ? 0 : window.mf_P[0].points[currParam-1].x
                // if the current param is the last, then bound is 100, otherwise it is the value from the next right input
                var right_bound = (currParam==totalParam) ? 100 : window.mf_P[0].points[currParam+1].x

                var target_value = parseInt(e.target.value)
                var new_value = target_value > right_bound ? right_bound : target_value < left_bound ? left_bound : target_value
                e.target.value = new_value
                // get changed parameter from html text written before text field
                var param_pos = parseInt(e.target.previousSibling.data.slice(-3, -2))
                // now change the x value in the corresponding array/object position
                window.mf_P[0].points[param_pos].x = new_value
                window.mf_P[0].line[param_pos+1].x = new_value

                update_P()
            }
        })
        // add event listener to linguistic variable textbox
        selected_div.addEventListener("change", function (e) {
            if (e.target.id === 'variable_Q') {
                window.mf_Q[0].variable = e.target.value
                update_Q()
            }
            if (e.target.id === 'variable_R') {
                window.mf_R[0].variable = e.target.value
                update_R()
            }
            if (e.target.id === 'variable_P') {
                window.mf_P[0].variable = e.target.value
                update_P()
            }
        })

        // create text field holding the linguistic variable
        var inp = document.createElement("input");
        inp.type = "text";
        inp.id = 'variable_' + ls
        inp.value = ls == "Q" ? window.mf_Q.variable : (ls == "R") ? window.mf_R.variable : window.mf_P.variable// "Medium"//window.displayed_mf[index].variable
        inp.style.width = "143px";
        selected_div.appendChild(inp);

        // create dropdown list for mf functions
        var ddown_mf = document.createElement("select");
        for (var i = 0; i < mf_data.length; i++) {
            ddown_mf.appendChild((new Option(mf_data[i].type, mf_data[i].type)))
        }
        ddown_mf.id = "ddown_" + ls
        ddown_mf.value = mf_data[0].type
        selected_div.appendChild(ddown_mf);

        // create parameter boxes, starting with triangular
        selected_div.appendChild(create_params(mf_data[0].type, ls))
    }
}

function create_params(mftype, ls) {
    // get the specific parameter values of params depending on the chosen mf function
    p = mf_data.find(x => x.type === mftype).points.map(v => parseInt(v.x))

    // create new div holding everything
    var ndiv = document.createElement("div");
    // ndiv.className = 'parameterdiv'
    ndiv.className = 'parameterdiv_' + ls

    // depending on the amount of parameters, create as many textboxes
    for (var i = 0; i < p.length; i++) {
        subdiv = document.createElement("div")
        var inp = document.createElement("input");
        inp.className = "parameterinput_" + ls
        // input.id = "parameter_" + i
        inp.type = "text";
        inp.value = p[i];
        inp.style.width = "50px";

        subdiv.appendChild(inp);
        inp.insertAdjacentHTML('beforebegin', "Parameter " + i.toString() + ": ");
        ndiv.appendChild(subdiv)
    }

    // finally return the div
    return ndiv

}
