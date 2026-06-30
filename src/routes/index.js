const express = require('express');
const authRoutes = require('./authRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const healthRoutes = require('./healthRoutes');
const swaggerRoutes = require('./swaggerRoutes');

const router = express.Router();

router.use(authRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/health', healthRoutes);
router.use('/swagger', swaggerRoutes);

module.exports = router;
