var width = 800,
    stage_height = 1000,
    legend_height = 100,
    bottom_height = 60;

var height = stage_height - legend_height - bottom_height;

var margin = {top: 20, bottom: 30, left: 40, right: 40},
    graph_width = width - margin.left - margin.right,
    graph_height = height + margin.top + 20;

var bar_width = graph_width * 0.25;

var svg = d3.select(".content").append("svg")
    .attr("width", graph_width)
    .attr("height", graph_height)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/titles_data.tsv", function(data) {

    data.forEach(function(d) {
        d.fullName = [d.name, d.author].join(',\n');
        d.shareName = +d.shareName;
        d.shareNotName = +d.shareNotName;
        d.shareName = d.shareName * 100;
        d.shareNotName = +d.shareNotName * 100;
    });

    var x = d3.scale.linear()
        .range([0, graph_width - bar_width - margin.right - 20]);
    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], 0.4);

    x.domain([0, 100]);
    y.domain(data.map(function(d) {return d.fullName; }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(6, "");

    var xAxisBottom = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(6, "");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var bars = svg.append("g")
        .attr("class", "bars")
        .attr('transform', "translate(" + bar_width + ", 0)");

    bars.append("g")
        .attr("class", "x axis")
        .call(xAxis)
      .selectAll('.tick line')
        .attr('y1', height);

    bars.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisBottom);

    var authors = bars.selectAll(".author")
        .data(data)
      .enter().append('g')
        .attr('class', 'author')
        .attr('transform', function(d) {
            return "translate(0," + y(d.fullName) + ")";
        });


    //отрисовываем в бэк серые барые

    authors.append("rect")
        .attr("class", "bg")
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function(d) {return x(100); });

    //добавляем поверх бэка цветные бары. с замедлением

    var timeForOneBar = 500;

    authors.append("rect")
        .attr("class", "bar")
        .attr("height", y.rangeBand())
        .attr("width", 0)
        .transition()
        .duration(timeForOneBar)
        .ease('bounce')
        .delay(function(d, i) {return timeForOneBar / 3 * i; })
        .attr("width", function(d) {return x(d.shareNotName); });

    // Или строчки осью

    // bars.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

    //Добавляем строчку на бар

    authors.append("text")
        .attr("class", "label")
        .attr("x", 5)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", '.20em')
        .text(function(d) {return d.string; });

    //Добавляем название стихотворения справа от бара

    authors.append("text")
        .attr("class", "label_name")
        .attr("x", -5)
        .attr("y", y.rangeBand() / 2)
        .attr("dy", '-.20em')
        .attr("text-anchor", 'end')
        .text(function(d) {return d.name; });

    //Добавляем имя автора справа от бара

    authors.append("text")
        .attr("class", "label_author")
        .attr("x", -5)
        .attr("y", y.rangeBand())
        // .attr("dy", '.em')
        .attr("text-anchor", 'end')
        .text(function(d) {return d.author; });
});
