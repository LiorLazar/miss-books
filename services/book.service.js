import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getCategories,
    getAuthors,
    getEmptyReview,
    addReview,
    getGoogleBooks,
    addGoogleBook
}

function query(filterBy = {}) {
    // console.log(filterBy)

    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
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
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
        title: '',
        publishedDate: '',
        description: ''
    }
}

function getEmptyReview(fullName = '', rating = '', readAt = '') {
    return { fullName, rating, readAt }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function getCategories() {
    return query().then(books =>
        [...new Set(books.flatMap(book => book.categories))])
}

function getAuthors() {
    return query().then(books =>
        [...new Set(books.flatMap(book => book.authors))])
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {

        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                reviews: null
            }
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
    }
    // console.log('books', books)
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return save(book)
        })
}

function getGoogleBooks(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
        .then((res) => {
            const books = res.data.items
            // const books = items.map(item => item.volumeInfo.title)
            // console.log(books)
            return books
        })
}

function addGoogleBook(bookToAdd) {
    // console.log(book)
    let books = loadFromStorage(BOOK_KEY)
    const book = {
        id: bookToAdd.id,
        title: bookToAdd.volumeInfo.title,
        subtitle: bookToAdd.volumeInfo.subtitle,
        authors: bookToAdd.volumeInfo.authors,
        publishedDate: bookToAdd.volumeInfo.publishedDate,
        description: bookToAdd.volumeInfo.description,
        pageCount: bookToAdd.volumeInfo.pageCount,
        categories: bookToAdd.volumeInfo.categories,
        thumbnail: bookToAdd.volumeInfo.imageLinks.smallThumbnail,
        language: bookToAdd.volumeInfo.language,
        reviews: null
    }
    console.log(book)
    books.push(book)
    // console.log(books)
    saveToStorage(BOOK_KEY, books)
    return book
}

