import './index.css';

export default function App() {
  const handleJoinClick = () => {
    const section = document.getElementById('more-info');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="hero">
        <div className="content">
          <h1 className="title">AISol</h1>
          <p className="subtitle">The Future of AI-Powered Crypto</p>
          <button className="btn" onClick={handleJoinClick}>
            Join the Revolution
          </button>
        </div>
      </div>

      {/* Section the button scrolls to */}
      <section id="more-info" className="info-section">
        <h2>What is AISol?</h2>
        <p>
          AISol combines cutting-edge AI with next-gen crypto infrastructure to
          power smarter, faster, and more secure decentralized finance.
        </p>
        <p>
          Add your tokenomics, roadmap, whitepaper links, and community info
          here so visitors get the full picture after clicking the button.
        </p>
      </section>
    </>
  );
}
