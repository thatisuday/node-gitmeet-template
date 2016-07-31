angular
.module('gitmeet')
.controller('admin-add-post',
    ['$scope', '$http', '$state', '$location', '$timeout',
    function($scope, $http, $state, $location, $timeout){
    
    $scope.postData = {
        content : "#Hello World!" 
    };
    
    $timeout(function(){
        $('.stater-admin-add-post .menu .item').tab();
    });

    $scope.savePost = function(){
        var authToken = window.localStorage.getItem('authToken');
        if(!authToken){
            return alert('You are not signed in.');
        }

    	$http({
    		url : '/api/admin/post',
    		method : 'POST',
    		data : $scope.postData,
            headers : {
                authToken :  authToken
            }
    	})
    	.then(function(res){
    		if(res.status == 201){
                return $location.url('/post/' + res.data.postId);
            }

            return alert(res.data);
    	},
    	function(err){
    		alert(err.data);
    	});
    }


    /*
     *  dropzone
    **/
    $scope.dzOptions = {
        url : '/api/image',
        previewsContainer : false,
        clickable : '#add-image',
        headers : {
            authToken :  window.localStorage.getItem('authToken')
        }
    };

    $scope.dzCallbacks = {
        'success' : function(file, url){
            window.prompt('copy url', url);
        }
    };
}]);