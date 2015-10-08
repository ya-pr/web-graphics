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
var margin = {top: 70, bottom: 10, left: 50, right: 280},
    width_plot = width - margin.left - margin.right,
    height_plot = height_pic - margin.top - margin.bottom;

// Размеры кругов
// Минимальный радиус вычисляется как 1/240 высоты, либо 2px (если меньше)
// Максимальный радиус в 4 раза больше минимального
var circle_size_min = d3.round(Math.max(height_plot / 240, 2), 1),
    circle_size_max = d3.round(circle_size_min * 4, 1);

// Ширина баров во всплывающей подсказке
var width_bars = 70;

// Авторы и соответствующие цвета
var authors = [
    'А. С. Пушкин',
    'А. С. Грибоедов',
    'Н. А. Некрасов',
    'М. Ю. Лермонтов',
    'К. М. Симонов',
    'А. А. Блок',
    'С. А. Есенин',
    'В. В. Маяковский',
    'Л. А. Филатов',
    'Ф. И. Тютчев',
    'М. И. Цветаева',
    'С. В. Михалков',
    'А. А. Фет',
    'И. А. Крылов'
];
var authors_colors = [
    'rgb(49,170,109)',
    'rgb(102,216,161)',
    'rgb(251,159,178)',
    'rgb(245,105,145)',
    'rgb(244,42,86)',
    'rgb(216,23,61)',
    'rgb(210,182,215)',
    'rgb(184,141,193)',
    'rgb(119,62,132)',
    'rgb(195,217,55)',
    'rgb(255,186,35)',
    'rgb(112,128,138)',
    'rgb(31, 150, 170)',
    'rgb(252, 135, 31)'
];

// Для линка на стихи
function linkToPoem(poem, author) {
    return '<a href="//yandex.ru/search/?text=' + poem + ' ' + author +
    ' стихи" target="_blank">' + poem + '</a>';
}

// ШКАЛЫ
var x = d3.scale.linear()
    .range([0, width_plot])
    .domain([1800, 2000]);
var y = d3.scale.linear()
    .range([0, height_plot]);

var size = d3.scale.linear()
    .range([circle_size_min, circle_size_max]);
