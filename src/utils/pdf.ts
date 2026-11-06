import { readFile } from 'fs/promises';
import type { Download } from '@playwright/test';
import { extractText, getDocumentProxy } from 'unpdf';

export async function readPdfLines(download: Download): Promise<string[]> {
  const buffer = await readFile(await download.path());
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}