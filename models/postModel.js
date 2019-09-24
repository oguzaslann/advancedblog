const mongoose      = require("mongoose");

var postSchema = new mongoose.Schema({

    title           : {type: String},
    type            : {type: String},
    user            : {
                        _id             : {type: String},
                        username        : {type: String},
                        nameSurname     : {type: String},
                        email           : {type: String},
                        password        : {type: String},
                        userImg         : {type: String},
                        social          : {
                                          facebook  : {type: String},
                                          twitter   : {type: String},
                                          instagram : {type: String}
                                          },
                        roles           : {type: String},
                        validation      : {
                                          isValidation    : {type: Boolean}
                                        }
                      },
    smImg           : {type: String},
    temp            : {type: String},
    tt              : {type: String},
    content         : {type: String},
    impSent         : {type: String},
    showName        : {type: String},
    validation      : {
                        isValidation    : {type: Number, default: 0},
                        whoApproved     : {type: String},
                        date            : {type: String},
                        dateFull        : {type: String}
                      },
    confirmInfo     : [],
    rating          : {
                        visitRating     : {type: Number, default: 0},
                        favRating       : {type: Number, default: 0},
                        shareRating     : {type: Number, default: 0}
                      },
    ratingsTotal    : {type: Number, default: 0},
    ofTheMonth      : {type: Number, default: 0},
    ofTheWeek       : {type: Number, default: 0},
    applicationDate : {type: String}
    
});

module.exports = mongoose.model("Post", postSchema);