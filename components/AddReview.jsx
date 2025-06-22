import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function AddReview() {
    const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())
    const { bookId } = useParams

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .thne(book => setBookToEdit(book))
            .catch(err => console.log('Cannot get book:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
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
    return (
        <section className="add-review">
            <h1>Add Review</h1>
            {reviewFileds.map(field => {
                return <label key={field.name} htmlFor={field.name}>
                    {field.name}
                    <input onChange={handleChange} type={field.type} name={field.name} value={reviewToAdd[field.name]} />
                </label>
            })}
            <button onClick={() => {
                ev.preventDefault()
                onSaveBook()
            }}>Save</button>
        </section>
    )

}