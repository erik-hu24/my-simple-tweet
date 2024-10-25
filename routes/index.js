var express = require('express');
var router = express();
const tweetList = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'Tweet' 
    });
});

//POST a new tweet to the server, the tweet should contain an id, message, author, and create datetime.
/* the body of post
  {
    id, message, author, createDate
  }
*/
router.post('/tweet', function(req, res, next) {
  tweetList.push(req.body);
  res.send(`
    Create a new tweet successfully!<br>
    ID: ${req.body.id}<br>
    Message: ${req.body.message}<br>
    Author: ${req.body.author}<br>
    Create date: ${req.body.createDate}
  `);
});
//GET a list of all tweets
router.get('/tweet', function(req, res, next) {
  res.render('tweet', 
    { 
      tweets: tweetList
    });
});
//GET detail of a tweet by providing the tweet ID
router.get('/tweet/:tweetID', function(req, res, next) {
  const id = req.params.tweetID;
  let tweetDetail;
  // find the corresponding tweet to the ID
  for(let i = 0; i < tweetList.length; i++){
    if(tweetList[i].id === id){
      tweetDetail = tweetList[i];
      break;
    }
  }
  // find the tweet ID
  if(tweetDetail){
    res.render('tweetDetail', 
      { 
        tweetDetail
      });
  }
  else{ // can not find the tweet ID
    res.send(`Tweet ID:${id} does not exist`);
  }
});
//DELETE a tweet by providing the tweet ID
router.delete('/tweet/:tweetID', function(req, res, next){
  const id = req.params.tweetID;
  console.log(`the enter id is ${id}`);
  let tweetIndex = -1;
  // find the index of the tweetID
  for(let i = 0; i < tweetList.length; i++){
    console.log(`inside LOOP, Tweet id is ${tweetList[i].id} and enter is ${id}`);
    if(tweetList[i].id === id){
      console.log('find it!');
      tweetIndex = i;
      break;
    }
  }
  // find it, delete the tweet
  if(tweetIndex != -1){
    tweetList.splice(tweetIndex,1);
    res.send(`Tweet ID:${id} has been deleted.`);
  }
  else{// does not find it
    res.send(`Tweet ID:${id} does not exist.`);
  }

});

module.exports = router;
