import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { authAPI } from '../../lib/api';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login(credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      if (res.data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin Login - Hardware Boutique</title>
      </Head>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="section-title">Admin Login</h1>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              {error && (
                <div style={{ 
                  padding: '1rem', 
                  marginBottom: '1rem', 
                  borderRadius: '4px',
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                }}>
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@hardwareboutique.com</p>
              <p>Password: admin123</p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Note: Create this admin user in your database to use the admin panel
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
