var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "/execute",
    "cancel_url": "/cancel"
  },
  "transactions": [{
    "amount": {
      "total": "5.00",
      "currency": "USD"
    },
    "description": "My awesome payment"
  }]
};