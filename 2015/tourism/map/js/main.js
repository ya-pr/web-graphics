// Размеры окна
var width = 900,
    height = 600,
    center = [width / 2, height / 2];

// Проекция и генератор пути
var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .center([0, 45])
    .rotate([-12, 0, 0])
    .precision(0);
var path = d3.geo.path()
    .projection(projection);

// Размер кругов
var size = d3.scale.linear()
    .range([2, 45]);

// Зазор между кругами
var margin = 0;

// Ширина баров во всплывающей подсказке
var width_bars = 60;
var x_bars = d3.scale.linear()
    .range([0, width_bars]);

// Элементы страницы
var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .on('mousemove', moved);
var container = svg.append("g");
var features = container.append("g")
    .attr("class", "features");
var popup = d3.select('.popup')
    .style('display', 'none');
var info = d3.select('.info');

// Элементы списка с выбором региона
var fields = [
    'Вся Россия',
    'Волгоград',
    'Воронеж',
    'Екатеринбург',
    'Казань',
    'Красноярск',
    'Москва',
    'Нижний Новгород',
    'Новосибирск',
    'Омск',
    'Пермь',
    'Ростов-на-Дону',
    'Самара',
    'Санкт-Петербург',
    'Уфа',
    'Челябинск'
];

// Формат данных в русской локализации
d3.locale.ru_RU = d3.locale({
    "decimal": ",",
    "thousands": "\xa0",
    "grouping": [3],
    "currency": ["", " руб."],
    "dateTime": "%A, %e %B %Y г. %X",
    "date": "%d.%m.%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    "shortDays": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    "months": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    "shortMonths": ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
});
var format = d3.locale.ru_RU.numberFormat();


// Зум
var zoom = d3.behavior.zoom()
    .translate([-60, 0])
    .scale(1)
    .scaleExtent([1, 25])
    .on("zoom", zoomed);

