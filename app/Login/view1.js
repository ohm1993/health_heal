'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'Login/view1.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
    }])

    .controller('LoginController', function($firebaseObject, $firebaseArray, toastr, $location) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.dataLoading = true;
            firebase.auth().signInWithEmailAndPassword(vm.username, vm.password).then(function(user) {
                    firebase.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            // User is signed in.
                            if (user.email == "admin123@gmail.com") {
                                toastr.success('Loged in as Admin', 'Success!', {
                                    timeout: 1000
                                });
                                $location.path('/admin');
                            } else {
                                toastr.success('Login  successfully', 'Success!', {
                                    timeout: 1000
                                });
                                $location.path('/client');
                            }
                        } else {
                            // User is signed out.
                            console.log("user is signed out");
                        }
                    });

                    // Success 
                })
                .catch(function(error) {
                    var errorMessage = error.message;
                    vm.dataLoading = false;
                    toastr.error(errorMessage, 'Error', {
                        timeOut: 2000
                    });
                    // Error Handling
                });

        }
        
    });