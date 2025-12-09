import { useEffect, useMemo, useState } from 'react';
import './index.css';
import logo from './assets/AISOL.webp';

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // -------- Phantom Wallet --------
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      setProvider(window.solana);
    }
  }, []);

  useEffect(() => {
    if (!provider) return;

    const handleConnect = (publicKey) => {
      setWalletAddress(publicKey?.toString?.() ?? '');
    };
    const handleDisconnect = () => setWalletAddress('');

    provider.on?.('connect', handleConnect);
    provider.on?.('disconnect', handleDisconnect);

    provider.connect({ onlyIfTrusted: true }).catch(() => {});

    return () => {
      provider.off?.('connect', handleConnect);
      provider.off?.('disconnect', handleDisconnect);
    };
  }, [provider]);

  const shortAddress = useMemo(() => {
    if (!walletAddress) return '';
    return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  }, [walletAddress]);

  const handleWalletClick = async () => {
    if (!provider) {
      window.open('https://phantom.app/', '_blank', 'noreferrer');
      return;
    }

    try {
      setIsConnecting(true);

      if (walletAddress) {
        await provider.disconnect();
        setWalletAddress('');
        return;
      }

      const res = await provider.connect();
      const addr = res?.publicKey?.toString?.() ?? '';
      setWalletAddress(addr);
    } catch (err) {
      console.error('Phantom connect error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img src={logo} alt="AISol logo" className="brand-logo" />
            <span className="brand-text">AISol</span>
          </div>

          <div className="topbar-pill">AI meets Solana speed ⚡</div>

          <div className="topbar-actions">
            <button className="topbar-btn" onClick={() => scrollTo('chart')}>
              View Chart
            </button>

            <a
              className="topbar-btn"
              href="https://x.com/ChingChing_111"
              target="_blank"
              rel="noreferrer"
            >
              X Page
            </a>

            <button
              className={`topbar-btn topbar-btn-wallet ${walletAddress ? 'connected' : ''}`}
              onClick={handleWalletClick}
              disabled={isConnecting}
              title={provider ? 'Connect Phantom' : 'Install Phantom'}
            >
              {isConnecting
                ? 'Connecting...'
                : walletAddress
                ? shortAddress
                : provider
                ? 'Connect Phantom'
                : 'Get Phantom'}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="hero">
        <div className="hero-overlay" />

        {/* ambient moving glow orbs */}
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

              <button className="btn btn-secondary" onClick={() => scrollTo('chart')}>
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
              <div className="visual-sub">Add tokenomics • roadmap • utilities</div>
            </div>
          </div>
        </div>

        {/* SEAMLESS DOUBLE-LAYER TICKER (LOCKED TO HERO BOTTOM) */}
        <div className="ticker-stack">
          {/* STRIP A */}
          <div className="ticker-strip ticker-strip-a">
            <div className="ticker-track">
              <div className="ticker-run">
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
              </div>

              <div className="ticker-run">
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AISol</span><span>•</span>
              </div>
            </div>
          </div>

          {/* STRIP B */}
          <div className="ticker-strip ticker-strip-b">
            <div className="ticker-track ticker-track-slower">
              <div className="ticker-run">
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
                <span>Join the Revolution</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
              </div>

              <div className="ticker-run">
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
                <span>Join the Revolution</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
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
              <p>Add supply, allocations, and liquidity plan.</p>
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
          <p>Add your chart embed or link here when you’re ready.</p>

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
