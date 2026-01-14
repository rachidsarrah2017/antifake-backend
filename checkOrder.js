const express = require('express')
const router = express.Router()

// هادي غير storage مؤقتة (باش نخدمو دابا)
let customers = {}

router.post('/', (req, res) => {
  const phone = req.body.phone

  if (!phone) {
    return res.status(400).json({ error: 'phone required' })
  }

  // أول مرة
  if (!customers[phone]) {
    customers[phone] = {
      orders: 0,
      verified: false,
      verifyAsked: false
    }

    return res.json({
      allow: true
    })
  }

  const c = customers[phone]

  // أول كوموند
  if (c.orders === 0) {
    return res.json({
      allow: true
    })
  }

  // verified
  if (c.verified) {
    return res.json({
      allow: true
    })
  }

  // أول مرة نطلب verify
  if (!c.verifyAsked) {
    c.verifyAsked = true

    return res.json({
      allow: false,
      require_whatsapp: true
    })
  }

  // ما دارش verify
  return res.json({
    allow: false,
    message: 'خاصك تأكد الطلب عبر واتساب'
  })
})

module.exports = router
