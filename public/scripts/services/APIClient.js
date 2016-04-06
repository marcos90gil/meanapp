angular.module('meanapp').service('APIClient', ["$window",'$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {

        // User logic
        this.saveUser = function(user) {
            $log.log("Estoy en APIClient accediendo a saveUser con el name", user.username);
            $window.localStorage.setItem("username", user.username);
        };

        this.takeUser = function() {
            var user = $window.localStorage.getItem("username");
            $log.log("Estoy en APIClient accediendo a takeUser:", user);
            return user;
        };

        this.clearUser = function() {
            $window.localStorage.setItem("username", "");
        };

        // Server requests
        this.getRequest = function(url) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .get(url)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        this.postRequest = function(url, item) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http
                .post(url, item)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;
        
        };

        // User requests
        this.getUsers = function() {

            return this.getRequest(apiPaths.users);

        };

        this.getUser = function(id) {

            var url = URL.resolve(apiPaths.user, { id: id });
            return this.getRequest(url);

        };

        this.createUser = function(user) {
            
            return this.postRequest(apiPaths.users, user);

        };

        // text items request
        this.getTextItems = function() {
            return this.getRequest(apiPaths.textItems);

        };

        this.getTextItem = function(id) {

            var url = URL.resolve(apiPaths.textItem, { id: id });
            return this.getRequest(url);

        };

        this.createTextItem = function(textItem) {
            
            return this.postRequest(apiPaths.textItems, textItem);

        };

    }
]);
