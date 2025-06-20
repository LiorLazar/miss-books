import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    const [categories, setCategories] = useState(null)
    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        bookService.getCategories().then(categories => {
            console.log(categories)
            setCategories(categories)
        })
    }

    const [authors, setAuthors] = useState(null)
    useEffect(() => {
        loadAuthors()
    }, [])

    function loadAuthors() {
        bookService.getAuthors().then(authors => {
            console.log(authors)
            setAuthors(authors)
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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, minPrice } = filterByToEdit
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>

            <form>
                <label htmlFor="txt">Search anything</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />
            </form>

            <ul>
                {categories && categories.map(category =>
                    <li onClick={() => {
                        const target = {
                            name: 'txt',
                            value: category
                        }
                        handleChange({ target })
                    }} key={category}>{category}
                    </li>
                )}
            </ul>
            <div>
                <label htmlFor="authors-select">Choose a pet:</label>

                <select name="txt" id="authors-select" onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    {authors && authors.map(author => <option key={author} value={author}>{author}</option>)}
                </select>
            </div>
        </section>
    )
}