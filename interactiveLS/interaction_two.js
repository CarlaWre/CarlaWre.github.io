/* displays the second interactive element about the membership function definition */
var displayed_mf = [JSON.parse(JSON.stringify(mf_data[0])), JSON.parse(JSON.stringify(mf_data[0])), JSON.parse(JSON.stringify(mf_data[0]))]
for (var i=0; i<displayed_mf.length; i++) {
    displayed_mf[i].id = i;
    displayed_mf[i].visible = false;
    displayed_mf[i].variable = standard_ls_text
}
displayed_mf[0].visible = true

// console.log(displayed_mf)

// initiate the respective drag behaviour for lines and points
let point_drag = d3.drag()
    .subject(function() {return window.displayed_mf;})
    .on('start', dragstarted)
    .on('drag', point_dragged)
    .on('end', dragended);

let line_drag = d3.drag()
    .subject(function() {return window.displayed_mf;})
    .on('start', dragstarted)
    .on('drag', line_dragged)
    .on('end', dragended);

// set the dimensions and margins of the graph
var width = global_width - margin.left - margin.right;
var height = global_height - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#mfDisplay")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// add legend
var legend = svg
    .append("g")
    .attr("id", "legend_svg")
    .attr("transform", "translate(" + margin.left + "," + itemHeight + ")" );

// base setup for the upper svg holding the mf selection
var upper = svg
    .append("g")
    .attr("id", "upper")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

upper.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

// x axis label
upper.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 5)
    .attr("y", height + margin.top - 10)
    .text("X")

// y axis
const y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

upper.append("g")
    .call(d3.axisLeft(y));

// y axis label
upper.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2 + 22)
    .text("MF(X)")

// method to read the data as line
var lineGenerator = d3.line()
    .x(function(d) { return x(d.x);})
    .y(function(d) { return y(d.y);})

// colour scheme for the different categories
var colour_2 = d3.scaleOrdinal(d3.schemeCategory10);

// base setup for the lower svg holding the scatter plot with mf
var lower = d3.select("#scatter_mf")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "lower")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

lower.append("g")
    .attr('class', 'iris_xaxis')
    .attr('value', 'pl')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(iris_x))

lower.append("text")
    .attr('class', 'iris_xaxis_label')
    .attr("text-anchor", "end")
    .attr("x", width / 2 + margin.left)
    .attr("y", height + margin.top - 10)
    .text(feat_names.find(obj => obj.id === x_feat).name)

lower.append("g")
    .attr('class', 'iris_yaxis')
    .attr('value', 'pw')
    .call(d3.axisLeft(iris_y));

// lower.append("text")
//     .attr('class', 'iris_yaxis_label')
//     .attr("text-anchor", "end")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -margin.left + 20)
//     .attr("x", -height / 2)
//     .text(feat_names.find(obj => obj.id === y_feat).name)

// draw everything
update_mf_display()
update_scatter_display()


// make sure that the last mf is at the bottom, then the middle one and the fist is always on top
// d3.select("#group_1").raise()
// d3.select("#group_0").raise()

function update_scatter_display() {
    // update the axis
    iris_y.domain([eval(y_feat+"_min"), eval(y_feat+"_max")])
    iris_x.domain([eval(x_feat+"_min"), eval(x_feat+"_max")])

    d3.select("#lower").selectAll("circle")
        .data(iris)
        .join("circle")
            .attr("cx", function (d) { return iris_x(eval("d." + x_feat)); })
            .attr("cy", function (d) { return iris_y(eval("d." + y_feat)); })
            .attr("r", function(d) { return calculate_mf_radius(d); })
            .style("fill", function (d) { return colour_2(d.class); })

}

function calculate_mf_radius(d) {
    var value = d[x_feat]
    var map_value = mapping(value, eval(x_feat+"_min"), eval(x_feat+"_max"), 0, 100)
    var x_coords = window.displayed_mf[0].points.map(v => parseInt(v.x))
    var mf_value = calc_mf_value(window.displayed_mf[0].type, [map_value, ...x_coords ])
    var final_radius = mapping(mf_value, 0,1,1,5)

    return final_radius
}

