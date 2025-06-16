import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
                    || regExp.test(book.description)
                    || regExp.test(book.description)
                    || book.authors.includes(filterBy.txt)
                    || regExp.test(book.subtitle)
                    || book.categories.includes(filterBy.txt)
                )
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    else return storageService.post(BOOK_KEY, book)
}

function getEmptyBook(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(2)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `https://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: 'en',
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    console.log('books:', books)
    utilService.saveToStorage(BOOK_KEY, books)
}