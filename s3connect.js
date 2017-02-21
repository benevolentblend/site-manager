const s3 = require('s3');
const AWS = require('aws-sdk');
const EventEmitter = require('events');

class MessageEmitter extends EventEmitter {}

const messageEmitter = new MessageEmitter();
// Load credentials and set region from JSON file
AWS.config.loadFromPath(`${__dirname}/config.json`);

var awsS3Client = new AWS.S3();
var options = {
  s3Client: awsS3Client,
  // more options available. See API docs below.
};
var client = s3.createClient(options);

var downloadParams = {
  localDir: "",
  deleteRemoved: false, // default false, whether to remove s3 objects
                       // that have no corresponding local file.

  s3Params: {
    Bucket: "kutvspotlite.club",
    Prefix: ""
  },
};

var uploadParams = {
  localDir: "",
  deleteRemoved: false, // default false, whether to remove s3 objects
                       // that have no corresponding local file.

  s3Params: {
    Bucket: "kutvspotlite.club",
    Prefix: "",
    ACL: "public-read"
  },
};


exports.upload = function(local) {
  if(!local) return;
  messageEmitter.emit('status', 'Uploading files to the server...');
  console.log("Uploading!!!!")
  uploadParams.localDir = local
  var uploader = client.uploadDir(uploadParams);
  uploader.on('error', function(err) {
    messageEmitter.emit('status', 'An error occurred with trying to upload.');
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    messageEmitter.emit('status', 'done.');
    console.log("done uploading");
  });
}

exports.download = function(local) {
  if(!local) return;
  messageEmitter.emit('status', 'Downloading files from the server...');
  downloadParams.localDir = local
  var uploader = client.downloadDir(downloadParams)
  uploader.on('error', function(err) {
    messageEmitter.emit('status', 'An error occurred with trying to download.');
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    messageEmitter.emit('status', 'done.');
    console.log("done downloading");
  });
}

exports.messager = messageEmitter;