function update_mf_display() {
    var groups = d3.select("#upper").selectAll(".group")
        .data(window.displayed_mf)

    var groupEnter = groups.enter().append("g")
        .attr("class", "group")
        .attr("id", function (d) { return "group_" + d.id });

    // enter path
    groupEnter.append("path")
        // .attr("class", "lines")
        .attr("d", function (d) { return lineGenerator(d.line);})
        .attr("id", function (d) { return "line_" + d.id})
        .attr("fill", "none")
        .attr("stroke", function (d) { return colour(d.id); })
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('opacity', function (d) { return d.visible ? 1 : 0} )
        .attr('cursor', function (d) { return d.visible ? 'move' : 'standard'} )
        .call(line_drag)

    // update path
    groups.select("path")
        .attr("d", function (d) { return lineGenerator(d.line); })
        .attr("id", function (d) { return "line_" + d.id })
        .attr("stroke", function (d) { return colour(d.id); })
        .attr('opacity', function (d) { return d.visible ? 1 : 0 })
        .attr('cursor', function (d) { return d.visible ? 'move' : 'standard' })

    // update points
    var mergeEnter = groups.merge(groupEnter).selectAll("circle")
        .data(function (d) { return d.points;})
        // .attr("class", "circle")
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("id", function (d, i) { return (this.parentNode.__data__.id+"_"+i)})
        .attr("fill", function () { return colour(this.parentNode.__data__.id); })
        .attr('opacity', function () { return this.parentNode.__data__.visible ? 1 : 0})
        .attr('cursor', function () { return this.parentNode.__data__.visible ? 'pointer' : 'standard'} )

    // enter points
    mergeEnter.enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function (d) { return x(d.x);})
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .attr("id", function (d, i) { return (this.parentNode.__data__.id+"_"+i)})
        .attr("fill", function () { return colour(this.parentNode.__data__.id); })
        .attr('opacity', function () { return this.parentNode.__data__.visible ? 1 : 0})
        .attr('cursor', function () { return this.parentNode.__data__.visible ? 'pointer' : 'standard'} )
        .call(point_drag)

    // exit
    groups.exit().remove();
    mergeEnter.exit().remove();

    // legend
    var legend = d3.select("#legend_svg").selectAll(".legend")
        .data(window.displayed_mf)

    var legendEnter = legend.enter().append("g")
        .attr("transform", function(d,i) { return "translate(" + i * itemWidth + ",0)" ; })
        .attr("class","legend");

    // rects enter
    legendEnter.append("rect")
        .attr("width", itemHeight/2)
        .attr("height", itemHeight/2)
        .attr("fill", function (d) { return colour(d.id); })
        .attr('opacity', function (d) { return d.visible ? 1 : 0} )

    // text enter
    legendEnter.append("text")
        .attr("x", itemHeight/3*2)
        .attr("y", itemHeight/2)
        .attr("fill", function(d) { return colour(d.id); })
        .attr('opacity', function (d) { return d.visible ? 1 : 0} )
        .text(function(d) { return d.variable})
        .attr('font-size', 12)

    // rect update
    legend.select("rect")
        .attr('opacity', function (d) { return d.visible ? 1 : 0} )

    // text update
    legend.select("text")
        .attr('opacity', function (d) { return d.visible ? 1 : 0} )
        .text(function(d) { return d.variable})

    // update_scatter_display()
}


function dragstarted() {
    /* defines the behaviour when starting to drag */
    d3.select(this).classed('active', true);
}

function line_dragged(event, d) {
    /* defines the behaviour when dragging a line */
    // first check to only grab visible line
    if (d3.select(this).attr('opacity')==1) {
        // check whether boundary conditions are met
        var [axis_min, axis_max] = x.domain()

        d.points.map(function (p) {
            var new_point = p.x + x.invert(event.dx);
            p.x = new_point > axis_max ? axis_max : new_point < axis_min ? axis_min : new_point
        })

        // replace the points from the lines with the updated points from this dragging (except for first and last points)
        d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points)

        //update the corresponding text box values
        var mf_num = d3.select(this).node().id.slice(-1);
        // [...document.getElementById("linguistic_definitions").childNodes[mf_num].getElementsByClassName("parameterinput")].map(function (d, i) { d.value = + parseFloat(window.displayed_mf[mf_num].points[i].x).toFixed(1) })
        [...document.getElementById("linguistic_definitions").childNodes[mf_num]
            .getElementsByClassName("parameterinput")].map(function (d, i) {
                d.value = parseInt(window.displayed_mf[mf_num].points[i].x)
            })

        update_mf_display()
    }
}

