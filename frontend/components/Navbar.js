import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            Hardware Boutique
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
