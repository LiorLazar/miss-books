import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId, onBookIdToEdit }) {

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={BookIndex.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                        <button onClick={() => onBookIdToEdit(book.id)}>
                            Edit
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}