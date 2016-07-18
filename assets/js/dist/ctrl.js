angular
.module('gitmeet')
.controller('admin-add-post', ['$scope', '$http', '$state', '$location', '$timeout', function($scope, $http, $state, $location, $timeout){
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
}]);
angular
.module('gitmeet')
.controller('admin-edit-post', ['_postData', '$scope', '$http', '$state', '$location', '$timeout', function(_postData, $scope, $http, $state, $location, $timeout){
   
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
}]);
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
angular
.module('gitmeet')
.controller('post', ['_postData', '$scope', '$http', function(_postData, $scope, $http){
	// store post data
	$scope.postData = _postData;

	// store similar posts
	$scope.similarPosts = [];

	// Load similar posts
	$http({
		url : '/api/posts',
		method : 'GET',
		params : {
			ignore : _postData.postId,
			tags : _postData.tags,
			limit : 6
		}
	})
	.then(function(res){
		$scope.similarPosts = res.data;
	});
}]);
angular
.module('gitmeet')
.controller('posts', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

	// score posts in `posts` var
	$scope.posts = [];

	// set to `true` on posts fetch complete
	$scope.postLoaded = false;

	// query string param to send with request
	// skip and limit counters
	$scope.params = {
		skip : 0,
		limit : 10,
	}

	// if category page, add category to request
	if(_.has($stateParams, 'category')){
		$scope.params.category = $stateParams.category;
	}

	// post loader ajax function
	($scope.loadPosts = function(more){
		// if more is true, append posts
		if(more){
			$scope.params.skip = $scope.params.skip + $scope.params.limit;
		}

		$http({
			url : '/api/posts',
			method : 'GET',
			params : $scope.params
		})
		.then(function(res){
			$scope.posts = _.concat($scope.posts, res.data);
			$scope.postLoaded = true;
		})
	})(false);	
}]);