import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview() {
    const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('Cannot get book:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        // Validate fields are not empty
        if (!reviewToAdd.fullName || !reviewToAdd.rating || !reviewToAdd.readAt) {
            showErrorMsg('All fields are required!')
            return
        }
        bookService.addReview(bookId, reviewToAdd)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setReviewToAdd(prevBook => ({ ...prevBook, [field]: value }))
    }
    const reviewFileds = [
        { name: 'fullName', type: 'text' },
        { name: 'rating', type: 'number' },
        { name: 'readAt', type: 'date' }
    ]
    function onBack() {
        navigate(`/book/${bookId}`)
    }
    return (
        <section className="add-review">
            <h1>Add Review</h1>
            {reviewFileds.map(field => {
                return <label key={field.name} htmlFor={field.name}>
                    {field.name}
                    <input onChange={handleChange} type={field.type} name={field.name} value={reviewToAdd[field.name]}></input>
                </label>
            })}
            <button onClick={onSaveBook}>Save</button>
            <button onClick={onBack}>Back</button>
        </section>
    )

}