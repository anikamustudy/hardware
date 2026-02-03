import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { productsAPI, reviewsAPI, businessAPI } from '../../lib/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', category: '', image: '', inStock: true, quantity: 0
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, reviewsRes, businessRes] = await Promise.all([
        productsAPI.getAll(),
        reviewsAPI.getAll(),
        businessAPI.get(),
      ]);
      setProducts(productsRes.data);
      setReviews(reviewsRes.data);
      setBusinessInfo(businessRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productForm);
      } else {
        await productsAPI.create(productForm);
      }
      setProductForm({ name: '', description: '', price: '', category: '', image: '', inStock: true, quantity: 0 });
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      alert('Error saving product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm(product);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsAPI.delete(id);
      fetchData();
    } catch (error) {
      alert('Error deleting product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleApproveReview = async (id) => {
    try {
      await reviewsAPI.approve(id);
      fetchData();
    } catch (error) {
      alert('Error approving review: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewsAPI.delete(id);
      fetchData();
    } catch (error) {
      alert('Error deleting review: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container section">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard - Hardware Boutique</title>
      </Head>

      <section className="admin-panel section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>

          <div className="admin-nav">
            <button 
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={activeTab === 'business' ? 'active' : ''}
              onClick={() => setActiveTab('business')}
            >
              Business Info
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit} style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={productForm.quantity}
                      onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    />
                    In Stock
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({ name: '', description: '', price: '', category: '', image: '', inStock: true, quantity: 0 });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{ marginBottom: '1rem' }}>Products List</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                      <td>
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="btn btn-primary"
                          style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Reviews Management</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.customerName}</td>
                      <td>{'⭐'.repeat(review.rating)}</td>
                      <td>{review.comment.substring(0, 50)}...</td>
                      <td>{new Date(review.date).toLocaleDateString()}</td>
                      <td>{review.approved ? 'Approved' : 'Pending'}</td>
                      <td>
                        {!review.approved && (
                          <button 
                            onClick={() => handleApproveReview(review._id)}
                            className="btn btn-primary"
                            style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteReview(review._id)}
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Business Info Tab */}
          {activeTab === 'business' && businessInfo && (
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Business Information</h2>
              <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
                <p><strong>Name:</strong> {businessInfo.name}</p>
                <p><strong>Description:</strong> {businessInfo.description}</p>
                <p><strong>Address:</strong> {businessInfo.address?.street}, {businessInfo.address?.city}</p>
                <p><strong>Phone:</strong> {businessInfo.phone}</p>
                <p><strong>Email:</strong> {businessInfo.email}</p>
                <p style={{ marginTop: '1rem', color: '#666' }}>
                  Note: Business info editing will be implemented in a future update
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
