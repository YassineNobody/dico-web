export const mapWordType = (type: string): string => {
  switch (type) {
    case "noun":
      return "Nom";
    case "verb":
      return "Verbe";
    case "adjective":
      return "Adjectif";
    case "adverb":
      return "Adverbe";
    case "preposition":
      return "Préposition";
    case "pronoun":
      return "Pronom";
    case "suffix":
      return "Suffixe";
    default:
      return "Autre";
  }
};
