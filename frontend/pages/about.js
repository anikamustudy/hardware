import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import GoogleMap from '../components/GoogleMap';
import { businessAPI } from '../lib/api';

export default function About() {
  const [businessInfo, setBusinessInfo] = useState(null);

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

  if (!businessInfo) {
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
        <title>About Us - Hardware Boutique</title>
        <meta name="description" content="Learn more about Hardware Boutique and our commitment to quality hardware supplies." />
      </Head>

      <section className="section">
        <div className="container">
          <h1 className="section-title">About {businessInfo.name}</h1>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ marginBottom: '1rem' }}>
              {businessInfo.description}
            </p>
            <p style={{ marginBottom: '1rem' }}>
              At Hardware Boutique, we pride ourselves on providing high-quality hardware tools, 
              supplies, and fittings for both professionals and DIY enthusiasts. With years of 
              experience in the industry, we understand the importance of reliable tools and 
              excellent customer service.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>What We Offer</h2>
            <ul style={{ marginBottom: '2rem', paddingLeft: '2rem' }}>
              <li>Hand and power tools</li>
              <li>Plumbing supplies and fixtures</li>
              <li>Electrical components</li>
              <li>Fasteners and hardware</li>
              <li>Paint and painting supplies</li>
              <li>Safety equipment</li>
              <li>Garden and outdoor tools</li>
            </ul>

            <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Store Hours</h2>
            <div style={{ marginBottom: '2rem' }}>
              {businessInfo.hours && Object.entries(businessInfo.hours).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                  <strong style={{ textTransform: 'capitalize' }}>{day}:</strong>
                  <span>{hours}</span>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Location</h2>
            <p style={{ marginBottom: '1rem' }}>
              {businessInfo.address?.street}<br />
              {businessInfo.address?.city}, {businessInfo.address?.state} {businessInfo.address?.zip}<br />
              {businessInfo.address?.country}
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong> {businessInfo.phone}<br />
              <strong>Email:</strong> {businessInfo.email}
            </p>

            {businessInfo.coordinates && (
              <GoogleMap 
                lat={businessInfo.coordinates.lat} 
                lng={businessInfo.coordinates.lng} 
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
