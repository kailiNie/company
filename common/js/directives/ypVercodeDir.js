/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des 验证码规则指令  数字，长度5位数字 
 * 如果验证通过添加验证对象 patterns 配合验证服务给出提示信息patternsText 
 * 使用方法 <input ng-model='test' yp-vercode>
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
angular.module('starter.directives').directive('ypVercode', function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
        	if (!ctrl) return;
            ctrl.$parsers.push(function(viewValue) {
                var pattern = /\d{5}/;
                if (pattern.test(viewValue)) {
                    ctrl.$setValidity('patterns', true);
                } else {
                    ctrl.$setValidity('patterns', false);
                }
                return viewValue;
            });
        }
    }
});