import type { KandContent } from "./types";

import balKand from "./data/bal-kand.json";
import ayodhyaKand from "./data/ayodhya-kand.json";
import aranyaKand from "./data/aranya-kand.json";
import kishkindhaKand from "./data/kishkindha-kand.json";
import sundarKand from "./data/sundar-kand.json";
import lankaKand from "./data/lanka-kand.json";
import uttarKand from "./data/uttar-kand.json";

const contentBySlug: Record<string, KandContent> = {
  "bal-kand": balKand as KandContent,
  "ayodhya-kand": ayodhyaKand as KandContent,
  "aranya-kand": aranyaKand as KandContent,
  "kishkindha-kand": kishkindhaKand as KandContent,
  "sundar-kand": sundarKand as KandContent,
  "lanka-kand": lankaKand as KandContent,
  "uttar-kand": uttarKand as KandContent,
};

export function getKandContent(slug: string): KandContent | undefined {
  return contentBySlug[slug];
}
