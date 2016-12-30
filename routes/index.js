var express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
  res.status(401).send({code:401, message:'Nope'});
});

module.exports = router;
