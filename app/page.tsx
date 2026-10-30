import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductDemo } from "@/components/product-demo";
import { CaptureVisual, PdfPages, StudyScene } from "@/components/product-visuals";
import { Arrow, ChromeIcon } from "@/components/icons";
import { APP_URL, STORE_URL } from "@/lib/site";
import styles from "./landing.module.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };
const questions = [
  ["Can I start without an account?", "Yes. Capture screenshots, write notes, and download PDFs locally without signing in, within guest limits. Sign in for AI features and PDF uploads. Your account’s usage and storage allowances apply."],
  ["Where does Clip Insights work?", "The extension works beside YouTube videos in desktop Chrome. The web app gives your uploaded PDFs a library you can access from another device."],
  ["Does AI work with every video?", "Summaries, key points, and chat require an available transcript and an internet connection. They may use only part of a longer video. AI can make mistakes, so check important details against the original lesson."],
  ["How do I keep my notes?", "Local study material is cleared after five days and is not automatically backed up. Download a PDF to keep your work, or sign in and upload the PDF to your account. Local notes do not automatically sync to the web app."],
  ["Where can I check my plan?", "Open Plans in the web app for current usage and storage allowances. You can start with the guest tools, then choose the account options that suit your study routine."],
] as const;
function InstallLink() { return <a className="button" href={STORE_URL}><ChromeIcon/>Add to Chrome<Arrow/></a>; }

