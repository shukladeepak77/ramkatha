import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { kands } from "@/content/kands";
import { getKandPageData, buildKandMetadata } from "@/content/kandPage";
import KandPageBody from "@/components/KandPageBody";

export async function generateStaticParams() {
  return kands.map((kand) => ({ slug: kand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getKandPageData(slug);
  if (!data) return {};
  return buildKandMetadata(data);
}

export default async function KandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getKandPageData(slug);
  if (!data) notFound();

  const index = kands.findIndex((k) => k.slug === slug);
  const prev = index > 0 ? kands[index - 1] : undefined;
  const next = index < kands.length - 1 ? kands[index + 1] : undefined;

  return <KandPageBody data={data} prev={prev} next={next} />;
}
