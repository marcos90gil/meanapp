angular.module("meanapp").filter("ago",
	[function() {
		return function(text) {
			return moment(text).fromNow();
		}
	}]
);