angular.module('meanapp').controller('AppController', ['$scope', '$location', 'paths', function($scope, $location, paths) {

    var controller = this;
    // Controller properties
    controller.titles = {};
    controller.titles[paths.url.home] = paths.titles.home;
    controller.titles[paths.url.todo] = paths.titles.todo;
    controller.titles[paths.url.bottle] = paths.titles.bottle;
    controller.titles[paths.url.thing] = paths.titles.thing;

    //Scope init
    $scope.model = {
        title: ''
    };

    // Scope event listeners
    $scope.$on('$locationChangeSuccess', function(evt, currentRoute) {
        $scope.model.title = controller.titles[$location.path()] || '404 Not Found';
    });

    $scope.$on('ChangeTitle', function(evt, title) {
        $scope.model.title = title;
    });

}]);
