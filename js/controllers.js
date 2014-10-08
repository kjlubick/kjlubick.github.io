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
//controller for a single post - ignores <!--end_preview--> tag
.controller('PostCtrl', function($scope, $routeParams, posts, $sce, $http) {
	//console.log($routeParams);

	$scope.post = _.find(posts, {id: $routeParams.id});

	if (!$scope.post) {
		$scope.post = _.find(posts, {id: "404"});
	}

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
//Fetches all blog posts, truncating them at the <!--end_preview--> location,
// with a read-more button
.controller('BlogCtrl', function($scope, $http, posts) {
	$scope.header.title = "thoughts@kjlubick.github.io";

	$scope.blogPosts = {
		posts: _(posts).reject({id : '404'}).sortBy("id").reverse().value()
	};

	var truncatePost = function(post, postData) {
		var breakpoint = postData.indexOf("<!--end_preview-->");
		if (breakpoint == -1) {
			post.html = postData;
		} else {
			post.html = postData.substring(0,breakpoint);
			post.html += '<a href="blog/post/';
			post.html += post.id;
			post.html += "?"+post.title.replace(/\s/g,"-").toLowerCase();
			post.html += '" class="btn btn-info" role="button">Read More</a>';
			post.html += "</div>";
				post.loaded = false;		//this forces a reload when we navigate to full
			}
		};

	//go fetch posts
	_.each($scope.blogPosts.posts, function(post)
	{
		if (!post.loaded) {
			post.loaded = true;
			$http({method: 'GET', url: post.source}).
			success(function(data) {
				truncatePost(post,data);
			
		}).
			error(function(data, status) {
				console.error("ERRROR with "+ post.source);
				console.error(data);
				console.log(status);
				post.html = "<div>Sorry, could not load post body.</div>";
			});
		}
		else {		//if post is loaded, just see if we need to re-truncate post
			truncatePost(post,post.html);
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
});


