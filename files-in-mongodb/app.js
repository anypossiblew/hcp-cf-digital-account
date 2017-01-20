'use strict';

let express     = require('express');
let bodyParser  = require('body-parser');
let cfenv       = require('cfenv');
let fs          = require('fs');
let multer      = require('multer');
let streamBuffers = require('stream-buffers');
let mongoose    = require('mongoose');
let Grid        = require('gridfs-stream');

// create express instance
let oApp = express();

// Cloud Foundry environment variables
let oAppEnv = cfenv.getAppEnv();

oApp.use(bodyParser.json());

// connect to mongodb
require('./server/db/mongo-connect.js')(oAppEnv);
var MediaFile = require('./server/db/models/MediaFile.js');

var Schema = mongoose.Schema;
var conn = mongoose.connection;

Grid.mongo = mongoose.mongo;
var gfs;
conn.once('open', function () {
  console.log('open');
  gfs = Grid(conn.db);
});

var upload = multer();

oApp.post('/api/media/:id', upload.single('file'), function(req, res) {

  req.file.id = req.params.id;
  console.log(req.file);

  new MediaFile(req.file)
    .save(function (err, mediaFile) {
      if (err) {
          return res.status(500).send('Error occurred: database error');
      }

      var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
          frequency: 10,   // in milliseconds.
          chunkSize: 2048  // in bytes.
      });

      myReadableStreamBuffer.put(req.file.buffer);
      myReadableStreamBuffer.stop();

      // streaming to gridfs
      //filename to store in mongodb
      var writestream = gfs.createWriteStream({
          filename: 'w/'+req.params.id
      });
      myReadableStreamBuffer.pipe(writestream);
      // fs.write(writestream, req.file.buffer);
      writestream.on('close', function (file) {
          // do something with `file`
          console.log(file.filename + 'Written To DB');
      });

      res.json(mediaFile);
  });

});

oApp.get('/api/media/:id', function(req, res) {

  MediaFile.findOne({ id: req.params.id }, function (err, mediaFile) {
    if (err || mediaFile === null) {
        return res.status(500).send('Error occurred: database error');
    }

    res.set('Content-Type', mediaFile.mimetype);

    //read from mongodb
    var readstream = gfs.createReadStream({
         filename: 'w/'+req.params.id
    });
    readstream.pipe(res);
    res.on('close', function () {
         console.log('file has been written fully!');
    });

  });
});

// express app listener
oApp.listen(oAppEnv.port, function(){
    console.log('Server listening at ' + oAppEnv.url);
});
