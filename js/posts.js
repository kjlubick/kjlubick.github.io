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
			id: '1',
			title: "Building my First Findbugs Detector",
			author: { name: "Kevin Lubick" },
			pub_date: new Date('May 20, 2014 23:00:00'),
			tags: ["FindBugs", "fb-contrib", "tutorial", "verbose"],
			excerpt: "My less-than-legendary, yet successful story of building a <a href='http://findbugs.sourceforge.net/'>FindBugs</a> plugin to detect ExecutorServices that have not been properly shutdown.  <a href='https://github.com/mebigfatguy/fb-contrib/pull/14'>End result</a>.",
			source : "blog_posts/fb-tutorial.html",
			loaded : false,
			html : "<div>Loading...</div>"
		}

		]);