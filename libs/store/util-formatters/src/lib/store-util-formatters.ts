export function formatRating(rating = 0): string {
  return `${Math.round(rating * 100) / 10} / 10`;
}
