/*globals google:true */

/*
This is a library of useful geometry helpers that wrap around the Google Maps
API object.

For this exercise, we just put a  variable 'Geometry' on the global scope,
so you can use any metho just as:

var bounds = Geometry.bounds(...); //get a bounding box around a polygon
*/

'use strict';
function GeometryLib() {
    this.bounds = function (polygon) {
        // return a bounding box (google.maps.LatLngBounds) around a google maps polygon
        var bounds = new google.maps.LatLngBounds(),
            paths = polygon.getPaths(),
            path,
            p,
            i;

        for (p = 0; p < paths.getLength(); p += 1) {
            path = paths.getAt(p);
            for (i = 0; i < path.getLength(); i += 1) {
                bounds.extend(path.getAt(i));
            }
        }

        return bounds;
    };

    this.bufferBounds = function (bounds, distance) {
        // extend the distance by an additional root 2 to account for the fact that the offset
        // is moving at 45 degrees to the cardinal directions
        bounds.extend(this.offset(bounds.getNorthEast(), distance * Math.sqrt(2), 45));
        bounds.extend(this.offset(bounds.getSouthWest(), distance * Math.sqrt(2), 225));
    };

    this.containsLocation = function (polygon, latLng) {
        // return true if a polygon contains a given latitude and longitude
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };


    this.offset = function (latLng, distance, heading) {
        //return a google.maps.LatLng that isoffset from a given point
        //by a distance (meters) and direction (bearing)
        return google.maps.geometry.spherical.computeOffset(latLng, distance, heading);
    };

    this.offsetXY = function (latLng, x, y) {
        // return the google.maps.LatLng that is offset (x,y) meters from the initial point
        var transX = google.maps.geometry.spherical.computeOffset(latLng, x, 90);
        return google.maps.geometry.spherical.computeOffset(transX, y, 0);
    };

    this.distance = function (source, dest) {
        //return the distance between two points
        return google.maps.geometry.spherical.computeDistanceBetween(source, dest);
    };

    this.heading = function (source, dest) {
        //return the heading between two points – 0º is north, 180º is south
        return google.maps.geometry.spherical.computeHeading(source, dest);
    };

    this.rotate = function (vector, angle) {
        //rotate a vector (2d array, representing [x, y]) by a given angle
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        return [vector[0] * cos + vector[1] * sin,
                vector[0] * -sin + vector[1] * cos];
    };

}

var Geometry = new GeometryLib();
