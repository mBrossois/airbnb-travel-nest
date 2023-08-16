import * as contentful from 'contentful'
import { textField } from './utils/text-field'
import { activePageNumber } from './utils/page'

const hamburger = document.getElementById('hamburger')
const close = document.getElementById('close')
const nav = document.querySelector('nav')
const navigationBlock = document.querySelector('.navigation-block')

// Contentful
const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
})

const navigationResult = await client
  .getEntries({
    content_type: 'navigation',
    limit: '1'
})

const navigation = navigationResult.items[0].fields.items

const pagesResult = await client
    .getEntries({
        content_type: 'page'
})

const pages = pagesResult.items.map(item => {
    return item.fields
})
  
for(let navItem of navigation) {
    // Nav item
    const link = document.createElement("a")

    link.textContent=navItem
    link.setAttribute('href', `#${navItem.toLowerCase()}`)
    nav.appendChild(link)
}

const navELements = document.querySelectorAll('nav a')
let active = navELements[0]
active.classList.add('active')

// Landingspage
const landingsPage = document.getElementById('landings-page')
landingsPage.setAttribute('id', navigation[0].toLowerCase())
const landingsPageTitle = document.getElementById('landings-page-title')
landingsPageTitle.textContent = pages.find(page => page.name === navigation[0]).title

// Second page
const secondPageEl = document.getElementById('second-page')
secondPageEl.setAttribute('id', navigation[1].toLowerCase())
const secondPage = pages.find(page => page.name === navigation[1])

const title = document.getElementById('second-page-title')
title.textContent = secondPage.title

const secondPageFields = document.querySelector('.second-page-fields')

for(let pageItem of secondPage.fields) {
    secondPageFields.appendChild(textField(pageItem.fields.title, pageItem.fields.text))
}

// Third page
const thirdPageEl = document.getElementById('third-page')


// Fourth page
const fourthPageEl = document.getElementById('fourth-page')


// Scroll to right page
if(window.location.hash) {
    const scrollToItem = document.querySelector(window.location.hash) 
    const y = scrollToItem.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({top: y, behavior: 'smooth'})

}


// Get initial page size
const pageSizes = [
    landingsPage.offsetHeight,
    secondPageEl.offsetHeight,
    thirdPageEl.offsetHeight,
    fourthPageEl.offsetHeight
]

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
        nav.classList.remove('open')
        close.classList.add('hidden')
        hamburger.classList.remove('hidden')
    })
}