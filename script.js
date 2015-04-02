/*globals google:true, window:true, document:true, google:true, Geometry:true, $:true */
"use strict";

function fillPolygon(boundaryPolygon, layoutRules) {
    // see google maps reference may be useful
    // https://developers.google.com/maps/documentation/javascript/reference

    var map = boundaryPolygon.getMap(),
        boundaryPath = boundaryPolygon.getPath(),


        //define the four corners of a rectangle starting at the first point
        //in the polygon path
        topLeft = boundaryPath.getAt(0),
        bottomLeft = Geometry.offset(topLeft, layoutRules.height, 180),
        bottomRight = Geometry.offset(bottomLeft, layoutRules.width, 90),
        topRight = Geometry.offset(bottomRight, layoutRules.height, 0),


        // draw a polygon for a single Module
        modulePolygon = new google.maps.Polygon({
            map: map,
            fillColor: '#0000FF',
            strokeColor: '#0000FF',
            fillOpacity: 0.5,
            strokeWeight: 2,
            path: [topLeft, bottomLeft, bottomRight, topRight]
        });
}



function initialize() {
    var mapOptions = {
            center: new google.maps.LatLng(37.7833, -122.4167),
            zoom: 21,
            maxZoom: 25,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            tilt: 0,

        },
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
        drawingManager = new google.maps.drawing.DrawingManager({
            map: map,
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON,
                ]
            },
            polygonOptions: {
                fillColor: '#55FF55',
                strokeColor: '#55FF55',
                fillOpacity: 0.2,
                strokeWeight: 5,
                clickable: false,
                editable: false,
                zIndex: 0
            }
        }),
        button = $('#drawModules');


    button.on('click', function () {
        button.prop('disabled', true);

        drawingManager.setOptions({
            drawingMode: google.maps.drawing.OverlayType.POLYGON
        });

        google.maps.event.addListenerOnce(drawingManager, 'polygoncomplete', function (polygon) {
            drawingManager.setOptions({
                drawingMode: null
            });
            console.log("Got Polygon");

            fillPolygon(polygon, {
                width: $('#moduleWidth').val(), // meters
                height: $('#moduleHeight').val(),

                rowSpacing: $('#rowSpacing').val(),
                modulesInRow: $('#modulesInRow').val(),

                orientation: $('#orientation').val(),
                tilt: $('#tilt').val(),
                azimuth: $('#azimuth').val()
            });

            button.prop('disabled', false);
        });
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

