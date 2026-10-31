export const products = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltTShirt: 'sauce-labs-bolt-t-shirt',
  fleeceJacket: 'sauce-labs-fleece-jacket',
  onesie: 'sauce-labs-onesie',
  allTheThingsTShirt: 'test.allthethings()-t-shirt-(red)',
} as const satisfies Record<string, string>;

export function randomProductNames(count: number): (keyof typeof products)[] {
  const names = Object.keys(products) as (keyof typeof products)[];
  return [...names].sort(() => Math.random() - 0.5).slice(0, count);
}

export function randomProductName(): keyof typeof products {
  return randomProductNames(1)[0];
}