export default function Home() {
  return <div className={styles.landing}>
    <section className={`${styles.hero} ${styles.wrap}`} aria-labelledby="hero-title">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>YOUR YOUTUBE STUDY WORKSPACE</p><h1 id="hero-title">Make every <br className={styles.desktopBreak}/>video worth<br/><span>keeping.</span></h1><p className={styles.intro}>Turn YouTube lessons into study notes. Capture useful frames, work through ideas with AI, and take your notes away as a PDF.</p><div className={styles.heroAction}><InstallLink/></div><p className={styles.guestNote}>Start with notes, screenshots, and PDF export.<br/>No account required, within guest limits.</p></div>
      <StudyScene/>
    </section>
    <nav className={`${styles.workflow} ${styles.wrap}`} aria-label="Explore your study workflow"><a href="#capture"><span>01</span>Capture the moment</a><span aria-hidden="true">→</span><a href="#understand"><span>02</span>Understand the idea</a><span aria-hidden="true">→</span><a href="#keep"><span>03</span>Keep what you learned</a></nav>
    <section className={`${styles.section} ${styles.wrap} ${styles.captureLayout}`} id="capture" aria-labelledby="capture-title">
      <CaptureVisual/>
      <div className={styles.sectionCopy}><p className={styles.eyebrow}>CAPTURE WHAT MATTERS</p><h2 id="capture-title">Keep the frame.<br/>Add your <br className={styles.desktopBreak}/>understanding.</h2><p>A diagram can make an idea click. Save it, then write down what it means to you while the lesson is still fresh.</p><p>Notes and screenshots keep their video timestamps, so the original explanation is easy to find again.</p><Link className="text-link" href="/guides/notes-and-pdf-export">See how capture and notes work <Arrow/></Link><div className={styles.facts}><span>Timestamped notes</span><span>Video screenshots</span></div></div>
    </section>
    <section className={styles.aiSection} id="understand" aria-labelledby="ai-title"><div className={`${styles.wrap} ${styles.aiLayout}`}>
      <div className={styles.sectionCopy}><p className={styles.eyebrow}>WORK THROUGH THE IDEAS</p><h2 id="ai-title">The main ideas.<br/>And the question<br/>that comes next.</h2><p>Get an overview from the video’s transcript. Then ask about the part you want to understand better.</p><p>Why does the learning rate matter? What happens if the steps are too large? Keep the explanation next to the lesson as you work it out.</p><Link className="text-link" href="/guides/ai-and-transcripts">Explore summaries and video chat <Arrow/></Link><small>AI requires sign-in and an available transcript. Check important details against the video.</small></div>
      <figure className={styles.aiVisual}><Image className={styles.summaryImage} src="/product/summary.png" width={720} height={900} sizes="(max-width: 600px) 60vw, 300px" alt="Summary of how gradient descent works and how to choose a step size"/><Image className={styles.chatImage} src="/product/chat.png" width={720} height={900} sizes="(max-width: 600px) 80vw, 360px" alt="Clip Bot explains why a large learning rate can overshoot the minimum"/><figcaption>Current interface · illustrative summary and conversation</figcaption></figure>
    </div></section>
    <section className={`${styles.section} ${styles.wrap} ${styles.exportLayout}`} id="keep" aria-labelledby="export-title">
      <div className={styles.sectionCopy}><p className={styles.eyebrow}>SOMETHING TO COME BACK TO</p><h2 id="export-title">Close the tab.<br/>Keep the lesson.</h2><p>Your screenshots, notes, summaries, and key points come together in one PDF. Review it away from YouTube, share it with a study partner, or keep it for your next revision session.</p><a className={styles.download} href="/sample-notes.pdf" download><span className={styles.pdfLabel}>PDF</span><span>Open the finished example<small>Gradient descent · 2 pages</small></span><Arrow/></a><p className={styles.outputNote}>These pages are an actual export from the extension.</p></div><PdfPages/>
    </section>
    <section className={`${styles.librarySection} ${styles.wrap}`} aria-labelledby="library-title"><figure className={styles.libraryVisual}><div className={styles.libraryHeading}><span>YOUR WEB LIBRARY</span><span>app.clipinsights.org <Arrow/></span></div><Image src="/product/library.png" width={760} height={471} sizes="(max-width: 760px) 90vw, 560px" alt="Sample web-library folders for Machine learning and Programming, with saved PDF file cards"/><figcaption>Current file and folder components · sample library</figcaption></figure><div className={styles.sectionCopy}><p className={styles.eyebrow}>GIVE YOUR NOTES A HOME</p><h2 id="library-title">A library for<br/>what you’ve learned.</h2><p>Sign in to upload your finished PDFs to Clip Insights. Organize them into folders and return to your study documents from the web app.</p><ol className={styles.librarySteps}><li>Export your study PDF.</li><li>Upload it to your account.</li><li>Keep your files organized.</li></ol><a className="text-link" href={APP_URL}>Open your library <Arrow/></a><small>PDF uploads require an account. Local notes do not automatically sync.</small></div></section>
    <section className={`${styles.section} ${styles.wrap}`} id="how-it-works" aria-labelledby="walkthrough-title"><div className={styles.walkthroughHeading}><div><p className={styles.eyebrow}>SEE IT COME TOGETHER</p><h2 id="walkthrough-title">One video.<br/>Something worth keeping.</h2></div><p>Explore the steps of a study session, from the first useful frame to your finished notes.</p></div><ProductDemo/></section>
    <section className={`${styles.faqSection} ${styles.wrap}`} aria-labelledby="faq-title"><div><p className={styles.eyebrow}>A FEW THINGS TO KNOW</p><h2 id="faq-title">Before your<br/>next video.</h2><Link className="text-link" href="/guides">Visit the guides <Arrow/></Link></div><div className={styles.faqList}>{questions.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}<a className={styles.planLink} href={`${APP_URL}/pricing`}>View current plans and allowances <Arrow/></a></div></section>
    <section className={`${styles.closing} ${styles.wrap}`} aria-labelledby="closing-title"><div><p className={styles.eyebrow}>YOUR NEXT VIDEO, WITH A PURPOSE</p><h2 id="closing-title">Keep the part<br/>that clicks.</h2><p>A useful frame. A clearer idea. Notes you can return to.</p></div><div><InstallLink/><p className={styles.guestNote}>For YouTube on desktop Chrome.</p></div></section>
  </div>;
}
