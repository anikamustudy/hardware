export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img 
        src={product.image || '/images/placeholder.jpg'} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <p style={{ color: product.inStock ? '#27ae60' : '#e74c3c', marginTop: '0.5rem' }}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
}
