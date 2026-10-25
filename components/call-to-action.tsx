import { STORE_URL } from "@/lib/site";
import { ChromeIcon, Arrow } from "./icons";
export function CallToAction() {
  return <section className="closing-cta container"><div><p className="eyebrow">YOUR NEXT VIDEO, WITH A PURPOSE</p><h2>Keep the part<br/>that clicks.</h2><p>Make room for the ideas you want to return to.</p></div><div><a className="button" href={STORE_URL}><ChromeIcon/>Add to Chrome<Arrow/></a><p className="small-note">For YouTube on desktop Chrome.</p></div></section>;
}
