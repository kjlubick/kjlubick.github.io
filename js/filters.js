/*global angular, moment*/

angular.module('myApp.filters', []).
filter('relative_date', function() {
	return function(date) {
		return moment(date).fromNow();
	};
});
