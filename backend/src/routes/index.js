var express = require('express');
var router = express.Router();
const propertiesRouter = require('./properties')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api/properties', propertiesRouter)

module.exports = router;
