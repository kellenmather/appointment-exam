"use strict";

app.controller('userController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){

    $scope.user = userFactory.getLoginUser();
    // this only deals with user login, since there is no password it all happens in one pass
    $scope.login = function(){
        userFactory.login($scope.user, function(res){
            $scope.user = {};
            if(res.err){
                console.log(res.err);
                $scope.errMessage = res.err;
                $location.url('/')
            }else{
                $location.url('/home');
            };
        });
    };
}]);
