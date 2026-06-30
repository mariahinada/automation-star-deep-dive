const express = require('express');
const { swaggerServe, swaggerSetup } = require('../controllers/swaggerController');

const router = express.Router();

router.use('/', swaggerServe, swaggerSetup);

module.exports = router;
