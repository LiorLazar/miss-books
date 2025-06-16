import { BookPreview } from "../components/BookPreview.jsx"
import { LongText } from "../components/LongText.jsx"
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
        if (pageCount > 500) return `Serious Reading ${pageCount}`
        if (pageCount > 200) return `Descent Reading ${pageCount}`
        if (pageCount < 100) return `Light Reading ${pageCount}`
    }

    function getPublishDate(publishedDate) {
        const diff = new Date().getFullYear() - publishedDate

        if (diff > 10) return `Vintage ${publishedDate}`
        else return `New ${publishedDate}`

    }

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'

    }
    //     amount > 150 - red
    // - amount < 20 - gree

    if (!book) return <div>Loading...</div>
    // const { vendor, speed } = book
    return (
        <section className="book-details container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

            {book.listPrice.isOnSale && <span>On Sale</span>}
            <BookPreview book={book} />
            <LongText txt={book.description} />
            {/* <p>{book.description}</p> */}

            <section>
                <h4>Authors</h4>
                <ul>
                    {book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>

            <p>Published Date: {getPublishDate(book.publishedDate)}</p>
            <p>Page Count: {getPageCountDesc(book.pageCount)}</p>
            <p>Price: <span className={`book-price ${getPriceClass(book.listPrice.amount)}`}>{book.listPrice.amount}</span></p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}