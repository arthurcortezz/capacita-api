export function TransformConstParamByName(data: string) {
  data = data
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éèêë]/gi, 'e')
    .replace(/[íìîï]/gi, 'i')
    .replace(/[óòõôö]/gi, 'o')
    .replace(/[úùûü]/gi, 'u')
    .replace(/[ç]/gi, 'c');

  return data.toUpperCase().replace(/\s+/g, '_').trim();
}
