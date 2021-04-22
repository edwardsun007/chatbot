var express = require('express');
var router = express.Router();

/* Post something */
router.post('/', function(req, res, next) {
  res.send('Hit Test with A Post !');
});

module.exports = router;