function point_dragged(event, d) {
    /* defines the behaviour when dragging a point */
    if (d3.select(this).attr('opacity')==1) {
        var new_point = x.invert(event.x)
        var [axis_min, axis_max] = x.domain()

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

        // document.getElementById("linguistic_definitions").childNodes[mf_num].getElementsByClassName("parameterinput")[param_num].value = + parseFloat(d.x).toFixed(1)
        document.getElementById("linguistic_definitions").childNodes[mf_num].getElementsByClassName("parameterinput")[param_num].value = parseInt(d.x)

        update_mf_display()
    }
}

function dragended() {
    /* defines the behaviour when ending a drag */
    d3.select(this).classed('active', false);
    update_scatter_display()
}


function change_mf(new_mf, index) {
    /*

     */
    window.displayed_mf[index].type = JSON.parse(JSON.stringify(new_mf.type))
    window.displayed_mf[index].points = JSON.parse(JSON.stringify(new_mf.points))
    window.displayed_mf[index].line = JSON.parse(JSON.stringify(new_mf.line))
    window.displayed_mf[index].id = index

}


function get_div_pos(source) {
    var memdiv = source.closest(".mem_div");
    if (memdiv.previousElementSibling==null) {
        return 0;
    } else if (memdiv.previousElementSibling.previousElementSibling==null) {
        return 1;
    } else {
        return 2;
    }
}