var color = d3.scale.ordinal()
    .range(authors_colors)
    .domain(authors);

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
    .tickValues([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);


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


// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА ЗАПРОСОВ
function add_top(data, d) {
    d3.select('.top_poems')
      .selectAll('p')
        .data(data.slice(0, 3)) // берём только три первых запроса
      .enter().append('p')
        .attr('class', 'query')
        .html(function(d) {return d.string; });
}

// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТОПА ПОЭМ
function add_top_poem(data) {
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
        .style('background-color', function(d) {return color(d.author); })
      .append('p')
        .attr('class', 'value')
        .style('right', function(d) {return x_bars(d.share) + 3 + 'px'; })
        .text(function(d) {return d3.round(d.share * 100, 0); });

    // НАЗВАНИЯ
    tr.append('td')
        .attr('class', 'name')
        .html(function(d) {return linkToPoem(d.name, d.author); });
}


// ЗАГРУЖАЕМ ДАННЫЕ
d3.tsv("data/data_poems2.tsv", function(error, data) {
    // Преобразуем данные
    data.forEach(function(d, i) {
        d.rating = +d.rating;
        d.writtenYear = +d.writtenYear;
        d.total = +d.total;
        d.total_sqrt = Math.sqrt(d.total);
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
        .text("Авторы");

    // Легенда о размерах
    var legend_size = legend.append("g")
        .attr("class", "size")
        .attr("width", width_q - circle_size_max)
        .attr("transform", "translate(" + circle_size_max + "," + (height_legend_names) + ")")
      .selectAll("g")
        .data([
            [1000000, "1 млн"],
            [500000, "500 тыс."],
            [250000, "250 тыс."],
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

    // Легенда о поэмах
    var legend_group = legend.append("g")
        .attr("class", "group")
        .attr("width", width_q * 3 + margin.right)
        .attr("transform", "translate(" + (width_q + 20 + circle_size_max / 2) + "," + height_legend_names + ")")
      .selectAll("g")
        .data(authors)
      .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + (Math.floor(i / 4) * width_q) + "," + (i % 4 * height_legend_q + height_legend_q / 2) + ")";
        });
    legend_group.append("circle")
        .attr("r", function(d) {return d3.round(circle_size_max / 2, 1); })
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

        // Ставим всем поэмам класс 'passive'
        poems.classed('passive', true);

        // Ставим выбранным поэмам класс 'group_choise'
        var group_poems = poems.filter(function(poem_data) {
                return poem_data.author === group_name;
            })
            .classed('passive', false)
            .classed('group_choise', true);

        // Прячем ось Y
        yAx.classed('hide', true);

        // Добавляем информацию в popup
        popup.html(function() {
            return '<h2 class="title">' + group_name + '</h2>' +
                '<p class="note">Доля от всех запросов про стихи автора, %</p>' +
                '<table class="top_poems"></table>';
        });

        // Вызываем функцию, рисующую топ поэм
        add_top_poem(group_poems.data());
    });

    legend_group.on('mouseout', function() {
        // Убираем все классы для групп
        legend_group
            .classed('active', false)
            .classed('passive', false);

        // Убираем все классы для поэм
        poems
            .classed('passive', false)
            .classed('group_choise', false);

        // Возвращаем ось Y
        yAx.classed('hide', false);
    });


    // ОСНОВНАЯ ДИАГРАММА
    // Поэмы
    var poems = pic.append("g")
        .attr("class", "poems")
      .selectAll("g")
        .data(data)
      .enter().append("g");

    // Круги
    var poems_circles = poems.append("circle")
        .attr("cx", function(d) {return x(d.writtenYear); })
        .attr("cy", function(d) {return y(d.rating); })
        .attr("r", function(d) {return size(d.total_sqrt); })
        .attr("fill", function(d) {return color(d.author); });

    // Названия поэм
    // Названия длинные, поэтому по умолчанию будем показывать короткую версию,
    // а при наведении - длинную. Для этого добавляем на диаграмму оба варианта.
    poems.append("text")
        .attr("class", "poem full_name") // Полное название
        .attr("x", function(d) {return x(d.writtenYear); })
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
        .text(function(d) {return d.name; });

    poems.append("text")
        .attr("class", "poem short_name") // укороченная версия названия
        .attr("x", function(d) {return x(d.writtenYear); })
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
        .text(function(d) {return d.shortName; });

    // Ранг
    poems.append("text")
        .attr("class", "rank")
        .attr("x", -9)
        .attr("y", function(d) {return y(d.rating); })
        .attr("dy", "0.32em")
        .attr("text-anchor", "end")
        .attr("fill", function(d) {return color(d.author); })
        .text(function(d) {return d.rating; });

    // Год создания
    poems.append("text")
        .attr("class", "writtenYear")
        .attr("x", function(d) {return x(d.writtenYear); })
        .attr("y", -(circle_size_max + 9))
        .attr("text-anchor", "middle")
        .attr("fill", function(d) {return color(d.author); })
        .text(function(d) {return d.writtenYear; });


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
        .text("Год написания");

    // Подпись оси Y
    yAx.append("g")
        .attr("class", "label")
        .attr("transform", "translate(" + 0 + "," + height_plot / 2 + ") rotate(-90)")
      .append("text")
        .attr("dy", "-3em")
        .attr("text-anchor", "middle")
        .text("Место в рейтинге");



    // ЗАГРУЖАЕМ ДАННЫЕ ПО ЗАПРОСАМ
    d3.tsv("data/data_poems_top_strings2.tsv", function(error, data_querys) {
        // Преобразуем данные
        data_querys.forEach(function(d, i) {
            d.string = '[' + d.string + ']';
        });

        // ПОВЕДЕНИЕ ПРИ НАВЕДЕНИИ НА ПОЭМУ
        poems.on('mouseover', function() {
            // Ставим все поэмам класс 'passive'
            poems
                .classed('active', false)
                .classed('passive', true);

            // Ставим выбранной поэме класс 'active'
            var poem = d3.select(this)
                .classed('active', true)
                .classed('passive', false);

            // Данные поэмы
            var d = poem.datum();

            // Добавляем информацию в popup
            popup.html(function() {
                return '<h2 class="title">' + linkToPoem(d.name, d.author) + '</h2>' +
                    '<p class="author_name">' + d.author + '</p>' +
                    '<p class="info"><b>' + d.rating + '-е</b> место<br/><b>' +
                    d3.round(d.total / 1000, -1) + '</b> тысяч запросов за год<br/><b>' +
                    d3.round(d.share * 100, 0) + '%</b> от всех запросов про стихи автора</p>' +
                    '<h3 class="top_name">Популярные запросы</h3>' +
                    '<p class="top_poems"></p>';
            });

            // Достаём данные о запросах для выбранной поэмы
            var data_query = data_querys.filter(function(poem) {
                return poem.poem == d.name;
            });

            // Вызываем функцию, добавляющую топ запросов
            add_top(data_query, d);

            // Прячем оси
            xAx.classed('hide', true);
            yAx.classed('hide', true);

            // Ставим всем группам в легенде класс 'passive'
            legend_group.classed('passive', true);

            // Ставим выбранным группам класс 'active'
            legend_group.filter(function(group) {
                    return group === d.author;
                })
                .classed('passive', false)
                .classed('active', true);
        });

        poems.on('mouseout', function() {
            // Убираем все классы для поэм
            poems
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
