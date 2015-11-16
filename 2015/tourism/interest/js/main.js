//русская локаль для чтения даты и её отрисовки на графике
ru = {
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
};

//табличка для перевода названий месяцев из исходной даты в ту, что поймёт локаль
monthsChanger = {
    "Январь": "янв",
    "Февраль": "фев",
    "Март": "мар",
    "Апрель": "апр",
    "Май": "май",
    "Июнь": "июн",
    "Июль": "июл",
    "Август": "авг",
    "Сентябрь": "сен",
    "Октябрь": "окт",
    "Ноябрь": "ноя",
    "Декабрь": "дек"
};

//задаём границы для нашего графика
var margin = {top: 25, right: 55, bottom: 32, left: 42},
    width = 700 - margin.left - margin.right;
    height = 475 - margin.top - margin.bottom;

//обработчики даты
var parseDate = d3.locale(ru).timeFormat("%Y%b").parse; //первый преобразует дату из данных в JS-формат
var getYear = d3.locale(ru).timeFormat("%Y"); //второй выделяет из JS-даты год

//задаём оси
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.locale(ru).timeFormat("%b")); //формат подписей на оси Х: месяцы

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.locale(ru).numberFormat("")); //формат подписей на оси Y: проценты с одним десятичным знаком

//функция для отрисовки линий
var line = d3.svg.line()
    .interpolate("monotone") //задаём сглаживание
    .y(function(d) { return y(d.share); })
    .x(function (d) {
        return x(d.date);
    });
//добавляем svg
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//добавляем контейнеры для осей
var axisx = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

var axisy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

//добавляем контейнер, в котором будут лежать кривые, пока он пустой
var linesShare = svg.append('g').attr("class", 'lines');

//добавляем на ось Y подпись
axisy.append("text")
    .attr("x", '-.5em')
    .attr("y", '-1.5em')
    .attr("dy", ".71em")
    .text("Доля запросов про туризм, %");

