/**
 * Created by SMIT on 23-11-2015.
 */
'use strict';

feedbackServices.factory('comments', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource(commentConst + ':verb', {verb:'getallcomments', userId:'@userId', userTime:'@userTime'}, {
            query: { method: "GET"}
        });

    }]);


feedbackServices.factory('areaValues', ['$resource','areaConst',function($resource,areaConst){
    return $resource(areaConst + ':verb', { verb:'getAllAreas'},{ query : { method : "GET" } });

    }]);


feedbackServices.factory('getallmaincommentsbyarea', ['$resource','commentConst',function($resource,commentConst){
    return $resource(commentConst + ':verb', { verb:'getallmaincommentsbyarea', areaId:'@areaId', userId:'@userId', userTime:'@userTime'}, {              query : { method : "GET" }                                                   });

    }]);


feedbackServices.factory('getallmaincommentsbyuser', ['$resource','commentConst',function($resource,commentConst){
    return $resource(commentConst + ':verb', { verb:'getallmaincommentsbyuserid', userId:'@userId', userTime:'@userTime'}, {              query : { method : "GET" } });

    }]);


feedbackServices.factory('getallglobalcommentsbyuser', ['$resource','commentConst',function($resource,commentConst){
    return $resource(commentConst + ':verb', { verb:'getallglobalcommentsbyuser',  userId:'@userId', userTime:'@userTime'}, { query : { method : "GET" } });

    }]);



feedbackServices.factory('getallsubcomments', ['$resource','commentConst',function($resource,commentConst){
    return $resource(commentConst + ':verb', { verb:'getallsubcommentsbycommentid', mainCommentId:'@mainCommentId', userId:'@userId', userTime:'@userTime'}, {              query : { method : "GET" }                                                   });

    }]);

feedbackServices.factory('getAllCommentEmotions', ['$resource','commentemotionConst',function($resource,commentemotionConst){
    return $resource(commentemotionConst + ':verb', { verb:'getallcommentEmotionsbyuserid', userId:'@userId'}, {              
        query : { method : "GET" } });

    }]);

feedbackServices.factory('commentsDetail', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource(commentConst + ':verb', {verb:'getcommentbyid', commentId:'@commentId', userTime:'@userTime'}, {
            query: { method: "GET"}
        });

    }]);

feedbackServices.factory('addComments', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource(commentConst + ':verb', {verb:'addcomments', filePath:'@filePath', comments:'@comments', userId:'@userId', areaId: '@areaId', mainCommentId: '@mainCommentId', showMyName: '@showMyName'}, {
            query: { method: "POST"}
        });

    }]);

feedbackServices.factory('uploadFile', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource(commentConst + ':verb', {verb:'uploadfile',file:'@file'}, {
            query: { method: "POST"}
        });

    }]);

feedbackServices.factory('emotion', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource(commentConst + ':verb', {verb:'getemotion',action:'@action',presentAction: '@presentAction',liked:'@liked',unliked:'@unliked',commentId: '@commentId', userId: '@userId'}, {
            query: { method: "GET"}
        });
    }]);

feedbackServices.factory('bytearrayimage', ['$resource','commentConst',
    function($resource,commentConst){
        return $resource("http://localhost:8088/SSR/comments/image?filename=1460955046699.jpg", {}, {
            query: { method: "GET"}
        });
    }]);