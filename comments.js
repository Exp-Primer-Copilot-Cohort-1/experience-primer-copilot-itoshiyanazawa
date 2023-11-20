// Create web server
var express = require('express');
var router = express.Router();
// Import comments model
var Comments = require('../models/comments');
// Create a new comment
router.post('/new', function(req, res, next) {
  var comment = new Comments({
    username: req.body.username,
    comment: req.body.comment,
    created: new Date()
  });
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(201, comment);
  });
});
// Get all comments
router.get('/', function(req, res, next) {
  Comments.find().sort('-created').exec(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});
// Delete all comments
router.delete('/', function(req, res, next) {
  Comments.remove(function(err) {
    if (err) {
      return next(err);
    }
    res.json(204, null);
  });
});
// Export router
module.exports = router;