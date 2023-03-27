/* displays the third interactive element about truth value calculation */
var mf_Q = JSON.parse(JSON.stringify(mf_data[0]))
var mf_R = JSON.parse(JSON.stringify(mf_data[0]))
var mf_P = JSON.parse(JSON.stringify(mf_data[0]))

mf_Q.variable = "Almost all"
mf_R.variable = "Medium"
mf_P.variable = "Small"

mf_Q.letter = "Q"
mf_R.letter = "R"
mf_P.letter = "P";

class MemChart {

    update() {
        // console.log("UPDATE UPDATE UPDATE")
        // console.log(this)
        // console.log(this.data)

        var that = this;
        var group = this.svg.selectAll(".group")
            .data([this.data])

        var group_enter = group.enter().append("g")
            .attr("class", "group")

        group_enter.append("path")
            .attr("d", function (d) { return _lineGenerator(d.line);})
            .attr("fill", "none")
            .attr("stroke", d3.color("steelblue"))
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr('cursor', 'move')
            .call(
                d3.drag()
                    .subject(() => {return that.data;})
                    .on('drag', (event, d) => {
                        /* defines the behaviour when dragging a line */
                        // check whether boundary conditions are met
                        var [axis_min, axis_max] = _x.domain()

                        d.points.map(function (p) {
                            var new_point = p.x + _x.invert(event.dx);
                            p.x = new_point > axis_max ? axis_max : new_point < axis_min ? axis_min : new_point
                        })

                        // replace the points from the lines with the updated points from this dragging (except for first and last points)
                        this.data.line.splice(1, this.data.points.length, ...this.data.points);

                        //update the corresponding text box values
                        [...d3.select("#" + this.data.letter).node().childNodes[2].getElementsByClassName("parameterinput_" + this.data.letter)]
                            .map((d, i) => {
                                d.value = parseInt(this.data.points[i].x)
                            })

                        this.update()
                    })
            )

        group.select("path")
            .attr("d", function (d) { return _lineGenerator(d.line); })

        var merge_enter = group.merge(group_enter).selectAll("circle")
            .data(function (d) { return d.points;})
            .attr("cx", function (d) { return _x(d.x);})
            .attr("cy", function (d) { return _y(d.y); })
            .attr("r", 5)
            .attr("fill", d3.color("steelblue"))
            .attr('cursor', 'pointer' )

        merge_enter.enter().append("circle")
            .attr("class", "circle")
            .attr("cx", function (d) { return _x(d.x);})
            .attr("cy", function (d) { return _y(d.y); })
            .attr("r", 5)
            .attr("id", function (d, i) { return ("circle_"+i)})
            .attr("fill", d3.color("steelblue"))
            .attr('cursor', 'pointer' )
            .call(
                d3.drag()
                    .subject(() => {return that.data;})
                    .on('drag', function(event,d) {
                        /* defines the behaviour when dragging a point */
                        var new_point = _x.invert(event.x)
                        var [axis_min, axis_max] = _x.domain()

                        // check if the previous sibling is of type path, if yes, axis min is bound, otherwise the circle value is
                        var left_bound = d3.select(this).node().previousSibling.nodeName == "path" ? axis_min : d3.select(this).node().previousSibling.__data__.x
                        // check if there is no next sibling, then axis max is limit, otherwise its next circle value is
                        var right_bound = d3.select(this).node().nextSibling == null ? axis_max : d3.select(this).node().nextSibling.__data__.x

                        d.x = new_point > right_bound ? right_bound : new_point < left_bound ? left_bound : new_point

                        // replace the points from the lines with the updated points from this dragging (except for first and last points
                        that.data.line.splice(1, that.data.points.length, ...that.data.points)
                        // d3.select(this).node().parentNode.__data__.line.splice(1, d3.select(this).node().parentNode.__data__.points.length, ...d3.select(this).node().parentNode.__data__.points)

                        // update the corresponding text box value
                        // id of circle elements holds info about parent (mf) id and index of the circle itself
                        var mf_num = d3.select(this).node().id.slice(0, 1)
                        var param_num = d3.select(this).node().id.slice(-1)

                        d3.select("#"+that.data.letter).node().childNodes[2].getElementsByClassName("parameterinput_"+that.data.letter)[param_num].value = parseInt(d.x)

                        that.update()
                    })
            )



        // exit
        group.exit().remove();
        merge_enter.exit().remove();

        // update_ls()

    }

