ymaps.ready(function() {
    var map = new ymaps.Map('YMapsID', {
        center: [55, 42],
        controls: ['zoomControl'],
        zoom: 4
    }, {
        maxZoom: 8,
        minZoom: 3
    });
    map.controls.add(new ymaps.control.TypeSelector(['yandex#map', 'yandex#satellite']));
    ymaps.modules.require(['Heatmap'], function(Heatmap) {
        var heatmap = new Heatmap(data_spring, {
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

        var spring_button = new ymaps.control.Button({
            data: {
                content: 'Spring',
                value: data_spring,
            },
            options: {
                selectOnClick: false,
                maxWidth: 90
            },
            state: {
                enabled: false,
                selected: true
            }
        });
        var summer_button = new ymaps.control.Button({
            data: {
                content: 'Summer',
                value: data_summer,
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
        var autumn_button = new ymaps.control.Button({
            data: {
                content: 'Autumn',
                value: data_autumn,
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
        var winter_button = new ymaps.control.Button({
            data: {
                content: 'Winter',
                value: data_winter,
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

        var buttons = [spring_button, summer_button, autumn_button, winter_button];
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

        map.controls.add(winter_button, {
            float: 'left',
            floatIndex: 1
        });
        map.controls.add(autumn_button, {
            float: 'left',
            floatIndex: 2
        });
        map.controls.add(summer_button, {
            float: 'left',
            floatIndex: 3
        });
        map.controls.add(spring_button, {
            float: 'left',
            floatIndex: 4
        });
    });
});
