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

	// if category page, add category to the request
	if(_.has($stateParams, 'category')){
		$scope.params.category = $stateParams.category;
	}

	// if tag page, add tags to the request
	if(_.has($stateParams, 'tag')){
		$scope.params.tags = $stateParams.tag;
	}

	// if search page, add search to the request
	if(_.has($stateParams, 'search')){
		$scope.params.search = $stateParams.search;
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