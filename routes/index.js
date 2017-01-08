var express = require('express'),
    router = express.Router();

router.get(['/', '/home'], (req, res, next) => {
  res.render('home', {title:'Resume'});
});

module.exports = router;
