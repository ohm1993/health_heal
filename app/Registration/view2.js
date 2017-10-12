'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'view2/view2.html',
    controller: 'RegisterController',
    controllerAs: 'vm'
  });
}])

.controller('RegisterController', function($scope,$firebaseObject,$firebaseArray,$firebaseAuth,$location,$timeout,toastr) {
	var vm = this;
	vm.register = register;
	function register(){
		vm.dataLoading = true;
		firebase.auth().createUserWithEmailAndPassword(vm.user.username, vm.user.password).then(function(user) {
			var addnewuserObj = firebase.database().ref().child('Users');
		    var user = firebase.auth().currentUser;
		    var newuserData = {userregisKey: user.uid, firstname : vm.user.firstName, lastname: vm.user.lastName, username: vm.user.username, password : vm.user.password};
            addnewuserObj.child(user.uid).set(newuserData);
            toastr.success('Register  successfully', 'Success!');
            $timeout(function() {
                $location.path('/login');
            },3000);            
            $scope.$apply();
		    console.log("login successfull and user is  ",user);
		    //logUser(user); // Optional
		}, function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    vm.dataLoading = false;
		    toastr.error(errorMessage, 'Error', {
                    timeOut: 5000
            });
		});
		
	}

});