import { AddReview } from "../components/AddReview.jsx"
import { BookPreview } from "../components/BookPreview.jsx"
import { LongText } from "../components/LongText.jsx"
import { bookService } from "../services/book.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('Cannot get book:', err)
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

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

            {book.listPrice.isOnSale && <span>On Sale</span>}
            <BookPreview book={book} />
            <LongText txt={book.description} />

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
            <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
            <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>

            <AddReview />
        </section>
    )
}