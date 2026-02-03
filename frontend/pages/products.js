import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getAll();
        setProducts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <Head>
        <title>Products - Hardware Boutique</title>
        <meta name="description" content="Browse our wide selection of hardware tools and supplies." />
      </Head>

      <section className="section">
        <div className="container">
          <h1 className="section-title">Our Products</h1>
          <p className="section-subtitle">Browse our wide selection of quality hardware</p>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button 
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedCategory('all')}
              style={{ color: selectedCategory === 'all' ? 'white' : '#3498db', borderColor: '#3498db' }}
            >
              All Products
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory(category)}
                style={{ color: selectedCategory === category ? 'white' : '#3498db', borderColor: '#3498db' }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
