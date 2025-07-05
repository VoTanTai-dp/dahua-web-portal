const router = require('express').Router();
const ctrl = require('../controllers/database.controller');
router.get('/all', ctrl.getAll);
module.exports = router;
