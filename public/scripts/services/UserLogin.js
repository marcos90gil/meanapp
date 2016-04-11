angular.module('meanapp').service('UserLogin', ["$window",'$http', '$log',
    function($window, $http, $log) {

    	// User logic
        this.saveUsername = function(username) {
            $log.log("Estoy en UserLogin accediendo a saveUser con el name", username);
            $window.localStorage.setItem("username", username);
        };

        this.takeUsername = function() {
            var user = $window.localStorage.getItem("username");
            $log.log("Estoy en UserLogin accediendo a takeUser:", user);
            return user;
        };

        this.clearUsername = function() {
            $window.localStorage.setItem("username", "");
        };
    }
]);