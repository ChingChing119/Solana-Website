import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import "./index.css";

const RPC_URL = "https://api.mainnet-beta.solana.com";

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);

  // --- Fetch SOL balance from mainnet ---
  const fetchBalance = async (address) => {
    try {
      console.log("Fetching balance for:", address);
      const connection = new Connection(RPC_URL, "confirmed");
      const pubkey = new PublicKey(address);
      const lamports = await connection.getBalance(pubkey);
      const sol = lamports / 1e9;
      console.log("SOL balance:", sol);
      setSolBalance(sol);
    } catch (err) {
      console.error("Balance error:", err);
      // Fallback so we at least show 0.000 SOL
      setSolBalance(0);
    }
  };

  // Re-fetch whenever walletAddress changes
  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
    }
  }, [walletAddress]);

  // --- Connect Phantom ---
  const connectWallet = async () => {
    try {
      setConnecting(true);

      const provider = window.solana;
      if (!provider || !provider.isPhantom) {
        alert("Phantom wallet not found. Please install the Phantom extension.");
        setConnecting(false);
        return;
      }

      const resp = await provider.connect();
      const address = resp.publicKey.toString();
      console.log("Connected wallet:", address);
      setWalletAddress(address); // this will trigger fetchBalance in useEffect
    } catch (err) {
      console.error("Connect error:", err);
    } finally {
      setConnecting(false);
    }
  };

  // --- Auto-connect on reload if trusted ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const provider = window.solana;
    if (!provider || !provider.isPhantom) return;

    const handleConnect = (pubkey) => {
      const addr = pubkey.toString();
      console.log("Phantom event connect:", addr);
      setWalletAddress(addr);
    };

    const handleDisconnect = () => {
      console.log("Phantom disconnected");
      setWalletAddress(null);
      setSolBalance(null);
    };

    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);

    provider.connect({ onlyIfTrusted: true }).catch(() => {});

    return () => {
      provider.off("connect", handleConnect);
      provider.off("disconnect", handleDisconnect);
    };
  }, []);

  // --- Other buttons ---
  const handleViewChart = () => {
    window.open("https://dexscreener.com/solana", "_blank", "noopener");
  };

  const handleJoinScroll = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // --- Wallet button label (no "Loading SOL" anymore) ---
  const walletLabel = () => {
    if (!walletAddress) {
      return connecting ? "Connecting..." : "Connect Phantom";
    }
    // If balance not fetched yet, treat it as 0 (still shows a number)
    const value = solBalance ?? 0;
    return `${value.toFixed(3)} SOL`;
  };

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img
              src="/src/assets/AISOL.webp"
              alt="AISol logo"
              className="brand-logo"
            />
            <span className="brand-text">AISol</span>
          </div>

          <div className="topbar-pill">
            <span>AI meets Solana speed ⚡</span>
          </div>

          <div className="topbar-actions">
            <button className="topbar-btn" onClick={handleViewChart}>
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
              className={
                "topbar-btn topbar-btn-wallet" +
                (walletAddress ? " connected" : "")
              }
              onClick={connectWallet}
              disabled={connecting}
            >
              {walletLabel()}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="top">
          <div className="hero-overlay" />
          <div className="hero-ambient">
            <div className="orb orb-purple" />
            <div className="orb orb-green" />
          </div>

          <div className="hero-inner">
            {/* Left card */}
            <div className="glow-card content">
              <div className="badge">
                <span>AI + SOL</span>
                <span>•</span>
                <span>On-chain Brain</span>
              </div>

              <h1 className="title">AISol</h1>
              <p className="subtitle">The Future of AI-Powered Crypto</p>
              <p className="micro">
                Built for speed, memes, and smart automation on the Solana
                ecosystem. One tap to plug AI into the fastest chain.
              </p>

              <div className="btn-row">
                <button
                  className="btn btn-primary glow-btn"
                  onClick={handleJoinScroll}
                >
                  Join the Revolution
                </button>
                <button className="btn btn-secondary" onClick={handleViewChart}>
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

            {/* Right card */}
            <div className="glow-card visual-card">
              <div className="visual-glow" />
              <div className="visual-text">
                <div className="visual-kicker">Solana-grade speed</div>
                <div className="visual-big">
                  Add tokenomics, roadmap &amp; utilities.
                </div>
                <p className="visual-sub">
                  This card can later show a live chart, supply stats, AI feed,
                  or anything else you want on-chain.
                </p>
              </div>
            </div>
          </div>

          {/* GLOWING CROSSED TICKERS */}
          <div className="ticker-stack">
            <div className="ticker-strip ticker-strip-a">
              <div className="ticker-track fast">
                <div className="ticker-content">
                  <span>AISol</span><span>•</span>
                  <span>AI on Solana</span><span>•</span>
                  <span>No lag</span><span>•</span>
                  <span>Smart memes</span><span>•</span>
                  <span>Join the revolution</span><span>•</span>
                  <span>View chart</span><span>•</span>
                  <span>X community</span><span>•</span>
                  <span>Built for speed</span><span>•</span>
                  <span>AISol</span><span>•</span>
                  <span>Solana-grade speed</span><span>•</span>
                </div>
                <div className="ticker-content" aria-hidden="true">
                  <span>AISol</span><span>•</span>
                  <span>AI on Solana</span><span>•</span>
                  <span>No lag</span><span>•</span>
                  <span>Smart memes</span><span>•</span>
                  <span>Join the revolution</span><span>•</span>
                  <span>View chart</span><span>•</span>
                  <span>X community</span><span>•</span>
                  <span>Built for speed</span><span>•</span>
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
                  <span>AI copilots</span><span>•</span>
                  <span>On-chain intelligence</span><span>•</span>
                  <span>Memes + utility</span><span>•</span>
                  <span>Community first</span><span>•</span>
                  <span>Fast. Clean. Fun.</span><span>•</span>
                </div>
                <div className="ticker-content" aria-hidden="true">
                  <span>AISol</span><span>•</span>
                  <span>Solana-grade speed</span><span>•</span>
                  <span>AI copilots</span><span>•</span>
                  <span>On-chain intelligence</span><span>•</span>
                  <span>Memes + utility</span><span>•</span>
                  <span>Community first</span><span>•</span>
                  <span>Fast. Clean. Fun.</span><span>•</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section" id="about">
          <div className="section-inner">
            <h2>What is AISol?</h2>
            <p>
              AISol is an AI-powered crypto concept focused on speed, simplicity
              and on-chain intelligence. Use this section for your mission,
              utility, tokenomics highlights and community narrative.
            </p>

            <div className="grid">
              <div className="panel">
                <h3>Utility</h3>
                <p>
                  Explain what AI features, bots or tools holders get access to,
                  and how it all runs on Solana.
                </p>
              </div>
              <div className="panel">
                <h3>Tokenomics</h3>
                <p>
                  Add supply, allocations, and liquidity notes. Make it clean
                  and transparent for degen eyes.
                </p>
              </div>
              <div className="panel">
                <h3>Roadmap</h3>
                <p>
                  Share the phases: memes, community, listings, bots,
                  dashboards, anything you plan to ship.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
