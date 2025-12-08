import './index.css';

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-dot" />
            <span className="brand-text">AISol</span>
          </div>

          <div className="topbar-pill">
            AI meets Solana speed ⚡
          </div>

          <div className="topbar-actions">
            <button
              className="topbar-btn"
              onClick={() => scrollTo('chart')}
            >
              View Chart
            </button>

            <a
              className="topbar-btn topbar-btn-primary"
              href="https://x.com/ChingChing_111"
              target="_blank"
              rel="noreferrer"
            >
              X Page
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="hero">
        <div className="hero-overlay" />
        <div className="hero-ambient">
          <span className="orb orb-green" />
          <span className="orb orb-purple" />
        </div>

        <div className="hero-inner">
          <div className="content glow-card">
            <div className="badge">AI + Solana</div>

            <h1 className="title">AISol</h1>
            <p className="subtitle">The Future of AI-Powered Crypto</p>

            <p className="micro">
              Built for speed, memes, and smart automation on the Solana ecosystem.
            </p>

            <div className="btn-row">
              <button
                className="btn btn-primary glow-btn"
                onClick={() => scrollTo('more-info')}
              >
                Join the Revolution
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => scrollTo('chart')}
              >
                View Chart
              </button>

              <a
                className="btn btn-ghost"
                href="https://x.com/ChingChing_111"
                target="_blank"
                rel="noreferrer"
              >
                X Page
              </a>
            </div>
          </div>

          <div className="visual-card glow-card">
            <div className="visual-glow" />
            <div className="visual-text">
              <div className="visual-kicker">Powered by</div>
              <div className="visual-big">Solana-grade speed</div>
              <div className="visual-sub">
                Add tokenomics • roadmap • utilities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Info Section */}
      <section id="more-info" className="section">
        <div className="section-inner">
          <h2>What is AISol?</h2>
          <p>
            AISol is an AI-powered crypto concept focused on speed, simplicity,
            and on-chain intelligence. Use this section for your mission,
            utility, tokenomics highlights, and community narrative.
          </p>

          <div className="grid">
            <div className="panel">
              <h3>Utility</h3>
              <p>Explain what AI features, bots, or tools you plan to ship.</p>
            </div>
            <div className="panel">
              <h3>Tokenomics</h3>
              <p>Add supply, taxes (if any), allocations, and liquidity plan.</p>
            </div>
            <div className="panel">
              <h3>Roadmap</h3>
              <p>Phase 1 memes → Phase 2 product → Phase 3 domination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section id="chart" className="section section-alt">
        <div className="section-inner">
          <h2>Chart</h2>
          <p>
            Add your chart embed or link here when you’re ready.
          </p>

          <div className="chart-placeholder">
            <div className="chart-line" />
            <div className="chart-line" />
            <div className="chart-line" />
            <span>Chart embed goes here</span>
          </div>
        </div>
      </section>
    </>
  );
}
