//      * Specification variable to place the file in the './uploads/' directory and what to call them
//      */
//     var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname)      //new Date().toISOString() converts the current date to a string
//     }
//   });
  
// /**
//  * Specification variable to filter for the file types that can be uploaded to posts
//  */
// const fileFilter = function (req, file, cb) {
//     var fileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword',                           //File types that are allowed
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',                                      //.jpeg, .png, .pdf, .doc, .docx, .ppt, .pptx
//       'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  
//     if (fileTypes.indexOf(file.mimetype) > -1) {     //Checks to see if file.mimetype is in the fileFilter array
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
// //   };
  
//   /**
//    * Adds the specification variables to 'multer' and saves them in the upload variable
//    */
//   var upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 10       //Sets the file size limit to 10MB
//     },
//     fileFilter: fileFilter
//   });    