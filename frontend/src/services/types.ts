export type IProductAPI = {
  code: string;
  name: string;
  cost_price: number;
  sales_price: number;
  invalid?: string[];
};

export type IGetProductsAPI = {
  data: Omit<IProductAPI, 'invalid'>[];
  messsage: string;
};

export type IValidateFileAPI = {
  data: IProductAPI[];
  messsage: string;
};