    create_params(mftype) {
        // get the specific parameter values of params depending on the chosen mf function
        var p = mf_data.find(x => x.type === mftype).points.map(v => parseInt(v.x))

        // create new div holding everything
        var ndiv = document.createElement("div");
        // ndiv.className = 'parameterdiv'
        ndiv.className = 'parameterdiv_' + this.data.letter

        // depending on the amount of parameters, create as many textboxes
        for (var i = 0; i < p.length; i++) {
            var subdiv = document.createElement("div")
            var inp = document.createElement("input");
            inp.className = "parameterinput_" + this.data.letter
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

    mf_definition() {
        var assos_div = d3.select("#" + this.data.letter).node()

        if (assos_div !== null) {
            // add the event listeners
            // add event listener to dropdown menu
            assos_div.addEventListener("change", (e) => {
                if (e.target.id === "ddown_" + this.data.letter) {
                    // get the new type of mf
                    var new_mf = mf_data.find(x => x.type === e.target.value)
                    this.data.type = JSON.parse(JSON.stringify(new_mf.type))
                    this.data.points = JSON.parse(JSON.stringify(new_mf.points))
                    this.data.line = JSON.parse(JSON.stringify(new_mf.line))
                    this.update()

                    // replace that (old) one with the new one according to the chosen mf option
                    e.target.parentNode.getElementsByClassName('parameterdiv_' + this.data.letter)[0].replaceWith(this.create_params(e.target.value))
                }
            })
            // add event listener to parameter textboxes
            assos_div.addEventListener("change", (e) => {
                if (e.target.className === 'parameterinput_'+this.data.letter) {
                    // get the index of the parameter that was changed
                    var currParam = parseInt(e.target.previousSibling.wholeText.slice(-3, -2))
                    // get the total number of parameters for this mf
                    var totalParam = this.data.points.length - 1
                    // next, do the boundary check
                    // if the current param is the first, then bound is 0, otherwise it is the value from the next left input
                    var left_bound = (currParam == 0) ? 0 : this.data.points[currParam - 1].x
                    // if the current param is the last, then bound is 100, otherwise it is the value from the next right input
                    var right_bound = (currParam == totalParam) ? 100 : this.data.points[currParam + 1].x

                    var target_value = parseInt(e.target.value)
                    var new_value = target_value > right_bound ? right_bound : target_value < left_bound ? left_bound : target_value
                    e.target.value = new_value
                    // get changed parameter from html text written before text field
                    var param_pos = parseInt(e.target.previousSibling.data.slice(-3, -2))
                    // now change the x value in the corresponding array/object position
                    this.data.points[param_pos].x = new_value
                    this.data.line[param_pos + 1].x = new_value

                    this.update()
                }
            })
            // add event listener to linguistic variable textbox
            assos_div.addEventListener("change", (e) => {
                if (e.target.id === 'variable_' + this.data.letter) {
                    this.data.variable = e.target.value
                    this.update()
                }
            })

            // create text field holding the linguistic variable
            var inp = document.createElement("input");
            inp.type = "text";
            inp.id = 'variable_' + this.data.letter
            inp.value = this.data.variable
            inp.style.width = "143px";
            assos_div.appendChild(inp);

            // create dropdown list for mf functions
            var ddown_mf = document.createElement("select");
            for (var i = 0; i < mf_data.length; i++) {
                ddown_mf.appendChild((new Option(mf_data[i].type, mf_data[i].type)))
            }
            ddown_mf.id = "ddown_" + this.data.letter
            ddown_mf.value = mf_data[0].type
            assos_div.appendChild(ddown_mf);

            // create parameter boxes, starting with triangular
            assos_div.appendChild(this.create_params(mf_data[0].type))
        }
    }

    constructor(data) {
        this.data = data
        // console.log(data)
        // console.log(data.letter)
        // console.log(d3.select("#draw_" + data.letter))

        this.svg = d3.select("#draw_" + data.letter)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "g_area")
            .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")" );

        this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(_x))
        this.svg.append("g")
            .call(d3.axisLeft(_y));

