import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    // console.log('BookList books:', books)

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <Link to={book.id}>
                            <button>Details</button>
                        </Link>
                        <Link to={`edit/${book.id}`}>
                            <button>Edit</button>
                        </Link>
                    </section>
                </li>
            )}
        </ul>
    )
}