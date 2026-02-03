import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import { productsAPI, reviewsAPI, businessAPI } from '../lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes, businessRes] = await Promise.all([
          productsAPI.getAll(),
          reviewsAPI.getApproved(),
          businessAPI.get(),
        ]);
        setProducts(productsRes.data.slice(0, 6)); // Show first 6 products
        setReviews(reviewsRes.data.slice(0, 3)); // Show first 3 reviews
        setBusinessInfo(businessRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Hardware Boutique - Your One-Stop Hardware Store</title>
        <meta name="description" content="Hardware Boutique offers quality tools, supplies, and hardware for all your needs." />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>{businessInfo?.name || 'Hardware Boutique'}</h1>
          <p>{businessInfo?.description || 'Your one-stop shop for all hardware needs'}</p>
          <div className="hero-buttons">
            <Link href="/products" className="btn btn-primary">Shop Now</Link>
            <Link href="/about" className="btn btn-secondary">Learn More</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Check out our most popular items</p>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link href="/products" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="reviews-section">
          <div className="container">
            <h2 className="section-title">Customer Reviews</h2>
            <p className="section-subtitle">See what our customers are saying</p>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Visit Our Store Today</h2>
          <p className="section-subtitle">
            Find everything you need for your next project
          </p>
          <Link href="/contact" className="btn btn-primary">Get Directions</Link>
        </div>
      </section>
    </Layout>
  );
}
