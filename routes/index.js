var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');
var config = {};

/*
 * SDK configuration
 */

exports.init = function(c){
  config = c;
  paypal.configure(c.api);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

router.get('/dLogin', function(req, res, next) {
	res.render('login/donateLogin');
});

router.get('/nLogin', function(req, res, next) {
	res.render('login/ngoLogin');
});

router.get('/contact', function(req, res, next) {
	res.render('contact');
});

router.get('/donate', function(req, res, next) {
	res.render('payment/paypal');
});

router.get('/cancel', function(req, res, next) {
	res.render('payment/cancel');
});

router.get('/create', function(req, res, next) {
	res.render('payment/create');
});

router.get('/execute', function(req, res, next) {
	res.render('payment/execute');
});

router.get('/error', function(req, res, next) {
	res.render('payment/error');
});

router.get('/dDash', function(req, res, next) {
	res.render('donorDash');
});

router.get('/nDash', function(req, res, next) {
  res.render('ngoDash');
});



exports.create = function (req, res) {
  var method = req.param('method');

  var payment = {
    "intent": "sale",
    "payer": {
    },
    "transactions": [{
      "amount": {
        "currency": req.param('currency'),
        "total": req.param('amount')
      },
      "description": req.param('description')
    }]
  };

  if (method === 'paypal') {
    payment.payer.payment_method = 'paypal';
    payment.redirect_urls = {
      "return_url": "/execute",
      "cancel_url": "/cancel"
    };
  } else if (method === 'credit_card') {
    var funding_instruments = [
      {
        "credit_card": {
          "type": req.param('type').toLowerCase(),
          "number": req.param('number'),
          "expire_month": req.param('expire_month'),
          "expire_year": req.param('expire_year'),
          "first_name": req.param('first_name'),
          "last_name": req.param('last_name')
        }
      }
    ];
    payment.payer.payment_method = 'credit_card';
    payment.payer.funding_instruments = funding_instruments;
  }

  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
      res.render('error', { 'error': error });
    } else {
      req.session.paymentId = payment.id;
      res.render('create', { 'payment': payment });
    }
  });
};


module.exports = router;
