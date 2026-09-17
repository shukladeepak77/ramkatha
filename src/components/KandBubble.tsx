import Link from "next/link";
import type { Kand } from "@/content/kands";
import { bubbleColors, bubbleStyle } from "@/lib/bubble";

export default function KandBubble({
  kand,
  active = false,
  compact = false,
  tiny = false,
  chip = false,
}: {
  kand: Kand;
  active?: boolean;
  compact?: boolean;
  tiny?: boolean;
  chip?: boolean;
}) {
  const color = bubbleColors[(kand.order - 1) % bubbleColors.length];

  if (chip) {
    return (
      <Link
        href={`/kand/${kand.slug}`}
        style={bubbleStyle(color, active)}
        className="font-devanagari relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
      >
        {kand.order}. {kand.title}
      </Link>
    );
  }

  if (tiny) {
    return (
      <Link
        href={`/kand/${kand.slug}`}
        style={bubbleStyle(color, active)}
        className="group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:px-3.5 sm:py-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent"
        />
        <span className="font-devanagari relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-extrabold text-white ring-1 ring-white/40">
          {kand.order}
        </span>
        <span className="font-devanagari relative whitespace-nowrap text-sm font-bold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] sm:text-base">
          {kand.title}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/kand/${kand.slug}`}
      style={bubbleStyle(color, active)}
      className={
        compact
          ? "group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          : "group relative flex items-center gap-4 overflow-hidden rounded-3xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:px-6 sm:py-5"
      }
    >
      <span
        aria-hidden="true"
        className={
          compact
            ? "pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/40 to-transparent"
            : "pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/40 to-transparent"
        }
      />
      <span
        className={
          compact
            ? "font-devanagari relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold text-white ring-1 ring-white/40"
            : "font-devanagari relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg font-extrabold text-white ring-1 ring-white/40"
        }
      >
        {kand.order}
      </span>
      <span className="relative min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/75">
          {kand.subtitle}
        </span>
        <span
          className={
            compact
              ? "font-devanagari block truncate text-lg font-extrabold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]"
              : "font-devanagari block truncate text-2xl font-extrabold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] sm:text-[1.7rem]"
          }
        >
          {kand.title}
        </span>
      </span>
    </Link>
  );
}
