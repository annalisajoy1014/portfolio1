import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function readFullscreenParam() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("fullscreen") === "1";
}

export default function StoryEmbed({ src, title }) {
  const iframeRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(readFullscreenParam);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const markLoaded = () => {
      if (!cancelled) setLoaded(true);
    };

    try {
      if (iframe.contentDocument?.readyState === "complete") {
        markLoaded();
      }
    } catch {
      // cross-origin — wait for onLoad event instead
    }

    iframe.addEventListener("load", markLoaded);
    const safety = setTimeout(markLoaded, 2500);

    return () => {
      cancelled = true;
      iframe.removeEventListener("load", markLoaded);
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const restart = () => {
    if (iframeRef.current) {
      setLoaded(false);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className={`story-embed ${fullscreen ? "is-fullscreen" : ""}`}>
      <div className="controls">
        <button onClick={() => setFullscreen((v) => !v)}>
          {fullscreen ? "Exit fullscreen" : "Play fullscreen"}
        </button>
        <button onClick={restart}>Restart</button>
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Loading story…
          </motion.div>
        )}
      </AnimatePresence>

      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="autoplay"
      />

      <style>{`
        .story-embed {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          background: #0f0f0f;
        }
        .story-embed.is-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 1000;
          aspect-ratio: auto;
          border-radius: 0;
        }
        .story-embed iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
        .controls {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: flex;
          gap: 0.5rem;
          z-index: 3;
        }
        .controls button {
          font-family: var(--font-serif);
          font-size: 0.85em;
          padding: 0.4rem 0.7rem;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          cursor: pointer;
        }
        .controls button:hover {
          background: rgba(0, 0, 0, 0.85);
        }
        .loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-serif);
          font-size: 0.95em;
          letter-spacing: 0.05em;
          z-index: 2;
          pointer-events: none;
          background: rgba(15, 15, 15, 0.9);
        }
      `}</style>
    </div>
  );
}