d3.selectAll('.scale-button').on('click', function() {
    if (this.classList.contains('passive-button')) {
        return false;
    }
    var scale = zoom.scale(),
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        x = translate[0],
        y = translate[1],
        factor = (this.classList.contains('plus') ? 2 : 1 / 2),
        target_scale = scale * factor;

    if (target_scale > extent[1]) {
        target_scale = extent[1];
    }
    if (target_scale < extent[0]) {
        target_scale = extent[0];
    }

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

svg.call(zoom)
    .call(zoom.event);

function zoomed() {
    var lastTouch = 0,
        ltt = 20,
        curTouch = new Date().getTime();
    if ((curTouch - lastTouch) > ltt) {
        container.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
        container.select(".boundary").style("stroke-width", 1 / zoom.scale() + "px");
        lastTouch = curTouch;
    }
    d3.select('.minus').classed('passive-button', function () {
        return zoom.scale() <= 1;
    });
    d3.select('.plus').classed('passive-button', function () {
        return zoom.scale() >= 16;
    });
}

function moved() {
    var position = d3.mouse(d3.select('.container')[0][0]);
    popup.style("top", position[1] - 20 + "px")
        .style("left", position[0] + 5 + "px");
}

// Загружаем карту стран
d3.json("../../../data/world-110m.json", function(error, world) {
    if (error) throw error;

    // Добавляем подложку стран и границы
    container.insert("path", "g")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);
    container.insert("path", ".features")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);

    // Добавляем область clickarea
    container.insert("rect", ".features")
        .attr('class', 'clickarea')
        .attr("width", width)
        .attr("height", height)
        .style('opacity', 0)
        .on('click', function() {
            info.html('');
        });

    // Загружаем данные
    d3.json("data/russia.min.json", function(error, russia) {
        d3.json("data/regions.min.json", function(error, regions) {
            if (error) throw error;

            var max_weight = regions.map(function(region) {
                return d3.max(region.regions, function(d) {
                    return d.weight;
                });
            });
            size.domain([0, d3.max(max_weight)]);
            draw(russia);
            add_top_country(russia);

            var fieldSelect = d3.select("#field")
                .on("change", function () {
                    var field = fields[this.selectedIndex];
                    var data;
                    if (field == 'Вся Россия') {
                        data = russia;
                    } else {
                        data = regions.filter(function (index) {
                            return index.reg == field;
                        })
                            .pop().regions;
                    }
                    draw(data);
                    var copy_data = data.slice();
                    add_top_country(copy_data);
                });

            fieldSelect.selectAll("option")
                .data(fields)
                .enter()
                .append("option")
                .attr("value", function(d) {
                    return d;
                })
                .text(function(d) {
                    return d;
                });
        });
    });

    function draw(data) {
        features.selectAll('g').remove();
        data.forEach(function(d) {
            d.radius = size(d.weight);
            d.pos = projection([d.lon, d.lat]);
            d.posX = d.pos[0];
            d.posY = d.pos[1];
        });

        var countryViews = features.selectAll(".country")
            .data(data, function(d) {
                return d.name;
            })
            .enter().append('g')
            .attr('class', 'country')
            .attr('id', function(d) {
                return d.name;
            })
            .attr("transform", function(d) {
                return "translate(" + d.pos + ")";
            });

        // Pack Layout
        countryViews.each(function (d) {
            var diameter = d.radius * 2 - margin;
            var d3this = d3.select(this).append('g')
                .attr('class', 'pack')
                .attr("transform", function () {
                    return "translate(" + [-diameter / 2, -diameter / 2] + ")";
                });
            var pack = d3.layout.pack()
                .children(function children(d) {
                    return d.level1;
                })
                .padding(1)
                .size([diameter, diameter])
                .value(function(d) {
                    return d.weight;
                })
                .sort(comparator);

            var nodesViews = d3this.selectAll(".region")
                .data(pack.nodes(d))
                .enter().append('g')
                .attr('class', 'region')
                .attr('id', function(d) {
                    return d.name;
                })
                .attr("transform", function(d) {
                    return "translate(" + [d.x - d.r, d.y - d.r] + ")";
                });

            nodesViews.each(function (d) {
                var diameter = d.r * 2 - margin;
                var d3this = d3.select(this);
                var pack = d3.layout.pack()
                    .children(function children(d) {
                        return d.level2;
                    })
                    .padding(1)
                    .size([diameter, diameter])
                    .value(function(d) {
                        return d.weight;
                    })
                    .sort(comparator);

                var nodes = pack.nodes(d);

                d3this.selectAll(".area")
                    .data(nodes)
                    .enter().append("circle")
                    .attr("class", function(d) {
                        if (!d.parent) {
                            return "node root";
                        } else if (d.name == d.parent.name) {
                            return "node leaf--parent--" + d.depth;
                        } else {
                            return "node leaf--" + d.depth;
                        }
                    })
                    .classed('area', true)
                    .attr('r', function(d) {
                        return d.r;
                    })
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    });
            });
        });

        d3.selectAll('.area')
            .on('mouseout', function() {
                popup.style('display', 'none');
            })
            .on('mouseover', hover)
            .on('click', click);

        setInterval(function() {
            var q = d3.geom.quadtree().x(function(d) {
                return d.posX;
            }).y(function(d) {
                return d.posY;
            })(data);
            var i = 0,
                n = data.length;

            while (++i < n) q.visit(collide(data[i]));

            svg.selectAll(".country")
                .attr("transform", function(d) {
                    return "translate(" + [d.posX, d.posY] + ")";
                });
        }, 10);
    }
});

function comparator(a, b) {
    if (a.name == a.parent.name) {
        return -1;
    } else {
        return a.value - b.value;
    }
}

function hover() {
    var d = d3.select(this).datum(),
        name = d.name;
    while (d.parent) {
        name = d.parent.name + ', ' + name;
        d = d.parent;
    }
    popup.text(name).style('display', 'block');
}

