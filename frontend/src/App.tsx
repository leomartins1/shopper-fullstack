import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { ProductsTable } from './components/products-table';
import { ProductsUpdate } from './components/update-products';
import { getProducts } from './services/get-products';
import { IProduct } from './types';

function App() {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    async function fetchProducts() {
      const response = await getProducts();
      setProducts(response);
    }
    fetchProducts();
  }, []);

  return (
    <div className='wrapper'>
      <Toaster position='top-center' />
      <ProductsUpdate updateProducts={setProducts} />
      {products && <ProductsTable products={products} />}
    </div>
  );
}

export default App;
