export type Kand = {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  youtubeId?: string;
};

export const kands: Kand[] = [
  {
    slug: "bal-kand",
    order: 1,
    title: "बालकाण्ड",
    subtitle: "प्रथम सोपान",
    description:
      "शिव-पार्वती संवाद, श्रीराम जन्म, बाल-लीला एवं श्रीसीता स्वयंवर की कथा।",
  },
  {
    slug: "ayodhya-kand",
    order: 2,
    title: "अयोध्याकाण्ड",
    subtitle: "द्वितीय सोपान",
    description: "राज्याभिषेक की तैयारी, वनगमन एवं भरत मिलाप की कथा।",
  },
  {
    slug: "aranya-kand",
    order: 3,
    title: "अरण्यकाण्ड",
    subtitle: "तृतीय सोपान",
    description: "वनवास, शूर्पणखा प्रसंग एवं माता सीता हरण की कथा।",
  },
  {
    slug: "kishkindha-kand",
    order: 4,
    title: "किष्किन्धाकाण्ड",
    subtitle: "चतुर्थ सोपान",
    description: "सुग्रीव मित्रता, बालि वध एवं वानर सेना संगठन की कथा।",
  },
  {
    slug: "sundar-kand",
    order: 5,
    title: "सुन्दरकाण्ड",
    subtitle: "पञ्चम सोपान",
    description: "हनुमानजी का लंका गमन, सीता माता से भेंट एवं लंका दहन की कथा।",
  },
  {
    slug: "lanka-kand",
    order: 6,
    title: "लंकाकाण्ड",
    subtitle: "षष्ठ सोपान",
    description: "सेतु बंधन, राम-रावण युद्ध एवं विजय की कथा।",
  },
  {
    slug: "uttar-kand",
    order: 7,
    title: "उत्तरकाण्ड",
    subtitle: "सप्तम सोपान",
    description: "अयोध्या वापसी, राज्याभिषेक एवं रामराज्य की कथा।",
  },
];

export function getKandBySlug(slug: string): Kand | undefined {
  return kands.find((k) => k.slug === slug);
}
