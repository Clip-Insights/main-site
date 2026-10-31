import styles from "./library-visual.module.css";

function FolderIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9H3Z"/></svg>;
}

function PdfIcon() {
  return <span className={styles.pdfIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h8l4 4v14H6Z M14 3v5h4 M9 12h6 M9 16h6"/></svg><span>PDF</span></span>;
}

const files = [
  { name: "Gradient descent, explained", folder: "Machine learning", size: "1.5 MB" },
  { name: "Understanding the loss function", folder: "Machine learning", size: "1.0 MB" },
  { name: "A practical introduction to JavaScript", folder: "Programming", size: "1.0 MB" },
];

export function LibraryVisual() {
  return <figure className={styles.library} aria-label="Example of the current web library with compact folders and PDF file rows">
    <div className={styles.topbar}><span>YOUR WEB LIBRARY</span><span>app.clipinsights.org</span></div>
    <div className={styles.workspace}>
      <div className={styles.heading}><strong>Your learning library</strong><span>Everything worth coming back to.</span></div>
      <div className={styles.folders}>
        <div className={styles.folder}><span className={styles.folderIcon}><FolderIcon/></span><span><strong>Machine learning</strong><small>2 files · 2.5 MB</small></span></div>
        <div className={styles.folder}><span className={styles.folderIcon}><FolderIcon/></span><span><strong>Programming</strong><small>1 file · 1.0 MB</small></span></div>
      </div>
      <div className={styles.listHeading}><strong>Recently saved</strong><span>3 files</span></div>
      <ul className={styles.files}>{files.map(file => <li key={file.name}>
        <PdfIcon/><div className={styles.fileName}><strong>{file.name}</strong><span><FolderIcon/>{file.folder}</span></div><span className={styles.size}>{file.size}</span>
      </li>)}</ul>
    </div>
    <figcaption>Folders for your subjects. Notes ready to revisit.</figcaption>
  </figure>;
}
