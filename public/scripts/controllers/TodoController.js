angular.module('meanapp').controller('TodoController',
	['$scope', '$log', '$filter', 'APIClient', 'URL', 'paths',
	function($scope, $log, $filter, APIClient, URL, paths){

		// scope model init
		$scope.model= [];
		$scope.uiState = 'loading';
        $scope.itemState = 'todo';
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
        $scope.saveItem = function(model) {
            
            var itemNew = {};
            
            itemNew.title = model.title;
            itemNew.body = model.body;
            itemNew.upload_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            itemNew.type = 'todo';
            
            APIClient.createTextItem(itemNew).then(
                function(item) {
                    $scope.model.push(itemNew);
                    console.log('Item added');
                },
                function(error) {
                    console.log('An error occurred', error);
                }
            );
        };

        // delete all
        $scope.deleteAll = function(id) {

            APIClient.deleteAllTextItems().then(
                function() {
                    console.log('All items deleted');
                    $scope.model = [];
                },
                function(error) {
                    console.log('An error occurred while deleting all items', error);
                }    
            );
        };

        // delete item
        $scope.deleteItem = function(id) {

            APIClient.deleteTextItem(id).then(
                function() {
                    console.log('Item deleted');
                    for (let index=0; index < $scope.model.length; index++) {
                        if ($scope.model[index]['_id'] === id) {
                            $scope.model.splice(index, 1);
                        }   
                    }
                },
                function(error) {
                    console.log('An error occurred while deleting item', error);
                }    
            );
        };

        // item states
        // $scope.changeItemState = function() {
        //     if ($scope.itemState === 'todo') {
        //         $log.log('State before:', $scope.itemState, 'State after:', 'done');
        //         $scope.itemState = 'done';    
        //     } else {
        //         $log.log('The task is already done', $scope.itemState);                
        //     }
        // }
	
	}]

);