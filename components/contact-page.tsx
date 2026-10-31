import Link from "next/link";
import { ContactDetails } from "./contact-details";
import { DeveloperContacts } from "./developer-contacts";
import { CONTACT_EMAIL } from "@/lib/site";
import { Arrow } from "./icons";
import styles from "./contact-page.module.css";

export function ContactPage({ title, description }: { title: string; description: string }) {
  return <div className={`container ${styles.page}`}>
    <header className={styles.heading}>
      <p className="eyebrow">CONTACT US</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
    <section className={styles.helpLayout} aria-label="Get in touch">
      <ContactDetails/>
      <div className={styles.resources}>
        <Link href="/guides" className={styles.resource}>
          <span className={styles.resourceIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v15M3 4h5a4 4 0 0 1 4 3 4 4 0 0 1 4-3h5v14h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z"/></svg></span>
          <span><h2>Find a quick answer</h2><p>Get started, capture notes and make the most of your study tools.</p><span className={styles.resourceAction}>Browse the guides <Arrow/></span></span>
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}?subject=Clip%20Insights%20account%20or%20privacy%20request`} className={styles.resource}>
          <span className={styles.resourceIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m12 3 8 3v5c0 5-8 10-8 10S4 16 4 11V6z"/><path d="m8.5 11.5 2.5 2.5 4.5-5"/></svg></span>
          <span><h2>Your account & privacy</h2><p>Need help with your account or a request about your data?</p><span className={styles.resourceAction}>Get in touch <Arrow/></span></span>
        </a>
      </div>
    </section>
    <section className={styles.team} aria-labelledby="contact-team-heading">
      <header className={styles.teamHeading}><h2 id="contact-team-heading">The team behind Clip Insights</h2><p>Five developers, one shared project. Meet the people who build Clip Insights.</p></header>
      <DeveloperContacts/>
    </section>
  </div>;
}
