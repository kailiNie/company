/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des 邀请码验证规则指令  密码 123456 太简单 
 * 如果验证通过添加验证对象 pswSimple 配合验证服务给出提示信息pswSimpleText 
 * 使用方法 <input ng-model='test' yp-pwd>
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
angular.module('starter.directives').directive('ypPwd', function() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: false,
        link: function(scope, ele, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$parsers.push(function(viewValue) {
                var errorPsw = ['123456'];
                if (errorPsw.indexOf(viewValue) >= 0) {
                    ctrl.$setValidity('pswSimple', false);
                } else {
                    ctrl.$setValidity('pswSimple', true);
                }
                //密码验证
                if (viewValue.length < 6) {
                    ctrl.$setValidity('minlengths', false);
                } else {
                    ctrl.$setValidity('minlengths', true);
                }
                return viewValue;
            });
        }
    }
});