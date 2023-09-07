const { Response } = require('../domain/response.js')
const { PRODUCTS_QUERY } = require('../query/products.js')
const { pool } = require('../config/connection.js')

async function getProducts(req, res) {
  const [products] = await pool.query(PRODUCTS_QUERY.GET_ALL_PRODUCTS);

  if (!products.length) {
    res.status(200)
      .send(new Response(`Nenhum produto encontrado`, []));
  } else {
    res.status(200)
      .send(new Response(`Produtos encontrados`, products));
  }
};

async function validateCSVFile(req, res, toUpdate) {
  const newPrices = [];

  const streamLine = req.file.buffer.toString('utf8')

  const lines = streamLine.split('\n')

  lines.shift()

  lines.forEach((line) => {
    const [code, newPrice] = line.split(',');
    newPrices.push({ code: parseInt(code), newPrice: parseFloat(newPrice) });
  });

  const products = await ValidateProducts(newPrices, pool);

  const isAllValidated = products.every(item => item.invalid?.length && item.invalid?.length >= 0)


  if (toUpdate && isAllValidated) {
    await Promise.all([products.forEach(product => pool.query(PRODUCTS_QUERY.UPDATE_PRODUCTS, [product.sales_price, product.code]))])
  }

  if (isAllValidated) {
    res.status(200)
      .send(new Response(`Produtos válidados`, products));
  } else {
    res.status(400)
      .send(new Response(`Produtos inválidos`, products));
  }
}


async function ValidateProducts(newPrices, pool) {
  const products = [];
  const invalid = []

  for (const { code, newPrice } of newPrices) {
    if (code >= 1000) {
      const newPack = []
      const [productPack] = await pool.query(PRODUCTS_QUERY.GET_PACK_BY_ID, [code])

      productPack.forEach(row => {
        const product = newPrices.find(product => product.code === row.product_id)
        if (product) newPack.push(newPrices.find(product => product.code === row.product_id))
      })

      productPack.forEach(row => {
        if (newPrices.some(product => product.code === row.product_id)) return
        invalid[code] = (invalid[code] ?? '') + `O pacote não possui o item ${row.product_id}\n`
      })

      const packSum = newPack.reduce((acc, item) => {
        return acc + (item.newPrice * productPack.find(product => product.product_id === item.code).qty)
      }, 0)

      if (packSum !== newPrice) {
        invalid[code] = (invalid[code] ?? '') + `A soma dos itens precisa ser igual ao valor do pacote\n`
      }
    }

    const [rows] = await pool.query(PRODUCTS_QUERY.GET_PRODUCT_BY_ID, [code]);
    if (rows.length === 0) {
      continue;
    }

    const product = rows[0];
    const maxPrice = product.sales_price * 1.1;
    const minPrice = product.sales_price * 0.9;


    if (newPrice < minPrice) {
      invalid[code] = (invalid[code] ?? '') + `O novo preço não pode ser 10% menor que o valor anterior\n`
    }
    if (newPrice > maxPrice) {
      invalid[code] = (invalid[code] ?? '') + `O novo preço não pode ser 10% maior que o valor anterior\n`
    }
    if (newPrice < product.cost_price) {
      invalid[code] = (invalid[code] ?? '') + `O novo preço não pode ser menor que o valor de custo\n`
    }

    products.push({
      code: product.code,
      name: product.name,
      cost_price: product.cost_price,
      sales_price: newPrice,
    });


  }

  const productsValidate = products.map(product => ({
    ...product,
    ...(!!invalid[product.code]?.length && { invalid: invalid[product.code].split('\n').filter(item => item) })
  }))

  return productsValidate;
}

module.exports = { getProducts, validateCSVFile }