const _ = require('lodash');
const express = require('express');
const app = express();

const stores = require('./data/stores.js');

// if you have some query parameters that are not vital to the display, just list them here and check for them later
const possibleQueryVars = [
  'servicename'
];

app.get('/', function(req, res){
  res.send('Hello World!')
});

app.get('/api/stores', function(req, res){
  var response = [];
  console.log(req.query)

  // this would usually adjust your database query
  if(typeof req.query.servicename != null){
    stores.filter(function(stores){
      if(stores.servicename.toString() == req.query.servicename){
        response.push(stores);
      }
    });
  }
  // this would usually adjust your database query
  //if(typeof req.query.location != 'undefined'){
    //stores.filter(function(stores){
     // if(stores.location === req.query.location){
       // response.push(stores);
      //}
    //});
  //}

  // de-duplication:
  response = _.uniqBy(response, 'id');

  // in case no filtering has been applied, respond with all stores
  if(Object.keys(req.query).length === 0){
    response = stores;
  }

  res.json(response);
});

app.listen(3009, function(){
  console.log('Example app listening on port 3009!')
});