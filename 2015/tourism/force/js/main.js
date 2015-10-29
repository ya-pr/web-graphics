// colorsChanger = {
//     "rgb(196,35,156)": "#73bf43",
//     "rgb(196,35,35)": "#f36b28",
//     "rgb(35,75,196)": "#ff0000",
//     "rgb(35,196,196)": "#5ab3d8",
//     "rgb(116,35,196)": "#43c288",
//     "rgb(116,196,35)": "#ffba23",
//     "rgb(35,196,75)": "#dbea53",
//     "rgb(196,156,35)": "#85506a"
// }

colorsChanger = {
    "rgb(196,35,156)": "#ffba23",
    "rgb(196,35,35)": "#f36b28",
    "rgb(35,75,196)": "#dbea53",
    "rgb(35,196,196)": "#43c288",
    "rgb(116,35,196)": "#43c288",
    "rgb(116,196,35)": "#ffba23",
    "rgb(35,196,75)": "#dbea53",
    "rgb(196,156,35)": "#85506a"
};

// var stageWidth = window.innerWidth, stageHeight = window.innerHeight * .89;
var stageWidth = 900,
    stageHeight = 720;
var margin = {top: 30, right: 5, bottom: 30, left: 30},
    width = stageWidth - margin.left - margin.right,
    height = stageHeight - margin.top - margin.bottom,
    center = [width / 2, height / 2];

