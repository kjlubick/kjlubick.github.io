/*global angular, _*/

/* Controllers */

angular.module('myApp.controllers', ['myApp.posts'])
.controller('HeaderCtrl', function($scope, $location) {
	$scope.header = {
		title : "kjlubick@github.io"
	};

	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
})

.controller('IndexCtrl', function($scope) {
	$scope.header.title = "kjlubick@github.io";

})
.controller('AboutCtrl', function($scope) {
	$scope.header.title = "kjlubick@github.io";

})
.controller('PostCtrl', function($scope, $routeParams, posts, $sce, $http) {
	//console.log($routeParams);

	$scope.post = _.find(posts, {id: $routeParams.id});

	$scope.header.title = $scope.post.title + " kjlubick@github.io";
	if (!$scope.post.loaded) {
			$scope.post.loaded = true;
			$http({method: 'GET', url: $scope.post.source}).
			success(function(data) {
			$scope.post.html = data;
		}).
			error(function(data, status) {
				console.error("ERRROR with "+ $scope.post.source);
				console.error(data);
				console.log(status);
				$scope.post.html = "<div>Sorry, could not load post body.</div>";
			});
		}

	$scope.renderHtml = function(post) {
		return $sce.trustAsHtml(post.html);
	};
})
.controller('BlogCtrl', function($scope, $http, posts) {
	$scope.header.title = "thoughts@kjlubick.github.io";

	$scope.blogPosts = {
		posts: posts
	};

	//go fetch posts
	_.each($scope.blogPosts.posts, function(post)
	{
		if (!post.loaded) {
			post.loaded = true;
			$http({method: 'GET', url: post.source}).
			success(function(data) {
			post.html = data;
		}).
			error(function(data, status) {
				console.error("ERRROR with "+ post.source);
				console.error(data);
				console.log(status);
				post.html = "<div>Sorry, could not load post body.</div>";
			});
		}
	});
}).directive('blogPost', function() {
	return {
		restrict: 'E',
		scope: {
			post: '=post'
		},
		templateUrl: 'partials/blog_post.html',
		controller: function($scope, $sce) {
			$scope.renderHtml = function(post) {
				return $sce.trustAsHtml(post.html);
			};
		}
		
	};
})
;
