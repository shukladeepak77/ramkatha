import Link from "next/link";
import type { Kand } from "@/content/kands";
import type { KandPageData } from "@/content/kandPage";
import HeroBanner from "@/components/HeroBanner";
import { SITE_URL } from "@/lib/site";

export default function KandPageBody({
  data,
  prev,
  next,
}: {
  data: KandPageData;
  prev?: Kand;
  next?: Kand;
}) {
  const { slug, kand, chapters } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: kand.title,
    description: kand.description,
    position: kand.order,
    url: `${SITE_URL}/kand/${slug}`,
    isPartOf: {
      "@type": "Book",
      name: "श्रीरामकथा",
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner
        eyebrow={kand.subtitle}
        title={kand.title}
        description={kand.description}
      />

      <div className="mt-8 flex flex-col gap-6">
        {chapters.map((chapter) => (
          <article
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="rounded-[24px] border border-border-muted bg-surface p-5 shadow-[var(--shadow)] sm:p-7"
          >
            <h2 className="font-devanagari text-xl font-bold text-foreground sm:text-2xl">
              {chapter.id}. {chapter.title}
            </h2>
            <div className="font-devanagari mt-4 space-y-4 text-base leading-relaxed text-foreground/90 whitespace-pre-line sm:text-[1.05rem]">
              {chapter.body}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/kand/${prev.slug}`}
            className="font-devanagari rounded-full border border-border-muted bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/kand/${next.slug}`}
            className="font-devanagari rounded-full border border-border-muted bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
