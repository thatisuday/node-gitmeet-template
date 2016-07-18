angular
.module('gitmeet')
.controller('admin-signin', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout){
    $scope.signinData = {};
    
    $scope.signin = function(){
    	$http({
    		url : '/api/admin/signin',
    		method : 'POST',
    		data : $scope.signinData
    	})
    	.then(function(res){
    		window.localStorage.setItem('authToken', res.data);
    		$timeout(function(){
                $state.go('admin-add-post');
            }, 1000);
    	},
    	function(err){
    		if(err.status == 500) return alert(err.data);
    		if(err.status == 401) return alert('username not valid.');
    		if(err.status == 403) return alert('password not valid.');
    		if(err.status == 406) return alert('no data received.');
    	});
    }
}]);