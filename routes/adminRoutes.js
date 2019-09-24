const express          = require('express'),
      LocalStrategy    = require('passport-local').Strategy,
      Post             = require('../models/postModel'),
      dateFormat       = require('dateformat'),
      now              = new Date(),
      router           = express.Router();

      
///POSTS SHOW
router.get("/admin-posts/sayfa=:page", (req,res) =>{
  // Declaring variable
  const resPerPage = 50; // results per page
  const page = req.params.page || 1; // Page 
  try {

  Post.find({})
      .skip((resPerPage * page) - resPerPage)
      .limit(resPerPage)
      .sort({"date" : -1})
      .exec(function(err, foundPosts) {
  // Count how many products were found
  Post.countDocuments({})
      .exec(function(err, numOfProducts) {
      
  // Renders The Page
  res.render('pages/admin-posts', {
    foundPosts: foundPosts, 
    currentPage: page, 
    pages: Math.ceil(numOfProducts / resPerPage),
    numOfResults: numOfProducts
    });
    });      
    });
    }
   catch (err) {
  throw new Error(err);
  }

});

router.get('/admin-signUp', (req,res) =>{
const      roles    = req.user.roles;

    if(roles == 3){
      res.render('pages/admin-signUp');
      console.log(roles);
    }
    else{
      res.send('yetkisizsiniz');
    }
});


///POST MANAGEMENT
router.post('/validation/:clicked_id', (req,res) =>{

dateFormat.masks.hammerTime = 'd mmmm "/" yy';

const postId        = req.params.clicked_id,
      username      = req.user.username,
      date          = dateFormat(now, "hammerTime"),
      dateFull      = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
      type          = req.body.postType,
      validation    = req.body.validation;

let   updateObj     = {"type": type, "validation.isValidation" : validation, "validation.whoApproved" : username, "validation.date" : date, "validation.dateFull" : dateFull};

Post.findByIdAndUpdate(postId, updateObj, {new: true}, function(err, foundPost) {
  if(err){
    res.send(err);
  }
  foundPost.confirmInfo.push(validation + " " + type + " " + username + " " + dateFull + " changed");
  foundPost.save();
  console.log(foundPost);
});
    res.redirect('/admin-posts/sayfa=1');
});


    ///POSTS EDİT
    router.get('/articles/edit-:articleId', (req, res) =>{
      Post.findById(req.params.articleId)
      .then((foundArticle) => {
          res.render("pages/admin-postEdit", {foundArticle:foundArticle});
          console.log(foundArticle);
      })
      .catch((err) => {
          console.log(err);
          res.send(err);
      });
  });

  router.post("/articles/delete-:articleId", (req,res) =>{    
    const postId        = req.params.articleId,
          username      = req.user.username,
          dateFull      = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    let   updateObj     = {"validation.isValidation" : 2};

    Post.findByIdAndUpdate(postId, updateObj, {new: true}, function(err, foundPost) {
      if(err){
        res.send(err);
      }
      foundPost.confirmInfo.push(username + " deleted " + dateFull + " in history ");
      foundPost.save();
      console.log(foundPost);
    });
        res.redirect('/admin-posts/sayfa=1');
    });

///USER MANAGEMENT
router.get('/admin-signUp', (req,res) =>{
  let      roles    = req.user.roles;
  
      if(roles == 3){
        res.render('pages/admin-signUp');
        console.log(roles);
      }
      else{
        res.send('yetkisizsiniz');
      }
  });

router.get("/admin/standbyposts", (req,res) =>{
    User.find({isValidation: 0}, (err, foundPosts) => {
        if(err){
            console.log("Postlar listeleme hatası");
            console.log(err);
        } else {
            console.log("Doğrulama bekleyen Postlar;");
            console.log(foundPosts);
            res.json(foundPosts);
        }
});
});

module.exports = router;