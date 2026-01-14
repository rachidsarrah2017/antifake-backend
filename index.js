const express = require('express')
const bodyParser = require('body-parser')
const checkOrder = require('./checkOrder')

const app = express()
app.use(bodyParser.json())

app.use('/check-order', checkOrder)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
