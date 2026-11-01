export const products = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltTShirt: 'sauce-labs-bolt-t-shirt',
  fleeceJacket: 'sauce-labs-fleece-jacket',
  onesie: 'sauce-labs-onesie',
  allTheThingsTShirt: 'test.allthethings()-t-shirt-(red)',
} as const satisfies Record<string, string>;

export type Product = keyof typeof products;

export const productNames = Object.keys(products) as Product[];

export function randomProductNames(count: number): Product[] {
  return [...productNames].sort(() => Math.random() - 0.5).slice(0, count);
}