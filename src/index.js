import * as contentful from 'contentful'
import { textField } from './utils/text-field'

const hamburger = document.getElementById('hamburger')
const nav = document.querySelector('nav')

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

// Scroll to right page
const scrollToItem = document.querySelector(window.location.hash) 
const y = scrollToItem.getBoundingClientRect().top + window.scrollY;

window.scrollTo({top: y, behavior: 'smooth'})


// Event listeners
hamburger.addEventListener('click', () => {
    if(nav.classList.contains('open')){
        nav.classList.remove('open')
    } else {
        nav.classList.add('open')
    }
})

document.addEventListener('scroll', () => {
    const activeItem = navELements[Math.round(window.scrollY / window.innerHeight)]
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
    })
}