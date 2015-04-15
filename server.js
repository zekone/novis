var express = require("express");

var server = express();
server.use(express.static(__dirname + '/www'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));


var bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({
  extended: true
}));

var port = 9000;
server.listen(port, function(){
  console.log("listening on port " + port);
});



server.post('/postTest', function(req, res) {
    console.log('inside test stuff');
    console.log(req);


    // var lines = req.body.items.split('\n');
    // for(var i = 0;i < lines.length;i++){
    //     //code here using lines[i] which will give you each line
    //     console.log(lines[i]);
    // }

    console.log(req.body.items);
    console.log("USER: ");
    console.log(req.body.user);


    /* redirect handling for successful checkout

    res.writeHead(302, {
      'Location': '/'

    });
    res.end();
    
    */
});



var Parse = require('parse').Parse;
Parse.initialize("1j0E51dRpLZBq2NhkYgxX87Cqxa2hPihxz4BMOQ1", "BbW4ni8kpXCauNMqWgI86ec7Exqq4AAeTqoPuEiy");

var query = new Parse.Query(Parse.User);
query.find({
  success: function(users) {
    for (var i = 0; i < users.length; ++i) {
//      console.log(users[i].get('username'));
    }
  }
});
