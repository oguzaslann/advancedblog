const validationFunction = {};

validationFunction.addArticle = (req, res, next) =>{

  dateFormat.masks.hammerTime = 'd mmmm dddd "/" yy "-" h:MM:ss TT';

  var title         = req.body.title,
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

      if(content == ""){
          validation.push("Yazınızı giriniz.")
      }

      if(sampleFile == ""){
          validation.push("Kapak fotoğrafı giriniz.")
      }

      if(showName == null){
          validation.push("Yayınlanırken isim tercihinizi giriniz.")
      }
  
  if(validation != ""){
        console.log(validation);
        res.json({success:false, response: validation});
    } else {
      next();
    }
};

module.exports = validationFunction;