import { formatCurrency } from '~/utils/format-currency';
import { IGetProductsAPI } from './types';
import axios from 'axios';

export async function getProducts() {
  try {
    const {
      data: { data },
    } = await axios.get<IGetProductsAPI>('http://localhost:4000/products');

    return data.map((item) => ({
      code: item.code,
      name: item.name,
      costPrice: formatCurrency(Number(item.cost_price)),
      salesPrice: formatCurrency(Number(item.sales_price)),
      wasValidated: false,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
