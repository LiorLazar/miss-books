import { BookPreview } from "../components/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                book.listPrice.isOnSale = true
                setBook(book)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!book) return <div>Loading...</div>
    // const { vendor, speed } = book
    return (
        <section className="book-details container">
            <pre>{JSON.stringify(book, null, 2)}</pre>
            {book.listPrice.isOnSale && <span>On Sale</span>}
            <BookPreview book={book} />
            <p>{book.description}</p>

            <section>
                <h4>Authors:</h4>
                <ul>
                    {book.authors.map(author => <li>{author}</li>)}
                </ul>
            </section>

            <p>Published Date: {book.publishedDate}</p>
            <p>Page Count: {book.pageCount}</p>
            <p>Price: {book.listPrice.amount}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}