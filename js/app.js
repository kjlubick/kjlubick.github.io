/*global angular*/

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.filters'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'partials/front_page.html', controller: 'IndexCtrl' });
    $routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutCtrl' });
    $routeProvider.when('/blog', {
        templateUrl: 'partials/blog.html',
        controller: 'BlogCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);


