import axios from 'axios';
import { IValidateFileAPI } from './types';
import { formatCurrency } from '~/utils/format-currency';

export async function updateProductsWithCSV(file: FormData) {
  try {
    const {
      data: { data },
    } = await axios.put<IValidateFileAPI>('http://localhost:4000/products', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.map((item) => ({
      code: item.code,
      name: item.name,
      costPrice: formatCurrency(item.cost_price),
      salesPrice: formatCurrency(item.sales_price),
      invalid: item.invalid,
      wasValidated: false,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
