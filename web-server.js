const
    express     	=     require('express'),
    mongoose    	=     require('mongoose'),
    bodyParser    	=     require('body-parser'),
    _    			=     require('lodash'),
    sm    			=     require('sitemap')
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


// API
app.use('/api', require(__dirname + '/api/routes'));


// Sitemap
var postModel = require('./api/schemas/post');
app.get('/sitemap.xml', function(req, res){
    postModel
    .find()
    .select('postId -_id')
    .exec(function(err, docs){
        if(err) return res.status(500).send(err);
        
        var urls  = _.map(docs, function(doc){
        	return {
        		url : '/post/' + doc.postId,
        		changefreq: 'weekly',
        		priority: 0.7
        	};
        });

        // create sitemap
        var hostname = 'http://gitmeet.com'; // change with your hostname
        var sitemap = sm.createSitemap({
        	hostname : hostname,
        	cacheTime : 600000,
        	urls : urls
        });

        res.set('Content-Type', 'application/xml');
        return res.send(sitemap.toString());
    });
});


// HTML
app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.min.html');
});


/*******************************************************************/

var server;
module.exports = server = app.listen(8881, function(){
    console.log('gitmeet template server is listening on 8881 port...');
});
