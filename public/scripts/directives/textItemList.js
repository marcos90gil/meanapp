angular.module('meanapp').directive('textItemList',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=',
				changeItemState: '&',				
				deleteAll: '&',
				deleteItem: '&',
				dateMode: '@'
			},
			templateUrl: 'views/textItemList.html'
		};	
	}
);