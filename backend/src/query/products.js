const PRODUCTS_QUERY = {
  GET_ALL_PRODUCTS: 'SELECT * FROM products',
  UPDATE_PRODUCTS: 'UPDATE products SET sales_price = ? WHERE code = ?',
  GET_PACK_BY_ID: 'Select * FROM packs WHERE pack_id = ?',
  GET_PRODUCT_BY_ID: 'SELECT * FROM products WHERE code = ?'
}

module.exports = { PRODUCTS_QUERY }