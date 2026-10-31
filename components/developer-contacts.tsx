import Image from "next/image";
import { developerContacts } from "@/lib/contacts";
import styles from "./contact-page.module.css";

function ProfileIcon({ type }: { type: "email" | "github" | "linkedin" }) {
  if (type === "github") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></> : <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"/></>}
  </svg>;
}

export function DeveloperContacts() {
  return <ul className={styles.developers} aria-label="Clip Insights team">
    {developerContacts.map((person) => <li key={person.linkedin} className={styles.developer}>
      {person.avatar ? <Image src={person.avatar} alt="" width={56} height={56} className={styles.avatar}/> : <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}
      <div className={styles.person}>
        <p className={styles.name}>{person.name}</p>
        <p className={styles.role}>{person.role}</p>
        <div className={styles.socials}>
          {person.email && <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}><ProfileIcon type="email"/>Email</a>}
          {person.github && <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on GitHub (opens in a new tab)`}><ProfileIcon type="github"/>GitHub</a>}
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn (opens in a new tab)`}><ProfileIcon type="linkedin"/>LinkedIn</a>
        </div>
      </div>
    </li>)}
  </ul>;
}
