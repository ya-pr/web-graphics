d3.tsv("data/tourist_lem.tsv", function (data) {
    data.forEach(function (d) {
        d.value = +d.value;
    });

    var fill = d3.scale.ordinal()
        .range(['#F96A21', '#FB861E', '#FFA25E', '#FCC695']);

    var w = 880,
        h = 500;
    // var w = window.innerWidth,
    //     h = window.innerHeight;

    var fontSize;

    var layout = d3.layout.cloud()
        .size([w - 50, h - 50])
        .fontSize(function (d) {
            return fontSize(+d.value);
        })
        .text(function (d) {
            return d.key;
        })
        .rotate(0)
        .padding(1)
        // .rotate(function(d, i) {
        //     return i % 2 == 0 ? 90 : 0
        // })
        .on("end", draw);

    var svg = d3.select(".content").append("svg")
        .attr("width", w)
        .attr("height", h);

    var vis = svg.append("g").attr("transform", "translate(450,250)");

    update();

    window.onresize = function () {
        update();
    };

    function draw(data, bounds) {
        // var w = 900,
        //     h = 580;
        var w = window.innerWidth,
            h = window.innerHeight;

        svg.attr("width", w).attr("height", h);

        var scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

        var text = vis.selectAll("text")
            .data(data, function (d) {
                return d.text.toLowerCase();
            });
        text.transition()
            .duration(1000)
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function (d) {
                return d.size + "px";
            });
        text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);
        text.style("font-family", function (d) {
            return d.font;
        })
            .style("fill", function (d) {
                return fill(d.text.toLowerCase());
            })
            .text(function (d) {
                return d.text;
            });

        // text.on('mouseover', function(d) {
        //     d3.select(this).transition().style("font-size", function(d) {
        //         return d.size * 1.3 + 'px';
        //     });
        // });
        // text.on('mouseout', function(d) {
        //     d3.select(this).transition().style("font-size", function(d) {
        //         return d.size + 'px';
        //     });
        // });

        vis.transition().attr("transform", "translate(450,250)scale(" + scale + ")");
    }

    function update() {
        layout.font('impact').spiral('archimedean');
        fontSize = d3.scale['sqrt']().range([10, 100]);
        if (data.length) {
            fontSize.domain([+data[data.length - 1].value || 1, +data[0].value]);
        }
        layout.stop().words(data).start();
    }
});
