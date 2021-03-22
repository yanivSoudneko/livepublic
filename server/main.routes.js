const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const stayRoutes = require('./api/stay/stay.routes');

router.get('/', (req, res) => {
    res.send('working...');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/stay', stayRoutes);

module.exports = router;
