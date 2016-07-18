const
    express     	=     require('express'),
    mongoose    	=     require('mongoose'),
    bodyParser    	=     require('body-parser')
;

// Create express app
var app = express();
app.set('json spaces', 4);

// connect mongoose
mongoose.connect('mongodb://127.0.0.1/gitmeet');
mongoose.connection.on('err', function(){
    console.log('mongoose failed to connect : ' + err);
});


/*******************************************************************/

// Parse body to json
app.use(bodyParser.json());

// static routes
app.use('/bower', express.static(__dirname + '/bower_components'), function(req, res){
    res.sendStatus(404);
});
app.use('/assets', express.static(__dirname + '/assets'), function(req, res){
    res.sendStatus(404);
});
app.use('/templates', express.static(__dirname + '/templates'), function(req, res){
    res.sendStatus(404);
});


// Mini routers
app.use('/api', require(__dirname + '/api/routes'));


// Web routes
app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


/*******************************************************************/


app.listen(8881, function(){
    console.log('gitmeet template server is listening on 8881 port...');
    require("openurl").open("http://127.0.0.1:8881")
});