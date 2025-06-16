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

    function getPageCountDesc(pageCount) {
        if (pageCount < 100) return `light Reading ${pageCount}`
        if (pageCount > 200) return `Descent Reading ${pageCount}`
        if (pageCount > 500) return `Serious Reading ${pageCount}`
    }

    function getPublishedDate(publishedDate) {
        const diff = new Date().getFullYear() - publishedDate

        if (diff > 20) return `Vintage ${publishedDate}`
        return `New ${publishedDate}`
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
                    {book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>

            <p>Published Date: {getPublishedDate(book.publishedDate)}</p>
            <p>Page Count: {getPageCountDesc(book.pageCount)}</p>
            <p>Price: {book.listPrice.amount}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}