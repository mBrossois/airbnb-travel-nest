export function scrollToPage(page) {
    const y = page.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
    top: y,
    behavior: 'smooth'
    });
}