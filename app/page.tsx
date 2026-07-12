import Link from "next/link";

export default function Home() {
  return (
    <section className="py-20">
      <h1 className="max-w-2xl text-5xl font-semibold tracking-tight">
        Understand video content faster.
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-600">
        Read practical guides and product updates from Clip Insights.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-zinc-950 px-5 py-3 font-medium text-white hover:bg-zinc-700"
        href="/blog"
      >
        Visit the blog
      </Link>
    </section>
  );
}
