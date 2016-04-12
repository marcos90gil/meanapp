angular.module('meanapp').service('APIClient', ["$window",'$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {

        // Server requests
        this.getRequest = function(url) {

            // deferred object creation
            let deferred = $q.defer();

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
            let deferred = $q.defer();

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

        this.putRequest = function(url, item) {

            // deferred object creation
            let deferred = $q.defer();

            // async work
            $http
                .put(url, item)
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

        this.deleteRequest = function(url) {

            // deferred object creation
            let deferred = $q.defer();

            // async work
            $http
                .delete(url)
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

            let url = URL.resolve(apiPaths.user, { id: id });
            return this.getRequest(url);
        };

        this.createUser = function(newUser) {
            
            return this.postRequest(apiPaths.users, newUser);
        };

        this.editUser = function(id, newUser) {

            let url = URL.resolve(apiPaths.user, { id: id });
            return this.putRequest(url, newUser);
        };

        this.deleteUser = function(id) {

            let url = URL.resolve(apiPaths.user, { id: id });
            return this.deleteRequest(url);
        };

        // text items request
        // this method get the items in function of its type (todo, bottle or thing)
        this.getTextItems = function() {
            return this.getRequest(apiPaths.textItems);
        };

        this.getTextItem = function(id) {

            let url = URL.resolve(apiPaths.textItem, { id: id });
            return this.getRequest(url);
        };

        this.createTextItem = function(textItem) {
            
            return this.postRequest(apiPaths.textItems, textItem);
        };

        this.editTextItem = function(id, textItem) {

            let url = URL.resolve(apiPaths.textItem, { id: id });
            return this.putRequest(url, textItem);
        };

        this.deleteAllTextItems = function() {

            return this.deleteRequest(apiPaths.textItems);
        };

         this.deleteTextItem = function(id) {

            let url = URL.resolve(apiPaths.textItem, { id: id });
            return this.deleteRequest(url);
        };

    }
]);
