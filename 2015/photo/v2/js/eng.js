ymaps.ready(function() {
    // Создаем карту
    var map = new ymaps.Map('YMapsID', {
        center: [55, 42],
        controls: [],
        zoom: 4
    }, {
        maxZoom: 8,
        minZoom: 3
    });
    // Добавляем элементы управления
    map.controls.add(new ymaps.control.TypeSelector(['yandex#map', 'yandex#satellite']));
    map.controls.add('zoomControl', {
        size: "small"
    });

    // Обрабатываем данные
    var seasons = ['spring', 'summer', 'autumn', 'winter'];
    var labels = ['Spring', 'Summer', 'Autumn', 'Winter'];
    var buttons = [];
    var collections = {
        spring: new ymaps.GeoObjectCollection(null),
        summer: new ymaps.GeoObjectCollection(null),
        autumn: new ymaps.GeoObjectCollection(null),
        winter: new ymaps.GeoObjectCollection(null),
    };

    for (var j = 0; j < seasons.length; j++) {
        // Проходимся по сезонам года
        var season = seasons[j],
            season_data = data[season];
        // Добавляем данные в коллекцию геообъектов
        for (var id = 0; id < season_data.length; id++) {
            var p = season_data[id];
            var point = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: p.slice(0, 2)
                },
                properties: {
                    weight: p[2]
                }
            });
            collections[season].add(point);
        }

        // Добавляем кнопку
        buttons[j] = new ymaps.control.Button({
            data: {
                content: labels[j],
                value: collections[season],
            },
            options: {
                selectOnClick: false,
                maxWidth: 90
            },
            state: {
                enabled: true,
                selected: false
            }
        });
    }

    // Меняем стиль отображения первой кнопки
    buttons[0].select();
    buttons[0].disable();

    // Загружаем модуль тепловой карты
    ymaps.modules.require(['Heatmap'], function(Heatmap) {
        var heatmap = new Heatmap(collections.spring, {
            gradient: {
                0.1: 'rgba(76, 187, 134, 0.7)',
                0.5: 'rgba(255, 204, 0, 0.9)',
                1.0: 'rgba(238, 46, 87, 0.8)'
            },
            radius: 6,
            opacity: 1,
            dissipating: true,
            intensityOfMidpoint: 0.2
        });
        heatmap.setMap(map);

        // Поведение при нажатии на кнопку
        buttons.forEach(function(butt) {
            butt.events.add('click', function() {
                val = butt.data.get('value');
                if (butt.state.get('enabled') === true) {
                    heatmap.setData(val);
                    butt.state.set('enabled', false);
                    butt.state.set('selected', true);
                    buttons.forEach(function(other_butt) {
                        if (other_butt != butt) {
                            other_butt.state.set('enabled', true);
                            other_butt.state.set('selected', false);
                        }
                    });
                }
            });
        });

        // Добавляем кнопку на карту
        for (var i = 0; i < buttons.length; i++) {
            map.controls.add(buttons[i], {
                float: 'left',
                floatIndex: buttons.length - i
            });
        }
    });
});
