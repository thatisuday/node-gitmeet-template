const
	mongoose 	=		require('mongoose'),
	_ 			=		require('lodash'),
	async 		=		require('async')
;

var postSchema = new mongoose.Schema({
	postId : {
		type : String,
		required : true,
		unique : true
	},
	title : {
		trim : true,

		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	content : {
		type : String,
		required : true
	},
	category : {
		type : String,
		required : true,
		enum : require('../constants/categories')
	},
	tags : {
		type : Array,
		default : [],
		set : function(v){
			if(_.isString(v)) return _.map(_.map(_.split(v, ','), _.trim), _.toLower);
			return v;
		}
	}
},{
	timestamps : true,
	collection : 'posts',
	toObject : {
		getters : true, virtuals : true
	}
});

// Create post id
postSchema.pre('validate', function(next){
	this.postId = _.kebabCase(this.title);
	next();
});

// Export mongoose model
module.exports = exports = mongoose.model('Post', postSchema);