function add_linguistic_definition(index) {
    /* create new block of linguistic variable definitions */

    // get the parent container to listen to any of the added or removed buttons
    // placed here because it will only happen the first time the method is called
    if (def_count===0) {
        // add event listener to button clicks
        document.getElementById("linguistic_definitions").addEventListener('click', function (e) {
            if (e.target.className === 'add'){
                if (def_count!==3){
                    e.target.style.display = 'none'
                    window.displayed_mf[get_div_pos(e.target)+1].visible = true
                    add_linguistic_definition(get_div_pos(e.target)+1)
                    update_mf_display()
                }

            }
            if (e.target.className === 'remove'){
                def_count--
                // find out the right buttons to display again
                div_pos = get_div_pos(e.target)

                window.displayed_mf[div_pos].visible = false
                if (div_pos === 1) {
                    if (window.displayed_mf[div_pos+1].visible) {
                        document.getElementsByClassName('add')[document.getElementsByClassName('add').length-1].style.display = 'block';
                        [window.displayed_mf[1], window.displayed_mf[2]] = [window.displayed_mf[2], window.displayed_mf[1]];
                        [window.displayed_mf[1].id, window.displayed_mf[2].id] = [window.displayed_mf[2].id, window.displayed_mf[1].id]
                    } else {
                        document.getElementsByClassName('add')[0].style.display = 'block'
                    }
                } else if (div_pos === 2) {
                    document.getElementsByClassName('add')[1].style.display = 'block'
                }
                // remove the parental div it belongs to
                e.target.parentNode.remove()
                // reset the parameters of the mf ???

                update_mf_display()
            }
        })

        // add event listener to dropdown menu
        document.getElementById("linguistic_definitions").addEventListener("change", function (e) {
            if (e.target.className === 'dropdown_mf') {
                mf_pos = get_div_pos(e.target)
                // check which parameter div triggered the change, and adapt the corresponding line accordingly
                // get the new type of mf
                var new_mf = mf_data.find(x => x.type === e.target.value)
                change_mf(new_mf, mf_pos)
                update_mf_display()
                update_scatter_display()

                // replace that (old) one with the new one according to the chosen mf option
                e.target.parentNode.getElementsByClassName('parameterdiv')[0].replaceWith(create_parameters(e.target.value, mf_pos))
            }
        })

        // add event listener to parameter textboxes
        document.getElementById("linguistic_definitions").addEventListener("change", function (e) {
            if (e.target.className === 'parameterinput') {
                // new_value = + parseFloat(e.target.value).toFixed(1)
                var new_value = parseInt(e.target.value)
                e.target.value = new_value
                // check for which mf the change was triggered
                // go up twice, cause method already exists for this level (could be nicer, I know)
                div_pos = get_div_pos(e.target)
                // get changed parameter from html text written before text field
                var param_pos = parseInt(e.target.previousSibling.data.slice(-3, -2))
                // now change the x value in the corresponding array/object position
                window.displayed_mf[div_pos].points[param_pos].x = new_value
                window.displayed_mf[div_pos].line[param_pos+1].x = new_value

                update_mf_display()
                update_scatter_display()
            }
        })

        // add event listener to linguistic variable textbox
        document.getElementById("linguistic_definitions").addEventListener("change", function (e) {
            if (e.target.className === 'ls_variable') {
                div_pos = get_div_pos(e.target)
                window.displayed_mf[div_pos].variable = e.target.value

                update_mf_display()
            }
        })
    }

    // increase count of linguistic definition blocks
    def_count++

    // create new div holding all subparts
    var newdiv = document.createElement("div");
    newdiv.className = 'mem_div'

    // create text field holding the linguistic variable
    var input = document.createElement("input");
    input.type = "text";
    input.className = 'ls_variable'
    if (window.displayed_mf[index].variable == standard_ls_text) {
        input.value = standard_ls_text
    } else {
        input.value = window.displayed_mf[index].variable
    }
    input.style.width = "143px";
    newdiv.appendChild(input);

    // create dropdown list for mf functions
    var dropdown_mf = document.createElement("select");
    for (var i = 0; i < mf_data.length; i++) {
        dropdown_mf.appendChild((new Option(mf_data[i].type, mf_data[i].type)))
    }
    dropdown_mf.className = "dropdown_mf"
    dropdown_mf.value = window.displayed_mf[index].type
    newdiv.appendChild(dropdown_mf);

    // create parameter boxes, starting with triangular
    newdiv.appendChild(create_parameters(window.displayed_mf[index].type, index))

    // create button for another linguistic definition block
    var addbutton = document.createElement("button")
    addbutton.className = 'add'
    addbutton.id = 'add_' + def_count
    addbutton.textContent = "Add linguistic variable";
    if (def_count===3) {
        addbutton.style.display = 'none'
    }
    newdiv.appendChild(addbutton);

    // if there is more than one block, show the possibility to remove one variable
    if (def_count!==1) {
        var removebutton = document.createElement("button")
        removebutton.className = 'remove'
        removebutton.id = 'remove_' + def_count
        removebutton.textContent = "Remove linguistic variable";
        newdiv.appendChild(removebutton);
    }

    //add the newly created div in the right section
    document.getElementById('linguistic_definitions').append(newdiv)
}


function create_parameters(mf_type, index) {
    /* creates (sub) div, holding the parameters depending on the mf function */
    // first check whether the "new" type of mf is the same as the previous (hidden) mf
    if (window.displayed_mf[index].type==mf_type) {
        p = window.displayed_mf[index].points.map(v => parseInt(v.x))
    } else {
        // get the specific parameter values of params depending on the chosen mf function
        p = mf_data.find(x => x.type === mf_type).points.map(v => parseInt(v.x))
    }

    // create new div holding everything
    var newdiv = document.createElement("div");
    newdiv.className = 'parameterdiv'

    // depending on the amount of parameters, create as many textboxes
    for (var i = 0; i < p.length; i++) {
        subdiv = document.createElement("div")
        var input = document.createElement("input");
        input.className = "parameterinput"
        // input.id = "parameter_" + i
        input.type = "text";
        input.value = p[i];
        input.style.width = "50px";

        subdiv.appendChild(input);
        input.insertAdjacentHTML('beforebegin', "Parameter " + i.toString() + ": ");
        newdiv.appendChild(subdiv)
    }

    // finally return the div
    return newdiv
}