var svg = d3.select(".content").append("svg")
    .attr("width", stageWidth)
    .attr("height", stageHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var clickArea = svg.append("rect")
    .attr('class', 'clickarea')
    .attr("width", width)
    .attr("height", height)
    .style('fill', 'white');

d3.json("data/data.json", function(data) {
    data = data.nodes;
    data.forEach(function(d) {
        d.size = Math.sqrt(d.size / Math.PI);
        d.color = d.color.replace(d.color, colorsChanger[d.color]);
    });

    var x = d3.scale.linear()
        .range([0, width])
        .domain(d3.extent(data, function(d) {return d.x; }));

    var y = d3.scale.linear()
        .range([0, height])
        .domain(d3.extent(data, function(d) {return d.y; }));

    var size = d3.scale.linear()
        .range([1, height / 17.5])
        .domain(d3.extent(data, function(d) {return d.size; }));

    // var labelMove = d3.scale.linear()
    //     .range([.3,.5])
    //     .domain(d3.extent(data, function(d) { return d.size; }));

    var showLabelsAtLevel = d3.scale.linear()
        .range([5, 1])
        .domain(d3.extent(data, function(d) {return d.size; }));

    var fontSize = d3.scale.linear()
        .range([9, 3])
        .domain([1, 3]);

    data.forEach(function(d) {
        // d.labelMove = labelMove(d.size) + "em";
        d.showLabelAtScale = showLabelsAtLevel(d.size) - 2;
    });

    var nodes = svg.selectAll('.node')
        .data(data)
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) {
            return 'translate(' + x(d.x) + "," + y(d.y) + ")";
        })
        .classed('small-node', function(d) {
            return d.size < 2.5;
        });

    nodes.append('circle')
        .attr('class', 'circle')
        .attr('r', function(d) {return size(d.size); })
        .style('fill', function(d) {return d.color; });

    var labels = nodes.append('text')
        .attr('class', 'label')
        .attr("dy", '.3em')
        .attr("text-anchor", "middle")
        .style('fill', function(d) {return d.color; })
        .text(function(d) {return d.label; })
        .style('fill', 'black');

    nodes.sort(function(a, b) {
        return d3.descending(a.size, b.size);
    });

    nodes.each(function(node) {
        node.view = d3.select(this);
    });

    var search = d3.select('.search')
        .on('keydown', function() {
            if (d3.event.keyCode == 13) {
                d3.event.preventDefault();
                // return false;
            }
        });

    search.on('click', function() {
        this.value = "";
        search.style('font-style', 'normal').style('color', '#555150');
    });

    search.on('keyup', function() {
        var query = d3.event.target.value.toLowerCase();
        if (query.length > 2) {
            var result = _.filter(data, function(d) {
                return d.label.toLowerCase().indexOf(query) != -1;
            });

            nodes.classed('passive-node', true);
            _.each(result, function(d) {
                d.view.classed('passive-node', false);
                d.view.classed('show-label', true);
                d.view.classed('small-label', false);
            });
            if (result.length == 1) {
                clearSidebar();
                zoom.translate([(-x(result[0].x) - result[0].size / 2) * 2 + width / 2, (-y(result[0].y) - result[0].size / 2) * 2 + height / 2]);
                zoom.scale(2);
                zoomed();
                makeSidebar(result[0]);
                result[0].view.classed('show-label', true);
            }

        } else {
            nodes.classed('passive-node', false);
            nodes.classed('show-label', false);
            clearSidebar();
        }
    });

    nodes.on('click', function() {
        clearSidebar();
        if (this.classList.contains('clicked')) {
            d3.select(this).classed('clicked', false);
            d3.select(this).classed('show-label', false);
            nodes.classed('passive-node', false);
        } else {
            d3.select(this).classed('clicked', true);
            nodes.classed('passive-node', true);
            d3.select(this).classed('passive-node', false);
            d3.select(this).classed('show-label', true);
            makeSidebar(this.__data__);
        }
    });

    clickArea.on('click', function() {
        nodes.classed('passive-node', false);
        nodes.classed('clicked', false);
        nodes.classed('show-label', false);
        clearSidebar();
    });

    function makeSidebar(selectedNode) {
        var curCluster = selectedNode.attributes['Modularity Class'];
        nodes.each(function(d) {
            if (d.attributes['Modularity Class'] == curCluster) {
                d3.select(this).classed('passive-node', false);
            }
        });
        d3.select('.sidebar').classed('passive', false);
        d3.select('.selected-city').text(function () {
            return selectedNode.label;
        });
        var clusterList = d3.select(".sidebar ul");
        nodes.each(function(d) {
            if (d.attributes['Modularity Class'] == curCluster &&
                d.id != selectedNode.id) {
                clusterList.append('li')
                    .text(d.label);
            }
        });
    }

    function clearSidebar() {
        d3.select('.sidebar').classed('passive', true);
        d3.selectAll(".sidebar ul li").remove();
    }

    var zoom = d3.behavior.zoom()
        .translate([margin.left, margin.top])
        .scale(1)
        .scaleExtent([1, 5])
        .on("zoom", zoomed);

    function zoomed() {
        svg.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
        adjustLabels(zoom.scale());
        // console.log(zoom.scale());
        d3.select('.minus').classed('passive-button', function () {
            return zoom.scale() <= 1;
        });
        d3.select('.plus').classed('passive-button', function () {
            return zoom.scale() >= 5;
        });
    }

    d3.select('svg')
        .call(zoom)
        .call(zoom.event);

    function adjustLabels(curScale) {
        nodes.classed('small-node', true);
        nodes.each(function(node) {
            if (node.showLabelAtScale < curScale) {
                node.view.classed('small-node', false);
            }
        });
        if (curScale <= 3) {
            labels.attr('font-size', function () {
                return fontSize(curScale).toFixed(1) + 'px';
            });
        } else {
            labels.attr('font-size', '3px');
        }
    }

    d3.selectAll('.scale-button').on('click', function() {
        if (this.classList.contains('passive-button')) {
            return false;
        }
        var scale = zoom.scale(),
            extent = zoom.scaleExtent(),
            translate = zoom.translate(),
            x = translate[0],
            y = translate[1],
            factor = (this.classList.contains('plus') ? 1.5 : 1 / 1.5),
            target_scale = scale * factor;

        if (target_scale > extent[1]) {
            target_scale = extent[1];
        }
        if (target_scale < extent[0]) {
            target_scale = extent[0];
        }
        // if (target_scale === extent[0] || target_scale === extent[1]) { return false; }
        // var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
        // if (clamped_target_scale != target_scale) {
        //     target_scale = clamped_target_scale;
        //     factor = target_scale / scale;
        // }

        x = (x - center[0]) * factor + center[0];
        y = (y - center[1]) * factor + center[1];

        d3.transition().duration(350).tween('zoom', function() {
            var interpolate_scale = d3.interpolate(scale, target_scale),
                interpolate_trans = d3.interpolate(translate, [x, y]);
            return function(t) {
                zoom.scale(interpolate_scale(t))
                    .translate(interpolate_trans(t));
                zoomed();
            };
        });



    });
});
