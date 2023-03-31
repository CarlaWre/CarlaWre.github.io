// storage space for global variables usable across the different interactions
var iris = [
    {sl: 5.1, sw: 3.5, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 4.9, sw: 3.0, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 4.7, sw: 3.2, pl: 1.3, pw: 0.2, class: "Iris setosa"},
    {sl: 4.6, sw: 3.1, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.6, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 5.4, sw: 3.9, pl: 1.7, pw: 0.4, class: "Iris setosa"},
    {sl: 4.6, sw: 3.4, pl: 1.4, pw: 0.3, class: "Iris setosa"},
    {sl: 5.0, sw: 3.4, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 4.4, sw: 2.9, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 4.9, sw: 3.1, pl: 1.5, pw: 0.1, class: "Iris setosa"},
    {sl: 5.4, sw: 3.7, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 4.8, sw: 3.4, pl: 1.6, pw: 0.2, class: "Iris setosa"},
    {sl: 4.8, sw: 3.0, pl: 1.4, pw: 0.1, class: "Iris setosa"},
    {sl: 4.3, sw: 3.0, pl: 1.1, pw: 0.1, class: "Iris setosa"},
    {sl: 5.8, sw: 4.0, pl: 1.2, pw: 0.2, class: "Iris setosa"},
    {sl: 5.7, sw: 4.4, pl: 1.5, pw: 0.4, class: "Iris setosa"},
    {sl: 5.4, sw: 3.9, pl: 1.3, pw: 0.4, class: "Iris setosa"},
    {sl: 5.1, sw: 3.5, pl: 1.4, pw: 0.3, class: "Iris setosa"},
    {sl: 5.7, sw: 3.8, pl: 1.7, pw: 0.3, class: "Iris setosa"},
    {sl: 5.1, sw: 3.8, pl: 1.5, pw: 0.3, class: "Iris setosa"},
    {sl: 5.4, sw: 3.4, pl: 1.7, pw: 0.2, class: "Iris setosa"},
    {sl: 5.1, sw: 3.7, pl: 1.5, pw: 0.4, class: "Iris setosa"},
    {sl: 4.6, sw: 3.6, pl: 1.0, pw: 0.2, class: "Iris setosa"},
    {sl: 5.1, sw: 3.3, pl: 1.7, pw: 0.5, class: "Iris setosa"},
    {sl: 4.8, sw: 3.4, pl: 1.9, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.0, pl: 1.6, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.4, pl: 1.6, pw: 0.4, class: "Iris setosa"},
    {sl: 5.2, sw: 3.5, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 5.2, sw: 3.4, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 4.7, sw: 3.2, pl: 1.6, pw: 0.2, class: "Iris setosa"},
    {sl: 4.8, sw: 3.1, pl: 1.6, pw: 0.2, class: "Iris setosa"},
    {sl: 5.4, sw: 3.4, pl: 1.5, pw: 0.4, class: "Iris setosa"},
    {sl: 5.2, sw: 4.1, pl: 1.5, pw: 0.1, class: "Iris setosa"},
    {sl: 5.5, sw: 4.2, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 4.9, sw: 3.1, pl: 1.5, pw: 0.1, class: "Iris setosa"},
    {sl: 5.0, sw: 3.2, pl: 1.2, pw: 0.2, class: "Iris setosa"},
    {sl: 5.5, sw: 3.5, pl: 1.3, pw: 0.2, class: "Iris setosa"},
    {sl: 4.9, sw: 3.1, pl: 1.5, pw: 0.1, class: "Iris setosa"},
    {sl: 4.4, sw: 3.0, pl: 1.3, pw: 0.2, class: "Iris setosa"},
    {sl: 5.1, sw: 3.4, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.5, pl: 1.3, pw: 0.3, class: "Iris setosa"},
    {sl: 4.5, sw: 2.3, pl: 1.3, pw: 0.3, class: "Iris setosa"},
    {sl: 4.4, sw: 3.2, pl: 1.3, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.5, pl: 1.6, pw: 0.6, class: "Iris setosa"},
    {sl: 5.1, sw: 3.8, pl: 1.9, pw: 0.4, class: "Iris setosa"},
    {sl: 4.8, sw: 3.0, pl: 1.4, pw: 0.3, class: "Iris setosa"},
    {sl: 5.1, sw: 3.8, pl: 1.6, pw: 0.2, class: "Iris setosa"},
    {sl: 4.6, sw: 3.2, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 5.3, sw: 3.7, pl: 1.5, pw: 0.2, class: "Iris setosa"},
    {sl: 5.0, sw: 3.3, pl: 1.4, pw: 0.2, class: "Iris setosa"},
    {sl: 7.0, sw: 3.2, pl: 4.7, pw: 1.4, class: "Iris versicolor"},
    {sl: 6.4, sw: 3.2, pl: 4.5, pw: 1.5, class: "Iris versicolor"},
    {sl: 6.9, sw: 3.1, pl: 4.9, pw: 1.5, class: "Iris versicolor"},
    {sl: 5.5, sw: 2.3, pl: 4.0, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.5, sw: 2.8, pl: 4.6, pw: 1.5, class: "Iris versicolor"},
    {sl: 5.7, sw: 2.8, pl: 4.5, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.3, sw: 3.3, pl: 4.7, pw: 1.6, class: "Iris versicolor"},
    {sl: 4.9, sw: 2.4, pl: 3.3, pw: 1.0, class: "Iris versicolor"},
    {sl: 6.6, sw: 2.9, pl: 4.6, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.2, sw: 2.7, pl: 3.9, pw: 1.4, class: "Iris versicolor"},
    {sl: 5.0, sw: 2.0, pl: 3.5, pw: 1.0, class: "Iris versicolor"},
    {sl: 5.9, sw: 3.0, pl: 4.2, pw: 1.5, class: "Iris versicolor"},
    {sl: 6.0, sw: 2.2, pl: 4.0, pw: 1.0, class: "Iris versicolor"},
    {sl: 6.1, sw: 2.9, pl: 4.7, pw: 1.4, class: "Iris versicolor"},
    {sl: 5.6, sw: 2.9, pl: 3.6, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.7, sw: 3.1, pl: 4.4, pw: 1.4, class: "Iris versicolor"},
    {sl: 5.6, sw: 3.0, pl: 4.5, pw: 1.5, class: "Iris versicolor"},
    {sl: 5.8, sw: 2.7, pl: 4.1, pw: 1.0, class: "Iris versicolor"},
    {sl: 6.2, sw: 2.2, pl: 4.5, pw: 1.5, class: "Iris versicolor"},
    {sl: 5.6, sw: 2.5, pl: 3.9, pw: 1.1, class: "Iris versicolor"},
    {sl: 5.9, sw: 3.2, pl: 4.8, pw: 1.8, class: "Iris versicolor"},
    {sl: 6.1, sw: 2.8, pl: 4.0, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.3, sw: 2.5, pl: 4.9, pw: 1.5, class: "Iris versicolor"},
    {sl: 6.1, sw: 2.8, pl: 4.7, pw: 1.2, class: "Iris versicolor"},
    {sl: 6.4, sw: 2.9, pl: 4.3, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.6, sw: 3.0, pl: 4.4, pw: 1.4, class: "Iris versicolor"},
    {sl: 6.8, sw: 2.8, pl: 4.8, pw: 1.4, class: "Iris versicolor"},
    {sl: 6.7, sw: 3.0, pl: 5.0, pw: 1.7, class: "Iris versicolor"},
    {sl: 6.0, sw: 2.9, pl: 4.5, pw: 1.5, class: "Iris versicolor"},
    {sl: 5.7, sw: 2.6, pl: 3.5, pw: 1.0, class: "Iris versicolor"},
    {sl: 5.5, sw: 2.4, pl: 3.8, pw: 1.1, class: "Iris versicolor"},
    {sl: 5.5, sw: 2.4, pl: 3.7, pw: 1.0, class: "Iris versicolor"},
    {sl: 5.8, sw: 2.7, pl: 3.9, pw: 1.2, class: "Iris versicolor"},
    {sl: 6.0, sw: 2.7, pl: 5.1, pw: 1.6, class: "Iris versicolor"},
    {sl: 5.4, sw: 3.0, pl: 4.5, pw: 1.5, class: "Iris versicolor"},
    {sl: 6.0, sw: 3.4, pl: 4.5, pw: 1.6, class: "Iris versicolor"},
    {sl: 6.7, sw: 3.1, pl: 4.7, pw: 1.5, class: "Iris versicolor"},
    {sl: 6.3, sw: 2.3, pl: 4.4, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.6, sw: 3.0, pl: 4.1, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.5, sw: 2.5, pl: 4.0, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.5, sw: 2.6, pl: 4.4, pw: 1.2, class: "Iris versicolor"},
    {sl: 6.1, sw: 3.0, pl: 4.6, pw: 1.4, class: "Iris versicolor"},
    {sl: 5.8, sw: 2.6, pl: 4.0, pw: 1.2, class: "Iris versicolor"},
    {sl: 5.0, sw: 2.3, pl: 3.3, pw: 1.0, class: "Iris versicolor"},
    {sl: 5.6, sw: 2.7, pl: 4.2, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.7, sw: 3.0, pl: 4.2, pw: 1.2, class: "Iris versicolor"},
    {sl: 5.7, sw: 2.9, pl: 4.2, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.2, sw: 2.9, pl: 4.3, pw: 1.3, class: "Iris versicolor"},
    {sl: 5.1, sw: 2.5, pl: 3.0, pw: 1.1, class: "Iris versicolor"},
    {sl: 5.7, sw: 2.8, pl: 4.1, pw: 1.3, class: "Iris versicolor"},
    {sl: 6.3, sw: 3.3, pl: 6.0, pw: 2.5, class: "Iris virginica"},
    {sl: 5.8, sw: 2.7, pl: 5.1, pw: 1.9, class: "Iris virginica"},
    {sl: 7.1, sw: 3.0, pl: 5.9, pw: 2.1, class: "Iris virginica"},
    {sl: 6.3, sw: 2.9, pl: 5.6, pw: 1.8, class: "Iris virginica"},
    {sl: 6.5, sw: 3.0, pl: 5.8, pw: 2.2, class: "Iris virginica"},
    {sl: 7.6, sw: 3.0, pl: 6.6, pw: 2.1, class: "Iris virginica"},
    {sl: 4.9, sw: 2.5, pl: 4.5, pw: 1.7, class: "Iris virginica"},
    {sl: 7.3, sw: 2.9, pl: 6.3, pw: 1.8, class: "Iris virginica"},
    {sl: 6.7, sw: 2.5, pl: 5.8, pw: 1.8, class: "Iris virginica"},
    {sl: 7.2, sw: 3.6, pl: 6.1, pw: 2.5, class: "Iris virginica"},
    {sl: 6.5, sw: 3.2, pl: 5.1, pw: 2.0, class: "Iris virginica"},
    {sl: 6.4, sw: 2.7, pl: 5.3, pw: 1.9, class: "Iris virginica"},
    {sl: 6.8, sw: 3.0, pl: 5.5, pw: 2.1, class: "Iris virginica"},
    {sl: 5.7, sw: 2.5, pl: 5.0, pw: 2.0, class: "Iris virginica"},
    {sl: 5.8, sw: 2.8, pl: 5.1, pw: 2.4, class: "Iris virginica"},
    {sl: 6.4, sw: 3.2, pl: 5.3, pw: 2.3, class: "Iris virginica"},
    {sl: 6.5, sw: 3.0, pl: 5.5, pw: 1.8, class: "Iris virginica"},
    {sl: 7.7, sw: 3.8, pl: 6.7, pw: 2.2, class: "Iris virginica"},
    {sl: 7.7, sw: 2.6, pl: 6.9, pw: 2.3, class: "Iris virginica"},
    {sl: 6.0, sw: 2.2, pl: 5.0, pw: 1.5, class: "Iris virginica"},
    {sl: 6.9, sw: 3.2, pl: 5.7, pw: 2.3, class: "Iris virginica"},
    {sl: 5.6, sw: 2.8, pl: 4.9, pw: 2.0, class: "Iris virginica"},
    {sl: 7.7, sw: 2.8, pl: 6.7, pw: 2.0, class: "Iris virginica"},
    {sl: 6.3, sw: 2.7, pl: 4.9, pw: 1.8, class: "Iris virginica"},
    {sl: 6.7, sw: 3.3, pl: 5.7, pw: 2.1, class: "Iris virginica"},
    {sl: 7.2, sw: 3.2, pl: 6.0, pw: 1.8, class: "Iris virginica"},
    {sl: 6.2, sw: 2.8, pl: 4.8, pw: 1.8, class: "Iris virginica"},
    {sl: 6.1, sw: 3.0, pl: 4.9, pw: 1.8, class: "Iris virginica"},
    {sl: 6.4, sw: 2.8, pl: 5.6, pw: 2.1, class: "Iris virginica"},
    {sl: 7.2, sw: 3.0, pl: 5.8, pw: 1.6, class: "Iris virginica"},
    {sl: 7.4, sw: 2.8, pl: 6.1, pw: 1.9, class: "Iris virginica"},
    {sl: 7.9, sw: 3.8, pl: 6.4, pw: 2.0, class: "Iris virginica"},
    {sl: 6.4, sw: 2.8, pl: 5.6, pw: 2.2, class: "Iris virginica"},
    {sl: 6.3, sw: 2.8, pl: 5.1, pw: 1.5, class: "Iris virginica"},
    {sl: 6.1, sw: 2.6, pl: 5.6, pw: 1.4, class: "Iris virginica"},
    {sl: 7.7, sw: 3.0, pl: 6.1, pw: 2.3, class: "Iris virginica"},
    {sl: 6.3, sw: 3.4, pl: 5.6, pw: 2.4, class: "Iris virginica"},
    {sl: 6.4, sw: 3.1, pl: 5.5, pw: 1.8, class: "Iris virginica"},
    {sl: 6.0, sw: 3.0, pl: 4.8, pw: 1.8, class: "Iris virginica"},
    {sl: 6.9, sw: 3.1, pl: 5.4, pw: 2.1, class: "Iris virginica"},
    {sl: 6.7, sw: 3.1, pl: 5.6, pw: 2.4, class: "Iris virginica"},
    {sl: 6.9, sw: 3.1, pl: 5.1, pw: 2.3, class: "Iris virginica"},
    {sl: 5.8, sw: 2.7, pl: 5.1, pw: 1.9, class: "Iris virginica"},
    {sl: 6.8, sw: 3.2, pl: 5.9, pw: 2.3, class: "Iris virginica"},
    {sl: 6.7, sw: 3.3, pl: 5.7, pw: 2.5, class: "Iris virginica"},
    {sl: 6.7, sw: 3.0, pl: 5.2, pw: 2.3, class: "Iris virginica"},
    {sl: 6.3, sw: 2.5, pl: 5.0, pw: 1.9, class: "Iris virginica"},
    {sl: 6.5, sw: 3.0, pl: 5.2, pw: 2.0, class: "Iris virginica"},
    {sl: 6.2, sw: 3.4, pl: 5.4, pw: 2.3, class: "Iris virginica"},
    {sl: 5.9, sw: 3.0, pl: 5.1, pw: 1.8, class: "Iris virginica"}]

