angular.module('meanapp').controller('AppController', 
    ['$scope', '$window', '$location', 'UserLogin', 'paths', 
    function($scope, $window, $location, UserLogin, paths) {

        var controller = this;
        // controller properties
        controller.titles = {};
        controller.titles[paths.url.home] = paths.titles.home;
        controller.titles[paths.url.todo] = paths.titles.todo;

        // scope init
        $scope.model = {
            title: ''
        };

        // scope event listeners
        $scope.$on('$locationChangeSuccess', function(evt, currentRoute) {
            if (!UserLogin.takeUsername()) {
                $window.location.href = '#/';
            } else if ($location.path() === '/' && UserLogin.takeUsername()) {
                $window.location.href = '#/todo';
            }
            $scope.model.title = controller.titles[$location.path()] || '404 Not Found';
        });

        $scope.$on('ChangeTitle', function(evt, title) {
            $scope.model.title = title;
        });
    }]
);
