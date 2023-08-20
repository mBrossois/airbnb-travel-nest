import { textField } from './utils/text-field'
import { activePageNumber } from './utils/page'
import { getNavigation, getPages } from './utils/contentful'
import { createMap, addMarker } from './utils/map'

let language = 'en-US'

const hamburger = document.getElementById('hamburger')
const close = document.getElementById('close')
const nav = document.querySelector('nav')
const navigationBlock = document.querySelector('.navigation-block')
const languageSelect = document.getElementById('languages')
const landingsPage = document.getElementById('landings-page')
const landingsPageTitle = document.getElementById('landings-page-title')
const secondPageEl = document.getElementById('second-page')
const secondPageFields = document.querySelector('.second-page-fields')
const thirdPageEl = document.getElementById('third-page')
const fourthPageEl = document.getElementById('fourth-page')

let active
let navigation
let navELements
let pageSizes

async function loadAll() {
    await setupNavigation()
    await setupText()
    pageSizes = [
        landingsPage.offsetHeight,
        secondPageEl.offsetHeight,
        thirdPageEl.offsetHeight,
        fourthPageEl.offsetHeight
    ]
}

async function setupNavigation() {
    navigation = await getNavigation(language)

    for(let navItem in navigation.titles) {
        // Nav item
        const link = document.createElement("a")
    
        link.textContent = navigation.titles[navItem]
        link.setAttribute('href', `#${navigation.urls[navItem].toLowerCase()}`)
        nav.appendChild(link)
    }
    
    navELements = document.querySelectorAll('nav a')

    active = navELements[0]
    active.classList.add('active')

}

async function setupText() {
    const pages = await getPages(language)
    try {
        const landingsPageTitle = getPage(pages, 0).title
        const secondPage = getPage(pages, 1)
        const thirdPageTitle = getPage(pages, 2).title
        const fourthPageTitle = getPage(pages, 3).title
    
        setupLandingsPage(landingsPageTitle)
        setupSecondPage(secondPage)
        setupThirdPage(thirdPageTitle)
        setupFourthPage(fourthPageTitle)

    } catch(e) {
        console.log("We couldn't properly load all the pages data.")
    }
}

function getPage(pages, number) {
    return pages.find(page => page.title === navigation.titles[number])
}

function setupLandingsPage(titleText) {
    // Landingspage
    landingsPage.setAttribute('id', navigation.urls[0].toLowerCase())
    landingsPageTitle.textContent = titleText

}

function setupSecondPage(page) {
    // Second page
    secondPageEl.setAttribute('id', navigation.urls[1].toLowerCase())

    const title = document.getElementById('second-page-title')
    title.textContent = page.title

    for(let pageItem of page.fields) {
        secondPageFields.appendChild(textField(pageItem.fields.title, pageItem.fields.text))
    }

}

function setupThirdPage(titleText) {
    // Third page
    thirdPageEl.setAttribute('id', navigation.urls[2].toLowerCase())
}

function setupFourthPage(titleText) {
    // Fourth page
    fourthPageEl.setAttribute('id', navigation.urls[3].toLowerCase())

    const title = document.getElementById('fourth-page-title')
    title.textContent = titleText

    setupLeaflet(fourthPageEl)
}

function setupLeaflet(pageElement) {
    const mapEl = document.createElement('div')
    mapEl.setAttribute('id', 'map')

    pageElement.appendChild(mapEl)

    createMap()
    addMarker()

    // const map = L.map('map').setView([45.75477011772832, 4.842571212291667], 15)

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    // attribution: '© OpenStreetMap'
    // }).addTo(map)

    // L.marker([45.75477011772832, 4.842571212291667], {alt: 'Airbnb'}).addTo(map).bindPopup('The Airbnb')
    
}

await loadAll()

// On language change
function clearAll() {
    nav.replaceChildren()
    secondPageFields.replaceChildren()
}

// Scroll to right page
if(window.location.hash) {
    const scrollToItem = document.querySelector(window.location.hash) 
    const y = scrollToItem.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({top: y, behavior: 'smooth'})
}

// Event listeners
hamburger.addEventListener('click', () => {
    navigationBlock.classList.add('open')
    hamburger.classList.add('hidden')
    close.classList.remove('hidden')

    document.body.style.overflowY = 'hidden'
})

close.addEventListener('click', () => {
    document.body.style.overflowY = 'scroll'

    navigationBlock.classList.remove('open')
    close.classList.add('hidden')
    hamburger.classList.remove('hidden')
})

document.addEventListener('scroll', () => {
    const activePage = activePageNumber(window.scrollY, pageSizes)
    const activeItem = navELements[activePage]
    if(activeItem !== active) {
        active.classList.remove('active')
        active = activeItem
        active.classList.add('active')
    }
})

for(let element of navELements) {
    element.addEventListener('click', (event) => {
        active.classList.remove('active')
        event.target.classList.add('active')
        active = event.target
        navigationBlock.classList.remove('open')
        close.classList.add('hidden')
        hamburger.classList.remove('hidden')
    })
}

languageSelect.addEventListener('change', (event) => {
    language = languageSelect.value
    clearAll()
    loadAll()
})