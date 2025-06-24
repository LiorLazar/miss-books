export function BookPreview({ book }) {
    // console.log(book);

    const { title, thumbnail } = book
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}