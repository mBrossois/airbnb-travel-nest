import L from 'leaflet'

let map

export function createMap() {
    map = L.map('map').setView([45.75477011772832, 4.842571212291667], 14)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map)
}

export function addMarker() {
    L.marker([45.75477011772832, 4.842571212291667], {alt: 'Airbnb', icon: airbnbIcon}).addTo(map).bindPopup('The Airbnb')
    L.marker([45.75481156813241, 4.843117306879479], {alt: 'La Faute aux Ours', icon: barIcon}).addTo(map).bindPopup('La Faute aux Ours')
    L.marker([45.75345486180312, 4.839672422418402], {alt: 'Thaï Thaï Restaurant', icon: restaurantIcon}).addTo(map).bindPopup('Thaï Thaï Restaurant')
    L.marker([45.76267546467228, 4.822160933470721], {alt: 'Notre-Dame de Fourvière', icon: activityIcon}).addTo(map).bindPopup('Notre-Dame de Fourvière')
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