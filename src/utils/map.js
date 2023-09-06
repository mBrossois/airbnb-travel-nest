import L from 'leaflet'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

export function setupLayers(language) {
    baseMaps = {
        "OpenStreetMap": originalTile,
    };
    

    const airbnbsLayer = L.layerGroup(airbnbs).addTo(map)
    const restaurantsLayer = L.layerGroup(restaurants).addTo(map)
    const barsLayer = L.layerGroup(bars).addTo(map)
    const activitiesLayer = L.layerGroup(activities).addTo(map)
    const bakeriesLayer = L.layerGroup(bakeries).addTo(map)

    const activitiesTitle = language === 'en-US' ? "Activities" : "Activités"
    const bakeriesTitle = language === 'en-US' ? "bakeries" : "Boulangeries"

    overlayLayer = {
        "Airbnbs": airbnbsLayer,
        "Restaurants": restaurantsLayer,
        "Bars": barsLayer,
        [activitiesTitle]: activitiesLayer,
        [bakeriesTitle]: bakeriesLayer
    }
    
    L.control.layers(baseMaps, overlayLayer).addTo(map);
}

export function resetMap() {
    map.remove()
}

export function addMarker(marker, icon) {
    return L.marker([marker.location.lat, marker.location.lon], {alt: marker.title, icon: icon}).bindPopup(documentToHtmlString(marker.description))
    
}

const customMarker = L.Icon.extend({
    options: {
        shadowUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017398/airbnb/pointers/pointer-shadow_wyr8k0.png',
        iconSize:     [28, 41], // size of the icon
        shadowSize:   [28, 41], // size of the shadow
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 41],  // the same for the shadow
        popupAnchor:  [0, -47] // point from which the popup should open relative to the iconAnchor
    }
});

const airbnbIcon = new customMarker({iconUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017396/airbnb/pointers/pointer-airbnb_h9ex81.png'});
const restaurantIcon = new customMarker({iconUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017398/airbnb/pointers/pointer-restaurant_co1fbo.png'});
const barIcon = new customMarker({iconUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017397/airbnb/pointers/pointer-bar_yqv7ui.png'});
const activityIcon = new customMarker({iconUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017396/airbnb/pointers/pointer-activities_vgwnpy.png'});
const croissantIcon = new customMarker({iconUrl: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/v1694017397/airbnb/pointers/pointer-croissants_fkanst.png'});