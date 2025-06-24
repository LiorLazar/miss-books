import { BookAdd } from "../components/BookAdd.jsx"
import { BookFilter } from "../components/BookFilter.jsx"
import { BookList } from "../components/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem removing book')
            })
    }
    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                showSuccessMsg('Book Removed Successfully')
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onAddBook() {
        loadBooks()
    }

    if (!books) return <div className="container">Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
            <section className="container">
                <BookAdd defaultQuery={{ txt: '' }} onAddBook={onAddBook} />
                <Link to="/book/edit">Edit / Add Book Manually</Link>
            </section>
            <BookList onRemoveBook={onRemoveBook} books={books} />
        </section>
    )
}