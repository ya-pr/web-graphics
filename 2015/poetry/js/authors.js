// РАЗМЕРЫ
// Размеры окна
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// Минимальные размеры окна и элементов
var width_min = 800,
    height_min = 800,
    height_legend_min = 100,
    width_max = 1000,
    height_max = 1200,
    height_legend_max = 150;

// Выбираем либо текущий размер окна, либо минимальный/максимальный
var width = Math.min(width_max, Math.max(width_min, w)),
    height = Math.min(height_max, Math.max(height_min, h)) - 90; // вычитаем 100px для заголовка и подвала

// Высота легенды от 100 до 150 (1/8 высоты)
var height_legend = Math.min(height_legend_max, Math.max(height_legend_min, height / 8)),
    height_pic = height - height_legend; // Высота графика - всё оставшееся место

// Отступы и размеры диаграммы
var margin = {top: 70, bottom: 10, left: 50, right: 290},
    width_plot = width - margin.left - margin.right,
    height_plot = height_pic - margin.top - margin.bottom;

// Размеры кругов
// Минимальный радиус вычисляется как 1/240 высоты, либо 2px (если меньше)
// Максимальный радиус в 6 раз больше минимального
var circle_size_min = d3.round(Math.max(height_plot / 240, 2), 1),
    circle_size_max = d3.round(circle_size_min * 6, 1);

// Ширина баров во всплывающей подсказке
var width_bars = 70;

// Для замены точек на запятые в дробях
function dotToComma(input_number) {
    return input_number.toString().replace('.', ',');
}

// Для линка на стихи
function linkToPoem(poemLink, poem, author) {
    return '<a href="//yandex.ru/search/?text=' + poemLink + ' ' + author +
    ' стихи" target="_blank">' + poem + '</a>';
}

// Литературные направления и соответствующие цвета
var groups = [
    'золотой век',
    'символизм',
    'футуризм',
    'акмеизм',
    'имажинизм',
    'военная лирика',
    'авторская песня',
    'детская поэзия'
];
var groups_for_domain = [
    'золотой век',
    'символизм',
    'футуризм',
    'акмеизм',
    'имажинизм',
    'военная лирика',
    'авторская песня',
    'детская поэзия',
    'не показываем'
];
var group_colors = [
    'rgb(49,170,109)',
    'rgb(251,159,178)',
    'rgb(245,105,145)',
    'rgb(244,42,86)',
    'rgb(216,23,61)',
    'rgb(210,182,215)',
    'rgb(119,62,132)',
    'rgb(195,217,55)',
    'rgb(112,128,138)'
];


// ШКАЛЫ
var x = d3.scale.linear()
    .range([0, width_plot])
    .domain([1740, 1980]);
var y = d3.scale.linear()
    .range([0, height_plot]);

var size = d3.scale.linear()
    .range([circle_size_min, circle_size_max]);
var color = d3.scale.ordinal()
    .range(group_colors)
    .domain(groups_for_domain);

var x_bars = d3.scale.linear()
    .range([0, width_bars]);


