const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { getProducts, validateCSVFile } = require('./src/controller/products')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express()

app.use(cors())
app.use(express.json())

app.get('/products', getProducts)

app.post('/products', upload.single('csvFile'), (req, res) => {
  validateCSVFile(req, res)
})

app.put('/products', upload.single('csvFile'), (req, res) => {
  validateCSVFile(req, res, true)
})

app.listen(4000, () => {
  console.log('Listen on 4000')
})
