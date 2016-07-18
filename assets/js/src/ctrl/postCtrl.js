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