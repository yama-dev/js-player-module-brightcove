export function parseNumber(num: number|string): string {
  const value = typeof num === 'number' ? String(num) : num;

  if (Number(value) < 10 && value.length < 2) return '0' + value;
  return value;
}

export function pad(n: number|string, width: number, z: string): string {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function toFixedNumber(num: number|string, digits: number, base?: number): number {
  const pow = Math.pow(base || 10, digits);
  return Math.round(Number(num) * pow) / pow;
}
