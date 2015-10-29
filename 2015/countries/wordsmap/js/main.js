ymaps.ready(function () {
    var layerName = "user#layer";
    var zoomRange = [4, 6];
    var Layer = function () {
        var layer = new ymaps.Layer("./tiles/%z/%x-%y.png");
        layer.getZoomRange = function () {
            return ymaps.vow.resolve(zoomRange);
        };
        return layer;
    };
    ymaps.layer.storage.add(layerName, Layer);
    var mapType = new ymaps.MapType(layerName, [layerName]);
    ymaps.mapType.storage.add(layerName, mapType);
    var map = new ymaps.Map('map', {
        center: [4000, -1500],
        zoom: 4,
        type: layerName,
        controls: ["zoomControl"]
    }, {
        projection: new ymaps.projection.Cartesian([
            [-16384, 16384],
            [16384, -16384]
        ], [false, false]),
        restrictMapArea: [
            [-4608, 10752],
            [4608, -10752]
        ],
        zoomControlSize: 'small'
    });
    var hotspotObjectSource = new ymaps.hotspot.ObjectSource('./hotspots/%z/hotspot-%x-%y.js', 'hotspot_callback' /* ,{ noCache: true }*/);
    var hotspotLayer = new ymaps.hotspot.Layer(hotspotObjectSource, {
        cursor: 'arrow'
    });
    map.layers.add(hotspotLayer);
});
