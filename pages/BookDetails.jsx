import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!book) return <div>Loading...</div>
    const { vendor, speed } = book
    return (
        <section className="book-details container">
            <h1>Book Vendor: {vendor}</h1>
            <h1>Book Speed: {speed}</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            <img src={`../assets/img/${vendor}.png`} alt="Car Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}