export function makePassword(length: number): string {
  let result = '';
  const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
  const characters = '!";#$%&()*+,-./:;<=>?@[]^{|}~';
  const numbers = '0123456789';

  for (let i = 0; i < 1; i++) {
    result += lettersUpper.charAt(Math.floor(Math.random() * lettersUpper.length));
  }

  for (let i = 0; i < 1; i++) {
    result += lettersLower.charAt(Math.floor(Math.random() * lettersLower.length));
  }

  for (let i = 0; i < 1; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let i = 0; i < length - 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
}
