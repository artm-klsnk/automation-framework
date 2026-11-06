import { expect } from '@playwright/test';

export function parsePriceCents(text: string): number {
  const match = text.match(/\$(\d+\.\d{2})/);
  expect(match, `unexpected price format: "${text}"`).not.toBeNull();
  const [, price] = match!;
  return Math.round(parseFloat(price) * 100);
}
