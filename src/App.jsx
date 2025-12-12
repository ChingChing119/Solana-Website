import { useState } from 'react';
import './index.css';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [walletError, setWalletError] = useState(null);

  // 🔌 Connect Phantom and load SOL balance
  const handleConnectWallet = async () => {
    try {
      setWalletError(null);
      setConnecting(true);

      const provider = window.solana;

      if (!provider || !provider.isPhantom) {
        setWalletError('Phantom wallet not found');
        setConnecting(false);
        return;
      }

      // Ask Phantom to connect
      const resp = await provider.connect();
      const pubkey = resp.publicKey.toString();
      setWalletAddress(pubkey);

      // Connect to Solana mainnet and fetch balance
      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
      const lamports = await connection.getBalance(new PublicKey(pubkey));
      const sol = lamports / LAMPORTS_PER_SOL;
      setSolBalance(sol);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setWalletError('Failed to connect or fetch balance');
    } finally {
      setConnecting(false);
    }
  };

  const walletButtonLabel = (() => {
    if (connecting) return 'Connecting...';
    if (!walletAddress) return 'Connect Phantom';
    if (solBalance == null) return 'Loading SOL...';
    return `${solBalance.toFixed(3)} SOL`;
  })();

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            {/* make sure this path matches your image */}
            <img src="/src/assets/AISOL.webp" alt="AISol" className="brand-logo" />
            <span className="brand-text">AISol</span>
          </div>

          <div className="topbar-pill">AI meets Solana speed ⚡</div>

          <div className="topbar-actions">
            <button
              className="topbar-btn"
              onClick={() => window.open('https://dexscreener.com/', '_blank')}
            >
              View Chart
            </button>
            <button
              className="topbar-btn"
              onClick={() => window.open('https://x.com/ChingChing_111', '_blank')}
            >
              X Page
            </button>
            <button
              className="topbar-btn topbar-btn-wallet"
              onClick={handleConnectWallet}
            >
              {walletButtonLabel}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="hero">
        <div className="hero-overlay" />
        <div className="hero-ambient">
          <div className="orb orb-purple" />
          <div className="orb orb-green" />
        </div>

        <div className="hero-inner">
          <section className="glow-card content">
            <div className="badge">
              <span>New</span>
              <span>AI-Powered Solana Token</span>
            </div>
            <h1 className="title">AISol</h1>
            <p className="subtitle">The Future of AI-Powered Crypto</p>
            <p className="micro">
              Built for speed, memes, and smart automation on the Solana ecosystem.
            </p>
            <div className="btn-row">
              <button className="btn btn-primary glow-btn">
                Join the Revolution
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => window.open('https://dexscreener.com/', '_blank')}
              >
                View Chart
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => window.open('https://x.com/ChingChing_111', '_blank')}
              >
                X Page
              </button>
            </div>

            {/* Show small error text if Phantom not found or fails */}
            {walletError && (
              <p
                style={{
                  marginTop: '10px',
                  fontSize: '0.85rem',
                  color: 'rgba(255,120,120,0.9)',
                }}
              >
                {walletError}
              </p>
            )}
          </section>

          <aside className="glow-card visual-card">
            <div className="visual-glow" />
            <div className="visual-text">
              <div className="visual-kicker">Solana-grade speed</div>
              <div className="visual-big">Zero-friction AI on-chain</div>
              <div className="visual-sub">
                Add tokenomics, roadmap, utilities and plug AISol into your Solana stack.
              </div>
            </div>
          </aside>
        </div>

        {/* TICKER STACK (keep whatever version you have working now) */}
        <div className="ticker-stack">
          <div className="ticker-strip ticker-strip-a">
            <div className="ticker-track fast">
              <div className="ticker-content">
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
                <span>AI meets Solana speed</span><span>•</span>
                <span>Join the Revolution</span><span>•</span>
                <span>View Chart</span><span>•</span>
                <span>X Community</span><span>•</span>
                <span>Utility</span><span>•</span>
                <span>Tokenomics</span><span>•</span>
                <span>Roadmap</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>Solana-grade speed</span><span>•</span>
              </div>
              <div className="ticker-content" aria-hidden="true">
                <span>AISol</span><span>•</span>
                <span>AI</span><span>•</span>
                <span>Solana</span><span>•</span>
                <span>AI meets Solana speed</span><span>•</span>
                <span>Join the Revolution</span><span>•</span>
                <span>View Chart</span><span>•</span>
                <span>X Community</span><span>•</span>
                <span>Utility</span><span>•</span>
                <span>Tokenomics</span><span>•</span>
                <span>Roadmap</span><span>•</span>
                <span>AISol</span><span>•</span>
                <span>Solana-grade speed</span><span>•</span>
              </div>
            </div>
          </div>

          <div className="ticker-strip ticker-strip-b">
            <div className="ticker-track slow">
              <div className="ticker-content">
                <span>AISol</span><span>•</span>
                <span>Solana-grade speed</span><span>•</span>
                <span>AI Powered</span><span>•</span>
                <span>Memes + Momentum</span><span>•</span>
                <span>On-chain Intelligence</span><span>•</span>
                <span>Community First</span><span>•</span>
                <span>Fast. Clean. Fun.</span><span>•</span>
              </div>
              <div className="ticker-content" aria-hidden="true">
                <span>AISol</span><span>•</span>
                <span>Solana-grade speed</span><span>•</span>
                <span>AI Powered</span><span>•</span>
                <span>Memes + Momentum</span><span>•</span>
                <span>On-chain Intelligence</span><span>•</span>
                <span>Community First</span><span>•</span>
                <span>Fast. Clean. Fun.</span><span>•</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
