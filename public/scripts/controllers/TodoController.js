angular.module('meanapp').controller('TodoController',
	['$scope', '$log', 'APIClient', 'URL', 'paths',
	function($scope, $log, APIClient, URL, paths){

		// scope model init
		$scope.model= [];
		$scope.uiState = 'loading';
		$scope.url = URL.resolve;

        // controller start
        APIClient.getTextItems().then(
    		function(data) {
    			if (data.length === 0) {
                	$scope.uiState = 'blank';
            	} else {
                	$scope.model = data.data;
                	$scope.uiState = 'ideal';
    			}
    		},
    		function() {
        		$scope.uiState = 'error';
        	}
		);
	
	}]

);