import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookAdd({ defaultQuery, onSetQuery }) {
    const [queryToEdit, setQueryToEdit] = useState({ ...defaultQuery })

    useEffect(() => {
        onSetQuery(queryToEdit)
    }, [queryToEdit])

    const [results, setResults] = useState(null)
    useEffect(() => {
        loadResults()
    }, [])

    function loadResults() {
        bookService.getGoogleBooks().then(books => {
            // console.log(categories)
            setResults(books)
        })
    }

    function handleChange({ target }) {
        console.log(target.name, target.value)
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
    const { txt } = queryToEdit
    return (
        <section className="book-add container">
            <form>
                <label htmlFor="txt">Search Book Name:
                    <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />
                </label>
                <ul>
                    {results && results.map(result =>
                        <li key={result.id}>{result.volumeInfo.title}
                            <button>+</button>
                        </li>
                    )}
                </ul>
            </form>
        </section >
    )
}