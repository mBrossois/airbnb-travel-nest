import { textField } from './utils/text-field'
import { activePageNumber } from './utils/page'
import { getNavigation, getPages } from './utils/contentful'
import { createMap, addMarkers, setupLayers } from './utils/map'

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
const imagesNav = document.getElementById('imagesNav')


let active
let navigation
let navELements
let pageSizes

async function loadAll() {
    await setupNavigation()
    await setupText()
    setupImagesNav()
    pageSizes = [
        landingsPage.offsetHeight - 10,
        secondPageEl.offsetHeight,
        thirdPageEl.offsetHeight,
        fourthPageEl.offsetHeight
    ]
}

function setupImagesNav() {

    const roomList = [
        { enText: 'Hallway', frText: 'Couloir', value: 'hallway'},
        { enText: 'Kitchen', frText: 'Cuisine', value: 'kitchen'},
        { enText: 'Livingroom one', frText: 'Salon un', value: 'livingRoomOne'},
        { enText: 'Livingroom two', frText: 'Salon deux', value: 'livingRoomTwo'},
        { enText: 'Bedroom', frText: 'Chambre', value: 'bedroom'},
        { enText: 'Bathroom one', frText: 'Salle de bain un', value: 'bathroomOne'},
        { enText: 'Bathroom two', frText: 'Salle de bain deux', value: 'bathroomTwo'},
        { enText: 'Bathroom three', frText: 'Salle de bain trois', value: 'bathroomThree'},
        { enText: 'Bathroom four', frText: 'Salle de bain quatre', value: 'bathroomFour'},
    ]    
    for(let room of roomList) {
        const option = document.createElement("option")
        option.setAttribute('value', room.value )
        option.textContent = language === 'en-US' ? room.enText : room.frText
        imagesNav.appendChild(option)
    }

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
        const fourthPageTitle = getPage(pages, 3)
    
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

function setupFourthPage(pageData) {
    // Fourth page
    fourthPageEl.setAttribute('id', navigation.urls[3].toLowerCase())

    const title = document.getElementById('fourth-page-title')
    title.textContent = pageData.title

    if(pageData.useMap) {
        setupLeaflet(fourthPageEl, pageData.mapMarkers)
    }

}

function setupLeaflet(pageElement, mapMarkers) {
    const mapEl = document.createElement('div')
    mapEl.setAttribute('id', 'map')

    pageElement.appendChild(mapEl)

    createMap()
    addMarkers(mapMarkers)
    setupLayers()
}

(async () => {
    await loadAll()

    // On language change
    function clearAll() {
        nav.replaceChildren()
        secondPageFields.replaceChildren()
        imagesNav.replaceChildren()
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

})()