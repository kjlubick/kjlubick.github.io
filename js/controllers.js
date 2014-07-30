/*global angular*/

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('IndexCtrl', ['$rootScope', function($rootScope) {
  	$rootScope.title = "kjlubick@github.io";

  }])
  .controller('AboutCtrl', ['$rootScope', function($rootScope) {
  	$rootScope.title = "kjlubick@github.io";

  }])
  .controller('BlogCtrl', ['$rootScope', '$scope', '$http', '$sce', function($rootScope, $scope, $http, $sce) {
	$rootScope.title = "thoughts@kjlubick.github.io";

	$scope.renderHtml = function(postIndex) {
		return $sce.trustAsHtml("<h1>Hello Blog Post" +postIndex+"! </h1>");
	};
  }]);
