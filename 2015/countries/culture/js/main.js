var chord = d3.layout.chord()
    .padding(0.05)
    .sortSubgroups(1)
    .sortChords(d3.ascending)
    .matrix(matrix);

var width = 750,
    height = 750,
    outerRadius = Math.min(width, height) / 2 - 80,
    innerRadius = outerRadius - 24;

var fill = d3.scale.category20b()
    .domain(d3.range(29))
    .range([
        '#252525', '#252525', '#525252', '#525252', '#525252', '#737373',
        '#737373', '#737373', '#969696', '#969696', '#969696', '#bdbdbd',
        '#bdbdbd', '#bdbdbd', '#d9d9d9', '#d9d9d9', '#d9d9d9', '#f0f0f0',
        '#f0f0f0', '#f0f0f0', '#ee3057', '#5ab3d8', '#478d66', '#9d63a9',
        '#f58626', '#fdb924', '#632343', '#c2d838', '#74bf43',
        'rgba(255,255,255,0)'
    ]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g")
    .attr("class", "ring")
    .selectAll("path")
    .data(chord.groups)
    .enter().append("path")
    .style("fill", function(d) {
        return fill(d.index);
    })
    .style("stroke", function(d) {
        return fill(d.index);
    })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(0.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g")
    .attr("class", "label")
    .selectAll("g")
    .data(chord.groups)
    .enter().append("g").selectAll("g")
    .data(groupTicks)
    .enter().append("g")
    .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + outerRadius + ",0)";
    });

ticks.append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) {
        return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
    })
    .style("text-anchor", function(d) {
        return d.angle > Math.PI ? "end" : null;
    })
    .text(function(d) {
        return d.label;
    });

svg.append("g")
    .attr("class", "chord")
    .selectAll("path")
    .data(chord.chords)
    .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) {
        return fill(d.target.index);
    })
    .style("opacity", 1);

function groupTicks(d, i) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(d.value / 2, d.value, d.value / 2).map(function(v) {
        return {
            angle: v * k + d.startAngle,
            label: names[i]
        };
    });
}

function fade(opacity) {
    return function(g, i) {
        svg.selectAll(".chord path")
            .filter(function(d) {
                return d.source.index != i && d.target.index != i;
            })
            .transition()
            .style("opacity", opacity);
    };
}
