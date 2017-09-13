/**
 * @Author   NieKaili
 * @DateTime 2017-08-10
 * @des 确认密码
 */
(function(){ 
'use strict';
angular.module('starter.directives').directive('ypConfirmpsw', function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, ele, attrs, ctrl) {
            if (!ctrl) return;
            //监听输入的密码
            var psw;
            scope.$watch('data.password', function(value) {
                psw = value
                pswConfirm(value, ctrl.$viewValue);
            });
            //确认密码
            ctrl.$parsers.push(function(value) {
                pswConfirm(psw, value);
                return value;
            });

            function pswConfirm(value, confirmpsw) {
                if (value != confirmpsw) {
                    ctrl.$setValidity('confimpsw', false);
                } else {
                    ctrl.$setValidity('confimpsw', true);
                }
            }
        }
    }
});
})();