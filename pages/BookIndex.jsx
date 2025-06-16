import { BookFilter } from "../components/BookFilter.jsx"
import { BookList } from "../components/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState('DnFlGN')
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
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
            .catch(err => console.log('err:', err))
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => onSelectedBookId(null)}
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
                        onSelectBookId={onSelectedBookId}
                    />
                </Fragment>
            }
        </section>
    )
}