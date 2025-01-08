export interface AndInterface {
  key: string;
  value: string;
  operator?: string;
  type?: string;
}

export interface ConditionalInterface {
  or: string[];
  and: AndInterface[];
}
