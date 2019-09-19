const router = require('express').Router({ mergeParams: true });

// GET: /maze USED
router.get('/', (req, res, next) => {
  res.json({ done: true });
  // userSettingsController.getUserSettings(req.user.id)
  //   .then(result => res.json(result))
  //   .catch(next);
});

module.exports = router;