/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Equal, In, Raw } from 'typeorm';

export interface FilterObject {
  [key: string]: any;
}

// Substituir escape codes ("\", "%")...
// https://github.com/typeorm/typeorm/issues/5012#issuecomment-843969810
export const filterEscapeCodes = (element: string): string =>
  (element || '').replace(/[\\%_]/g, '\\$&');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createFilters = (filters): FilterObject => {
  const where: FilterObject = {};
  for (const key in filters) {
    if (filters.hasOwnProperty(key) && filters[key]) {
      const element = filters[key];
      where[key] = generateWhereValue(key, element);
    }
  }

  return where;
};
function generateWhereValue(key, element) {
  const value = Array.isArray(element)
    ? In(element)
    : typeof element === 'object'
    ? generateObjectWhereValue(element)
    : isNaN(element) && key !== 'status'
    ? Raw(
        (alias) =>
          `LOWER(${alias}) LIKE '%${filterEscapeCodes(
            element.toString().toLowerCase(),
          )}%'`,
      )
    : Equal(element);
  return value;
}

function generateObjectWhereValue(element) {
  for (const key in element) {
    if (element.hasOwnProperty(key) && element[key]) {
      element[key] = generateWhereValue(key, element[key]);
    }
  }
  return element;
}
const isNaN = (param): boolean => !Number(param);
