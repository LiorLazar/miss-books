import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

export function BookAdd({ defaultQuery }) {
    const [queryToEdit, setQueryToEdit] = useState({ ...defaultQuery })
    const [results, setResults] = useState([])
    const timeoutRef = useRef()

    useEffect(() => {
        if (!queryToEdit.txt) {
            setResults([])
            return
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            bookService.getGoogleBooks(queryToEdit.txt).then(books => {
                setResults(books)
            })
        }, 500)
        return () => clearTimeout(timeoutRef.current)
    }, [queryToEdit])

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
                break;
        }
        setQueryToEdit(prevQuery => ({ ...prevQuery, [field]: value }))
    }
    function onAddGoogleBook(book) {
        bookService.addGoogleBook(book)
            .than(showSuccessMsg('Book added successfully!'))
            .catch(showErrorMsg('Adding Book Failed'))
    }
    const { txt } = queryToEdit
    return (
        <section className="book-add container">
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="txt">Search Book Name:
                    <input onChange={handleChange} value={txt || ""} name="txt" id="txt" type="text" />
                </label>
            </form>
            {results.length > 0 && (
                <ul className="google-books-results">
                    {results.map((book, idx) => (
                        <li key={idx}>{book.volumeInfo.title}
                            <button onClick={() => onAddGoogleBook(book)}>+</button></li>
                    ))}
                </ul>
            )}
        </section>
    )
}