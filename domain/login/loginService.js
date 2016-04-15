/**
 * Created by SMIT on 21-11-2015.
 */
'use strict';

feedbackServices.factory('login', ['$resource','userConst',
    function($resource,userConst){
        return $resource(userConst + ':verb', {verb:'auth', username:'@username',password:'@password'}, {
            query: { method: "GET"}
        });
    }]);

feedbackServices.factory('newlogin', ['$resource','userConst',
    function($resource,userConst){
        return $resource(userConst + ':verb', {verb:'newAuth', username:'@username',password:'@password', area: '@area'}, {
            query: { method: "GET"}
        });
    }]);