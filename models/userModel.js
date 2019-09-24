const   mongoose                    = require("mongoose"),
        passportLocalMongoose       = require("passport-local-mongoose");

const UserSchema  = new mongoose.Schema({
    username        : {type: String, unique: true},
    nameSurname     : {type: String},
    email           : {type: String, unique: true},
    password        : {type: String},
    img             : {
                      userImg   : {type: String},
                      bgImg     : {type: String}
                      },
    social          : {
                      facebook  : {type: String},
                      twitter   : {type: String},
                      instagram : {type: String}
                      },
    birthDate       : {type: String},
    info            : {type: String},
    roles           : {type: Number, default:"1"},
    validation      : {
                      isValidation    : {type: Boolean, default:1}
                     }
});

//modeli passport-local-mongoose ile kullanacağımız için UserSchema modelini plugin olarak tanıttık passport-local-mongoose'a
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
