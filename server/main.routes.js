const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');

router.get('/', (req, res) => {
    res.send('working...');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
