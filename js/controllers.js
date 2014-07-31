/*global angular, moment, _*/

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
		posts: [
		/*{
			id: 'n',
			title: "",
			author: { name: "Kevin Lubick" },
			date: new Date('4-28-2014 13:00:00'),
			tags: ["",""],
			excerpt: "",
			bodyArr:[
			"",
			""
			]
		} */
		{
			id: '1',
	        title: "Building my First Findbugs Detector",
	        author: { name: "Kevin Lubick" },
	        pub_date: new Date('5-20-2014 23:00:00'),
			tags: ["FindBugs", "fb-contrib", "tutorial", "verbose"],
	        excerpt: "My less-than-legendary, yet successful story of building a <a href='http://findbugs.sourceforge.net/'>FindBugs</a> plugin to detect ExecutorServices that have not been properly shutdown.  <a href='https://github.com/mebigfatguy/fb-contrib/pull/14'>End result</a>.",
			source : "blog_posts/fb-tutorial.html",
			html : "<div>Loading...</div>"
		}

		]
	};

	//go fetch posts
	_.each($scope.blogPosts.posts, function(post)
	{
		$http({method: 'GET', url: post.source}).
		success(function(data) {
			//console.log("Sucess with "+ post.source);
			post.html = data;
		}).
		error(function(data, status) {
			console.error("ERRROR with "+ post.source);
			console.error(data);
			console.log(status);
			post.html = "<div>Sorry, could not load post body.</div>";
		});
	});

	$scope.renderHtml = function(post) {
		console.log(post.pub_date);
		return $sce.trustAsHtml(post.html);
	};

	$scope.relativeFormat = function(date) {
		return moment(date).fromNow();
	};

  }]);
