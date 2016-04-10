angular.module('meanapp').directive('textItemList',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=',
				deleteAll: '&',
				deleteItem: '&',
				dateMode: '@'
			},
			templateUrl: 'views/textItemList.html',
			link: function (scope) {
            	scope.changeItemState = function () {
        			scope.itemState = 'done';
				};
			}
		};	
	}
);