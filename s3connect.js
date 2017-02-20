var s3 = require('s3');
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

var awsS3Client = new AWS.S3();
var options = {
  s3Client: awsS3Client,
  // more options available. See API docs below.
};
var client = s3.createClient(options);

var params = {
  localDir: `${__dirname}/public`,
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.

  s3Params: {
    Bucket: "kutvspotlite.club",
    Prefix: "",
    ACL: "public-read"
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

exports.upload = function() {
  console.log("Uploading!!!!");
  var uploader = client.uploadDir(params);
  uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}

exports.download = function() {
  console.log("Downloading!!!!");
  var uploader = client.uploadDir(params);
  uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done downloading");
  });
}
