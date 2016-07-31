angular
.module('gitmeet')
.controller('admin-edit-post',
    ['_postData', '$scope', '$http', '$state', '$location', '$timeout',
    function(_postData, $scope, $http, $state, $location, $timeout){
   
    $scope.postData = _postData;
    $scope.isEdit = true;
    
    $timeout(function(){
        $('.stater-admin-edit-post .menu .item').tab();
    });

    $scope.savePost = function(){
        var authToken = window.localStorage.getItem('authToken');
        if(!authToken){
            return alert('You are not signed in.');
        }

    	$http({
    		url : '/api/admin/post/' + _postData.postId,
    		method : 'PUT',
    		data : $scope.postData,
            headers : {
                authToken :  authToken
            }
    	})
    	.then(function(res){
    		$location.url('/post/' + res.data.postId);
    	},
    	function(err){
            console.log(err.data);
    		alert(err.data);
    	});
    }


    $scope.deletePost= function(){
        if(!confirm('are you sure????')){
            return false;
        }

        var authToken = window.localStorage.getItem('authToken');
        if(!authToken){
            return alert('You are not signed in.');
        }

        $http({
            url : '/api/admin/post/' + _postData.postId,
            method : 'Delete',
            headers : {
                authToken :  authToken
            }
        })
        .then(function(res){
            $location.url('/');
        },
        function(err){
            console.log(err.data);
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