const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"

export function BookEdit({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {

                setBook(book)
            })
            .catch(err => {
                console.log('err:', err)
            })
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
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook() {
        console.log(book);
        bookService.save(book).then(() => {
            onBack()

        })

    }

    if (!book) return <div>Loading..</div>
    return (

        <section className="book-edit">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
            <form action="">

                {bookFields.map(field => {
                    return <label key={field.name} htmlFor={field.name}>
                        {field.name}
                        <input onChange={handleChange} type={field.type} name={field.name} value={book[field.name]} />
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