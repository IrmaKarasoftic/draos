(function() {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('loginController',
        [
            '$rootScope', '$scope', '$location', 'dataService',
            function($rootScope, $scope, $location, dataService) {
                $scope.login = {
                    username: "",
                    password: "",
                }
                $rootScope.loggedIn = false;
                $rootScope.checkLogin = function() {
                    if ($scope.login.username === "admin" && $scope.login.password === "admin") {
                        $rootScope.loggedIn = true;
                        $location.url('/invoices');
                    } else {
                        $rootScope.loggedIn = false;
                        alert("Login failed");
                    }
                }
            }
        ]);
}());