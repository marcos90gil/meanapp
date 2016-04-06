angular.module('meanapp').controller('MenuController', 
    ["APIClient", "$window", '$scope', '$location', 'paths', 
    function(APIClient, $window, $scope, $location, paths) {

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

        // Scope event listeners
        $scope.$on('$locationChangeSuccess', function() {
            $scope.model.selectedItem = $location.path();
        });

    }]
);
