'use strict';

var app = angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/client', {
    templateUrl: 'client/client.html',
    controller: 'ClientController'
  });
}]);

app.controller('ClientController', function($firebaseObject, $firebaseArray,toastr,$scope,$location,user_data,$uibModal) {	 
   var usr;
   firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
        usr = user;
        user_data.getuserData(user.email).then(function(data) {
           $scope.firstname = data.firstname;
           $scope.lastname = data.lastname;
           $scope.user_name = data.firstname;
        });
        console.log("current signed in user is",user.uid);
        var checkdata = firebase.database().ref().child('User_message').child(user.uid);
        checkdata.once('value', function(snapshot){          
            if(snapshot.val() == null){           
              $scope.showsummery = false;
            }else{
              $scope.showsummery = true;            
            }
        });  
  } else {
         $location.path('/login');
         console.log("user not logged in");
  }
});

        var refreshchat = function(){
             user_data.getusrMsg(usr.uid).then(function(data) {
                $scope.chatMessages = data;
             });
        }
	 $scope.open = function(){
    $scope.showchat = false;
	 	var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'md'
        });
	 }

	 $scope.logout = function(){
	 	firebase.auth().signOut().then(function() {
	 		       toastr.success('Logout  successfully', 'Success!',{
         	      timeout:5000
             }); 	
             $location.path('/login');
             // Sign-out successful.
        }).catch(function(error) {
        	var errorMessage = error.message;
		    toastr.error(errorMessage, 'Error', {
                    timeOut: 5000
            });
             // An error happened.
        });
	 }
   $scope.show = function(){
              //console.log("current loged in user is ",usr.uid);
              user_data.getusrMsg(usr.uid).then(function(data) {
                $scope.chatMessages = data;
             });
            $scope.chatbox = true;
            $scope.showchat = true;
   }
   $scope.hidechat = function(){
       $scope.showchat = false;
   }
   $scope.formatChat = function(who,email,subject,message,time) {
            var chat = {};
             chat.who = who;
             chat.email = email;
             chat.subject = subject;
             chat.message = message;
             chat.time = time;       
            return chat;
        }
        $scope.addChat = function() {
            if ($scope.newChatMsg != "") {
                    var chat = $scope.formatChat(
                    usr.uid,
                    usr.email,
                    "admin reply",
                    $scope.newChatMsg,     
                    firebase.database.ServerValue.TIMESTAMP
                   ); 
                 console.log("new chat msg  from admin is ",chat);
                 //console.log("id of the user is",user_data.data);
                 var abc = firebase.database().ref().child('User_message').child(usr.uid);
                 var list = $firebaseArray(abc);
                 list.$add(chat).then(function(ref) {
                       refreshchat();
                      console.log("refrence value is",ref);
                 });            
              $scope.newChatMsg = "";
            }
            else {
                
             console.log("message not sent"); 
            }
        }
});
app.controller('ModalInstanceCtrl',function($scope, $uibModalInstance,$firebaseObject, $firebaseArray,user_data,toastr){
  var vm = this;
	var user = firebase.auth().currentUser;
  //console.log("user is",user);
	$scope.user_email = user.email;
	$scope.ok = function() {
    $uibModalInstance.close($scope.searchTerm);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  
  $scope.sendmsg = function(){
            vm.dataLoading = true;
  	        var message = {
                who    : user.uid,
                email : user.email,
                subject : $scope.user_sub,
                message:  $scope.user_message,
                time   : firebase.database.ServerValue.TIMESTAMP
            };
            var newKey = user.uid;
            var newPostKey = firebase.database().ref().child('User_message').push().key;
            var updates = {};
            updates['/User_message/' + newKey + '/' + newPostKey] = message;
            firebase.database().ref().update(updates);
      	    user_data.saveusrMsg(message).then(function(data) {
                if(data=="true"){
                        toastr.success('Message sent successfully', 'Success!',{ 
                          timeout:5000 
                        });
                       vm.dataLoading = false;
                       $uibModalInstance.dismiss('cancel');
                }else{
                    toastr.error('Message not sent successfully', 'Error', {
                       timeOut: 5000
                    });          
                    vm.dataLoading = false;
                    $uibModalInstance.dismiss('cancel');
                }
            });
  }	   
});