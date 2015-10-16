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
        controls: ["zoomControl"]
    }, {
        zoomControlSize: 'small'
    });

    var TitleControlLayout = ymaps.templateLayoutFactory.createClass([
        '<div style="font: 16px arial, sans-serif; position: absolute; top: {{ options.position.top }}px; left: {{ options.position.left }}px">{{ data.content }}</div>'
    ].join(''));
    var TitleControl = ymaps.util.defineClass(function(params) {
        TitleControl.superclass.constructor.call(this, params.options);

        this.data = new ymaps.data.Manager(params.data);
        this._layout = new TitleControlLayout({
            data: this.data,
            options: this.options
        });
    }, ymaps.collection.Item, {
        onAddToMap: function(map) {
            TitleControl.superclass.onAddToMap.call(this, map);
            this.getParent().getChildElement(this).then(this._onChildElement, this);
        },
        onRemoveFromMap: function(oldMap) {
            this._layout.setParentElement(null);

            TitleControl.superclass.onRemoveFromMap.call(this, oldMap);
        },
        _onChildElement: function(parentDomContainer) {
            // this._layout.setParentElement(parentDomContainer);
            this._layout.setParentElement(map.panes.get('events').getElement());
        }
    });

    var titleControl = new TitleControl({
        data: {
            content: ''
        },
        options: {
            float: 'none',
            position: {
                top: 20,
                left: 20
            }
        }
    });
    map.controls.add(titleControl);

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
            url: 'data/data.min.json',
            dataType: 'json'
        }).then(function(data) {
            var listBox = new ymaps.control.ListBox({
                data: {
                    content: 'Выбрать тему'
                }
            });
            map.controls.add(listBox, {
                float: 'right'
            });
            listBox.events.add('deselect', function(e) {
                regions.setOptions({
                    fillColor: 'ffffff'
                });
            });

            data.forEach(function(it) {
                var listBoxItem = new ymaps.control.ListBoxItem({
                    data: {
                        content: it.theme
                    }
                });
                listBoxItem.events.add('select', function(e) {
                    listBox.each(function(i) {
                        if (i != listBoxItem) {
                            i.deselect();
                        }
                    });
                    titleControl.data.set({
                        content: it.theme
                    });
                    it.countries.forEach(function(country) {
                        var res = regions.search(function(region) {
                            return region.properties.get('properties.iso3166') == country.id;
                        }).setOptions({
                            fillColor: country.color + ""
                        });
                    });
                });
                listBox.add(listBoxItem);
            });
            listBox.get(0).select();
        });
    });
});
