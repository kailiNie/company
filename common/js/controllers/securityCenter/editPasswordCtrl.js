/**
 * 修改密码
 */
(function(){
    'use strict';
angular.module('starter.controllers').controller('seditPassword', seditPassword)
    function seditPassword($scope, $state, merchants, $stateParams, $ionicHistory, $ionicPopover, dialog,ypDataSer,rexServices) {
        // 1:安全密码;2:登陆密码
        var type = $stateParams.type;
        $scope.data = {
            showPwd: false,
            userPhone: ypDataSer.shop().phoneNumber,
            password: '',
            phoneCode: '',
            showPwd : 'password'
        };
        $scope.fun = {
              changeShowPwd: function() {
                $scope.data.showPwd = $scope.data.showPwd == 'text' ? 'password' : 'text';
            },
            editPasswordSubmit: function(form1) {
                var boolean = rexServices.checkForm(form1, ['psw', 'verCode']);
                //如果为false 代表不通过 不通过就停止 向下运行
                if(!boolean) return;

                if (boolean) {
           
                    merchants.setSecurityPwd({
                        "safePassword": $scope.data.password,
                        "smsCode": $scope.data.phoneCode
                    }, function(data) {
                        dialog.tipsSuccess('密码修改成功', function() {
                            //$state.go("merchants.setCenter");
                            var tit = $ionicHistory.backTitle();
                            if (tit && $ionicHistory.backView() && tit.indexOf('绑定') == -1) {
                                $ionicHistory.goBack();
                            } else {
                                $state.go("merchants.setCenter");
                            }
                        });
                    });
                }
            }
        };
    }
seditPassword.$inject = ['$scope','$state','merchants','$stateParams','$ionicHistory','$ionicPopover','dialog','ypDataSer','rexServices'];
})();