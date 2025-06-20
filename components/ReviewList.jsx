export function ReviewList({ reviews, onRemoveReview }) {
    if (!reviews || reviews.length === 0) {
        return <div className="container">No Reviews to this book yet</div>
    }
    return (
        <ul className="reviews-list">
            {reviews.map((review, idx) => (
                <li key={idx}>
                    <strong>{review.fullName}</strong> rated {review.rating} on {review.readAt}
                    <button onClick={() => onRemoveReview(idx)}>Remove</button>
                </li>
            ))}
        </ul>
    )
}