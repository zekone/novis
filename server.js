var express = require("express");

var server = express();
server.use(express.static(__dirname + '/www'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));



server.set('views', __dirname + '/www/views/');
server.engine('.html', require('ejs').renderFile);
server.set('view engine', 'html');


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

    var items = req.body.items;
    items = JSON.parse( req.body.items );

    var Order = Parse.Object.extend("order");
    var order = new Order();

    var user = JSON.parse( req.body.user );
    user = user.objectId;



    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.get( user, {
      success: function(user) {
        // The object was retrieved successfully.
        var userobject = user;
        order.set("user_id", userobject);


        order.save(null, {
          success: function(r) {
            // The object was saved successfully.
            console.log("SUCCESSFULLY MADE ORDER");

            //now add each item into ordereditems rows
            for( var i=0; i < items.length; i++ ){
              var item = items[i];

              var OrderedItem = Parse.Object.extend("orderedItem");
              var ordereditem = new OrderedItem();

              var query = new Parse.Query(OrderedItem);
              query.get( items[i]['_id'], {
                success: function(res){
                  ordereditem.set("order_id", r.id);
                  ordereditem.set("inventory_id", res);

                  ordereditem.save(null, {
                    success: function(r){
                      console.log("SUCCESSFULLY SAVED ORDERITEM ROW");
                    },
                    error: function(r, error){
                      console.log("ERROR!!!!");
                      console.log(error);
                    }
                  });


                }, error: function(){} });

              }



          },
          error: function(r, error) {
            // The save failed.
            console.log(error);
            // error is a Parse.Error with an error code and message.
          }
        });

      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });



    //res.send(200);

    res.render('complete.html', {test: 'ahaha'} );
    /*
    RES.SEND(200 )

    res.send(
      {test: "test"}
    );

    res.writeHead(302, {
      'Location': '/complete'

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
