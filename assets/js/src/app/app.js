// Create gitmeet module
angular.module(
    'gitmeet',
    [
        'ngAnimate',
        'ui.router',
        'yaru22.md',
        'yaru22.angular-timeago',
        'thatisuday.ui-stater',
        'ngDisqus'
    ]
);

// Configure dependencies
angular
.module('gitmeet')
.config(
    ['$locationProvider', '$urlRouterProvider', '$stateProvider', '$disqusProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider, $disqusProvider){

        //disqus
        $disqusProvider.setShortname('gitmeet');

        // ui-router
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url : '/',
            controller : 'posts',
            templateUrl : '/templates/posts.html'
        })
        .state('category', {
            url : '/category/:category',
            controller : 'posts',
            templateUrl : '/templates/posts.html'
        })
        .state('tag', {
            url : '/tag/:tag',
            controller : 'posts',
            templateUrl : '/templates/posts.html'
        })
        .state('search', {
            url : '/search/:search',
            controller : 'posts',
            templateUrl : '/templates/posts.html'
        })
        .state('post', {
            url : '/post/:postId',
            controller : 'post',
            templateUrl : '/templates/post.html',
            resolve : {
                _postData : ['$stateParams', '$http', '$state', '$timeout', '$window', function($stateParams, $http, $state, $timeout, $window){
                    return $http.get('/api/post/' + $stateParams.postId).then(function(res){
                        $timeout(function(){
                            $window.scroll(0, 0);
                        });

                        return res.data;
                    }, function(){
                        return $state.go('home');
                    });
                }]
            }
        })
        .state('about', {
            url : '/about-me',
            templateUrl : '/templates/about.html'
        })
        .state('admin-signin', {
            url : '/admin/signin',
            controller : 'admin-signin',
            templateUrl : '/templates/admin/signin.html',
            resolve : {
                _admin : ['$auth', '$state', function($auth, $state){
                    return $auth.then(function(){
                        return $state.go('admin-add-post');
                    }, angular.noop);
                }]
            }
        })
        .state('admin-add-post', {
            url : '/admin/add-post',
            controller : 'admin-add-post',
            templateUrl : '/templates/admin/post.html',
            resolve : {
                _admin : ['$auth', '$state', function($auth, $state){
                    return $auth.then(angular.noop, function(){
                        return $state.go('admin-signin');
                    });
                }]
            }
        })
        .state('admin-edit-post', {
            url : '/admin/edit-post/:postId',
            controller : 'admin-edit-post',
            templateUrl : '/templates/admin/post.html',
            resolve : {
                _admin : ['$auth', '$state', function($auth, $state){
                    return $auth.then(angular.noop, function(){
                        return $state.go('admin-signin');
                    });
                }],
                _postData : ['$stateParams', '$http', function($stateParams, $http){
                    return $http.get('/api/post/' + $stateParams.postId).then(function(res){
                        return res.data;
                    });
                }]
            }
        })
        ;

    }]
);


// Custom directives
angular
.module('gitmeet')
.directive('gmPost', function(){
    return {
        restrict : 'A',
        replace : false,
        templateUrl : '/templates/post-item.html'
    }
});


// Auth check service
angular
.module('gitmeet')
.factory('$auth', ['$http', '$q', function($http, $q){
    return $http({
        url : '/api/admin/check-session',
        method : 'GET',
        headers : {
            authToken : window.localStorage.getItem('authToken') || null
        }
    });
}]);
