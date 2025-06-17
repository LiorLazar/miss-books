import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
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
        </section>
    )
}