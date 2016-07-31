// Do not auto discover dropzones
Dropzone.autoDiscover = false;

// Create gitmeet module
angular.module(
    'gitmeet',
    [
        'ngAnimate',
        'ui.router',
        'yaru22.md',
        'yaru22.angular-timeago',
        'thatisuday.ui-stater',
        'ngDisqus',
        'ui.router.metatags',
        'thatisuday.dropzone'
    ]
);

/****************************************************************/

// Configure dependencies
angular
.module('gitmeet')
.config(
    ['$locationProvider', '$urlRouterProvider', '$stateProvider', '$disqusProvider', 'UIRouterMetatagsProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider, $disqusProvider, UIRouterMetatagsProvider){

        //disqus
        $disqusProvider.setShortname('gitmeet');


        // ui-router meta tags
        UIRouterMetatagsProvider
        .setTitleSuffix(' | GitMeet - web essentials__ from frontend to backend')
        .setDefaultTitle('GitMeet - web essentials__ from frontend to backend')
        .setDefaultDescription('All web development essential topics and discussions. html, css, javascript, node.js, angular, jQuery, sass, typescript, mongodb, continuous integration, mocha & chai, gulp and more.')
        .setDefaultKeywords('html, css, javascript, node.js, angular, jQuery, sass, typescript, mongodb, continuous integration, mocha & chai, gulp')
        ;


        // ui-router states
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url : '/',
            controller : 'posts',
            templateUrl : '/templates/posts.html',
            metaTags : {
                
            }
        })
        .state('category', {
            url : '/category/:category',
            controller : 'posts',
            templateUrl : '/templates/posts.html',
            metaTags : {
                title : ['$stateParams', function($stateParams){
                    return _.upperFirst($stateParams.category);
                }]
            }
        })
        .state('tag', {
            url : '/tag/:tag',
            controller : 'posts',
            templateUrl : '/templates/posts.html',
            metaTags : {
                title : ['$stateParams', function($stateParams){
                    return $stateParams.tag;
                }]
            }
        })
        .state('search', {
            url : '/search/:search',
            controller : 'posts',
            templateUrl : '/templates/posts.html',
            metaTags : {
                title : ['$stateParams', function($stateParams){
                    return $stateParams.search;
                }]
            }
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
            },
            metaTags : {
                title : ['_postData', function(_postData){
                    return _postData.title;
                }],
                description : ['_postData', function(_postData){
                    return _postData.description;
                }],
                keywords : ['_postData', function(_postData){
                    return _postData.tags.join(',');
                }]
            }
        })
        .state('about', {
            url : '/about-me',
            templateUrl : '/templates/about.html',
            metaTags : {
                title : 'Uday Hiwarale',
                description : 'Today, I work with small team to help people build their dream homes through an online platform \'ArchiBiz\'. It\'s still under development phase. I try to learn everyday and contribute back to the community at \'www.github.com/thatisuday\'. I am just a beginner and I wish to know more everyday. I follow Linus Torvalds very closely and one day believe to become technology philanthropist like him.'
            }
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
            templateUrl : '/templates/admin/post.html'
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

/****************************************************************/

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

/****************************************************************/

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

/****************************************************************/

// constants
angular
.module('gitmeet')
.constant('__home_ignore_categories', ['life', 'news']);

/****************************************************************/

// App run block
angular
.module('gitmeet')
.run(['$rootScope', '$http', 'MetaTags', function($rootScope, $http, MetaTags){
    // ui-router meta tags
    $rootScope.MetaTags = MetaTags;

    // Add categories to $rootScope
    $http.get('/api/categories').then(function(res){
        $rootScope.categories = res.data;
    });
}]);