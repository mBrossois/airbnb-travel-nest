import L from 'leaflet'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

let map

export function createMap() {
    map = L.map('map').setView([45.75477011772832, 4.842571212291667], 14)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map)
}

export function addMarkers(mapMarkers) {
    for(let marker of mapMarkers) {
        switch(marker.fields.markerType) {
            case 'airbnb':
                addMarker(marker.fields, airbnbIcon)    
                break
            case 'restaurant':
                addMarker(marker.fields, restaurantIcon)
                break
            case 'bar':
                addMarker(marker.fields, barIcon)
                break
            case 'activity':
                addMarker(marker.fields, activityIcon)
                break
        }
    }
}

export function addMarker(marker, icon) {
    L.marker([marker.location.lat, marker.location.lon], {alt: marker.title, icon: icon}).addTo(map).bindPopup(documentToHtmlString(marker.description))
    
}

const customMarker = L.Icon.extend({
    options: {
        shadowUrl: 'static/images/icons/pointer-shadow.png',
        iconSize:     [28, 41], // size of the icon
        shadowSize:   [28, 41], // size of the shadow
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 41],  // the same for the shadow
        popupAnchor:  [0, -47] // point from which the popup should open relative to the iconAnchor
    }
});

const airbnbIcon = new customMarker({iconUrl: 'static/images/icons/pointer-airbnb.png',});
const restaurantIcon = new customMarker({iconUrl: 'static/images/icons/pointer-restaurant.png',});
const barIcon = new customMarker({iconUrl: 'static/images/icons/pointer-bar.png',});
const activityIcon = new customMarker({iconUrl: 'static/images/icons/pointer-activities.png',});