var sl_min = d3.min(iris, d => d.sl)
var sl_max = d3.max(iris, d => d.sl)
var sw_min = d3.min(iris, d => d.sw)
var sw_max = d3.max(iris, d => d.sw)
var pl_min = d3.min(iris, d => d.pl)
var pl_max = d3.max(iris, d => d.pl)
var pw_min = d3.min(iris, d => d.pw)
var pw_max = d3.max(iris, d => d.pw)

var global_width = 460
var global_height = 400
var global_top = 50
var global_bottom = 50
var global_left = 50
var global_right = 50
var margin = {top: global_top, right: global_right, bottom: global_bottom, left: global_left}
var itemWidth = (global_width-margin.left-margin.right)/3
var itemHeight = 20

var width = global_width - margin.left - margin.right
var height = global_height - margin.top - margin.bottom
var _x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);
var _y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
var _lineGenerator = d3.line()
        .x(function(d) { return _x(d.x);})
        .y(function(d) { return _y(d.y);});

var standard_ls_text = "Linguistic variable";

var def_count = 0

var mf_data = [
    {type: "Triangular",
        points: [{x:25, y:0}, {x:50, y:1}, {x:75, y:0}],
        get line() {return [{x:0, y:0}, ...this.points, {x:100, y:0}];} },

    {type: "Trapezoidal",
        points: [{x:20, y:0}, {x:40, y:1}, {x:60, y:1}, {x:80, y:0}],
        get line() {return [{x:0, y:0}, ...this.points, {x:100, y:0}];} },

    {type: "S-shaped",
        points: [{x:33, y:0}, {x:66, y:1}],
        get line() {return [{x:0, y:0}, ...this.points, {x:100, y:1}];} },

    {type: "Z-shaped",
        points: [{x:33, y:1}, {x:66, y:0}],
        get line() {return [{x:0, y:1}, ...this.points, {x:100, y:0}];} } ]
    // {type: "Gaussian", points: [{x:33, y:1}, {x:66, y:1}], get line() {return [{x:0, y:0}, ...this.points, {x:100, y:0}];} }]

