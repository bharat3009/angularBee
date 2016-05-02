/**
 * Created by SMIT on 21-11-2015.
 */
'use strict';

feedbackControllers.controller('commentsDetailController', ['$scope', '$location', '$window', '$http', 'getSession', 'commentsDetail','getallsubcomments', 'emotion', 'addComments', 'Upload', 'bytearrayimage',
    function ($scope, $location, $window, $http, getSession, commentsDetail, getallsubcomments, emotion, addComments,Upload,bytearrayimage) {
        $scope.userId;
        $scope.commentsDataOne = "";
        $.loader({
            className: "blue-with-image-2",
            content: ''
        });

        var d = new Date();
        var n = d.getTimezoneOffset();
        var opposite;
        var filePath;
        var userIds;
        var areaIds;
        var presentAction;
        if(n < 0) {
            opposite = Math.abs(n);
        }else {
            opposite = -Math.abs(n);
        }

        getSession.get(function (response) {
            $scope.userId = response.data.userId;
            userIds = response.data.userId;
            areaIds = response.data.areaId;
            var commentObj = $location.search();
            var commentId = commentObj.commentId;
            $scope.commentHasFile = false;
            
            $scope.getCommentData(commentId, userIds, opposite);

            commentsDetail.get({commentId: commentId, userTime:opposite}, function (data) {
                    $.loader('close');
                    $scope.commentsData = data.data;
                 console.log($scope.commentsData.filepath);
                 console.log($scope.commentsData);
                    if($scope.commentsData.filepath != "images/NoImage.jpg"){
                        console.log($scope.commentsData.filepath);
                        $scope.commentHasFile = true;
                    }
                    var sub = $scope.commentsData.filepath.split(".");
                    var file;
                    if(sub[1] == "jpg" || sub[1] == "png" || sub[1] == "jpeg" || sub[1] == "gif" 
                      || sub[1] == "JPG" || sub[1] == "PNG" || sub[1] == "JPEG" || sub[1] == "GIF"){
                        file = "<div class='zoom_img'><img src='"+ $scope.commentsData.filepath+"' style='max-height:100px'/></div>"
                    }
                    else{
                        /* file = "<video src='http://feedbacktool-env.elasticbeanstalk.com/"+ value.filepath+"' height='100' autoplay></video>"*/
                        file = " <video width='300' controls><source src='http://hb-env.us-east-1.elasticbeanstalk.com/"+ $scope.commentsData.filepath+"' ></video>"
                    }
                    /*var vid = document.getElementById("myVideo");
                    vid.src = "http://feedbacktool-env.elasticbeanstalk.com/"+$scope.commentsData.filepath;*/

                   $("#myVideo").append(file);
                },
                function () {
                    alert("error");
                });
            
            
            $scope.uploadFiles = function (file, errFiles) {
                $('#submitBtnClick').attr('disabled', true);
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: 'http://hb-env.us-east-1.elasticbeanstalk.com/comments/uploadfile?file=',
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
                console.log($("#subCommentsData").val());
                if (filePath) {
                    addComments.save({
                        comments: $("#subCommentsData").val(),
                        filePath: filePath,
                        userId: userIds,
                        areaId: areaIds,
                        mainCommentId: commentId,
                        showMyName: 'Y'//$scope.showMyName,
                    }, function (data) {
                        if (data.message == "GA_TRANSACTION_OK") {
                            $("#subCommentsData").val("");
                            $("#submitClick").val("");
                            $.toaster({priority: "success", title: "Success", message: "Comment Added"});
                            $scope.getCommentData(commentId, userIds, opposite);
                             $scope.buttonshow = false;
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
                        comments: $("#subCommentsData").val(),
                        filePath: "images/NoImage.jpg",
                        userId: userIds,
                        areaId: areaIds,
                        mainCommentId: commentId,
                        showMyName: 'Y' //$scope.showMyName
                    }, function (data) {
                        if (data.message = "GA_TRANSACTION_OK") {
                            $("#subCommentsData").val("");
                            $("#submitClick").val("");
                            //$.toaster({priority: "success", title: "Success", message: "File Uploaded"});
                            $scope.getCommentData(commentId, userIds, opposite);
                             $scope.buttonshow = false;
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
                $("#subCommentsData").val("");
                $("#submitClick").val('');
                $window.location.reload();
            }     
            
        });
        
        $scope.getCommentData = function(commentId,userId,opposite){
            getallsubcomments.get({mainCommentId: commentId, userId: userId, userTime:opposite}, function                            (data) {
                $.loader('close');
                $scope.commentsDataOne = data.data;
            });
        };
        
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
         
         $scope.textchange = function(){
                              console.log($scope.buttonshow);
                                console.log($("#commentsData").val());
             if($("#commentsData").val() != ""){
                 console.log($("#commentsData").val());
                $scope.buttonshow = true;
             }else{
                 $scope.buttonshow = false;
             }
        };
         
         $scope.getByte =function() {
             console.log("asdfasdFA");
             bytearrayimage.get({},function(response){
                
                 $scope.image =  response.data;
                  console.log($scope.image)
             });
         };
          
        
    }]);