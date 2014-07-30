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

	$scope.blogPosts = {
		source: ["blog_posts/fb-tutorial.html", "old_app/CognitiveDimensionsByExample.html"],
		html: ["<div>Loading...</div>","<div>Loading...</div>"]
	};


	$http({method: 'GET', url: $scope.blogPosts.source[0]}).
    success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      console.log("Sucess with "+ $scope.blogPosts.source[0]);
    	//console.log(data);
    	//console.log(status);
    	$scope.blogPosts.html[0] = data;
    }).
    error(function(data, status) {
    	console.log("ERRROR with "+ $scope.blogPosts.source[0]);
    	console.err(data);
    	console.log(status);
    	$scope.blogPosts.html[0] = "<div>Sorry, could not load post.</div>";
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

	$scope.renderHtml = function(postIndex) {
		return $sce.trustAsHtml($scope.blogPosts.html[postIndex]);
	};
  }]);
