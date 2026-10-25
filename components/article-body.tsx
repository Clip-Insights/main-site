import type { ReactNode } from "react";
import { MDXContent } from "./mdx-content";
import { headingId } from "@/lib/article";
export function ArticleBody({ code }: { code: string }) { return <div className="prose"><MDXContent code={code} components={{ h2: (props) => <h2 id={headingId(String(props.children))}>{props.children as ReactNode}</h2> }}/></div>; }
