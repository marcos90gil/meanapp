angular.module('meanapp').controller('ThingController', 
	['$scope', '$log', '$filter', 'APIClient', 'URL', 'paths', 
	function($scope, $log, $filter, APIClient, URL, paths){

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

        // add item
        $scope.saveItem = function(model) {
            var itemNew = {};
            itemNew.title = model.title;
            itemNew.body = model.body;
            itemNew.upload_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            itemNew.type = 'thing';
            console.log('New Item:', itemNew);
            APIClient.createTextItem(itemNew).then(
                function(item) {
                    console.log('Item added');
                },
                function(error) {
                    console.log('An error occurred', error);
                }
            );
        };
	
	}]

);
