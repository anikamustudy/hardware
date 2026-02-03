export default function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="review-card">
      <div className="review-rating">{renderStars(review.rating)}</div>
      <p className="review-comment">"{review.comment}"</p>
      <p className="review-author">- {review.customerName}</p>
      <p style={{ fontSize: '0.875rem', color: '#999' }}>
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
}
