import type { Metadata } from "next";
import { getKandBySlug } from "@/content/kands";
import { getKandContent } from "@/content/getKandContent";
import type { Chapter } from "@/content/types";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

export type KandPageData = {
  slug: string;
  kand: NonNullable<ReturnType<typeof getKandBySlug>>;
  chapters: Chapter[];
};

export function getKandPageData(slug: string): KandPageData | null {
  const kand = getKandBySlug(slug);
  if (!kand) return null;

  const content = getKandContent(slug);

  return {
    slug,
    kand,
    chapters: content?.chapters ?? [],
  };
}

export function buildKandMetadata(data: KandPageData): Metadata {
  const { kand, slug } = data;
  const url = `${SITE_URL}/kand/${slug}`;

  return {
    title: `${kand.title} — ${kand.subtitle}`,
    description: kand.description,
    alternates: {
      canonical: `/kand/${slug}`,
    },
    openGraph: {
      type: "article",
      url,
      title: kand.title,
      description: kand.description,
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 675, alt: kand.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: kand.title,
      description: kand.description,
      images: [SITE_OG_IMAGE],
    },
  };
}
