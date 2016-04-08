angular.module('meanapp').directive('textItemList',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=items',
				deleteItem: '&',
				dateMode: '@'
			},
			templateUrl: 'views/textItemList.html'
		};
	}
);