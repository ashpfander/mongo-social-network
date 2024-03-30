// Requires express package and grabs from the api folder
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Sends a message if the wrong route is inputted
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;