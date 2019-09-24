const   express       = require('express'),
        Post          = require('../models/postModel'),
        midFun        = require("../middleware/middlewareFunction"),
        router        = express.Router();

    router.get("/", (req,res) =>{
        
        Promise.all([
            midFun.postFind({}, 0, 6, {"ratingsTotal": -1}),
            midFun.postFind({}, 0, 6, {"rating.visitRating": -1}),
            midFun.postFind({}, 0, 7, {"rating.favRating" : -1}),
            midFun.postFind({}, 0, 7, {"date" : -1}),
            midFun.postFind({type : "illustration"}, 0, 10, {"ratingsTotal" : -1})
        ]).then(([foundFirstFive, mostVieweds, mostFavRatings, lastPosts, mostIllustrations]) => {
            res.render('pages/index', {
                foundFirstFive      : foundFirstFive,
                mostVieweds         : mostVieweds,
                mostFavRatings      : mostFavRatings,
                lastPosts           : lastPosts,
                mostIllustrations   : mostIllustrations  
                });
            });
        });

    router.get("/about", (req,res) =>{
        res.render("pages/about");
    });

    router.get("/contact", (req,res) =>{
        res.render("pages/contact");
    });

    router.get("/submit", (req,res) =>{
        res.render("pages/submit");
    });

    router.get("/video-post", (req,res) =>{
        res.render("pages/video-post");
    });

    router.get("/test", (req,res) =>{
        res.render("pages/test");
    });


module.exports = router;
