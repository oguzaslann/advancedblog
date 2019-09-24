      //packages
const express       = require('express'),
      Post          = require('../models/postModel'),
      passport      = require('passport'),
      User          = require('../models/userModel'),
      facebook      = require('passport-facebook'),
      router        = express.Router(),
      morgan        = require('morgan'),
      crypto        = require('crypto'),
      multer        = require('multer'),
      fileUpload    = require('express-fileupload'),
      Resize        = require('../middleware/Resize'),
      path          = require('path'),
      mkdirp        = require('mkdirp'),
      escapeRegex   = require('../middleware/regex-escape'),
      ip            = require('ip'),
      midFun        = require('../middleware/middlewareFunction'),
      validFun      = require('../middleware/validationFunction'),
      dateFormat    = require('dateformat'),
      FormData      = require('form-data'),
      extend        = require('extend'),
      Jimp          = require('jimp'),
      mime          = require('mime-types'),
      //object
      now           = new Date(),
      emailRegexp   = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      app           = express();

    //POSTS SHOW
    router.get("/articles", (req, res) =>{
       res.redirect('/articles/sayfa=1&ls');
         });

         router.get("/articles/sayfa=:page&:sorting", (req, res) =>{
        
            // Declaring variable
             const resPerPage  = 10, // results per page
                   currentPage = req.params.page || 1, // Page 
                   reqSorting  = req.params.sorting;

             if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
             if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
             if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
             if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
             
             console.log(reqSorting);
             console.log(resSorting);
             
             Promise.all([
                 midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
                 midFun.countDocuments({})
              ]).then(([foundArticles, numOfResults]) => {
                 res.render('pages/articles', {
                     foundArticles,
                     currentPage, 
                     pages              : Math.ceil(numOfResults / resPerPage),
                     numOfResults,
                     reqSorting
                     });
                 });
              });

    router.get('/articles/:articleId', (req, res) =>{
        Post.findById(req.params.articleId)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

     router.get("/poetrys/sayfa=:page&:sorting", (req, res) =>{
         
             // Declaring variable
              const resPerPage  = 10, // results per page
                    currentPage = req.params.page || 1, // Page 
                    reqSorting  = req.params.sorting;
 
              if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
              if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
              if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
              if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
              
              console.log(reqSorting);
              console.log(resSorting);
              
              Promise.all([
                  midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
                  midFun.countDocuments({})
               ]).then(([foundPoetrys, numOfResults]) => {
                  res.render('pages/poetrys', {
                      foundPoetrys,
                      currentPage, 
                      pages              : Math.ceil(numOfResults / resPerPage),
                      numOfResults,
                      reqSorting
                      });
                  });
     });
 
    router.get('/poetrys/:poetryId', (req, res) =>{
         Post.findById(req.params.poetryId)
         .then((foundArticle) => {
             foundArticle.rating.visitRating += 1;
             foundArticle.ratingsTotal += 1;
             foundArticle.save();
             res.render("pages/show-article", {foundArticle});
             console.log(foundArticle);
         })
         .catch((err) => {
             console.log("ID bazlı listeleme hatası");
             console.log(err);
             res.send(err);
         });
     });

    router.get("/illustrations/sayfa=:page&:sorting", (req, res) =>{
         
        // Declaring variable
         const resPerPage  = 10, // results per page
               currentPage = req.params.page || 1, // Page 
               reqSorting  = req.params.sorting;

         if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
         if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
         if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
         if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
         
         console.log(reqSorting);
         console.log(resSorting);
         
         Promise.all([
             midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
             midFun.countDocuments({})
          ]).then(([foundIllustrations, numOfResults]) => {
             res.render('pages/illustrations', {
                 foundIllustrations,
                 currentPage, 
                 pages              : Math.ceil(numOfResults / resPerPage),
                 numOfResults,
                 reqSorting
                 });
             });
    });

    router.get('/illustrations/:illustrationsId', (req, res) =>{
        Post.findById(req.params.illustrationsId)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

    router.get("/cartoons/sayfa=:page&:sorting", (req, res) =>{
         
        // Declaring variable
         const resPerPage  = 10, // results per page
               currentPage = req.params.page || 1, // Page 
               reqSorting  = req.params.sorting;

         if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
         if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
         if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
         if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
         
         console.log(reqSorting);
         console.log(resSorting);
         
         Promise.all([
             midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
             midFun.countDocuments({})
          ]).then(([foundCartoons, numOfResults]) => {
             res.render('pages/cartoons', {
                 foundCartoons,
                 currentPage, 
                 pages              : Math.ceil(numOfResults / resPerPage),
                 numOfResults,
                 reqSorting
                 });
             });
    });

    router.get('/cartoons/:cartoonsId', (req, res) =>{
        Post.findById(req.params.cartoonsId)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

    router.get("/shortWords/sayfa=:page&:sorting", (req, res) =>{
         
        // Declaring variable
         const resPerPage  = 10, // results per page
               currentPage = req.params.page || 1, // Page 
               reqSorting  = req.params.sorting;

         if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
         if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
         if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
         if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
         
         console.log(reqSorting);
         console.log(resSorting);
         
         Promise.all([
             midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
             midFun.countDocuments({})
          ]).then(([foundShortWords, numOfResults]) => {
             res.render('pages/short-words', {
                foundShortWords,
                 currentPage, 
                 pages              : Math.ceil(numOfResults / resPerPage),
                 numOfResults,
                 reqSorting
                 });
             });
    });

    router.get('/shortWords/:shortWordId', (req, res) =>{
        Post.findById(req.params.shortWordId)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

    router.get("/humors/sayfa=:page&:sorting", (req, res) =>{
         
        // Declaring variable
         const resPerPage  = 10, // results per page
               currentPage = req.params.page || 1, // Page 
               reqSorting  = req.params.sorting;

         if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
         if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
         if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
         if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
         
         console.log(reqSorting);
         console.log(resSorting);
         
         Promise.all([
             midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
             midFun.countDocuments({})
          ]).then(([foundHumors, numOfResults]) => {
             res.render('pages/humors', {
                 foundHumors,
                 currentPage, 
                 pages              : Math.ceil(numOfResults / resPerPage),
                 numOfResults,
                 reqSorting
                 });
             });
    });

    router.get('/shortWords/:cartoonsId', (req, res) =>{
        Post.findById(req.params.cartoonsId)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

    router.get("/criticisms/sayfa=:page&:sorting", (req, res) =>{
         
        // Declaring variable
         const resPerPage  = 10, // results per page
               currentPage = req.params.page || 1, // Page 
               reqSorting  = req.params.sorting;

         if (reqSorting == "ls"){ var resSorting = {"validation.date" : -1};}
         if (reqSorting == "ps"){ var resSorting = {"ratingsTotal" : -1};}
         if (reqSorting == "ns"){ var resSorting = {"title" : 1};}
         if (reqSorting == "rns"){ var resSorting = {"title" : -1};}
         
         console.log(reqSorting);
         console.log(resSorting);
         
         Promise.all([
             midFun.postFind({}, (resPerPage * currentPage) - resPerPage, resPerPage, resSorting),
             midFun.countDocuments({})
          ]).then(([foundCriticisms, numOfResults]) => {
             res.render('pages/criticism', {
                 foundCriticisms,
                 currentPage, 
                 pages              : Math.ceil(numOfResults / resPerPage),
                 numOfResults,
                 reqSorting
                 });
             });
    });

    router.get('/criticisms/:criticism', (req, res) =>{
        Post.findById(req.params.criticism)
        .then((foundArticle) => {
            foundArticle.rating.visitRating += 1;
            foundArticle.ratingsTotal += 1;
            foundArticle.save();
            res.render("pages/show-article", {foundArticle});
            console.log(foundArticle);
        })
        .catch((err) => {
            console.log("ID bazlı listeleme hatası");
            console.log(err);
            res.send(err);
        });
    });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, './uploads'),
        filename: (req, file, cb) => cb(null, Date.now()),
      });

    const fileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          cb('Only image files are allowed!', false);
        }
      
        cb(null, true);
      };

    const upload = multer({ storage, fileFilter }).single('sampleFile');

    //POSTS ADD
    router.post("/addTry", (req, res) =>{

        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let title         = req.body.title,
            type          = "article",
            content       = req.body.editordata,
            user          = req.user,
            impSent       = req.body.importantSentence,        
            sampleFile    = req.files.sampleFile,
            sExtName      = path.extname(sampleFile.name),
            showName      = req.body.showName,
            mathRandom    = Math.random(),
            smImg         =`uploads/${user.username}/post_${sampleFile.md5}_${mathRandom}${sExtName}`,
            applicationDate = dateFormat(now, "hammerTime");

            var validation = [];

            if(title == ""){
                  validation.push("Başlık giriniz.")
              }

            if(content == "" || content == "<p></p>" || content == "<p><br></p>"){
                validation.push("Yazınızı giriniz.")
            }

            if(sampleFile.name == ""){
                validation.push("Kapak fotoğrafı giriniz.")
            }

            if(showName == null){
                validation.push("Yayınlanırken isim tercihinizi giriniz.")
            }

            console.log(sExtName);
            if(sExtName != ".jpg" && sExtName != ".jpeg" && sExtName != ".png" && sExtName !=".gif"){
                validation.push("Lütfen geçerli bir görsel giriniz.")
            }
        
        if(validation != ""){
              console.log(validation);
              res.json({success:false, response: validation});
          } else {
                res.json({success:true, response: "Tamam oldu!"});
            
                // Use the mv() method to place the file somewhere on your server
                sampleFile.mv(`public/` + smImg, function(err) {
                    if (err)
                    return res.status(500).send(err);
                    else{
                    console.log(sampleFile);
                    }
                });

                Jimp.read(`public/` + smImg)
                .then(lenna => {
                    return lenna
                    .resize(268, 224) // resize
                    .quality(70) // set JPEG quality
                    .write(`public/` + smImg); // save
                })
                .catch(err => {
                    console.error(err);
                });
            
                let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};
                Post.create(newPost)
                .then((newPost) =>{
                    console.log(newPost);
                })
                .catch((err) => {
                console.log("Hata Error");
                console.log(err);
                })
        }

        // if(mockStatus) {
        //     res.json({success: true,response:successMessage})
        // }else{
        //     res.json({success: false,response:errorMessage})
        // }
    });

   router.post("/addArticle", (req, res) =>{    
        
        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let title         = req.body.title,
            type          = "article",
            content       = req.body.editordata,
            user          = req.user,
            impSent       = req.body.importantSentence,        
            sampleFile    = req.files.sampleFile,
            showName      = req.body.showName,
            mathRandom    = Math.random(),
            smImg         =`uploads/${user.username}/post_${sampleFile.md5}_${mathRandom}`,
            applicationDate = dateFormat(now, "hammerTime");

            var validation = [];

            if(title == ""){
                  validation.push("Başlık giriniz.")
              }

            if(content == "" || content == "<p></p>" || content == "<p><br></p>"){
                validation.push("Yazınızı giriniz.")
            }

            if(sampleFile.name == ""){
                validation.push("Kapak fotoğrafı giriniz.")
            }

            if(showName == null){
                validation.push("Yayınlanırken isim tercihinizi giriniz.")
            }
        
        if(validation != ""){
              console.log(validation);
              res.json({success:false, response: validation});
          } else {
              res.json({success:true, response: "Tamam oldu!"});
     
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/' + smImg, function(err) {
            if (err)
              return res.status(500).send(err);
              else{
            console.log(sampleFile.tempFilePath);
              }
          });
    
        let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};
        Post.create(newPost)
        .then((newPost) =>{
            console.log(newPost);
        })
        .catch((err) => {
          console.log("Hata Error");
          console.log(err);
        })
        }
        
        // if(mockStatus) {
        //     res.json({success: true,response:successMessage})
        // }else{
        //     res.json({success: false,response:errorMessage})
        // }
    });

    router.post("/addPoetry", (req,res) =>{    
        
        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let title         = req.body.title,
            type          = "poetry",
            content       = req.body.editordata,
            user          = req.user,
            impSent       = req.body.postImportantSentence,        
            sampleFile    = req.files.sampleFile,
            showName      = req.body.showName,
            mathRandom    = Math.random(),
            smImg         =`uploads/${user.username}/post_${sampleFile.md5}_${mathRandom}`,
            applicationDate = dateFormat(now, "hammerTime");
        
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/' + smImg, function(err) {
            if (err)
              return res.status(500).send(err);
              else{
            console.log(sampleFile.tempFilePath);
              }
          });

          let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};

        Post.create(newPost)
        .then((newPost) =>{
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
          console.log("Hata Error");
          console.log(err);
          res.send(err);  
        })
    });

    router.post("/addIllustration", (req,res) =>{    
        
        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let type          = "illustration",
            content       = req.body.editordata,
            user          = req.user,
            sampleFile    = req.files.sampleFile,    
            showName      = req.body.showName,
            mathRandom    = Math.random(),
            smImg         =`uploads/${user.username}/post_${sampleFile.md5}_${mathRandom}`,
            applicationDate= dateFormat(now, "hammerTime");
        
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/' + smImg, function(err) {
            if (err)
              return res.status(500).send(err);
              else{
            console.log(sampleFile.tempFilePath);
              }
          });

          let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};

        Post.create(newPost)
        .then((newPost) =>{
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
          console.log("Hata Error");
          console.log(err);
          res.send(err);  
        })
    });

    router.post("/addCartoon", (req,res) =>{    
        
        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let type          = "cartoon",
            content       = req.body.editordata,
            user          = req.user, 
            showName      = req.body.showName,        
            sampleFile    = req.files.sampleFile,
            mathRandom    = Math.random(),
            smImg         =`uploads/${user.username}/post_${sampleFile.md5}_${mathRandom}`,
            applicationDate= dateFormat(now, "hammerTime");
        
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/' + smImg, function(err) {
            if (err)
              return res.status(500).send(err);
              else{
            console.log(sampleFile.tempFilePath);
              }
          });

          let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};

        Post.create(newPost)
        .then((newPost) =>{
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
          console.log("Hata Error");
          console.log(err);
          res.send(err);  
        })
    });

    router.post("/addShortWord", (req,res) =>{    
        
        dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

        let type          = "shortWord",
            content       = req.body.shortWord,
            user          = req.user,
            showName      = req.body.showName,
            applicationDate= dateFormat(now, "hammerTime");

            let newPost     = {title, type, content, user, smImg, impSent, showName, applicationDate};

        Post.create(newPost)
        .then((newPost) =>{
            console.log(newPost);
            res.status(201).json(newPost);
        })
        .catch((err) => {
          console.log("Hata Error");
          console.log(err);
          res.send(err);  
        })
    });

    //POSTS PLUGIN
    router.post("/createLike/:clicked_id", (req, res)=>{
        var clickedId = req.body.likeFonk.clicked_id;
        Post.findById(clickedId)
        .then((foundPost)=> {
            foundPost.rating.favRating += 1;
            foundPost.ratingsTotal += 1;
            foundPost.save();
        })
    });

    router.post("/cancelLike/:clicked_id", (req, res)=>{
        var clickedId = req.body.likeFonk.clicked_id;
        Post.findById(clickedId)
        .then((foundPost)=> {
            foundPost.rating.favRating -= 1;
            foundPost.ratingsTotal -= 1;
            foundPost.save();
        })
    });


    //USERS SHOW
    router.get('/:username/sayfa=:page', (req, res) =>{
        // Declaring variable
        const resPerPage        = 10, // results per page
              currentPage       = req.params.page || 1, // Page
              foundUsername     = req.params.username;


              Promise.all([
                midFun.postFind({"username" : foundUsername}, (resPerPage * currentPage) - resPerPage, resPerPage),
                midFun.countDocuments({"username" : foundUsername}),
                midFun.userFind({"username" : foundUsername}),
                midFun.postAggregate(foundUsername)
            ]).then(([foundUserPosts, numOfResults, foundUser, foundUserRatings]) => {
                res.render('pages/show-user', {
                    foundUserPosts,
                    foundUser,
                    currentPage, 
                    pages              : Math.ceil(numOfResults / resPerPage),
                    numOfResults,
                    foundUserRatings
                    });
                    console.log(foundUser);
                });
     });


    //USERS
    router.get('/login', (req, res)=>{
        res.render("pages/login");
    });

    router.post("/login", passport.authenticate("local",
        {
            successRedirect :"/",
            failureRedirect :"/login"
        }),(req, res)=>{
    });

    router.get("/signUp", (req, res)=>{
        res.render("pages/signUp");
    });
    
    router.post("/signUp", (req, res)=>{

        const   username = req.body.username,
                password = req.body.password,
                email    = req.body.email;

        var validation = [];

        if(username == "" || username.length < 4 || username.length > 15){
            validation.push("En az 4 en fazla 15 karakterli kullanıcı ismi giriniz.")
        }
        if(password == "" || password.length < 6 || password.length > 15){
            validation.push("En az 6 en fazla 15 karakterli şifre giriniz.")
        }
        if(emailRegexp.test(email) == false){
            validation.push("Geçerli bir e posta adresi giriniz.")
        }
       
        if(validation != ""){
            res.json({success:false, response: validation})
        } else {
        let newUser = new User({
            username,
            email
        });
        
        User.register(newUser, password, (err, user)=>{
            if(err){
                var errorMessages = [];
                if(err.name == 'UserExistsError'){
                    errorMessages.push("Girdiğiniz kullanıcı adı daha önce alınmış!")
                } else {
                    errorMessages.push("Girdiğiniz E-posta adresine ait bir hesap var!")
                }
                res.json({ success: false, response: errorMessages});
            } else{
            passport.authenticate("local")(req, res, ()=>{
                console.log(newUser);
                    res.json({ success: true, response: "Tamam"});
            });
        }
        });
        mkdirp(`public/uploads/${req.body.username}`, function(err) { 
        })
        };
    });

    router.get("/signOut", (req, res)=>{
        req.logout();
        res.redirect("/");
    });

    router.get("/changePassword", (req, res)=>{
        res.render('pages/change-password');
    });

    router.post("/changePassword", (req, res)=>{
        const   oldPassword    = req.body.oldPassword,
                newPasswordOne = req.body.newPasswordOne,
                newPasswordTwo = req.body.newPasswordTwo,
                user           = req.user;

                var validation = [];
                if(oldPassword == "" || oldPassword.length<6 || oldPassword.length>15) {validation.push("6-15 karakterli güncel şifrenizi giriniz!")}
                if(newPasswordOne == "" || newPasswordOne.length<6  || newPasswordOne.length>15) {validation.push("Yeni şifreniz en az 6 en fazla 15 karakterli olmalıdır!")}
                if(newPasswordOne != newPasswordTwo) {validation.push("Girdiğiniz yeni şifreleriniz birbiriyle uyuşmamaktadır!")}

                if(validation != ""){
                    res.json({success:false, response:validation})
                } else {
                User.findById(user._id)
                .then((foundUser) => {
                foundUser.changePassword(oldPassword, newPasswordTwo)
                .then(() => {
                    res.json({success:true, response:"Şifreniz değiştirilmiştir."})
                })
                .catch((err) => {
                    res.json({success:false, response:"Hata! Bilgilerinizi doğru girdiğinizden emin olunuz!"});
                })
                })
                .catch((err) => {
                    res.json({success:false, response:"Hata! Bilgilerinizi doğru girdiğinizden emin olunuz!"});
                })
            }
    });
    
    router.get("/profilim", (req, res)=>{

        const   username = req.user.username;

              Promise.all([
                midFun.userFind({"username" : username}),
                midFun.countDocuments({"username" : username})
            ]).then(([foundUser, countPost]) => {
                res.render('pages/profile', {
                    foundUser,
                    countPost
                    });
                });
    });

    router.get("/yazilarim&:page", (req, res)=>{

        // Declaring variable
        const resPerPage        = 10,
              foundUsername     = "oguzaslan_",
              currentPage       = req.params.page;

              Promise.all([
                midFun.postFind({"user.username" : foundUsername}, (resPerPage * currentPage) - resPerPage, resPerPage),
                midFun.countDocuments({"user.username" : foundUsername}),
                midFun.userFind({"username" : foundUsername})
            ]).then(([foundUserPosts, numOfResults, foundUser]) => {
                res.render('pages/my-articles', {
                    foundUserPosts,
                    foundUser,
                    currentPage, 
                    pages              : Math.ceil(numOfResults / resPerPage),
                    numOfResults
                    });
                    console.log(foundUser);
                });
    });

    router.get("/yayin-profilim&:page", (req, res)=>{

        // Declaring variable
        const resPerPage        = 10,
              foundUsername     = "oguzaslan_",
              currentPage              = req.params.page;

              Promise.all([
                midFun.postFind({"user.username" : foundUsername}, (resPerPage * currentPage) - resPerPage, resPerPage),
                midFun.countDocuments({"user.username" : foundUsername}),
                midFun.userFind({"username" : foundUsername}),
                midFun.postAggregate(foundUsername)
            ]).then(([foundUserPosts, numOfResults, foundUser, foundUserRatings]) => {
                res.render('pages/my-profile-stream', {
                    foundUserPosts,
                    foundUser,
                    currentPage, 
                    pages              : Math.ceil(numOfResults / resPerPage),
                    numOfResults,
                    foundUserRatings
                    });
                    console.log(foundUserRatings);
                });
    });

    router.post("/editProfile", (req, res)=>{

        let nameSurname = req.body.nameSurname,
            email       = req.body.email,
            facebook    = req.body.facebook,
            twitter     = req.body.twitter,
            instagram   = req.body.instagram,
            info        = req.body.info,
            birthDate   = req.body.birtDate,
            user        = req.user;

        let editUser = {nameSurname, email, info, birthDate, social : {facebook, instagram, twitter}};

        User.findByIdAndUpdate(user._id, editUser, (editedUser, err) => {
            if(err)
                console.log(err);
            else
                console.log(editedUser);
        })
    });

    router.post("/editProfilePhoto", (req, res)=>{

        let sampleFile  = req.files.sampleFile,
            user        = req.user,
            sExtName    = path.extname(sampleFile.name),
            userImg     = `uploads/${user.username}/profilePhotos${sExtName}`;

       // Use the mv() method to place the file somewhere on your server
       sampleFile.mv(`public/` + userImg, function(err) {
        if (err)
        return res.status(500).send(err);
        else{
        console.log(sampleFile);
        }
        });

        Jimp.read(`public/` + userImg)
        .then(lenna => {
            return lenna
            .resize(200, 200) // resize
            .quality(70) // set JPEG quality
            .write(`public/` + userImg); // save
        })
        .catch(err => {
            console.error(err);
        });

        let editUser = {img : {userImg}};

        User.findByIdAndUpdate(user._id, editUser, (editedUser, err) => {
            if (err)
                console.log(err);
            else
                console.log(editedUser);
        });
    });

module.exports = router;

