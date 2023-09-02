import L from 'leaflet'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import barImg from  '../static/images/icons/pointer-bar.png'
import airbnbImg from '../static/images/icons/pointer-airbnb.png'
import restaurantImg from  '../static/images/icons/pointer-restaurant.png'
import activityImg from '../static/images/icons/pointer-activities.png'
import croissantImg from '../static/images/icons/pointer-croissants.png'
import shadowImg from '../static/images/icons/pointer-shadow.png'

let map
let originalTile
let baseMaps
let overlayLayer
const airbnbs = []
const restaurants = []
const bars = []
const activities = []
const bakeries = []

export function createMap() {
    map = L.map('map').setView([45.75477011772832, 4.842571212291667], 14)

    originalTile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    layers: (baseMaps, overlayLayer)
    }).addTo(map)
}

export function addMarkers(mapMarkers) {
    for(let marker of mapMarkers) {
        switch(marker.fields.markerType) {
            case 'airbnb':
                airbnbs.push(addMarker(marker.fields, airbnbIcon))
                break
            case 'restaurant':
                restaurants.push(addMarker(marker.fields, restaurantIcon))
                break
            case 'bar':
                bars.push(addMarker(marker.fields, barIcon))
                break
            case 'activity':
                activities.push(addMarker(marker.fields, activityIcon))
                break;
            case 'bakery':
                bakeries.push(addMarker(marker.fields, croissantIcon))
        }
    }
}

export function setupLayers() {
    baseMaps = {
        "OpenStreetMap": originalTile,
    };
    

    const airbnbsLayer = L.layerGroup(airbnbs).addTo(map)
    const restaurantsLayer = L.layerGroup(restaurants).addTo(map)
    const barsLayer = L.layerGroup(bars).addTo(map)
    const activitiesLayer = L.layerGroup(activities).addTo(map)
    const bakeriesLayer = L.layerGroup(bakeries).addTo(map)

    overlayLayer = {
        "Airbnbs": airbnbsLayer,
        "Restaurants": restaurantsLayer,
        "Bars": barsLayer,
        "Activities": activitiesLayer,
        "Bakeries": bakeriesLayer
    }
    
    L.control.layers(baseMaps, overlayLayer).addTo(map);
}

export function addMarker(marker, icon) {
    return L.marker([marker.location.lat, marker.location.lon], {alt: marker.title, icon: icon}).bindPopup(documentToHtmlString(marker.description))
    
}

const customMarker = L.Icon.extend({
    options: {
        shadowUrl: shadowImg,
        iconSize:     [28, 41], // size of the icon
        shadowSize:   [28, 41], // size of the shadow
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 41],  // the same for the shadow
        popupAnchor:  [0, -47] // point from which the popup should open relative to the iconAnchor
    }
});

const airbnbIcon = new customMarker({iconUrl: airbnbImg});
const restaurantIcon = new customMarker({iconUrl: restaurantImg});
const barIcon = new customMarker({iconUrl: barImg});
const activityIcon = new customMarker({iconUrl: activityImg});
const croissantIcon = new customMarker({iconUrl: croissantImg});