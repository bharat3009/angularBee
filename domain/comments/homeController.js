/**
 * Created by SMIT on 23-11-2015.
 */
'use strict';

feedbackControllers.controller('homeController', ['$scope', 'Upload', '$timeout', '$window', '$http', 'getSession', 'addComments', 'uploadFile', 'getallmaincommentsbyarea','getallmaincommentsbyuser', 'areaValues', 'getAllCommentEmotions','emotion',
    function ($scope, Upload, $timeout, $window, $http, getSession, addComments, uploadFile, getallmaincommentsbyarea,getallmaincommentsbyuser, areaValues, getAllCommentEmotions, emotion) {

        var filePath;
        var userIds;
        var areaIds;
        var homeComments;
        var presentAction;
        $scope.commentsDataOne = "";
        $scope.commentsData = "";
        $scope.commentEmotions = "";
        $.loader({
            className: "blue-with-image-2",
            content: ''
        });
        var typo = [];
        var d = new Date();
        var n = d.getTimezoneOffset();
        var opposite;
        if (n < 0) {
            opposite = Math.abs(n);
        } else {
            opposite = -Math.abs(n);
        }
        getSession.get(function (response) {
            userIds = response.data.userId;
            areaIds = response.data.areaId;
            $scope.getCommentEmotion();
            $scope.getCommentData(areaIds, opposite);
            $scope.getAreaData();
           
            

            $scope.uploadFiles = function (file, errFiles) {
                $('#submitBtnClick').attr('disabled', true);
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: 'http://localhost:8088/SSR/comments/uploadfile?file=',
                        data: {file: file}
                    }).then(function (response) {
                        //alert('Success ' + response.config.data.file.name + ' uploaded. Response: ' + JSON.stringify(response.data));
                        console.log(response);
                        filePath = response.data.data.filepath;
                        $('#submitBtnClick').attr('disabled', false);

                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
                else {
                }
            }, function () {
                alert();
            }
            
            $scope.submitData = function () {
                $.loader({
                    className: "blue-with-image-2",
                    content: ''
                });
                console.log($scope.commentarea)
                console.log($("#commentsData").val());
                if (filePath) {
                    addComments.save({
                        comments: $("#commentsData").val(),
                        filePath: filePath,
                        userId: userIds,
                        areaId: areaIds
                    }, function (data) {
                        if (data.message == "GA_TRANSACTION_OK") {
                            $("#commentsData").val("");
                            $("#submitClick").val("");
                            $.toaster({priority: "success", title: "Success", message: "Comment Added"});
                            $scope.getCommentData(areaIds, opposite);
                        }
                        else if (data.message == "GA_MANDATORY_PARAMETERS_NOT_SET") {
                            $.loader('close');
                            $.toaster({priority: "danger", title: "Message", message: "Please Add comment"});
                        }
                        else {
                            $.loader('close');
                            $.toaster({priority: "danger", title: "Message", message: "File not uploaded"});
                        }
                    }, function () {
                        $.loader('close');
                        $.toaster({priority: "danger", title: "Message", message: "Something Went Wrong"});
                    });
                } else {
                    addComments.save({
                        comments: $("#commentsData").val(),
                        filePath: "comments/NoImage.jpg",
                        userId: userIds,
                        areaId: areaIds
                    }, function (data) {
                        if (data.message = "GA_TRANSACTION_OK") {
                            $("#commentsData").val("");
                            $("#submitClick").val("");
                            //$.toaster({priority: "success", title: "Success", message: "File Uploaded"});
                            $scope.getCommentData(areaIds, opposite);
                        }
                        else if (data.message = "GA_MANDATORY_PARAMETERS_NOT_SET") {
                            $.loader('close');
                            //$.toaster({priority: "danger", title: "Message", message: "Please Add comment"});
                        }
                        else{
                            $.loader('close');
                            //$.toaster({priority: "danger", title: "Message", message: "File not uploaded"});
                        }
                    }, function () {
                        $.loader('close');
                        $.toaster({priority: "danger", title: "Message", message: "Something Went Wrong"});
                    });
                }
            }

            $scope.reset = function () {
                $("#commentsData").val("");
                $("#submitClick").val('');
                $window.location.reload();
            }


        });
        
        var a = [];
        $scope.getAreaData = function(){
            console.log("inseide area");
            areaValues.get(function(data){
                console.log(data);
            $.loader('close');
            $scope.areaValues = data.data;
            angular.forEach($scope.areaValues,function(values){
                console.log(values)
                typo.push({
                    "value" : values.areaValue,
                    "id" : values.areaId
                });
            });
            
            $('#areasearch').typeahead({
                name : 'asearch',
                local : typo
            }).on('typeahead:selected',function(a,b){
                    console.log("selected area is " + a + "id" + b);
            });
          });
        }

        var a = [];
        $scope.getCommentData = function (areaIds, opposite) {
            getallmaincommentsbyarea.get({areaId: areaIds, userId: userIds,  userTime: opposite}, function (data) {
                $.loader('close');
                $scope.commentsDataOne = data.data;

                angular.forEach($scope.commentsDataOne, function (value) {
                    typo.push({
                        "value":value.commentsDetail,
                        "id":value.commentId
                    });
                });

                $('#mysearch').typeahead({
                    name: 'search',
                    local: typo
                }).on('typeahead:selected', function (a, b) {
                    $window.location.href = "#/commentsDetail?commentId=" + b.id;
                });

                var a = [];
                angular.forEach(data.data, function (value, key) {

                    var sub = value.filepath.split(".");
                    var file;
                    if (sub[1] == "jpg" || sub[1] == "png" || sub[1] == "jpeg" || sub[1] == "gif") {
                        file = "<img src='C:/Users/venkatabharat/git/bee/SSR/" + value.filepath + "' style='max-height:100px'/>"
                    }
                    else {
                        /* file = "<video src='http://feedbacktool-env.elasticbeanstalk.com/"+ value.filepath+"' height='100' autoplay></video>"*/
                        file = " <video width='150' controls><source src='http://localhost:8088/SSR/" + value.filepath + "' ></video>"
                    }

                    a.push({
                        commentDate: "<a href='#/commentsDetail?commentId=" + value.commentId + "'>" + value.commentDate + "</a>",
                        commentsDetail: value.commentsDetail,
                        filepath: file
                    });
                });
                $('#example').DataTable({

                    "aaData": a,
                    "aoColumns": [
                        {"mData": "commentDate"},
                        {"mData": "commentsDetail"},
                        {"mData": "filepath"}
                    ],
                    //"order": [[ 0, "asc" ]]//ascending ordering
                    "aaSorting": [[ 0, "desc" ]],//descending ordering,
                    "bDestroy": true
                });

                /* angular.forEach($scope.dataComments, function(value){
                 typo.push(value.commentsDetail);
                 });
                 $('#mysearch').typeahead({
                 name: 'search',
                 local: typo
                 }).on('typeahead:selected', function(){
                 $window.location.href = 'hi.html';
                 });*/
            });

        }
        
        $scope.homeshow = function(){
            $scope.homeshowpar = true;
            $scope.globalshowpar = false;
            $scope.historyshowpar = false;
            var mycomments = getallmaincommentsbyarea.get({areaId: areaIds,userId: userIds, userTime: opposite}, function(data){
                $scope.commentsDataOne = data.data;
            });
        }
        
         $scope.historyshow = function(){
            $scope.homeshowpar = false;
            $scope.globalshowpar = false;
            $scope.historyshowpar = true;
            var mycomments = getallmaincommentsbyuser.get({userId: userIds, userTime: opposite}, function(data){
                $scope.commentsDataOne = data.data;
            });
             
             console.log($scope.dataComments);
           /* $scope.getHistoryHives=function(){   
                console.log("insdie funcitonssss");
                getallmaincommentsbyuser.get({userId: userIds, userTime: opposite}, function (data){
                    $scope.datacomments = data.data;
                })
                }*/
        }
         
         $scope.textchange = function(){
                              console.log($scope.buttonshow);
                                console.log($("#commentsData").val());
             if($("#commentsData").val() != ""){
                 console.log($("#commentsData").val());
                $scope.buttonshow = true;
             }else{
                 $scope.buttonshow = false;
             }
        }
         
          $scope.globalshow = function(){
            $scope.homeshowpar = false;
            $scope.globalshowpar = true;
            $scope.historyshowpar = false;
        }
          
          $scope.getCommentEmotion = function(){
            getAllCommentEmotions.get({userId: userIds},function(data){
                   $scope.commentEmotions = data.data;
                 console.log(data.data);
                console.log($scope.commentEmotions.commentId);
              });
             
             console.log($scope.commentEmotions);
          }
          
          
         $scope.liked = function(indexval){
             console.log(indexval);
             if($scope.commentsDataOne[indexval].notAgreed){
                    presentAction = "unliked";
                    $scope.commentsDataOne[indexval].notAgreed = !$scope.commentsDataOne[indexval].notAgreed;
                    $scope.commentsDataOne[indexval].agreed = !$scope.commentsDataOne[indexval].agreed;
                    $scope.commentsDataOne[indexval].notAgreeCount = $scope.commentsDataOne[indexval].notAgreeCount - 1;
                    $scope.commentsDataOne[indexval].agreeCount = $scope.commentsDataOne[indexval].agreeCount + 1;
                 console.log($scope.commentsDataOne[indexval].agreeCount)
             }else{
                 if($scope.commentsDataOne[indexval].agreed) {
                        presentAction = "liked";
                        $scope.commentsDataOne[indexval].agreed = !$scope.commentsDataOne[indexval].agreed;
                        $scope.commentsDataOne[indexval].agreeCount = $scope.commentsDataOne[indexval].agreeCount - 1;
                 } else {
                        presentAction = "noaction";
                        $scope.commentsDataOne[indexval].agreed = !$scope.commentsDataOne[indexval].agreed;
                        $scope.commentsDataOne[indexval].agreeCount = $scope.commentsDataOne[indexval].agreeCount + 1;
                 }
             }
             emotion.get({action: "liked",presentAction: presentAction, liked:'Y', unliked:'N', commentId: $scope.commentsDataOne[indexval].commentId, userId: userIds},function(data){
                    consle.log("liked");
             });
             
         }
          
         
         $scope.disliked = function(indexval){
             console.log(indexval);
             if($scope.commentsDataOne[indexval].agreed){
                    presentAction = "liked";
                    $scope.commentsDataOne[indexval].notAgreed = !$scope.commentsDataOne[indexval].notAgreed;
                    $scope.commentsDataOne[indexval].agreed = !$scope.commentsDataOne[indexval].agreed;
                    $scope.commentsDataOne[indexval].notAgreeCount = $scope.commentsDataOne[indexval].notAgreeCount + 1;
                    $scope.commentsDataOne[indexval].agreeCount = $scope.commentsDataOne[indexval].agreeCount - 1;
                 console.log($scope.commentsDataOne[indexval].notAgreed)
             }else{
                 if($scope.commentsDataOne[indexval].notAgreed) {
                        presentAction = "unliked";
                        $scope.commentsDataOne[indexval].notAgreed = !$scope.commentsDataOne[indexval].notAgreed;
                        $scope.commentsDataOne[indexval].notAgreeCount = $scope.commentsDataOne[indexval].notAgreeCount - 1;
                 } else {
                        presentAction = "noaction";
                        $scope.commentsDataOne[indexval].notAgreed = !$scope.commentsDataOne[indexval].notAgreed;
                        $scope.commentsDataOne[indexval].notAgreeCount = $scope.commentsDataOne[indexval].notAgreeCount + 1;
                 }
             }
               emotion.get({action: "unliked",presentAction: presentAction, liked:'Y', unliked:'N', commentId: $scope.commentsDataOne[indexval].commentId, userId: userIds},function(data){
                    consle.log("unliked");
             });
         }
          
          
          

        jQuery.extend( jQuery.fn.dataTableExt.oSort, {
            "de_datetime-asc": function ( a, b ) {
                var x, y;
                if (jQuery.trim(a) !== '') {
                    var deDatea = jQuery.trim(a).split(' ');
                    var deTimea = deDatea[1].split(':');
                    var deDatea2 = deDatea[0].split('.');
                    x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
                } else {
                    x = Infinity; // = l'an 1000 ...
                }

                if (jQuery.trim(b) !== '') {
                    var deDateb = jQuery.trim(b).split(' ');
                    var deTimeb = deDateb[1].split(':');
                    deDateb = deDateb[0].split('.');
                    y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
                } else {
                    y = Infinity;
                }
                var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
                return z;
            },

            "de_datetime-desc": function ( a, b ) {
                var x, y;
                if (jQuery.trim(a) !== '') {
                    var deDatea = jQuery.trim(a).split(' ');
                    var deTimea = deDatea[1].split(':');
                    var deDatea2 = deDatea[0].split('.');
                    x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
                } else {
                    x = Infinity;
                }

                if (jQuery.trim(b) !== '') {
                    var deDateb = jQuery.trim(b).split(' ');
                    var deTimeb = deDateb[1].split(':');
                    deDateb = deDateb[0].split('.');
                    y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
                } else {
                    y = Infinity;
                }
                var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
                return z;
            },

            "de_date-asc": function ( a, b ) {
                var x, y;
                if (jQuery.trim(a) !== '') {
                    var deDatea = jQuery.trim(a).split('.');
                    x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
                } else {
                    x = Infinity; // = l'an 1000 ...
                }

                if (jQuery.trim(b) !== '') {
                    var deDateb = jQuery.trim(b).split('.');
                    y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
                } else {
                    y = Infinity;
                }
                var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
                return z;
            },

            "de_date-desc": function ( a, b ) {
                var x, y;
                if (jQuery.trim(a) !== '') {
                    var deDatea = jQuery.trim(a).split('.');
                    x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
                } else {
                    x = Infinity;
                }

                if (jQuery.trim(b) !== '') {
                    var deDateb = jQuery.trim(b).split('.');
                    y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
                } else {
                    y = Infinity;
                }
                var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
                return z;
            }
        } );

    }]);
     