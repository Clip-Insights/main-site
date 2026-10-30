"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrow } from "./icons";
import { PdfPages } from "./product-visuals";
import styles from "./product-demo.module.css";

const stages = [
  {
    label: "Capture", title: "Keep the moment that matters.",
    description: "Save a useful frame and put the explanation in your own words. Each note keeps its place in the video.",
    image: "extension.png", alt: "Current extension with a captured frame and timestamped note",
    detail: "Screenshots + timestamped notes",
  },
  {
    label: "Understand", title: "Give the ideas a second look.",
    description: "Start with a summary and key points from the available transcript. Ask a follow-up question when something needs more explanation.",
    image: "summary.png", alt: "Current summary view explaining gradient descent and learning rate",
    detail: "AI requires sign-in and an available transcript.",
  },
  {
    label: "Keep", title: "Take the useful parts with you.",
    description: "Bring your screenshots, notes, and generated insights together as a PDF you can open whenever you need it.",
    image: null, alt: "", detail: "Actual PDF output from this sample session",
  },
] as const;

export function ProductDemo() {
  const [selected, setSelected] = useState(0);
  return <div className={styles.demo}>
    <div className={styles.tabs} role="tablist" aria-label="Explore a study session">
      {stages.map((stage, index) => <button key={stage.label} id={`study-tab-${index}`} role="tab" type="button"
        aria-selected={selected === index} aria-controls={`study-panel-${index}`} tabIndex={selected === index ? 0 : -1}
        onClick={() => setSelected(index)} onKeyDown={(event) => {
          const next = event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1
            : event.key === "ArrowRight" ? (index + 1) % stages.length
            : event.key === "ArrowLeft" ? (index + stages.length - 1) % stages.length : null;
          if (next !== null) {
            event.preventDefault();
            setSelected(next);
            document.getElementById(`study-tab-${next}`)?.focus();
          }
        }}><span>0{index + 1}</span>{stage.label}<Arrow/></button>)}
    </div>
    {stages.map((stage, index) => <div key={stage.label} className={styles.panel} hidden={selected !== index}
      id={`study-panel-${index}`} role="tabpanel" aria-labelledby={`study-tab-${index}`} tabIndex={0}>
      <div className={styles.copy}>
        <p className={styles.kicker}>ONE LESSON. SOMETHING TO BUILD ON.</p>
        <h3>{stage.title}</h3><p>{stage.description}</p>
        {index === 2
          ? <a className="text-link" href="/sample-notes.pdf" download>Download the sample PDF <Arrow/></a>
          : <a className="text-link" href={index === 0 ? "/guides/notes-and-pdf-export" : "/guides/ai-and-transcripts"}>Explore the guide <Arrow/></a>}
        <small>{stage.detail}</small>
      </div>
      <div className={styles.visual}>{stage.image
        ? <Image src={`/product/${stage.image}`} width={720} height={900} sizes="(max-width: 600px) 80vw, 330px" alt={stage.alt}/>
        : <PdfPages/>}</div>
    </div>)}
    <p className={styles.caption}>Explore the current interface with an example lesson. Sample notes and AI responses are illustrative.</p>
  </div>;
}
