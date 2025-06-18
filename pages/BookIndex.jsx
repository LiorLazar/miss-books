import { BookFilter } from "../components/BookFilter.jsx"
import { BookList } from "../components/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [bookIdToEdit, setBookIdToEdit] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        console.log('loading books');

        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onBookIdToEdit(bookId) {
        console.log(bookId);

        setBookIdToEdit(bookId)
    }

    // BONUS: create Suspense CMP
    if (!books) return <div>Loading...</div>

    if (bookIdToEdit) {
        return (
            <BookEdit
                bookId={bookIdToEdit}
                onBack={() => setBookIdToEdit(null)} />
        )
    }

    return (
        <section className="book-index">
            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />
            }
            {!selectedBookId &&
                <Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                        onBookIdToEdit={onBookIdToEdit}
                    />
                </Fragment>
            }
        </section>
    )
}