
(function(){ 
    'use strict';
angular.module('starter.controllers').controller('setPasswordCtrl',  setPasswordCtrl);
    function setPasswordCtrl($scope, $state, $stateParams, $ionicHistory, merchants, dialog,rexServices,ypDataSer) {
        // 1:商家安全密码;2:商家登陆密码;3:收银员安全密码
 

        $scope.data = {
            userPhone: ypDataSer.shop().userPhone,
            password: '',
            repassword: '',
            phoneCode: ''
        };   

 
        $scope.fun = {
            setPasswordSubmit: function(form1) {

                var boolean = rexServices.checkForm(form1, ['psw','confimpsw', 'verCode']);
                if (boolean) {
                    
                    merchants.setSecurityPwd({
                        "safePassword": $scope.data.password,
                        "smsCode": $scope.data.phoneCode,
                    }, function(data) {
                        dialog.tipsSuccess('密码设置成功',function(){
                            //设置更新首页数据配置项
                            ypDataSer.upMainData();
                            
                            var tit = $ionicHistory.backTitle();
                 
                            if (tit && $ionicHistory.backView() && tit.indexOf('绑定') == -1) {
                                $ionicHistory.goBack();
                            } else {
                                $state.go("merchants.setCenter");
                            }
            
                    });

                })
            }
        }
    }

    }
    setPasswordCtrl.$inject = ['$scope', '$state', '$stateParams', '$ionicHistory', 'merchants', 'dialog','rexServices','ypDataSer'];
 })();