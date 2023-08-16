export function activePageNumber(scrollNum, pages) {
    let pageSize = 0

    for(let page in pages) {
        pageSize += pages[page]

        if(scrollNum < pageSize) {
            return page
        }
    }
}