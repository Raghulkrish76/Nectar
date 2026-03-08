import { Navbar } from "../components/Navbar";
import "../styles/About.css";

export function AboutPage() {
  return (
    <>
      <Navbar />
      <title>About - Nectar</title>
      {/* MISSION */}
      <section className="mission">
        <p className="section-eyebrow">Our Mission</p>
        <h2 className="section-title">Bridging Tradition and Technology</h2>
        <div className="gold-line"></div>
        <p className="section-body">
          We believe that the rich knowledge embedded in India's traditional healing systems deserves a modern,
          digital home. Nectar was built to make this knowledge searchable, readable, and explorable.
          Connecting curious minds to the plants that have sustained communities for generations.
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="offers">
        <div className="offers-header">
          <p className="section-eyebrow">Platform Features</p>
          <h2 className="section-title">What Nectar Offers</h2>
        </div>
        <div className="cards-grid">
          <div className="offer-card">
            <div className="offer-icon">🔍</div>
            <h3 className="offer-title">Explore Plants</h3>
            <p className="offer-desc">Browse a curated collection of medicinal plants, searchable by name, region, or health benefit.</p>
          </div>
          <div className="offer-card">
            <div className="offer-icon">🔖</div>
            <h3 className="offer-title">Bookmark Favourites</h3>
            <p className="offer-desc">Save the plants you love and revisit them anytime with a single click.</p>
          </div>
          <div className="offer-card">
            <div className="offer-icon">📝</div>
            <h3 className="offer-title">Personal Notes</h3>
            <p className="offer-desc">Add your own research notes to any plant entry and build a personalised herbal knowledge base.</p>
          </div>
          <div className="offer-card">
            <div className="offer-icon">📋</div>
            <h3 className="offer-title">Structured Data</h3>
            <p className="offer-desc">Every plant entry includes its traditional system, region of origin, and medicinal uses.</p>
          </div>
        </div>
      </section>

      {/* WHY NECTAR */}
      <section className="why">
        <div className="why-image-wrap">
          <img src="G:\IT Projects\Nectar\nectar-frontend\src\assets\why-nectar.jpg" alt="Why Nectar" />
        </div>
        <div className="why-text">
          <p className="section-eyebrow">Why We Built This</p>
          <h2 className="section-title">Rooted in Purpose</h2>
          <div className="gold-line"></div>
          <p className="section-body">
            Traditional Indian plant knowledge exists in texts, oral traditions, and local memory,
            but rarely in a form that is easy to navigate digitally. Nectar changes that.
          </p>
          <ul className="why-list">
            <li>
              <div className="check">✓</div>
              <p><strong>Culturally grounded</strong> — content shaped around Ayurveda, Siddha, and Unani traditions.</p>
            </li>
            <li>
              <div className="check">✓</div>
              <p><strong>Open to all </strong> — freely browsable for curious learners, students, and practitioners.</p>
            </li>
            <li>
              <div className="check">✓</div>
              <p><strong>Secure and role-based</strong> — trusted admin controls to ensure quality of all data.</p>
            </li>
            <li>
              <div className="check">✓</div>
              <p><strong>Always growing</strong> — the plant library is continuously curated and expanded.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-number">100<span>+</span></div>
            <div className="stat-label">Plants Documented</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3<span> Systems</span></div>
            <div className="stat-label">Ayurveda · Siddha · Unani</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Knowledge to Explore</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2 className="cta-title">Ready to Explore?</h2>
        <p className="cta-desc">
          Start your journey into the world of traditional Indian medicinal plants.
          Create a free account to bookmark plants and add personal notes.
        </p>
        <div className="cta-buttons">
          <a href="#" className="btn-gold-lg">Explore Plants →</a>
          <a href="#" className="btn-outline-lg">Register Free</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Nect<span>a</span>r</div>
        <p>Digitally preserving India's herbal heritage · Built with care</p>
      </footer>
    </>
  );
}