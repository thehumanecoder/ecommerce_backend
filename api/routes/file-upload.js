var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey:'P4o4Fu/EMRTbfovSy8JRvkjJz/LEivEgJobvgi9a',
    accessKeyId:'AKIAJF7PERJNPV6OJBLQ',
    region:'us-east-2'
});
 
var s3 = new aws.S3()
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pacecart-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;
