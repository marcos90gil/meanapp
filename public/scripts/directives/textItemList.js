angular.module('meanapp').directive('textItemList',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=items',
				dateMode: '@'
			},
			templateUrl: 'views/textItemList.html'
		};
	}
);