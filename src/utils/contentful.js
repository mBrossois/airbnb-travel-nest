import * as contentful from 'contentful'

// Contentful
const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESSTOKEN,
})

export async function getNavigation(language) {
    const navigationResult = await client
        .getEntries({
        content_type: 'navigation',
        limit: '1',
        locale: language
    })

    return navigationResult.items[0].fields
}

export async function getPages(language) {
    const pagesResult = await client
        .getEntries({
            content_type: 'page',
            locale: language
        })

    return pagesResult.items.map(item => {
        return item.fields
    })
}

