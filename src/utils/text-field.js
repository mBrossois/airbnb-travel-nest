export function textField(titleVar, textVar) {
    const field = document.createElement('div')
    const title = document.createElement('h2')
    const text = document.createElement('p')
    title.textContent = titleVar
    field.appendChild(title)

    if(textVar) {
        text.textContent = textVar
        field.appendChild(text)
    }

    return field
}