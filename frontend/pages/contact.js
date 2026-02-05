import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GoogleMap from '../components/GoogleMap';
import { contactAPI, businessAPI } from '../lib/api';

export default function Contact() {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const res = await businessAPI.get();
        setBusinessInfo(res.data);
      } catch (error) {
        console.error('Error fetching business info:', error);
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await contactAPI.send(formData);
      setStatus({ type: 'success', message: res.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error sending message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact Us - Hardware Boutique</title>
        <meta name="description" content="Get in touch with Hardware Boutique. We're here to help!" />
      </Head>

      <section className="section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">We'd love to hear from you</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
            {/* Contact Information */}
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Get In Touch</h2>
              {businessInfo && (
                <>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Address:</strong><br />
                    {businessInfo.address?.street}<br />
                    {businessInfo.address?.city}, {businessInfo.address?.state} {businessInfo.address?.zip}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Phone:</strong><br />
                    {businessInfo.phone}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Email:</strong><br />
                    {businessInfo.email}
                  </p>
                </>
              )}
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form" style={{ margin: 0 }}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                {status.message && (
                  <div style={{ 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    borderRadius: '4px',
                    backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: status.type === 'success' ? '#155724' : '#721c24',
                  }}>
                    {status.message}
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          {businessInfo?.coordinates && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Find Us</h2>
              <GoogleMap 
                lat={businessInfo.coordinates.lat} 
                lng={businessInfo.coordinates.lng} 
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
