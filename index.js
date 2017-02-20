var s3connect = require('./s3connect.js');

var uploadButton = document.getElementById('upload-button');
var downloadButton = document.getElementById('download-button');

uploadButton.addEventListener('click', s3connect.upload);
downloadButton.addEventListener('click', s3connect.download);
