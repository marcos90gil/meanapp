angular.module('meanapp').controller('TodoController',
	['$scope', '$log', '$filter', 'APIClient', 'UserLogin', 'URL', 'paths',
	function($scope, $log, $filter, APIClient, UserLogin, URL, paths){

		// scope model init
		$scope.model= [];
		$scope.uiState = 'loading';
		$scope.url = URL.resolve;
        $scope.user = UserLogin.takeUsername();

        // controller start
        APIClient.getTextItems().then(
            function(data) {
                let items = data.data || [];
                let finalItems = [];
                let user = UserLogin.takeUsername() || '';
                if (items.length === 0) {
                    $scope.uiState = 'ideal';
                } else {
                    for (let i in items) {
                        let item = items[i];
                        if (item.author === user) {
                            finalItems.push(item);
                        }
                    }
                    if (finalItems.length === 0) {
                        $scope.uiState = 'ideal';
                    } else {
                        $scope.model = finalItems;
                        $scope.uiState = 'ideal';
                    }
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
            itemNew.author = UserLogin.takeUsername();
            
            APIClient.createTextItem(itemNew).then(
                function(item) {
                    itemNew._id = item.data['_id'];
                    $scope.model.push(itemNew);
                    console.log('Item added', itemNew, 'scope', $scope.model);
                },
                function(error) {
                    console.log('An error occurred', error);
                }
            );
        };

        // delete all
        $scope.deleteAll = function() {
            console.log($scope.model);
            for (let index = 0; index < $scope.model.length; index++) {
                if ($scope.model[index]['author'] === UserLogin.takeUsername()) {
                    APIClient.deleteTextItem($scope.model[index]['_id']);                   
                }
                if (index === ($scope.model.length - 1)) {
                    $scope.model = [];
                }
            }
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
        $scope.changeItemState = function(id) {
            
            for (let index=0; index < $scope.model.length; index++) {
                if ($scope.model[index]['_id'] === id) {
                    if ($scope.model[index]['done']) {
                        $scope.model[index]['done'] = false;
                        APIClient.editTextItem(id, $scope.model[index]).then(
                            function() {
                                //$log.log('Item edited');
                            },
                            function(error) {
                                $log.log('An error occurred while editing item', error);
                            }  
                        );
                    } else {
                        $scope.model[index]['done'] = true;
                        APIClient.editTextItem(id, $scope.model[index]).then(
                            function() {
                                //$log.log('Item edited');
                            },
                            function(error) {
                                $log.log('An error occurred while editing item', error);
                            }  
                        );
                    }
                }   
            }
        };
	
	}]

);