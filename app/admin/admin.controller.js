'use strict';
angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminController'
        });
    }])
    .controller('AdminController', function($firebaseObject, $firebaseArray, toastr, $scope, $location, user_data) {
        var usr;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                usr = user;
                user_data.getuserData(user.email).then(function(data) {
                    $scope.firstname = data.firstname;
                    $scope.user_name = data.firstname;
                });
            } else {
                console.log("user not logged in");
            }
        });
        var reload = function() {
            user_data.getallusrData().then(function(data) {
                console.log("all data is", data);
                $scope.filteredList = data;
                $scope.totalItems = $scope.filteredList.length;
            });
        }
        reload();
        $scope.logout = function() {
            firebase.auth().signOut().then(function() {
                toastr.success('Logout  successfully', 'Success!', {
                    timeout: 5000
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
        //code is for pagination //
        $scope.currentPage = 1;
        $scope.numPerPage = 8;
        $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.filteredList.indexOf(value);
            return (begin <= index && index < end);
        };
        //code is for chatbox//
        $scope.chatMessages = [];
        $scope.showchatbox = function(item) {
            user_data.data = item.ID;
            user_data.adminchatId = item.msg_id;
            user_data.getusrMsg(item.ID).then(function(data) {
                $scope.chatMessages = data;
            });
            $scope.chatbox = true;
        }
        var refreshchat = function() {
            reload();
            user_data.getusrMsg(user_data.data).then(function(data) {

                $scope.chatMessages = data;
            });
        }
        $scope.formatChat = function(who, email, subject, message, time) {
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
                    "GD0b7VjVRhPcrHMrdzGwrIueuO23",
                    "admin123@gmail.com",
                    "admin reply",
                    $scope.newChatMsg,
                    firebase.database.ServerValue.TIMESTAMP
                );
                firebase.database().ref().child('Admin').child(user_data.adminchatId).child("status").set("1");
                var abc = firebase.database().ref().child('User_message').child(user_data.data);
                var list = $firebaseArray(abc);
                list.$add(chat).then(function(ref) {
                    refreshchat();
                });
                $scope.newChatMsg = "";
            } else {
                console.log("message not sent successfully");

            }
        }
    });