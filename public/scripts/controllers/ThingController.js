angular.module('meanapp').controller('ThingController', 
	['$scope', '$log', 'APIClient', 'URL', 'paths', 
	function($scope, $log, APIClient, URL, paths){

		// scope model init
		$scope.model= [];
		$scope.uiState = 'loading';
		$scope.url = URL.resolve;

        // controller start
        APIClient.getTextItems('thing').then(
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
	
	}]

);
