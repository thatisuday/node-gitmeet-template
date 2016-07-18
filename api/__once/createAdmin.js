const
    express     =       require('express'),
    mongoose    =       require('mongoose'),
    bcryptjs    =       require('bcryptjs')
;

// connect mongoose
mongoose.connect('mongodb://127.0.0.1/gitmeet');
mongoose.connection.on('err', function(){
    console.log('mongoose failed to connect : ' + err);
});

var router = express.Router();
var adminModel = require('../schemas/admin');

var admin = new adminModel({
    adminId : 'afk1992',
    name : 'Uday Hiwarale',
    username : 'thatisuday',
    password : bcryptjs.hashSync('abc123456', 8)
});

admin.save(function(err, doc){
    if(err) return console.log(err);
    return console.log('done...');
});