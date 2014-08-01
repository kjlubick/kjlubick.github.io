/*global angular, moment*/

angular.module('myApp.filters', []).
filter('relative_date', function() {
	return function(date) {
		return date ? moment(date).fromNow() : "";
	};
})
.filter('space_to_dash', function() {
	return function(title) {
		return title.replace(/\s/g,"-").toLowerCase();
	};
});
