const express = require('express')
const router = express.Router()

let customers = {}

/**
 * CHECK ORDER
 * كيتنادى قبل إنشاء الطلب
 */
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

    return res.json({ allow: true })
  }

  const c = customers[phone]

  // أول كوموند
  if (c.orders === 0) {
    return res.json({ allow: true })
  }

  // verified
  if (c.verified) {
    return res.json({ allow: true })
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

/**
 * ORDER CREATED
 * كيتنادى من بعد ما الطلب تخلق
 */
router.post('/created', (req, res) => {
  const phone = req.body.phone

  if (!customers[phone]) {
    customers[phone] = {
      orders: 1,
      verified: false,
      verifyAsked: false
    }
  } else {
    customers[phone].orders += 1
  }

  return res.json({ ok: true })
})

/**
 * VERIFY (مؤقت – دابا غير كنقولو verified=true)
 */
router.post('/verify', (req, res) => {
  const phone = req.body.phone

  if (customers[phone]) {
    customers[phone].verified = true
  }

  return res.json({ verified: true })
})

module.exports = router

