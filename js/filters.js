/*global angular, moment*/

angular.module('myApp.filters', []).
filter('relative_date', function() {
	return function(date) {
		return date ? moment(date).fromNow() : "";
	};
});
