/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {AndInterface, ConditionalInterface} from "../../interfaces/conditional.interface";

export const createFiltersQueryBuilder = (filters, conditionals: ConditionalInterface): string => {
  let where = '';
  if (filters) {
    for (const key in conditionals) {
      if (Object.prototype.hasOwnProperty.call(conditionals, key)) {
        if (key === 'or' && conditionals[key].length) {
          const element: string[] = conditionals.or;
          where = '(';
          where += element.map((item) => `${item} like :description`).join(' OR ');
          where += ')';
        }
        if (key === 'and') {
          const element: AndInterface[] = conditionals[key];
          const elementFiltereds: AndInterface[] = element.filter((el) => filters[el.value]);

          where += elementFiltereds.length && conditionals.or.length ? ' AND ' : '';
          where += elementFiltereds
            .map((item) => {
              if (item.operator === 'in') {
                return `${item.key}  in ( :${item.value} )`;
              }
              const operator = isNaN(filters[item.value]) ? 'like' : '=';
              return `${item.key} ${item.operator ?? operator} :${item.value}`;
            })
            .join(' AND ');
        }
      }
    }
  }

  return where;
};

const isNaN = (param): boolean => !Number(param);
