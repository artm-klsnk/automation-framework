import { expect } from '@playwright/test';
import { parsePriceCents } from '@utils/price';

export type OrderReceipt = {
  orderDate: Date;
  shipToName: string;
  shipToPostalCode: string;
  itemPrices: Record<string, string>;
  itemTotalCents: number;
  taxCents: number;
  totalCents: number;
  closingMessage: string;
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function findLine(lines: string[], pattern: RegExp): string {
  const line = lines.find((candidate) => pattern.test(candidate));
  expect(line, `expected a PDF line matching ${pattern}`).toBeDefined();
  return line!;
}

function parseOrderDate(lines: string[]): Date {
  const line = findLine(lines, /^Order Date /);
  const match = line.match(/^Order Date (\w+) (\d{1,2}), (\d{4}) at (\d{1,2}):(\d{2}) (AM|PM)$/);
  expect(match, `unexpected "Order Date" format: "${line}"`).not.toBeNull();
  const [, monthName, day, year, hour12, minute, meridiem] = match!;

  const monthIndex = MONTH_NAMES.indexOf(monthName);
  expect(monthIndex, `unexpected month name in "Order Date" line: "${line}"`).toBeGreaterThanOrEqual(0);

  let hour = parseInt(hour12, 10) % 12;
  if (meridiem === 'PM') hour += 12;

  return new Date(Number(year), monthIndex, Number(day), hour, Number(minute));
}

function parseShipTo(lines: string[]): { shipToName: string; shipToPostalCode: string } {
  // The PDF text layer renders this heading with letter-spacing: "S H I P TO".
  const shipToIndex = lines.indexOf('S H I P TO');
  expect(shipToIndex, 'expected a "S H I P TO" line in the PDF').toBeGreaterThanOrEqual(0);
  return { shipToName: lines[shipToIndex + 1], shipToPostalCode: lines[shipToIndex + 2] };
}

function parseItemPrices(lines: string[]): Record<string, string> {
  const start = lines.indexOf('DESCRIPTION PRICE') + 1;
  const end = lines.findIndex((line) => /^Item total\b/.test(line));
  expect(start, 'expected a "DESCRIPTION PRICE" line in the PDF').toBeGreaterThan(0);
  expect(end, 'expected an "Item total" line in the PDF').toBeGreaterThan(start);

  return Object.fromEntries(
    lines.slice(start, end).map((line) => {
      const match = line.match(/^(.+) (\$\d+\.\d{2})$/);
      expect(match, `unexpected item line format: "${line}"`).not.toBeNull();
      return [match![1], match![2]];
    })
  );
}

export function parseOrderReceipt(lines: string[]): OrderReceipt {
  return {
    orderDate: parseOrderDate(lines),
    ...parseShipTo(lines),
    itemPrices: parseItemPrices(lines),
    itemTotalCents: parsePriceCents(findLine(lines, /^Item total\b/)),
    taxCents: parsePriceCents(findLine(lines, /^Tax\b/)),
    totalCents: parsePriceCents(findLine(lines, /^Total\b/)),
    closingMessage: findLine(lines, /^Thank you for your order!/),
  };
}
