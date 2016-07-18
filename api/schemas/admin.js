const
	mongoose 	=		require('mongoose'),
	_ 			=		require('lodash'),
	async 		=		require('async')
;

var adminSchema = new mongoose.Schema({
	adminId : {
		type : String,
		required : true,
		unique : true
	},
	username : {
		trim : true,
		lowercase : true,
		
		type : String,
		required : true,
		unique : true
	},
	name : {
		trim : true,
		
		type : String,
		required : true
	},
	password : {
		trim : true,

		type : String,
		required : true
	},
	authToken : {
		type : String,
		unique : true,
		sparse : true
	}
},{
	timestamps : true,
	collection : 'admins'
});

// Export mongoose model
module.exports = exports = mongoose.model('Admin', adminSchema);
