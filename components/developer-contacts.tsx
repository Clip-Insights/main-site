import Image from "next/image";
import { developerContacts } from "@/lib/contacts";
import styles from "./contact-page.module.css";

export function DeveloperContacts() {
  return <ul className={styles.developers} aria-label="Developer contacts">
    {developerContacts.map((person) => <li key={person.linkedin} className={styles.developer}>
      {person.avatar ? <Image src={person.avatar} alt="" width={48} height={48} className={styles.avatar}/> : <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}
      <div className={styles.person}>
        <p className={styles.name}>{person.name}</p>
        <p className={styles.role}>{person.role}</p>
        <div className={styles.socials}>
          {person.email && <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}>Email</a>}
          {person.github && <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on GitHub (opens in a new tab)`}>GitHub ↗</a>}
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn (opens in a new tab)`}>LinkedIn ↗</a>
        </div>
      </div>
    </li>)}
  </ul>;
}
