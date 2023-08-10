import * as contentful from 'contentful'

const hamburger = document.getElementById('hamburger')
const nav = document.querySelector('nav')

// Contentful
const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
})

const navigation = await client
  .getEntries({
    content_type: 'navigation',
    limit: '1'
})

const pagesResult = await client
    .getEntries({
        content_type: 'page'
})

console.log(pagesResult)

const pages = pagesResult.items.map(item => {
    return item.fields
})

console.log(pages)
  
for(let navItem of navigation.items[0].fields.items) {
    const link = document.createElement("a")

    link.textContent=navItem
    link.setAttribute('href', `#${navItem.toLowerCase()}`)
    nav.appendChild(link)
}

const navELements = document.querySelectorAll('nav a')
let active = navELements[0]
active.classList.add('active')



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

