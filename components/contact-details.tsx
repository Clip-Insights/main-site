"use client";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
export function ContactDetails() {
  const [message, setMessage] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(CONTACT_EMAIL); setMessage("Email address copied."); }
    catch { setMessage("Copy is unavailable. Select the email address above or use the email link."); }
  }
  return <div><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><button className="copy-button" onClick={copyEmail}>Copy email address</button><p className="copy-status" role="status">{message}</p></div>;
}
