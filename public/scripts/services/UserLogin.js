angular.module('meanapp').service('UserLogin', ["$window",'$http', '$log',
    function($window, $http, $log) {

    	// User logic
        this.saveUsername = function(username) {
            $window.localStorage.setItem("username", username);
        };

        this.takeUsername = function() {
            var user = $window.localStorage.getItem("username");
            return user;
        };

        this.clearUsername = function() {
            $window.localStorage.setItem("username", "");
        };
    }
]);