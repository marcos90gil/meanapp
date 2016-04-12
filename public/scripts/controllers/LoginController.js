angular.module('meanapp').controller('LoginController',
	["$scope", "$window", '$log', "APIClient", 'UserLogin',
    function($scope, $window, $log, APIClient, UserLogin) {

        $scope.model = {};
        // different models to singup and login to avoid problems
        $scope.model2 = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        $scope.singupUser = function() {
            APIClient.createUser($scope.model).then(
                function(user) {
                    //$log.log('New user saved:', user);
                    UserLogin.saveUsername($scope.model.username);
                    $window.location.href = "#/todo";
                },
                function(error) {
                    $log.error('An error ocurred', error);
                }
            );
        };

        $scope.loginUser = function() {
            APIClient.getUsers().then(
                function(users) {
                    for (let index=0; index < users.data.length; index++) {
                        if (users.data[index]['username'] === $scope.model2.username 
                            && users.data[index]['password'] === $scope.model2.password) {
                            $scope.model2.authOk = true;
                            UserLogin.saveUsername($scope.model2.username);
                            $window.location.href = "#/todo";
                        }
                        if (index === (users.data.length - 1)) {
                            if (!$scope.model2.authOk) {
                                alert('Unauthorized');
                            }
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