function click() {
    var d = d3.select(this).datum();
    if (d.level1) d.children = d.level1;
    var html = '<p class="title">' + d.name + '</p>' +
        '<p class="weight"><span>' + format(d.weight) + '%</span> от всех запросов про туристические направления</p>';
    if (d.children) {
        html = html + '<p class="top_name">В этом направлении чаще всего искали</p>' +
            '<p class="note">Доля от запросов про выбранное направление, %</p>' +
            '<table class="top_region"></table>';
        info.html(html);

        // Достаём данные о курортах для выбранного направления
        var data_resort = d.children;
        data_resort = data_resort.filter(function(d) {
            return d.name != d.parent.name;
        });
        data_resort = data_resort.sort(function(a, b) {
            return b.weight - a.weight;
        });
        data_resort = data_resort.slice(0, 10);
        data_resort.forEach(function(child) {
            child.share = child.weight / d.weight;
        });

        // Вызываем функцию, рисующую топ поэм
        add_top(data_resort);
    } else info.html(html);
}

// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА РЕГИОНОВ
function add_top(data) {
    x_bars.domain([0, d3.max(data, function(d) {
        return d.share;
    })]);

    // СОЗДАЁМ ТАБЛИЦУ
    var tr = d3.select('table')
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // БАРЫ
    tr.append('td')
        .attr('class', 'bar')
        .append('div')
        .style('width', function(d) {
            return x_bars(d.share) + 'px';
        })
        .append('p')
        .attr('class', 'value')
        .style('right', function(d) {
            return x_bars(d.share) + 3 + 'px';
        })
        .text(function(d) {
            return format(d3.round(d.share * 100, 1));
        });

    // НАЗВАНИЯ
    tr.append('td')
        .attr('class', 'name')
        .html(function(d) {
            return d.name;
        });
}

// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА СТРАН
function add_top_country(data) {
    info.html('');
    var html = '<p class="title">Десять самых популярных стран</p>' +
        '<p class="note">Доля среди всех запросов, %</p>' +
        '<table class="top_country"></table>';
    info.html(html);

    data = data.sort(function(a, b) {
        return b.weight - a.weight;
    });
    data = data.slice(0, 10);

    x_bars.domain([0, d3.max(data, function(d) {
        return d.weight;
    })]);

    // СОЗДАЁМ ТАБЛИЦУ
    var tr = d3.select('table')
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // БАРЫ
    tr.append('td')
        .attr('class', 'bar')
        .append('div')
        .style('width', function(d) {
            return x_bars(d.weight) + 'px';
        })
        .append('p')
        .attr('class', 'value')
        .style('right', function(d) {
            return x_bars(d.weight) + 3 + 'px';
        })
        .text(function(d) {
            return format(d3.round(d.weight, 1));
        });

    // НАЗВАНИЯ
    tr.append('td')
        .attr('class', 'name')
        .html(function(d) {
            return d.name;
        });
}

function collide(node) {
    var r = node.radius,
        nx1 = node.posX - r,
        nx2 = node.posX + r,
        ny1 = node.posY - r,
        ny2 = node.posY + r;
    return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            var x = node.posX - quad.point.posX,
                y = node.posY - quad.point.posY,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
            if (l < r) {

                l = (l - r) / l;

                var minCoeff = 0.95,
                    maxCoeff = 1 - minCoeff;
                if (node.radius < quad.point.radius) {
                    quad.point.posX += x * l * maxCoeff;
                    quad.point.posY += y * l * maxCoeff;
                    node.posX -= x * l * minCoeff;
                    node.posY -= y * l * minCoeff;
                } else {
                    quad.point.posX += x * l * minCoeff;
                    quad.point.posY += y * l * minCoeff;
                    node.posX -= x * l * maxCoeff;
                    node.posY -= y * l * maxCoeff;
                }
            }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
}

d3.select(self.frameElement).style("height", height + "px");
