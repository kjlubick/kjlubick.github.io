/*global angular*/

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.filters',
  'exceptionOverride'
]).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled:true,requireBase:false});
    //$locationProvider.hashPrefix("!");
    $routeProvider.when('/', { templateUrl: 'partials/front_page.html', controller: 'IndexCtrl' });
    $routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutCtrl' });
    $routeProvider.when('/blog', {
        templateUrl: 'partials/blog.html',
        controller: 'BlogCtrl'
    });
    $routeProvider.when('/blog/post/:id', {
        templateUrl: 'partials/single_post.html',
        controller: 'PostCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);


angular.module('exceptionOverride', []).factory('$exceptionHandler', function ($log) {
  return function (exception) {
    if (exception.message.indexOf('missing hash prefix "#!"') != -1) {
        var badURL = window.location.href;
        badURL = badURL.substring(0, badURL.indexOf('#')) + "#!" + badURL.substring(badURL.indexOf('#')+1);
        window.location.assign(badURL);
        window.location.reload(true);
        return true;
    }
    $log.error(exception.stack);
  };
});