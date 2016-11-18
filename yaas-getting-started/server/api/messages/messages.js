'use strict';

module.exports = function (oApp) {

    let message = require('../../db/models/message.js');

    // for testing getting information from YaaS
    oApp.get('/api/yaas', function (req, res) {
      res.json({
        reqMethod: req.method,
        reqUrl: req.url,
        reqHeaders: req.headers
      });
    });

    oApp.get('/api/message', function (req, res) {
        message.find(function (err, messages) {
            if (err) {
                return res.status(500).send('Error occurred: database error');
            }

            res.json(messages.map(function (message) {
                return {
                    id: message.id,
                    createdTime: message.createdTime,
                    eventType: message.eventType,
                    text: message.text,
                    created: message.created
                };
            }));
        });
    });

    oApp.get('/api/message/:id', function (req, res) {
        message.findOne({ id: req.params.id }, function (err, message) {
            if (err || message === null) {
                return res.status(500).send('Error occurred: database error');
            }

            res.json({
                id: message.id,
                createdTime: message.createdTime,
                eventType: message.eventType,
                text: message.text,
                created: message.created
            });
        });
    });

    oApp.post('/api/message', function (req, res) {

      //checkRequestHeader();

      for(var i = 0; i < req.body.result.length; i++) {
    		var event = req.body.result[i];

    		new message({
	            id: event.id,
	            createdTime: event.createdTime,
	            eventType: event.eventType,
	            text: event.content.text
	        }).save(function (err, message) {
	            if (err) {
	                return res.status(500).send('Error occurred: database error');
	            }
	            res.json({
	                id: message.id
	            });
	        });
    	}
    });

    oApp.delete('/api/message/:id', function (req, res) {
        message.remove({ id: req.params.id }, function (err) {
            if (err) {
                return res.status(500).send('Error occurred: database error');
            }

            return res.send();
        });
    });

    oApp.put('/api/message/:id', function(req,res){
        message.update({
            id: req.params.id
        }, {
            created: req.body.created
        }, function(err){
            if(err){
                return res.status(500).send('Error occurred: database error');
            }
            res.send();
        });
    });

};
