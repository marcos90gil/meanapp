angular.module('meanapp').directive('textItemAdd',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=',
				saveItem: '&',
				dateMode: '@'
			},
			templateUrl: 'views/textItemAdd.html',
		};
	}
);