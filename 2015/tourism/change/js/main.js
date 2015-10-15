ymaps.ready(function() {
    var layerName = "user#layer";
    var zoomRange = [2, 4];
    var Layer = function() {
        var layer = new ymaps.Layer("../../../img/background.png", {
            notFoundTile: "../../../img/background.png"
        });
        layer.getZoomRange = function() {
            return ymaps.vow.resolve(zoomRange);
        };
        return layer;
    };
    ymaps.layer.storage.add(layerName, Layer);
    var mapType = new ymaps.MapType(layerName, [layerName]);
    ymaps.mapType.storage.add(layerName, mapType);
    var map = new ymaps.Map('map', {
        center: [25.015625, 35.243634002208665],
        zoom: 2,
        type: layerName,
        controls: []
    });
    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: {
                left: 0,
                bottom: 0
            }
        }
    });
    map.controls.add(zoomControl);

    osmeRegions.geoJSON('../../../data/regions.json', {
        lang: 'ru',
        quality: 0,
        type: 'coast'
    }, function(geoJson) {
        var regions = ymaps.geoQuery(geoJson).setOptions({
            fillColor: 'ffffff',
            strokeColor: 'ffffff',
            pixelRendering: 'static'
        }).addToMap(map);
        jQuery.ajax({
            url: 'data/colors.min.json',
            dataType: 'json'
        }).then(function(data) {
            var listBox = new ymaps.control.ListBox({
                data: {
                    content: 'Выбрать регион'
                }
            });
            data.forEach(function(country) {
                var res = regions.search(function(region) {
                    return region.properties.get('properties.iso3166') == country.id;
                }).setOptions({
                    fillColor: country.color + ""
                });
            });
        });
    });
});