//загружаем и обрабатываем данные
d3.tsv("data/data_travel.tsv", function(error, data) {
    data.forEach(function(d) {
        d.share = 100 * d.share.replace(',', '.'); //переводим долю в понятный машине формат
        d.month = d.month.replace(d.month, monthsChanger[d.month]); //меняем месяц на тот, что указан в локали
        d.date = parseDate(d.year + d.month); //добавляем JS-дату, полученную из месяца и года
    });

    x.domain(d3.extent(data, function(d) { return d.date; })); //определяем домен оси Х, он зависит от диапазона дат, которые у нас есть

    // добавляем к оси X подписи с номером года
    for (i=getYear(x.domain()[0]); i<=getYear(x.domain()[1]); i++) { //итерируем по диапазону лет (из домера)
        axisx.append("text")
            .attr("class", "text_years")
            .attr("x", x(parseDate(i+"янв"))) //добавляем под январем этого года
            .attr("dx", "-.95em") //смещаем немного левее, чтобы подпись была по центру
            .attr("y", 32) //и на тридцать пикселей ниже
            .text(i); //текст - номер года
    }
    axisx.append("line")
        .attr("class", "line_bottom")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", 1)
        .attr("y2", 1);

    //группируем исходные данные по городам в массив
    var nest = d3.nest()
        .key(function(d) { return d.region; })
        .sortKeys(d3.ascending)
        .entries(data);

    //то же самое, только в объекте, где ключ – название города
    var objNest = {};
    nest.forEach(function(d) {objNest[d.key] = d.values;});

    //для каждого города в отдельном объекте записываем снижение июнь к июню
    var annualDecrease = {};
    nest.forEach(function(d) {annualDecrease[d.key] = d.values[17].share / d.values[5].share}); //внимание, номер месяца прибит гвоздями

    //в отдельный массив собираем все снижения
    var allDecreases = [];
    nest.forEach(function(d) {allDecreases.push(d.values[17].share / d.values[5].share)});

    //задаем ось с цветами
    var color = d3.scale.linear()
        .domain([ //в домене у нам четыре ключевых точки
            d3.min(allDecreases), // 1 - наименьшее значение
            d3.min(allDecreases) + (d3.max(allDecreases) - d3.min(allDecreases))/3, // 2 - треть от наименьшего до наибольшего
            d3.min(allDecreases) + (d3.max(allDecreases) - d3.min(allDecreases))*2/3, // 3 - две трети до наибольшего
            d3.max(allDecreases)]) // 4 - наибольшее значение
        .range(["#d8173d", "#fa6b22", "#ffcc00", "#71c529"]); //range - четыре цвета

    //добавлявем поведение кнопкам сортировки
    sortButtons = d3.selectAll('.sort-button')
        .on('click', function () {
            if (this.classList.contains('disabled')) { //клик срабатывает только на выключенной кнопке
                if (this.classList.contains('alphabet')) {
                    nestedCitiesOnly.sort(function(a, b) {
                        return d3.ascending(a.key, b.key); //кнопка "по алфавиту" сортирует nest по возрастанию ключа, т.е. названия города
                    });
                } else {
                    nestedCitiesOnly.sort(function(a, b) {
                        return d3.descending(annualDecrease[a.key], annualDecrease[b.key]); //кнопка по алфавиту сортирует nest по уменьшению снижения этого ключа, записанного в отдельном словаре
                    });
                }
                sortButtons.classed('disabled', true);
                d3.select(this).classed('disabled', false); //у только что нажатой кнопки убираем класс "выключено"
                renderCities(); //запускаем функцию отрисовки городов
            }
        });
    //изначально сортировка по алфавиту включена, по интересу выключена
    d3.select('.interest').classed('disabled', true);

    //задаём поведение кнопки "очистить"
    d3.select('.deselect').on('click', function () {
        clearLines(); //функция очистки
    });

    //создаем копии nest, чтобы отдельно нарисовать кнопки-города и всю Россию
    nestedCitiesOnly = nest.filter(function(city) {
        return city.key != "Вся Россия"; //это копия без "Всей России"
    });
    nestedRussiaOnly = nest.filter(function(city) {
        return city.key == "Вся Россия"; //это копия без городов, только "Вся Россия"
    });

    //добавляем кнопку "Вся Россия", задаём ей поведение
    var allRussiaButton = d3.select('.content .all-russia').selectAll('.city-button')
        .data(nestedRussiaOnly).enter()
        .append('div')
        .attr('class', 'city-button') //класс для всех кнопок общий для общей анимации
        .text(function(d) {return d.key;})
        .on('click', changeChart); //по клику запускается функция changeChart

    selected = []; //список выбранных городов - пока пустой
    renderCities(); //запускаем функцию отрисовки городов, она тянет за собой отрисовку линий и поведение

    //функция добавляет кнопки-города и рисует график "по умолчанию"
    function renderCities() {
        clearLines(); //сначала стираем все существующие кривые
        d3.select('.content .cities').html(''); //стираем существующие кнопки-города
        cityButtons = d3.select('.content .cities').selectAll('.city-button')
            .data(nestedCitiesOnly).enter() //добавляем кнопки из nestedCities (без "всей России")
            .append('div')
            .attr('class', 'city-button')
            .text(function(d) {return d.key;})
            .on('click', changeChart); //по клику запускаем функцию changeChart

        //по умолчанию выбираем "всю Россию"
        changeChart.call(allRussiaButton[0][0], d3.select(allRussiaButton[0][0]).datum());
    }
    //функция рисует кривые и задаёт поведение при наведении
    function changeChart(d) {
        //если город уже выбран, убираем его из selected и снимаем соответствующий класс с кнопки
        if (selected.indexOf(d.key) > -1) {
            selected.splice(selected.indexOf(d.key),1);
            d3.select(this).classed('selected', false);
            d3.selectAll('.line-share').classed('passive', false);
        } else {
        //если город не был выбран, то добавляем его в selected и вешаем на кнопку класс
            d3.select(this).classed('selected', true);
            selected.push(d.key)
        }
        //запускаем функцию отрисовки линий
        drawLines();

        //поведение при наведении на линию
        lines.on('mouseover', function() {
            //делаем кнопки городов и линии пассивными
            cityButtons.classed('passive', true);
            allRussiaButton.classed('passive', true);
            lines.classed('passive', true);

            //выбираем активную линию, находим её кнопку, снимаем с них пассивность, красим кнопку
            var activeLine = d3.select(this)
                .classed('passive', false);
            var activeButton = cityButtons.filter(function(button_data) {
                return button_data.key === activeLine.datum().key;
            }); //активную кнопку ищем в cityButtons
            activeButton = (activeButton[0].length == 0 ? allRussiaButton : activeButton); //если не нашли в cityButtons, значит это "вся Россия"
            activeButton
                .classed('passive', false)
                .style('color', function (d) {
                    return color(annualDecrease[d.key]);
                });
            //сортировка: перекидываем выбранный город в конец selected и сортируем линии в соответствии с selected
            selected.splice(selected.indexOf(activeLine.datum().key),1);
            selected.push(activeLine.datum().key);
            d3.select('.lines').selectAll('.line-share').sort(function(a,b) {
                return d3.ascending(selected.indexOf(a.key), selected.indexOf(b.key))
            })
        });

        //поведение на mouseout: снимаем пассивность, убираем цвет у активной кнопки
        lines.on('mouseout', function() {
            cityButtons.classed('passive', false);
            allRussiaButton.classed('passive', false);
            lines.classed('passive', false);

            var activeLine = d3.select(this);

            var activeButton = cityButtons.filter(function(button_data) {
                return button_data.key === activeLine.datum().key;
            });
            activeButton = (activeButton[0].length == 0 ? allRussiaButton : activeButton);
            activeButton
                .style('color', null);
        });

        //поведение при наведении на город
        d3.selectAll('.selected').on('mouseover', function() {
            if (this.classList.contains('selected')) {
                cityButtons.classed('passive', true);
                allRussiaButton.classed('passive', true);
                lines.classed('passive', true);

                var activeButton = d3.select(this)
                    .classed('passive', false)
                    .style('color', function (d) {
                        return color(annualDecrease[d.key]);
                    });
                var activeLine = lines.filter(function(line_data) {
                    return line_data.key === activeButton.datum().key;
                })
                    .classed('passive', false);

                selected.splice(selected.indexOf(activeLine.datum().key),1);
                selected.push(activeLine.datum().key);
                d3.select('.lines').selectAll('.line-share').sort(function(a,b) {
                    return d3.ascending(selected.indexOf(a.key), selected.indexOf(b.key))
                })
            }
        });

        //поведение при mouseout с города
        d3.selectAll('.selected').on('mouseout', function() {
            d3.select(this).style('color', null);
            cityButtons.classed('passive', false);
            allRussiaButton.classed('passive', false);
            lines.classed('passive', false);
        });
    }
    //функция рисует кривые и обновляет их в соответствии со списком выбранных городов
    function drawLines() {
        //собираем данные только по тем городам, которые сейчас selected
        realPathesData = selected.map(function(d) {
            return {key:d, values:objNest[d]};
        });

        //собираем все доли, которые будем рисовать
        allShares = [];
        realPathesData.forEach(function(path) {
            allShares = allShares.concat(path.values.map(function(point) {return point.share;}));
        });

        //определяем максимум, из него задаём домен для оси Y
        max = d3.max(allShares) * 1.1;
        // max = max > 1 ? 1 : max;

        y.domain([0, max]);

        //перерисовываем оси
        axisx.transition()
            .duration(300)
            .call(xAxis)
            .selectAll('.tick line').attr('y1', -height); //здесь мы добавляем вертикальные линии в решётку
        yAxis.tickValues(d3.range(0, max, 0.25)); //задаём шаг отсечек по оси Y
        axisy.transition()
            .duration(300)
            .ease("circle").call(yAxis)
            .selectAll('.tick line').attr('x1', width); //горизонтальные линии
        axisy.selectAll('.tick text')
            .text( function(d, i) {
                return i % 2 != 0 ? "" : d; //убираем каждую чётную отсечку
            });

        //в этой переменной лежат все наши кривые
        lines = linesShare.selectAll('.line-share')
            .data(realPathesData, function(d) {return d.key;});

        //каждая кривая состоит из группы
        lineGroups = lines.enter().append('g')
            .attr('class', 'line-share');
        // 1 - невидимая толстая линия для наведения
        lineGroups.append('path')
            .style('stroke', 'transparent')
            .style('stroke-width', 10)
            .attr('d', function(d) {return line(d.values);})
            .attr('class', 'line-hover-area');
        // 2 - видимая линия
        lineGroups.append('path')
            .style('stroke', function (d) {
                return color(annualDecrease[d.key]);
            })
            .attr('d', function(d) {return line(d.values);})
            .attr('class', 'line-narrow');

        //добавляем update и exit
        lines.selectAll('.line-hover-area').transition().attr('d', function(d) {return line(d.values);});
        lines.selectAll('.line-narrow').transition().attr('d', function(d) {return line(d.values);});

        lines.exit()
            .transition()
            .duration(300)
            .style('opacity', 0)
            .remove();
    }
    //функция очистки графика
    function clearLines() {
        selected = []; //очищаем  selected
        d3.selectAll('.line-share').remove(); //удаляем все line-share
        d3.selectAll('.city-button').classed('selected', false); //убираем с кнопок класс selected
    }
});