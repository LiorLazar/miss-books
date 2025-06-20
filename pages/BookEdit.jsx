import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
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
            .catch(err => console.log('Cannot save book:', err))
    }
    const bookFields = [
        { name: 'title', type: 'text' },
        { name: 'publishedDate', type: 'number' },
        { name: 'description', type: 'text' }]

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
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                {bookFields.map(field => {
                    return <label key={field.name} htmlFor={field.name}>
                        {field.name}
                        <input onChange={handleChange} type={field.type} name={field.name} value={bookToEdit[field.name]} />
                    </label>
                })}
                <button onClick={(ev) => {

                    ev.preventDefault()
                    onSaveBook()
                }
                }>Save</button>
            </form>
        </section>
    )


}