function convert(value, f_min, f_max){
    return (value/100)*(f_max-f_min)+f_min
}

function calc_mf_value_relative(type, feature, param_array) {
    // console.log('-----')
    // console.log(type)
    // console.log(feature)
    // console.log(param_array)

    if (feature=="Q") {
        f_min = 0
        f_max = 1
    } else {
        f_min = d3.min(iris, d => d[feature])
        f_max = d3.max(iris, d => d[feature])
    }

    // console.log(f_min,f_max)

    if (type=="Triangular") {

        var z = param_array[0],
            a = convert(param_array[1], f_min, f_max),
            b = convert(param_array[2], f_min, f_max),
            c = convert(param_array[3], f_min, f_max);
        // console.log(a,b,c)
        return Math.max( Math.min( (z-a)/(b-a), (c-z)/(c-b) ), 0 )
    } else if (type == "Trapezoidal") {
        var z = param_array[0],
            a = convert(param_array[1], f_min, f_max),
            b = convert(param_array[2], f_min, f_max),
            c = convert(param_array[3], f_min, f_max),
            d = convert(param_array[4], f_min, f_max);
        return Math.max( Math.min( (z-a)/(b-a),1,(d-z)/(d-c)), 0 )
    } else if (type == "S-shaped") {
        var z = param_array[0],
            a = convert(param_array[1], f_min, f_max),
            b = convert(param_array[2], f_min, f_max);
        return Math.max( Math.min( (z-a)/(b-a),1), 0 )
    } else if (type == "Z-shaped") {
        var z = param_array[0],
            c = convert(param_array[1], f_min, f_max),
            d = convert(param_array[2], f_min, f_max);
        return Math.max( Math.min( 1,(d-z)/(d-c)), 0 )
    }
}

function calc_mf_value_absolute(type, param_array) {
    if (type=="Triangular") {
        var z = param_array[0],
            a = param_array[1],
            b = param_array[2],
            c = param_array[3];
        return Math.max( Math.min( (z-a)/(b-a), (c-z)/(c-b) ), 0 )
    } else if (type == "Trapezoidal") {
        var z = param_array[0],
            a = param_array[1],
            b = param_array[2],
            c = param_array[3],
            d = param_array[4];
        return Math.max( Math.min( (z-a)/(b-a),1,(d-z)/(d-c)), 0 )
    } else if (type == "S-shaped") {
        var z = param_array[0],
            a = param_array[1],
            b = param_array[2];
        return Math.max( Math.min( (z-a)/(b-a),1), 0 )
    } else if (type == "Z-shaped") {
        var z = param_array[0],
            c = param_array[1],
            d = param_array[2];
        return Math.max( Math.min( 1,(d-z)/(d-c)), 0 )
    }
}