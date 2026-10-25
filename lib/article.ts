export function headingId(value: string) { return value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"); }
export function articleHeadings(raw: string) { return [...raw.matchAll(/^## (.+)$/gm)].map((match) => ({ title: match[1].trim(), id: headingId(match[1]) })); }
export function readingMinutes(raw: string) { return Math.max(1, Math.ceil(raw.trim().split(/\s+/).length / 200)); }
