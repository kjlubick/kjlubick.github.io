/*global angular*/

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('IndexCtrl', ['$rootScope', function($rootScope) {
  	$rootScope.title = "kjlubick@github.io";

  }])
  .controller('AboutCtrl', ['$rootScope', function($rootScope) {
  	$rootScope.title = "kjlubick@github.io";

  }])
  .controller('BlogCtrl', ['$rootScope', function($rootScope) {
	$rootScope.title = "thoughts@kjlubick.github.io";
  }]);