        this.mf_definition()
        this.update()
    }

}

var q_chart = new MemChart(mf_Q)
var r_chart = new MemChart(mf_R)
var p_chart = new MemChart(mf_P)
update_ls()

function update_ls() {
    if (d3.select("#variable_Q").node() !== null) {
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

        var final_sentence = ($("input[name=protoform]:checked").val() == "simple protoform") ? simple_sentence : extended_sentence

        d3.select('#final_ls').node().innerHTML = final_sentence

        update_truth()
    }
}

function qualifier_visibility(selection){
    document.getElementById("div_qualifier").style.display = selection.value == "simple protoform" ? 'none' : 'block';
    update_ls()
}

function qualifier_options(selection){
    [...div_qualifier_radio.getElementsByTagName("div")].filter(function (ids){
        if (ids.id.slice(0,2) == selection.id.slice(0,2)) {
            ids.style.display = 'none'
            // change the selection to the other width/length of same feature
            if (ids.id.slice(1,2) == "l") {
                document.getElementById(ids.id.slice(0,1)+"w"+ids.id.slice(2)).getElementsByTagName("input")[0].checked = true;
            } else {
                document.getElementById(ids.id.slice(0,1)+"l"+ids.id.slice(2)).getElementsByTagName("input")[0].checked = true;
            }
        }
        else {
            ids.style.display = 'block'
        }
    })
    update_ls()
}

function update_truth() {
    calc_Zadeh_truth()
    // calc_GD_truth()
}

function calc_Zadeh_truth(){
    // console.log($("input[name=protoform]:checked").val());
    var protoform = $("input[name=protoform]:checked").val()
    // console.log(protoform)
    // console.log(protoform=="extended")
    var selected_feature = $("input[name=featureR]:checked").attr('id').slice(0,2)
    var selected_summarizer = $("input[name=summmarizer_radio]:checked").attr('id').slice(0,2)
    // console.log(selected_summarizer)
    // console.log(selected_feature)
    // console.log(iris)
    var mu_P = iris.map(e => calc_mf_value_relative(p_chart.data.type, selected_summarizer,[e[selected_summarizer], ...p_chart.data.points.map(p => p.x)]) )

    if (protoform=="extended") {
        // console.log("ËXTENDED")
        var mu_R = iris.map(e => calc_mf_value_relative(r_chart.data.type, selected_feature,[e[selected_feature], ...r_chart.data.points.map(p => p.x)]) )
        // console.log(mu_R)
        var sum_mu_R = d3.sum(mu_R)
        var min_RP = d3.min([mu_R, mu_P])
        var sum_min = d3.sum(min_RP)
        //
        // console.log(sum_min)
        // console.log(sum_mu_R)
        // console.log(sum_min/sum_mu_R)

        var mu_Q = calc_mf_value_relative(q_chart.data.type, "Q", [(sum_min/sum_mu_R), ...q_chart.data.points.map(p => p.x)])
        // console.log(mu_Q)
        d3.select('#truth_value_zadeh').node().innerHTML = "Truth value (Zadeh) - extended protoform: " + mu_Q
    } else {
        var mu_Q = calc_mf_value_relative(q_chart.data.type, "Q", [(d3.sum(mu_P)/iris.length), ...q_chart.data.points.map(p => p.x)])
        d3.select('#truth_value_zadeh').node().innerHTML = "Truth value (Zadeh) - simple protoform: " + mu_Q
    }
}
//
// // function calc_GD_truth(extended){
// //     var protoform = $("input[name=protoform]:checked").val()
// //     var selected_feature = $("input[name=featureR]:checked").attr('id').slice(0,2)
// //     var selected_summarizer = $("input[name=summmarizer_radio]:checked").attr('id').slice(0,2)
// //
// //     // first, calculalate mu_P like before
// //     var mu_P = iris.map(e => calc_mf_value_relative(window.mf_P[0].type, selected_summarizer,[e[selected_summarizer], ...window.mf_P[0].points.map(p => p.x)]) )
// //     // then sort it
// //     var mu_P_sorted = mu_P.sort((a,b)=>b-a)
// //     console.log(mu_P_sorted)
// //
// //     if (extended) {
// //
// //     } else {
// //
// //
// //     }
// // }
//
