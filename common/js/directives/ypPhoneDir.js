/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des 邀请码验证规则指令  数字，长度11位数字 
 * 如果验证通过添加验证对象 patterns 配合验证服务给出提示信息patternsText 
 * 使用方法 <input ng-model='test' yp-phone>
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
angular.module('starter.directives').directive('ypPhone', function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$parsers.push(function(viewValue) {
                var pattern = /1\d{10}/;
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