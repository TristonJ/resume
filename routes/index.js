var express = require('express'),
    router = express.Router();

router.get(['/', '/home'], (req, res, next) => {
  res.render('home');
});

module.exports = router;
