import { BookPreview } from "../components/BookPreview.jsx"
import { LongText } from "../components/LongText.jsx"
import { bookService } from "../services/book.service.js"
import { ReviewList } from "../components/ReviewList.jsx"

const { useParams, useNavigate, Link, Outlet, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [refreshCount, setRefreshCount] = useState(0)
    const { bookId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        loadBook()
    }, [bookId, refreshCount])

    useEffect(() => {
        if (location.state && location.state.refresh) {
            refreshBook()
            navigate(location.pathname, { replace: true, state: {} })
        }
    }, [location])

    function refreshBook() {
        setRefreshCount(count => count + 1)
    }

    function loadBook() {
        bookService.get(bookId)
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

    function onRemoveReview(idx) {
        const updatedBook = { ...book }
        updatedBook.reviews = updatedBook.reviews.filter((_, i) => i !== idx)
        bookService.save(updatedBook)
            .then(() => refreshBook())
            .catch(err => console.log('Cannot remove review:', err))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        // Validate fields are not empty
        if (!reviewToAdd.fullName || !reviewToAdd.rating || !reviewToAdd.readAt) {
            showErrorMsg('All fields are required!')
            return
        }
        bookService.addReview(bookId, reviewToAdd)
            .then(() => navigate(`/book/${bookId}`))
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book')
            })
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

            {/* {book.listPrice.isOnSale && <span>On Sale</span>} */}
            <BookPreview book={book} />
            <LongText txt={book.description} />

            <section>
                <h4>Authors</h4>
                <ul>
                    {book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>

            <p>Published Date: {getPublishDate(book.publishedDate) || ''}</p>
            <p>Page Count: {getPageCountDesc(book.pageCount) || ''}</p>
            {/* <p>Price: <span className={`book-price ${getPriceClass(book.listPrice.amount) || ''}`}>{book.listPrice.amount || ''}</span></p> */}
            <div className="buttons-container">
                <button onClick={onBack}>Back</button>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </div>
            <h1>Reviews:</h1>
            <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
            <button><Link to={`/book/${book.id}/review`}>Add Review</Link></button>
            <Outlet context={onSaveReview} />
        </section>
    )
}