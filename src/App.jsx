import { ArrowRight, HeartHandshake, Lightbulb, MessageCircle } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Share perspectives",
    text: "Give each family member space to explain how they feel.",
  },
  {
    icon: HeartHandshake,
    title: "Find common ground",
    text: "Focus on understanding before trying to solve the disagreement.",
  },
  {
    icon: Lightbulb,
    title: "Build a next step",
    text: "Turn the discussion into one clear and respectful agreement.",
  },
];

export default function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="WASL home">
          <span className="brand-mark">W</span>
          <span>WASL</span>
        </a>

        <button className="text-button" type="button">
          About the idea
        </button>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">A family communication project</div>
        <h1>Better conversations start with feeling heard.</h1>
        <p className="hero-copy">
          WASL is an early concept for helping families slow down, understand both
          sides, and agree on one respectful step forward.
        </p>

        <button className="primary-button" type="button">
          Explore the concept
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>

      <section className="features" aria-label="WASL concept features">
        {features.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <div className="icon-box">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="prototype-note">
        <div>
          <span className="status-dot" />
          Version 1: interface concept
        </div>
        <p>
          This starter version contains the visual direction only. Accounts,
          conversations, analysis, translations, and deployment features will be
          added in later versions.
        </p>
      </section>
    </main>
  );
}
