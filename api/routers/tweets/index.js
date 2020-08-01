const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const authentication = require('./../../middlewares/authentication');

router.route('/')
    .get(authentication, controller.getTweets)
    .post(authentication, controller.newTweet)
    .delete(controller.deleteTweet);

router.route('/comment')
    .post(controller.newComment);
router.route('/:id')
        .get(controller.getTweet);

module.exports = router;