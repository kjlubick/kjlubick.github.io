/*global angular*/

angular.module('myApp.posts', []).
  value('posts', [
		/*{
			id: 'n',
			title: "",
			author: { name: "Kevin Lubick" },
			pub_date: new Date('May 20, 2014 23:00:00'),
			tags: ["",""],
			excerpt: "",
			source : "blog_posts/fb-tutorial.html",
			loaded : false,
			html : "<div>Loading...</div>"
			]
		} */
		{
			id: '404',
			title: "Post not found",
			loaded : true,
			html : "<div> Sorry, the post you were looking for doesn't exist... </div>"
		},
		{
			id: '1',
			title: "Building my First Findbugs Detector",
			author: { name: "Kevin Lubick" },
			pub_date: new Date('May 20, 2014 23:00:00'),
			tags: ["FindBugs", "fb-contrib", "tutorial", "verbose"],
			excerpt: "My less-than-legendary, yet successful story of building a <a href='http://findbugs.sourceforge.net/'>FindBugs</a> plugin to detect ExecutorServices that have not been properly shutdown.  <a href='https://github.com/mebigfatguy/fb-contrib/pull/14'>End result</a>.",
			source : "blog_posts/fb-tutorial.html",
			loaded : false,
			html : "<div>Loading...</div>"
		},
		{
			id: '2',
			title: "Upgraded the site to use Angular.js",
			author: { name: "Kevin Lubick" },
			pub_date: new Date('Aug 5, 2014 12:00:00'),
			tags: ["website", "AngularJS"],
			excerpt: "The site is now modernish, using AngularJS",
			source : "blog_posts/angular-update.html",
			loaded : false,
			html : "<div>Loading...</div>"
		},

		{
			id: '3',
			title: "Building your first Eclipse quick fix",
			author: { name: "Kevin Lubick" },
			pub_date: new Date(),
			tags: ["fb-contrib", "tutorial", "verbose", "Eclipse", "quickfix" ],
			excerpt: "How to make an Eclipse quick fix building off of the FindBugs architecture",
			source : "blog_posts/quickfix-tutorial-1.html",
			loaded : false,
			html : "<div>Loading...</div>"
		}

		]);