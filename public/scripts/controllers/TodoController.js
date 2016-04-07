angular.module('meanapp').controller('TodoController',
	['$scope', '$log', '$filter', 'APIClient', 'URL', 'paths',
	function($scope, $log, $filter, APIClient, URL, paths){

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
        $scope.saveItem = function() {
            var itemNew = {};
            itemNew.title = $scope.model.title;
            itemNew.body = $scope.model.body;
            itemNew.upload_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            itemNew.type = 'todo';
            console.log('New Item:', itemNew);
            APIClient.createTextItem(itemNew).then(
                function(item) {
                    //$scope.model.push(item);
                    $scope.itemForm.$setPristine();
                },
                function(error) {
                    console.log('An error occurred', error);
                }
            );
        };
	
	}]

);