'use strict';
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'firebase',
  'myApp.version',
  'ngAnimate',
  'toastr',
  'ui.bootstrap',
  'ngResource'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
myApp.factory('user_data',function($q, $firebaseObject,$firebaseArray){
    var dataService = {};
     dataService.data = {};
     dataService.adminchatId = {};

    dataService.getuserData = function(user_email){
          var defer = $q.defer();
          var singleuser =  firebase.database().ref().child('Users').orderByChild('username').equalTo(user_email);
          singleuser.once('value',function(snapshot){
               angular.forEach(snapshot.val(),function(value,key){
                    defer.resolve(value);
               });
          });
          return defer.promise;
    };
    dataService.saveusrMsg = function(msg){
           console.log("message value is",msg);
           var defer = $q.defer();
           var newKey = firebase.database().ref().child('Admin').push().key;
           var obj = {
                who : msg.who,
                email : msg.email,
                subject : msg.subject,
                message:  msg.message,
                time   : firebase.database.ServerValue.TIMESTAMP,
                status :"0",
                id:newKey
            };
            console.log("msg value is",obj);
            var updates = {};
            updates['/Admin/' + newKey] = obj;
            firebase.database().ref().update(updates);
            defer.resolve("true");
           return defer.promise;         
    };
    dataService.getallusrData = function(){
            var defer = $q.defer();
            var all_users = [];
            var allusers =  firebase.database().ref().child('Admin').orderByKey();
            allusers.once('value',function(snapshot){
                     angular.forEach(snapshot.val(),function(value,key){
                          console.log("value is",value);
                          var obj = {
                                  "ID":value.who,
                                  "createdAt":value.time,
                                  "username":value.email,
                                  "subject":value.subject,
                                  "message":value.message,
                                  "msg_id":value.id,
                                  "status": value.status
                                  };
                           all_users.push(obj);
                     });
                     defer.resolve(all_users);
            });
            return defer.promise;        
    };
    dataService.getusrMsg = function(usr_id){
            var defer = $q.defer();
            var all_message = [];
            var message =  firebase.database().ref().child('User_message').child(usr_id).orderByChild('time');
            message.once('value', function(snapshot){
                  angular.forEach(snapshot.val(),function(value,key){
                                var obj = {
                                  "usr_ID":value.who,
                                  "usr_createdAt":value.time,
                                  "usr_username":value.email,
                                  "usr_subject":value.subject,
                                  "usr_message":value.message,
                                  };
                                  all_message.push(obj);
                  });
                  defer.resolve(all_message);
            });
            return defer.promise;        
    };


    return dataService;
});

