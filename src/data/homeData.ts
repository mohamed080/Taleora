export type ValueItem = {
  title: string;
  text: string;
  icon: string;
};

export type BookItem = {
  title: string;
  author: string;
  level: string;
  color: string;
};

export const navLinks = ["home", "books", "authors", "community", "about"];

export const values: ValueItem[] = [
  {
    title: "Life Lessons",
    text: "Stories and role models that build kindness, confidence, and curiosity.",
    icon: "??",
  },
  {
    title: "Safe Space",
    text: "Child-friendly picks reviewed by parents and educators.",
    icon: "???",
  },
  {
    title: "Learning Through Fun",
    text: "Interactive reading paths that feel playful, not forced.",
    icon: "??",
  },
];

export const featuredBooks: BookItem[] = [
  {
    title: "The Kindness Ladder",
    author: "Emma Hart",
    level: "Ages 5-7",
    color: "from-orange-300 to-pink-300",
  },
  {
    title: "Captain Curiosity",
    author: "Noah Brooks",
    level: "Ages 7-9",
    color: "from-cyan-300 to-blue-300",
  },
  {
    title: "Moonlight Makers",
    author: "Zara Fields",
    level: "Ages 8-10",
    color: "from-lime-300 to-emerald-300",
  },
];

export const fictionBooks: BookItem[] = [
  {
    title: "Magic Forest Club",
    author: "S. Rivera",
    level: "Chapter Book",
    color: "from-rose-300 to-orange-300",
  },
  {
    title: "The Secret Kite",
    author: "L. Benson",
    level: "Beginner Reader",
    color: "from-yellow-300 to-amber-300",
  },
];

export const lifeBooks: BookItem[] = [
  {
    title: "My Brave Choices",
    author: "D. Monroe",
    level: "Social Growth",
    color: "from-sky-300 to-cyan-300",
  },
  {
    title: "Helping Hands",
    author: "K. Ahmed",
    level: "Family Values",
    color: "from-fuchsia-300 to-pink-300",
  },
];
