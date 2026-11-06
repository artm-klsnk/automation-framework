export function parsePriceCents(text: string): number {
  const [, price] = text.match(/\$(\d+\.\d{2})/)!;
  return Math.round(parseFloat(price) * 100);
}