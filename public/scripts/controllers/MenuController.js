angular.module('meanapp').controller('MenuController', 
    ['$scope', '$window', '$location', 'UserLogin', 'paths', 
    function($scope, $window, $location, UserLogin, paths) {

        // Scope init
        $scope.model = {
            selectedItem: ''
        };
        $scope.paths = paths;
        
        // Scope methods
        $scope.getClassForItem = function(item) {
            if ($scope.model.selectedItem === item) {
                return 'active';
            } else {
                return '';
            }
        };

        $scope.logoutUser = function() {
            UserLogin.clearUsername();
        };

        // Scope event listeners
        $scope.$on('$locationChangeSuccess', function() {
            $scope.model.selectedItem = $location.path();
        });

    }]
);