// ОСИ
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .tickFormat(d3.format(".0f"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickValues([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);


// ЭЛЕМЕНТЫ СТРАНИЦЫ
// Легенда
var legend = d3.select(".legend")
    .attr("width", w)
    .attr("height", height_legend);

// Контейнер
d3.select('.container')
    .attr('width', width)
    .attr('height', height_pic);

// Картинка
var pic = d3.select(".pic")
    .attr("width", width)
    .attr("height", height_pic)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Всплывающее окно
var popup = d3.select('.popup')
    .style('top', (margin.top - circle_size_max - 5) + "px")
    .style('left', width - margin.right + 30 + "px");


// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА ПОЭМ
function add_top(data, d) {
    x_bars.domain([0, d3.max(data, function(d) {return d.share; })]);

    // СОЗДАЁМ ТАБЛИЦУ
    var tr = d3.select('table')
      .selectAll('tr')
        .data(data)
      .enter().append('tr');

    // БАРЫ
    tr.append('td')
        .attr('class', 'bar')
      .append('div')
        .style('width', function(d) {return x_bars(d.share) + 'px'; })
        .style('background-color', function() {return color(d.group); })
      .append('p')
        .attr('class', 'value')
        .style('right', function(d) {return x_bars(d.share) + 3 + 'px'; })
        .text(function(d) {return Math.round(d.share * 100); });

    // НАЗВАНИЯ
    tr.append('td')
        .attr('class', 'name')
        .html(function(d) {
            return linkToPoem(d.poemForLink, d.poem, d.authorForLink);
        });
}

// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА АВТОРОВ
function add_top_author(data) {
    x_bars.domain([0, d3.max(data, function(d) {return d.share; })]);

    // СОЗДАЁМ ТАБЛИЦУ
    var tr = d3.select('table')
      .selectAll('tr')
        .data(data)
      .enter().append('tr');

    // БАРЫ
    tr.append('td')
        .attr('class', 'bar')
      .append('div')
        .style('width', function(d) {return x_bars(d.share) + 'px'; })
        .style('background-color', function(d) {return color(d.group); })
      .append('p')
        .attr('class', 'value')
        .style('right', function(d) {return x_bars(d.share) + 3 + 'px'; })
        .text(function(d) {
            return dotToComma(d3.round(d.share * 100, 1));
        });

    // НАЗВАНИЯ
    tr.append('td')
        .attr('class', 'name')
        .html(function(d) {return d.author; });
}


// ЗАГРУЖАЕМ ДАННЫЕ
d3.tsv("data/data_authors2.tsv", function(error, data) {
    // Преобразуем данные
    data.forEach(function (d) {
        d.rating = +d.rating;
        d.birthYear = +d.birthYear;
        d.deathYear = d.deathYear.replace('н.в.', 2015);
        d.deathYear = +d.deathYear;
        d.total = +d.total;
        d.total_sqrt = Math.sqrt(d.total);
        d.poems = +d.poems;
        d.share = +d.share;
    });

    // Диапазоны значений шкал
    y.domain(d3.extent(data, function(d) {return d.rating; }));
    size.domain(d3.extent(data, function(d) {return d.total_sqrt; }));

    // ЛЕГЕНДА
    // Легенда будет разбита на 2 части: слева размеры, справа направления.
    // На первую часть выделим четверть ширины (без учёта правого маржина),
    // на вторую - 3/4.
    var width_q = (width - margin.right) / 4,
        height_legend_names = 15, // высота плашки с заголовками легенды
        height_legend_circles = height_legend - height_legend_names,
        height_legend_q = height_legend_circles / 4;

    var legend_names = legend.append("g")
        .attr("class", "legend_names")
        .attr("width", width)
        .attr("height", height_legend_names);

    legend_names.append("text")
        .attr("class", "size")
        .attr("x", 0)
        .attr("y", height_legend_names)
        .attr("dy", "-0.5em")
        .text("Количество запросов");
    legend_names.append("text")
        .attr("class", "group")
        .attr("x", width_q + 20)
        .attr("dy", "-0.5em")
        .attr("y", height_legend_names)
        .text("Литературное направление");

    // Легенда о размерах
    var legend_size = legend.append("g")
        .attr("class", "size")
        .attr("width", width_q - circle_size_max)
        .attr("transform", "translate(" + circle_size_max + "," + (height_legend_names) + ")")
      .selectAll("g")
        .data([
            [5000000, "5 млн"],
            [1000000, "1 млн"],
            [500000, "500 тыс."],
            [100000, "100 тыс."]
        ])
      .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * height_legend_q + height_legend_q / 2) + ")";
        });
    legend_size.append("circle")
        .attr("r", function(d) {return size(Math.sqrt(d[0])); });
    legend_size.append("text")
        .attr("x", circle_size_max + 10)
        .attr("dy", "0.32em")
        .text(function(d) {return d[1]; });

    // Легенда о литературных направлениях
    var legend_group = legend.append("g")
        .attr("class", "group")
        .attr("width", width_q * 3 + margin.right)
        .attr("transform", "translate(" + (width_q + 20 + circle_size_max / 2) + "," + height_legend_names + ")")
      .selectAll("g")
        .data(groups)
      .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + (Math.floor(i / 4) * width_q) + "," + (i % 4 * height_legend_q + height_legend_q / 2) + ")";
        });
    legend_group.append("circle")
        .attr("r", function () {
            return d3.round(circle_size_max / 3, 1);
        })
        .attr("fill", function(d) {return color(d); });
    legend_group.append("text")
        .attr("x", circle_size_max + 5)
        .attr("dy", "0.32em")
        .text(function(d) {return d; });

    // ИНТЕРАКТИВНОЕ ВЗАИМОДЕЙСТВИЕ С ЛЕГЕНДОЙ
    legend_group.on('mouseover', function() {
        // Ставим всем группам класс 'passive'
        legend_group.classed('passive', true);

        // Ставим выбранной группе класс 'active'
        var group = d3.select(this)
            .classed('active', true)
            .classed('passive', false);

        // Название группы
        var group_name = group.datum();

        // Ставим всем авторам класс 'passive'
        authors.classed('passive', true);

        // Ставим выбранным авторам класс 'group_choise'
        var group_authors = authors.filter(function(author_data) {
                return author_data.group === group_name;
            })
            .classed('passive', false)
            .classed('group_choise', true);

        // Прячем ось Y
        yAx.classed('hide', true);

        // Добавляем информацию в popup
        popup.html(function() {
            var title = group_name[0].toUpperCase() + group_name.slice(1, group_name.length);
            return '<h2 class="title">' + title + '</h2>' +
                '<p class="note">Авторы, о чьих произведениях задали более 100 тысяч поисковых запросов за год. Указана доля от всех запросов, %</p>' +
                '<table class="top_authors"></table>';
        });

        // Вызываем функцию, рисующую топ авторов
        add_top_author(group_authors.data());
    });

    legend_group.on('mouseout', function() {
        // Убираем все классы для групп
        legend_group
            .classed('active', false)
            .classed('passive', false);

        // Убираем все классы для авторов
        authors
            .classed('passive', false)
            .classed('group_choise', false);

        // Возвращаем ось Y
        yAx.classed('hide', false);
    });


    // ОСНОВНАЯ ДИАГРАММА
    // Авторы
    var authors = pic.append("g")
        .attr("class", "authors")
      .selectAll("g")
        .data(data)
      .enter().append("g");

    // Круги
    authors.append("circle")
        .attr("cx", function(d) {return x(d.birthYear); })
        .attr("cy", function(d) {return y(d.rating); })
        .attr("r", function(d) {return size(d.total_sqrt); })
        .attr("fill", function(d) {return color(d.group); });

    // Фамилия автора
    authors.append("text")
        .attr("class", "author")
        .attr("x", function(d) {return x(d.birthYear); })
        .attr("dx", function(d) {
            var indent = size(d.total_sqrt) + 5;
            if (d.position == 'left') indent = -indent;
            return indent;
        })
        .attr("text-anchor", function(d) {
            if (d.position == 'left') {
                return 'end';
            } else {
                return 'start';
            }
        })
        .attr("y", function(d) {return y(d.rating); })
        .attr("dy", "0.32em")
        .text(function(d) {return d.secondName; });

    // Ранг
    authors.append("text")
        .attr("class", "rank")
        .attr("x", -9)
        .attr("y", function(d) {return y(d.rating); })
        .attr("dy", "0.32em")
        .attr("text-anchor", "end")
        .attr("fill", function(d) {return color(d.group); })
        .text(function(d) {return d.rating; });

    // Годы жизни
    authors.append("line")
        .attr("class", "life")
        .attr("x1", function(d) {return x(d.birthYear); })
        .attr("x2", function(d) {return x(d.deathYear); })
        .attr("y1", -(circle_size_max + 14))
        .attr("y2", -(circle_size_max + 14))
        .attr("stroke", function(d) {return color(d.group); });

    authors.append("text")
        .attr("class", "life start")
        .attr("x", function(d) {return x(d.birthYear); })
        .attr("dx", "-0.5em")
        .attr("y", -(circle_size_max + 9))
        .attr("text-anchor", "end")
        .attr("fill", function(d) {return color(d.group); })
        .text(function(d) {return d.birthYear; });

    authors.append("text")
        .attr("class", "life end")
        .attr("x", function(d) {return x(d.deathYear); })
        .attr("dx", "0.5em")
        .attr("y", -(circle_size_max + 9))
        .attr("text-anchor", "start")
        .attr("fill", function(d) {return color(d.group); })
        .text(function(d) {
            if (d.deathYear == 2015) {
                return 'н.в.';
            } else {
                return d.deathYear;
            }
        });


    // ДОБАВЛЯЕМ ОСИ
    // Ось X
    var xAx = pic.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + 0 + "," + -(circle_size_max) + ")")
        .call(xAxis);

    // Ось Y
    var yAx = pic.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Подпись оси X
    xAx.append("g")
        .attr("class", "label")
        .attr("transform", "translate(" + width_plot / 2 + "," + 0 + ")")
      .append("text")
        .attr("dy", "-2.5em")
        .attr("text-anchor", "middle")
        .text("Годы жизни");

    // Подпись оси Y
    yAx.append("g")
        .attr("class", "label")
        .attr("transform", "translate(" + 0 + "," + height_plot / 2 + ") rotate(-90)")
      .append("text")
        .attr("dy", "-3em")
        .attr("text-anchor", "middle")
        .text("Место в рейтинге");



    // ЗАГРУЖАЕМ ДАННЫЕ ПО ЗАПРОСАМ
    d3.tsv("data/data_authors_top_poems2.tsv", function(error, data_poems) {
        // Преобразуем данные
        data_poems.forEach(function (d) {
            d.share = +d.share;
        });


        // ПОВЕДЕНИЕ ПРИ НАВЕДЕНИИ
        authors.on('mouseover', function() {
            // Ставим все авторам класс 'passive'
            authors
                .classed('active', false)
                .classed('passive', true);

            // Ставим выбранному автору класс 'active'
            var author = d3.select(this)
                .classed('active', true)
                .classed('passive', false);

            // Данные автора
            var d = author.datum();


            // Добавляем информацию в popup
            popup.html(function() {
                // Определяем все необходимые для popup данные
                var count = Math.round(d.total / 10000);
                if (count < 100) {
                    count = '<b>' + count * 10 + '</b> тысяч запросов за год';
                } else if (count == 100) {
                    count = '<b>1</b> миллион запросов за год';
                } else {
                    count = '<b>' + count / 100 + '</b> миллиона запросов за год';
                }


                // Добавляем текст
                return '<h2 class="title">' + d.author + '</h2>' +
                    '<p class="info"><b>' + d.rating + '-е</b> место<br/>' +
                    dotToComma(count) + '<br/><b>' + dotToComma(d3.round(d.share * 100, 1)) + '%</b> от всех запросов про стихи</p>' +
                    '<h3 class="top_name">Популярные произведения</h3>' +
                    '<p class="note">Доля среди всех запросов о произведениях автора, %</p>' +
                    '<table class="top_poems"></table>';
            });

            // Достаём данные о поэмах для выбранного автора
            var data_poem = data_poems.filter(function(poem) {
                return poem.author == d.author;
            });

            // Вызываем функцию, рисующую топ поэм
            add_top(data_poem, d);

            // Прячем оси
            xAx.classed('hide', true);
            yAx.classed('hide', true);

            // Ставим всем группам в легенде класс 'passive'
            legend_group.classed('passive', true);

            // Ставим выбранным группам класс 'active'
            legend_group.filter(function(group) {
                    return group === d.group;
                })
                .classed('passive', false)
                .classed('active', true);
        });

        authors.on('mouseout', function() {
            // Убираем все классы для авторов
            authors
                .classed('active', false)
                .classed('passive', false);

            // Убираем все классы для групп
            legend_group
                .classed('passive', false)
                .classed('active', false);

            // Возвращаем оси
            xAx.classed('hide', false);
            yAx.classed('hide', false);
        });
    });
});
