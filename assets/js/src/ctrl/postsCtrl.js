angular
.module('gitmeet')
.controller('posts',
	['__home_ignore_categories', '$scope', '$http', '$state', '$stateParams',
	function(__home_ignore_categories, $scope, $http, $state, $stateParams){

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

	// if home controller, remove `life` & `news` category from posts
	if($state.current.name == 'home'){
		$scope.params.nCategories = __home_ignore_categories;
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