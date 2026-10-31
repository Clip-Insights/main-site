import { CONTACT_EMAIL } from "@/lib/site";
import { Arrow } from "./icons";
import styles from "./contact-page.module.css";

export function ContactDetails() {
  return <div className={styles.message}>
    <span className={styles.mailIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span>
    <h2>Talk to the team.</h2>
    <p>A product question, a problem, or an idea for what comes next. We’d like to hear from you.</p>
    <a className={`button ${styles.emailButton}`} href={`mailto:${CONTACT_EMAIL}?subject=Hello%20Clip%20Insights`}>Email the team <Arrow/></a>
    <span className={styles.emailAddress}>{CONTACT_EMAIL}</span>
  </div>;
}
