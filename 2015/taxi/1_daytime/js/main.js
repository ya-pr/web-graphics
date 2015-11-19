d3.tsv(data_file_name, function (data) {

    var daysConverter = {
        "1": "Понедельник",
        "2": "Вторник",
        "3": "Среда",
        "4": "Четверг",
        "5": "Пятница",
        "6": "Суббота",
        "7": "Воскресенье"
    };

    var days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        hours = ['0:00', '23:00'];

    data.forEach(function (d) {
        d.share = +d.share;
        if (d.hour.length == 1) {
            d.hour = "0" + d.hour
        }
    });

    //описываем размер svg
    var margin = {top: 30, right: 20, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom;

    //добавляем svg
    var svg = d3.select("#content").append("svg")
        .attr("width", 720)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, 800], .5);
    var y = d3.scale.linear()
        .range([height, 0]);

    x.domain(data.map(function (d, i) {return i;}));
    y.domain([0, d3.max(data, function (d) {return d.share;}) * 1.10]);

    //объявляем оси
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat("");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickValues([0, .2, .4, .6, .8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2])
        .tickFormat(function (d) {return Math.round(d * 100, 1);});

    svg.selectAll('.background')
        .data([0, 1, 2])
        .enter().append('rect')
        .attr('width', 95)
        .attr('height', 360)
        .attr('fill', '#f6f5f3')
        .attr('transform', function (d, i) {
            return 'translate(' + (96 + (i * 96 * 2)) + ",21)";
        });

    //рисуем оси
    var axisx = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    var axisy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('.tick line').attr('x2', 0).attr('x1', width - 79);

    var boxes = svg.selectAll(".box")
        .data(data)
        .enter().append("g")
        .attr("class", "box")
        .attr('transform', function (d, i) {
            return 'translate(' + (x(i) - 65) + "," + y(d.share) + ")";
        });

    boxes.append('rect')
        .attr("class", "rect")
        .attr("width", x.rangeBand())
        .attr("height", function (d) {return height - y(d.share);})
        .on('mouseover', function (d) {
            var infopane = document.getElementById('infopane'),
                nextHour = +d.hour + 1 > 23 ? 0 : +d.hour + 1;
            infopane.innerHTML = (daysConverter[d.day]) + ', c ' + d.hour + ':00 до ' + nextHour + ':00' + ' — <span>' + Math.round(100 * d.share) + '%</span>';
        });

    axisx.selectAll('.hour-tick')
        .data([0, 1])
        .enter().append("line")
        .attr("class", "hour-tick")
        .attr("x1", function (d, i) {return i * 93;})
        .attr("x2", function (d, i) {return i * 93;})
        .attr("y1", 0)
        .attr("y2", 8);

    axisx.append("line")
        .attr("class", "line-bottom")
        .attr("x1", 0)
        .attr("x2", width - 79)
        .attr("y1", 1)
        .attr("y2", 1);

    svg.selectAll('.day')
        .data(days)
        .enter().append('text')
        .attr('class', 'day')
        .attr('transform', function (d, i) {
            return 'translate(' + (42 + i * 96) + "," + (height + 20) + ")";
        })
        .text(function (d) {return d;});

    svg.selectAll('.hour')
        .data(hours)
        .enter().append('text')
        .attr('class', 'hour')
        .attr('transform', function (d, i) {
            return 'translate(' + (i * 87 - 8) + "," + (height + 20) + ")";
        })
        .text(function (d) {return d;})
        .fill('red');

});