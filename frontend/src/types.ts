export type IProduct = {
  code: string;
  name: string;
  costPrice: string;
  salesPrice: string;
  invalid?: string[];
  wasValidated: boolean;
};
