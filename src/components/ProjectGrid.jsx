import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ProjectGrid({ projects }) {
  return (
    <motion.ul
      className="project-grid"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {projects.map((p) => (
        <motion.li key={p.href} variants={item} className="project-card">
          <a href={p.href} className="card-link">
            <div className="img-wrap">
              <img src={p.cover} alt={p.title} loading="lazy" />
            </div>
            <figcaption className="caption">
              <span className="caption-title">{p.title}</span>
              {p.tagline && <span className="caption-sub">{p.tagline}</span>}
            </figcaption>
          </a>
        </motion.li>
      ))}

      <style>{`
        .project-grid {
          list-style: none;
          margin: 1em 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2vw;
          width: 100%;
        }
        @media (max-width: 720px) {
          .project-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .card-link {
          display: block;
          color: inherit;
        }
        .img-wrap {
          position: relative;
          width: 100%;
          height: 27.2vw;
          overflow: hidden;
          background: #111;
        }
        @media (max-width: 720px) {
          .img-wrap { height: 60vw; }
        }
        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.5s ease;
          filter: brightness(0.9);
        }
        .card-link:hover .img-wrap img {
          transform: scale(1.03);
          filter: brightness(1);
        }
        .caption {
          display: flex;
          flex-direction: column;
          gap: 0.25em;
          margin-top: 0.9em;
          text-align: left;
        }
        .caption-title {
          font-family: var(--font-serif);
          font-size: 1.26em;
          font-weight: 700;
          color: var(--fg);
          line-height: 1.3;
        }
        .caption-sub {
          font-family: var(--font-serif);
          font-size: 1em;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.5;
        }
        .card-link:hover .caption-title {
          color: var(--accent);
        }
      `}</style>
    </motion.ul>
  );
}
