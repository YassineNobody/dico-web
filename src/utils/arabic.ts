export function removeArabicDiacritics(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/ـ/g, "")
    .trim();
}

export function normalizeArabic(text: string): string {
  return removeArabicDiacritics(text)
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

export function compareArabicAnswer(
  userAnswer: string,
  correctAnswer: string,
): boolean {
  const normalizedUser = userAnswer.trim();
  const normalizedCorrect = correctAnswer.trim();

  const userWithoutHarakat = removeArabicDiacritics(normalizedUser);
  const correctWithoutHarakat = removeArabicDiacritics(normalizedCorrect);

  const userHasHarakat = normalizedUser !== userWithoutHarakat;

  if (userHasHarakat) {
    return normalizedUser === normalizedCorrect;
  }

  return (
    normalizeArabic(userWithoutHarakat) ===
    normalizeArabic(correctWithoutHarakat)
  );
}
