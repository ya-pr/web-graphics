window.onload = function () {
    var curDirection = params.curDirection,
        curDay = params.curDay,
        curHour = params.curHour,
        selected = curDirection + '_' + curDay + '_' + curHour;

    ymaps.ready(function () {
        var map = new ymaps.Map('YMapsID', {
            center: params.center,
            controls: params.controls,
            zoom: params.zoom
        }, {
            maxZoom: params.maxZoom,
            minZoom: params.minZoom
        });

        ymaps.modules.require(['Heatmap'], function (Heatmap) {
            var heatmap = new Heatmap(window[selected], {
                gradient: {
                    0.1: 'rgba(83, 177, 77, .7)',
                    0.5: 'rgba(251, 202, 48, 1)',
                    1.0: 'rgba(239, 96, 48, 1)'
                },
                radius: 9,
                opacity: .5,
                dissipating: true,
                intensityOfMidpoint: 0.2
            });
            heatmap.setMap(map);

            function updateInfopane() {
                var cur_hour = $('#cur-hour'),
                    start_hour = $('#start-hour'),
                    end_hour = $('#end-hour'),
                    top_header_span = $('#top-header').find('span'),
                    caption_span = $('#caption').find('span'),
                    top_ol = $('#top').find('ol');
                cur_hour.html(curHour + ':00').css('left', curHour * 230 / 24);
                if (curHour < 4) {
                    start_hour.css('display', 'none');
                } else {
                    start_hour.css('display', 'block');
                }
                if (curHour > 18) {
                    end_hour.css('display', 'none');
                } else {
                    end_hour.css('display', 'block');
                }


                if (curDirection == 'dest') {
                    top_header_span.html('Куда');
                    caption_span.html('в которые');
                } else {
                    top_header_span.html('Откуда');
                    caption_span.html('из которых');
                }

                $('#time').html(Math.round(infopane[curDay][curHour]['time'] / 60) + ' мин');
                $('#cost').html(Math.round(infopane[curDay][curHour]['cost']) + ' ₽');
                top_ol.html('');
                tops_address[curDirection][curDay][curHour].forEach(function (d, i) {
                    top_ol.append('<li><strong>' + (i + 1) + '</strong>&nbsp;&nbsp;&nbsp;' + d + '</li>');
                });
            }

            function changeHeatMap() {
                curHour = document.getElementById('hour-selector').value;
                selected = curDirection + '_' + curDay + '_' + curHour;

                $.getScript(params.data_path + selected + '.js', function () {
                    heatmap.setData(window[selected]);
                });

                updateInfopane();
            }

            var buttons = '<div id="pt-sb" class="button"></div>' +
                '<div id="vs-4t" class="button"></div>' +
                '<input id="hour-selector" type="range" min="0" max="23" step="1" value="6">' +
                '<div id=cur-hour></div>' +
                '<div id=start-hour>00:00</div><div id=end-hour>23:00</div>' +
                '<div id="from" class="button"></div>' +
                '<div id="to" class="button"></div>';

            $('#buttons').append(buttons);
            $('#pt-sb').css('background-image', 'url(../pics/buttons/pt-sb-button-gray.png)');
            $('#vs-4t').css('background-image', 'url(../pics/buttons/vs-4t-button-yellow.png)');
            $('#from').css('background-image', 'url(../pics/buttons/from-button-gray.png)');
            $('#to').css('background-image', 'url(../pics/buttons/to-button-yellow.png)');

            updateInfopane();

            document.getElementById('hour-selector').oninput = function () {
                changeHeatMap();
            };

            $('.button').click(function () {
                if (this.id == 'pt-sb') {
                    curDay = 'frisat';
                    $(this).css('background-image', 'url(../pics/buttons/pt-sb-button-yellow.png)');
                    $('#vs-4t').css('background-image', 'url(../pics/buttons/vs-4t-button-gray.png)');
                } else if (this.id == 'vs-4t') {
                    curDay = 'other';
                    $(this).css('background-image', 'url(../pics/buttons/vs-4t-button-yellow.png)');
                    $('#pt-sb').css('background-image', 'url(../pics/buttons/pt-sb-button-gray.png)');
                } else if (this.id == 'from') {
                    curDirection = 'start';
                    $(this).css('background-image', 'url(../pics/buttons/from-button-yellow.png)');
                    $('#to').css('background-image', 'url(../pics/buttons/to-button-gray.png)');
                } else if (this.id == 'to') {
                    curDirection = 'dest';
                    $(this).css('background-image', 'url(../pics/buttons/to-button-yellow.png)');
                    $('#from').css('background-image', 'url(../pics/buttons/from-button-gray.png)');
                }
                changeHeatMap();
            });
        });
    });
};