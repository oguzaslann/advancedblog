const   User        = require('../models/userModel'),
        Post        = require('../models/postModel');

const middlewareFunction = {};

//LOGİN CONFİRM
middlewareFunction.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/about");
}

//POSTS SHOW
middlewareFunction.postFind = (query, skip, limit, sort) => {

	return new Promise((resolve, reject) => {

		Post.find(query)
		.skip(skip)
		.limit(limit)
		.sort(sort)
		.exec( (err, result) => {
			if(err)
				return reject(err);

			resolve(result);
		});      
	});     
};

middlewareFunction.countDocuments = (query) => {

	return new Promise((resolve, reject) => {

		Post.countDocuments(query)
		.exec( (err, result) => {
			if(err)
				return reject(err);

			resolve(result);
		});      
	});     
};


//USERS SHOW
middlewareFunction.userFind = (query) => {

	return new Promise((resolve, reject) => {

		User.find(query)
		.exec( (err, result) => {
			if(err)
				return reject(err);

			resolve(result);
		});      
	});     
};

//Aggregate
middlewareFunction.postAggregate = (username) => {

	return new Promise((resolve, reject) => {

		Post.aggregate(
            [
              {
                $group:
                  {
                    "_id"			: {"username": username},
					"visitRating"   : { $sum: "$rating.visitRating"},
					"favRating"		: { $sum: "$rating.favRating"},
					"ratingsTotal"  : { $sum: "$ratingsTotal"}
                  }
              }
            ]
         )
		.exec( (err, result) => {
			if(err)
				return reject(err);

			resolve(result);
		});      
	});     
};


module.exports =  middlewareFunction;
