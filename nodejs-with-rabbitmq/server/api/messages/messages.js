'use strict';

let amqp = require('amqp');

function rabbitUrl() {
  if (process.env.VCAP_SERVICES) {
    var svcInfo = JSON.parse(process.env.VCAP_SERVICES);
    for (var label in svcInfo) {
      var svcs = svcInfo[label];
      for (var index in svcs) {
        var uri = svcs[index].credentials.uri;
        if (uri.lastIndexOf("amqp", 0) == 0) {
          return uri;
        }
      }
    }
    return null;
  }
  else {
    return "amqp://localhost";
  }
}

var messages = [];

function httpServer(exchange, oApp) {

    oApp.get('/api/message', function (req, res) {
        res.json(messages);
    });

    oApp.get('/api/message/:id', function (req, res) {
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].id === req.params.id) {
                res.json(messages[i]);
                break;
            }
        }
    });

    oApp.post('/api/message', function (req, res) {
        for(var i = 0; i < req.body.result.length; i++) {
            var event = req.body.result[i];

            exchange.publish('', event);
        }

        res.json({info: "ok!"});
    });

}


module.exports = function (oApp) {

    var conn = amqp.createConnection({url: rabbitUrl()});

    conn.on('ready', function() {
        var exchange = conn.exchange('cf-da', {'type': 'fanout', durable: true}, function() {
            var queue = conn.queue('line', {durable: true, exclusive: true},
                function() {
                  queue.subscribe(function(msg) {
                    messages.push(msg);
                  });
                  queue.bind(exchange.name, '');
                });
            queue.on('queueBindOk', function() { 
                console.log("Queue bind ok!");
                httpServer(exchange, oApp); 
            });
        });
    });
    
};