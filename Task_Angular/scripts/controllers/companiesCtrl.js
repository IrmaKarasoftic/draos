(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('companiesController', function ($scope, dataService, $location) {
        $scope.removeOnId;
        $scope.inputInvalid = false;
        $scope.loadCompaniesInfo = function () {
            $scope.waitCompanies = true;
            dataService.list("companies", function (data) {
                if (data) {
                    $scope.companies = data;
                    $scope.waitCompanies = false;
                }
                else {
                    notificationsConfig.error("Adding companies failed!");
                }
            })
        };

        $scope.companyTransfer = function (company) {
            $scope.requestedCompany = company;
            $scope.editCompany = $.extend(true, {}, company);
        };

        $scope.newCompany = {
            id: null,
            name: "",
            company: "",
            streetAddress: "",
            city: "",
            zipCode: null,
            phoneNumber: null,
            isDeleted: false
        }
        $scope.incorrect = false;
        $scope.validation = function () {
            if ($scope.newCompany.name === "" ||
               $scope.newCompany.streetAddress === "" ||
               $scope.newCompany.city === "" ||
               $scope.newCompany.zipCode === null ||
               $scope.newCompany.phoneNumber === null) {
                alert("All fields must be filled in.");
                $scope.incorrect = true;
                return;
            }
            if (
                typeof $scope.newCompany.name !== "string" ||
                typeof $scope.newCompany.streetAddress !== "string" ||
                typeof $scope.newCompany.city !== "string" ||
                typeof $scope.newCompany.zipCode !== "number") {
                alert("Incorrect input");
                $scope.incorrect = true;
                return;
            }
        }

        $scope.createNewCompany = function () {
            if (!$scope.inputInvalid) {
                dataService.create("companies",
                    $scope.newCompany,
                    function(data) {
                        if (data) {
                            notificationsConfig.success("Company added");
                            $scope.loadCompaniesInfo();
                            $location.url('/companies');
                        } else
                            notificationsConfig.error("Adding companies failed!");

                        $scope.loadCompaniesInfo();
                    });
            }
            else {
                notificationsConfig.error("All fields must be filled in.");
            }
        }


        $scope.updateCompany = function () {
            if (!$scope.inputInvalid) {
                dataService.update("companies",
                    $scope.editCompany.id,
                    $scope.editCompany,
                    function(data) {
                        $scope.loadCompaniesInfo();
                        if (data) {
                            notificationsConfig.success("Company updated");
                        } else {
                            notificationsConfig.error("Company update failed");
                        }
                        $scope.editOff();

                    });
            } else {
                notificationsConfig.error("All fields must be filled in.");
            }
        }

        $scope.removeCompany = function () {
            $scope.newCompany.isDeleted = true;
            dataService.update("companies",
                $scope.newCompany.id,
                $scope.newCompany,
                function(data) {
                    $scope.loadCompaniesInfo();
                    if (data) {
                        notificationsConfig.success("Company deleted");
                    } else {
                        notificationsConfig.error("Company delete failed");
                    }
                });
            
        }


        $scope.CompanyRemoveOn = function (company) {
            $scope.removeOnId = company.id;
            $scope.newCompany = company;
        }
        $scope.CompanyRemoveOff = function () {
            $scope.removeOnId = null;
            $scope.newCompany = null;
        }
        $scope.CompanyCheckRemove = function (company) {
            return $scope.removeOnId === company.id;
        }
        $scope.isInvalid = function (company) {
            $scope.inputInvalid = (company.name === '' || company.streetAddress === '' || company.zipCode === '' || company.city === '' || company.phoneNumber === ''
                || company.name === null || company.streetAddress === null || company.zipCode === null || company.city === null || company.phoneNumber === null);
            return $scope.inputInvalid;
        }
        $scope.loadCompaniesInfo();


    });
}());
