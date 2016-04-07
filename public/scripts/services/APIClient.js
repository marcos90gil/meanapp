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

        // User requests
        this.getUsers = function() {

            return this.getRequest(apiPaths.users);

        };

        this.getUser = function(id) {

            let url = URL.resolve(apiPaths.user, { id: id });
            return this.getRequest(url);

        };

        this.createUser = function(user) {
            
            return this.postRequest(apiPaths.users, user);

        };

        // text items request
        // this method get the items in function of its type (todo, bottle or thing)
        this.getTextItems = function(type) {
            return this.getRequest(apiPaths.textItems).then(
                function(data) {
                    let items = data.data || [];
                    let itemsType = [];
                    if (items.length === 0) {
                        return itemsType;
                    } else {
                        for (let i in items) {
                            let item = items[i];
                            if (item.type === type) {
                                itemsType.push(item);
                            }
                        }
                        return itemsType;
                    }
                }
            );
        };

        this.getTextItem = function(id) {

            let url = URL.resolve(apiPaths.textItem, { id: id });
            return this.getRequest(url);

        };

        this.createTextItem = function(textItem) {
            
            return this.postRequest(apiPaths.textItems, textItem);

        };

    }
]);
