export function randomNum(n: number) {
  let value = '';
  for (let i = 0; i < n; i++) {
    value += Math.floor(Math.random() * 10);
  }
  return value;
}