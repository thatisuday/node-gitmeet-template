var webServer = require('../web-server');
var expect = require('chai').expect;
var http = require('http');

describe('Server', function(){
	it('should return 200', function(done){
		http.get('http://127.0.0.1:8881', function(res){
			expect(res.statusCode).to.equal(200);
			webServer.close(); // fallback : if doesn't closes
			done();
		}).on('error', function(e){
			throw new Error(e);
			done();
		});
	})
});