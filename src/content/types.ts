export type Chapter = {
  id: number;
  title: string;
  body: string;
};

export type KandContent = {
  slug: string;
  chapters: Chapter[];
};
