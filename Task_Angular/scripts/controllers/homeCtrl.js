(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('homeController', function ($scope, dataService) {

        $scope.incomes = [];

        $scope.years = ["2013", "2014", "2015", "2016"];

        $scope.loadIncomes = function () {
            for (var i = 0; i < $scope.years.length; i += 1) {
                dataService.read("yearlyIncome", $scope.years[i], function (data) {
                    if (data) {
                        $scope.incomes.push(data);
                    }
                    else {
                        alert("error");
                    }
                })
            }
        };

        $scope.loadIncomes();

    });
}());