angular.module('meanapp').controller('LoginController',
	["$scope", "$window", '$log', "APIClient", 'UserLogin',
    function($scope, $window, $log, APIClient, UserLogin) {

        $scope.model = {};
        // different models to singup and login to avoid problems
        $scope.model2 = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        $scope.singupUser = function() {
            $log.log('singupUser()');
            APIClient.createUser($scope.model).then(
                function(user) {
                    $log.log('New user saved:', user);
                    UserLogin.saveUsername($scope.model.username);
                    $window.location.href = "#/todo";
                },
                function(error) {
                    $log.error('An error ocurred', error);
                }
            );
        };

        $scope.loginUser = function() {
            $log.log('loginUser()');
            APIClient.getUsers().then(
                function(users) {
                    for (let index=0; index < users.data.length; index++) {
                        if (users.data[index]['username'] === $scope.model2.username 
                            && users.data[index]['password'] === $scope.model2.password) {
                            UserLogin.saveUsername($scope.model2.username);
                            $window.location.href = "#/todo";
                        } 
                    }
                },
                function(error) {
                    $log.error('An error ocurred', error);
                }
            );
        };
        
    }]
);