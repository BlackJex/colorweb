// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var router      =   express.Router();
// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/', router);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));

});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

var colori = require('./src/app/model/colori');
var funzioni = require('./funzioni.js');


router.route("/colore").get(function(req,res){
        var response = [];
        colori.find({},function(err,data){

           if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
               data.forEach(function (post, i) {
        response.push({
         id: i,
        codice: post.CODICE,
        h: post.H,
        s: post.S,
        l:post.L
       
      });
    });}
              
   res.json(response);
        });
    });
        


console.log("il colore è");
 colori.find().exec(function (err, docs) {
  if (err) return console.log(err);
 var output= [];
  for(i = 0; i < docs.length; i++) {
    var col1 = [docs[i].H, docs[i].S, docs[i].L];
    var e = [43, 41, 40];
    var deltae = funzioni.deltaEdaRgb(col1, e);
 

    if (deltae < 30) {
      
    
      console.log(i + ")DeltaE: " + deltae);

      var colore = docs[i].CODICE + ": " + docs[i].H + "," + docs[i].S + "," + docs[i].L + "";
      output[i] = deltae + ": "+ colore;
      console.log("il colore è", colore);
 
    }
  }
return output;
})
