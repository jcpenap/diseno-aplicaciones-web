const Tweet = require('./../../models/tweets');
const User = require('./../../models/users');
const getTweets = (req, res) =>{
    Tweet.find({},(err, tweets)=>{
        User.populate(tweets, {path: 'user'}, (err, populatedTweets)=>{
            res.status(200).send(populatedTweets);
        })
    })
};
const getTweet = (req, res) => {
    const id = req.params.id;
    Tweet.find({_id : id})
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const newTweet = (req, res) => {
    const tweet = {
        content: req.body.content,
        user: req.body.user
    };
    if(tweet.content && tweet.user){
        const object = new Tweet(tweet);
        object.save()
        .then((response)=>{
            res.status(201).send(response);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};
const deleteTweet = (req, res) => {
    res.send("Borrar tweet");
};

module.exports = {getTweets, getTweet, newTweet, deleteTweet};