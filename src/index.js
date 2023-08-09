const hamburger = document.getElementById('hamburger')
const nav = document.querySelector('nav')
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