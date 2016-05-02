/**
 * Created by SMIT on 21-11-2015.
 */
'use strict';

feedbackControllers.controller('loginController', ['$scope', '$window', '$http', 'login', 'newlogin', 'addSession', 'availability',
    function ($scope, $window, $http, login, newlogin, addSession, availability) {
        $scope.loginform = true;
        $scope.areaSearch= false;
        
        var userNamesListTotal = '';
        
         $scope.areaBarSearch = '';
         $scope.options1 = {
                    types: '(regions)'
            };
        $scope.details1 = '';
        
        $scope.newUserLogin = function() {
            
            console.log("newusersearch");
            $scope.loginform = false;
            $scope.areaSearch= true;
        };
        
        $scope.userNameList = function(){
            availability.get(function(response){
                userNamesListTotal = response.data;
            
            });
        };
        
        
        
        $scope.myLogin = function () {
            $.loader({
                className: "blue-with-image-2",
                content: ''
            });
            console.log("username" + $scope.username);
            login.get({username: $scope.username, password: $scope.password}, function (response) {
                if (response.message == "GA_TRANSACTION_OK") {
                    $.loader('close');
                    addSession.save(response, function () {
                            $window.location.href = "#/home";
                        }
                    );
                }
                else if(response.message == "GA_AUTH_FAILED") {
                    $.loader('close');
                    $.toaster({
                        priority: "danger",
                        title: "Message",
                        message: "Username or Password is incorrect",
                        position:""
                    });
                }
            }, function () {
                $.loader('close');
                $.toaster({priority: "danger", title: "Message", message: "Please enter username or password"});
            });
        };
        
        $scope.goSearch = function(){
            $.loader({
                className: "blue-with-image-2",
                content: ''
            });
            console.log("area" + $scope.areaBarSearch);
            newlogin.get({username: $scope.username, password: $scope.password, area: $scope.areaBarSearch, showName: $scope.showName}, function (response) {
                if (response.message == "GA_TRANSACTION_OK") {
                    $.loader('close');
                    addSession.save(response, function () {
                            $window.location.href = "#/home";
                        }
                    );
                }
                else if(response.message == "GA_AUTH_FAILED") {
                    $.loader('close');
                    $.toaster({
                        priority: "danger",
                        title: "Message",
                        message: "Username or Password is incorrect",
                        position:""
                    });
                } else if(response.message == "GA_MANDATORY_USER_EXISTS") {
                    $.loader('close');
                    $.toaster({
                        priority: "danger",
                        title: "Message",
                        message: "Username already exists",
                        position:""
                    });
                }else{
                        $.loader('close');
                        $.toaster({
                        priority: "danger",
                        title: "Message",
                        message: "Error occured while processing please check ",
                        position:""
                });
               }
            }, function () {
                $.loader('close');
                $.toaster({priority: "danger", title: "Message", message: "Please enter username or password"});
            });
        };
        
        $scope.showUserName = function(){
            console.log("in ths hsow ");
            if($scope.showName != null){
                    $scope.availablewarn = false;
                    $scope.unavailablewarn = false;
                    angular.forEach(userNamesListTotal, function(value, key){
                        console.log(value + "uer" + $scope.showName);
                        if(value == $scope.showName){
                             console.log(value);
                            $scope.unavailablewarn =  true;
                            $scope.userName = '';
                        }
                    });
                     console.log($scope.availablewarn);
                    if($scope.unavailablewarn == false){
                         console.log($scope.availablewarn);
                        $scope.availablewarn = true;
                    }
            }
            
        }
                         
    }]);