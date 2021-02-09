var router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: 'welcome to home route',
    data: [],
  });
});

module.exports = router;
