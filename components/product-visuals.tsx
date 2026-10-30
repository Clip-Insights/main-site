import Image from "next/image";
import styles from "./product-visuals.module.css";

export function LessonPlayer() {
  return <div className={styles.player}>
    <div className={styles.playerHeading}><span aria-hidden="true">▶</span>Gradient descent, explained<span aria-hidden="true">···</span></div>
    <Image src="/product/lesson.svg" width={720} height={405} alt="Gradient descent lesson showing steps down a loss curve"/>
    <div className={styles.playback}><span aria-hidden="true">Ⅱ</span><span>02:14</span><span className={styles.progress}><i/></span><span>08:32</span></div>
  </div>;
}

export function StudyScene() {
  return <figure className={styles.studyScene}>
    <div className={styles.sceneField}/><LessonPlayer/>
    <Image className={styles.extension} src="/product/extension.png" width={720} height={900} sizes="(max-width: 600px) 73vw, (max-width: 1100px) 35vw, 410px" preload alt="Clip Insights beside a lesson: screenshot capture, summaries, key points, chat, and a timestamped personal note"/>
    <figcaption>Your thoughts, right beside the lesson.<small>Current extension · sample study session</small></figcaption>
  </figure>;
}

export function CaptureVisual() {
  return <figure className={styles.captureVisual}>
    <div className={styles.savedFrame}><div className={styles.frameLabel}><span>CAPTURED FROM YOUR VIDEO</span><span>02:14</span></div><Image src="/product/lesson.svg" width={720} height={405} alt="Saved frame showing gradient descent approaching a minimum"/></div>
    <div className={styles.noteDetail}><span>IN YOUR OWN WORDS</span><Image src="/product/note.png" width={600} height={118} sizes="(max-width: 760px) 85vw, 470px" alt="Note at 02:14: Move against the gradient. The learning rate sets the step size."/></div>
    <figcaption>A useful frame. Your explanation. The moment they clicked.</figcaption>
  </figure>;
}

export function PdfPages() {
  return <div className={styles.pdfPages}>
    <Image className={styles.firstPage} src="/product/sample-export.png" width={1191} height={1684} sizes="(max-width: 600px) 55vw, 330px" alt="Actual exported study PDF: summary and key points about gradient descent"/>
    <Image className={styles.secondPage} src="/product/sample-export-page-2.png" width={1191} height={1684} sizes="(max-width: 600px) 50vw, 300px" alt="Second PDF page containing the captured diagram and timestamped note"/>
  </div>;
}
