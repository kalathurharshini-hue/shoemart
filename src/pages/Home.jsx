import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const featuredProducts = products.slice(0, 8);

  const categories = [
    "Sneakers",
    "Running Shoes",
    "Sports Shoes",
    "Casual Shoes",
    "Formal Shoes",
    "Boots",
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">👟 SHOE MART</p>

          <h1>Step Into Style</h1>

          <p>
            Discover the perfect shoes for every journey.
            Comfort, quality and style — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn primary">
              Shop Now
            </Link>

            <Link to="/products" className="hero-btn secondary">
              Explore Collection
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
            alt="Featured shoes"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>SHOP BY STYLE</p>
          <h2>Explore Categories</h2>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="category-card"
            >
              <span>
                {category === "Sneakers" && "👟"}
                {category === "Running Shoes" && "🏃"}
                {category === "Sports Shoes" && "⚽"}
                {category === "Casual Shoes" && "👞"}
                {category === "Formal Shoes" && "👔"}
                {category === "Boots" && "🥾"}
              </span>

              <h3>{category}</h3>
              <p>Explore Collection →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-title">
          <p>OUR COLLECTION</p>
          <h2>Featured Shoes</h2>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="center-button">
          <Link to="/products" className="all-products-btn">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;