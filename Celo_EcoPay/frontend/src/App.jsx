import React from 'react';
import './App.css';

// Component for the navigation bar
const Navbar = () => (
  <header className="navbar">
    <div className="navbar-logo">
      <span className="logo-icon">🌿</span>
      <span className="logo-text">Celo EcoPay</span>
    </div>
    <nav className="navbar-links">
      <a href="#features">Features</a>
      <a href="#how-it-works">How it Works</a>
      <a href="#ecosystem">Ecosystem</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div className="navbar-actions">
      <a href="#" className="nav-log-in">Log In</a>
      <button className="nav-get-started">Get Started</button>
    </div>
  </header>
);

// Component for a single Feature Highlight card
const FeatureCard = ({ icon, title }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <p>{title}</p>
  </div>
);

// Component for a single Eco Impact Stat
const StatCard = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);


function App() {
  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">Sustainable</p>
          <h1>
            <strong>Blockchain Payments</strong> for a Greener Future
          </h1>
          <p className="hero-description">
            Celo EcoPay combines the power of Celo's **carbon-negative** blockchain with easy payment solutions, helping you make eco-friendly financial choices every day.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Download App</button>
            <button className="btn btn-secondary">
              <span className="watch-icon"></span> Watch Demo
            </button>
          </div>
          <div className="hero-users">
            {/* Placeholder for user avatars */}
            <div className="avatars-placeholder">👥</div>
            Joined by **10,000+** eco-conscious users
          </div>
        </div>
        <div className="hero-image-container">
          {/* Replace with an actual image source in a real app */}
          <div className="hero-image-placeholder"></div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="feature-section">
        <p className="section-title">SECTION</p>
        <h2>Feature Highlights</h2>
        <p className="section-subtitle">
          Discover how Celo EcoPay is transforming blockchain payments while protecting our planet
        </p>
        <div className="feature-grid">
          <FeatureCard icon="🗱" title="Carbon-Negative" />
          <FeatureCard icon="🗲" title="Micro-Payments" />
          <FeatureCard icon="⚡" title="Energy Efficient" />
        </div>
      </section>

      {/* Eco Impact Stats Section */}
      <section className="impact-section">
        <h2 className="impact-title">Eco Impact Stats</h2>
        <div className="stats-container">
          <StatCard value="75,000+" label="Trees planted" />
          <StatCard value="125 tons" label="CO2 offset monthly" />
          <StatCard value="99.9%" label="Energy reduction" />
          <StatCard value="$2.5M" label="To eco projects" />
        </div>
        <a href="#" className="view-report-link">
            △ View Full Impact Report
        </a>
      </section>

      {/* You would continue with more sections here */}
    </div>
  );
}

export default App;