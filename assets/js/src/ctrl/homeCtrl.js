angular
.module('gitmeet')
.controller('home', ['$scope', '$location', function($scope, $location){
	
	// Open search dialog
	// and redirect user to search page
	$scope.openSearch = function(){
		var query = prompt('What do you want to search?', 'type here...');
		$location.url('/search/' + query);
	}
}]);