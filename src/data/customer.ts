export type CustomerInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

function randomAlphaString(length: number): string {
  return Array.from({ length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
}

function randomDigitString(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export function randomCustomerInfo(): CustomerInfo {
  return {
    firstName: randomAlphaString(6),
    lastName: randomAlphaString(8),
    postalCode: randomDigitString(5),
  };
}
