const  mongoose             = require("mongoose"),
       express              = require("express"),
       passport             = require("passport"),
       LocalStrategy        = require("passport-local"),
       expressSession       = require("express-session"),
       bodyParser           = require("body-parser"),
       User                 = require("./models/userModel"),
       fileUpload           = require('express-fileupload'),
       multer               = require('multer'),
       mkdirp               = require('mkdirp'),
       dateFormat           = require('dateformat'),
       http                 = require('http'),
       app                  = express();


       
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 }
  }));

const indexRoutes           = require("./routes/indexRoutes"),
      adminRoutes           = require("./routes/adminRoutes"),
      clientRoutes          = require("./routes/clientRoutes");


//App Config
mongoose.connect("mongodb://localhost/magwork", { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/articles', express.static('public'));
app.use('/:username', express.static('public'));
app.use('/admin', express.static('public'));
//Passport Config
app.use(require("express-session")({
    secret:"bu bizim guvenlik cumlemizdir",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose Set
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//Share current user info within all routes -- Giriş yapılmışsa currentuser ismiyle tüm localler ile paylaştık
app.use((req, res, next)=>{
    res.locals.currentUser=req.user;
    next();
});


//Date Config
dateFormat.i18n = {
    dayNames: [
      'Pzr', 'Pzt', 'Sal', 'Çrş', 'Per', 'Cum', 'Cts',
      'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
    ],
    monthNames: [
      'Ock', 'Şbt', 'Mrt', 'Nis', 'Mys', 'Haz', 'Tem', 'Ağs', 'Eyl', 'Ekm', 'Kas', 'Arl',
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
  };

//Routes Using
app.use(indexRoutes);
app.use(adminRoutes);
app.use(clientRoutes);

const server = app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('App started. Port number : %d', server.address().port);
});
