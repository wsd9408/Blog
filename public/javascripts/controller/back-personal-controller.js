/**
 * Created by FiShelly on 2016/10/5.
 */
(function (angular) {
    var module = angular.module('blog.back.personal', [
        'ngRoute'
    ]);

    // 配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/back/personal', {
            templateUrl: 'template/back-personal-template.html',
            controller: 'BackPersonalController'
        });
    }]);
    //控制器
    module.controller('BackPersonalController', [
        '$scope',
        '$route',
        '$routeParams',
        '$http',
        function ($scope, $route, $routeParams, $http) {
            console.log("enter BlogArticleController ~");
            $http.post('/user/getUser/fishelly.',{}).success(function(data,status,headers,config){
                if(data.status == '0'){
                    $scope.isUpdate = false;
                    $scope.user = {
                        name : "fishelly.",
                        position : "Java开发工程师 & Web前端工程师",
                        signature : "耐得住寂寞，经得起诱惑，受得起挫折.",
                        label : ['Java','Web前端','工程师'],
                        introduce : "~~~耐得住寂寞，经得起诱惑，受得起挫折.",
                        headImg : "images/fish1.jpg"
                    }
                } else {
                    console.log("get data");
                    $scope.isUpdate = true;
                    $scope.user = data.user;
                }
            }).error(function(data,status,headers,config){
                $scope.errorMsg = data.msg;
            });

            $scope.saveOrUpdate = function(){
                console.log($scope.user);
                $http.post('/user/saveOrUpdateUser',{
                    isUpdate:$scope.isUpdate,
                    user:$scope.user
                }).success(function(data,status,headers,config){
                    console.log(data);
                    console.log("success");
                    if(data.status == '0'){
                        console.log("save fialed");
                    } else {
                        $scope.isUpdate = true;
                        $scope.user = data.user;
                    }
                }).error(function(data,status,headers,config){
                    $scope.errorMsg = data.msg;
                    console.log(data);
                    console.log("fail");
                });
            }
        }
    ]);
})(angular);