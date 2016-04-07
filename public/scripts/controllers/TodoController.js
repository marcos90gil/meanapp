angular.module('meanapp').controller('TodoController',
	['$scope', '$log', 'APIClient', 'URL', 'paths',
	function($scope, $log, APIClient, URL, paths){

		// scope model init
		$scope.model= [];
		$scope.uiState = 'loading';
		$scope.url = URL.resolve;

        // controller start
        APIClient.getTextItems('todo').then(
    		function(data) {
                if (data.length === 0) {
                	$scope.uiState = 'blank';
            	} else {
            	   $scope.model = data;
                   $scope.uiState = 'ideal';
    			}
    		},
    		function() {
        		$scope.uiState = 'error';
        	}
		);

        // add item
        $scope.saveItem = function(item) {

            APIClient.createTextItem(item).then(
                function(item) {
                    $scope.model.push(item);
                    $scope.itemForm.$setPristine();
                },
                function(error) {
                    console.log('An error occurred', error);
                }
            );
        };
	
	}]

);