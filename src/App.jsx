import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "./index.css";

// Use Solana mainnet RPC
const RPC_URL = clusterApiUrl("mainnet-beta");

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [solPrice, setSolPrice] = useState(null);

  // ---------- Fetch SOL balance ----------
  const fetchBalance = async (address) => {
    try {
      const connection = new Connection(RPC_URL, "confirmed");
      const pubkey = new PublicKey(address);
      const lamports = await connection.getBalance(pubkey);
      const sol = lamports / 1e9;
      setSolBalance(sol);
    } catch (err) {
      console.error("Balance error:", err);
      // fallback so you don't see "Loading SOL..." forever
      setSolBalance(0);
    }
  };

  // Whenever walletAddress changes, refetch balance
  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
    }
  }, [walletAddress]);

  // ---------- Connect Phantom ----------
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
      setWalletAddress(address);
      // balance will auto-load via useEffect above
    } catch (err) {
      console.error("Connect error:", err);
    } finally {
      setConnecting(false);
    }
  };

  // ---------- Re-attach Phantom on reload ----------
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.solana || !window.solana.isPhantom) return;

    const provider = window.solana;

    const handleConnect = (pubkey) => {
      const addr = pubkey.toString();
      setWalletAddress(addr);
    };

    const handleDisconnect = () => {
      setWalletAddress(null);
      setSolBalance(null);
    };

    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);

    // if already trusted, connect silently
    provider.connect({ onlyIfTrusted: true }).catch(() => {});

    return () => {
      provider.off("connect", handleConnect);
      provider.off("disconnect", handleDisconnect);
    };
  }, []);

  // ---------- SOL price (CoinGecko) ----------
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        if (data?.solana?.usd) {
          setSolPrice(data.solana.usd);
        }
      } catch (err) {
        console.error("SOL price error:", err);
      }
    };

    fetchPrice();
    const id = setInterval(fetchPrice, 60_000);
    return () => clearInterval(id);
  }, []);

  // ---------- Other buttons ----------
  const handleViewChart = () => {
    // change this later to your real AISol chart link
    window.open("https://dexscreener.com/solana", "_blank", "noopener");
  };

  const handleJoinScroll = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            {solPrice && (
              <span className="topbar-solprice">
                • SOL ${solPrice.toFixed(2)}
              </span>
            )}
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

            {/* Wallet button – now always shows a value once connected */}
            <button
              className={
                "topbar-btn topbar-btn-wallet" +
                (walletAddress ? " connected" : "")
              }
              onClick={connectWallet}
              disabled={connecting}
            >
              {walletAddress
                ? solBalance == null
                  ? "Loading SOL..."
                  : `${solBalance.toFixed(3)} SOL`
                : connecting
                ? "Connecting..."
                : "Connect Phantom"}
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

                {/* duplicate for seamless loop */}
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

                {/* duplicate for seamless loop */}
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
