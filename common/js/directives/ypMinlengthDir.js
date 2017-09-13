/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des  最小值规则指令  获取运行输入最小字符 小于这个字符添加minlenghs错误对象 配合minlengthsText使用
 * 使用方法 <input ng-model='test' yp-minlength>
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
angular.module('starter.directives').directive('ypMinlength', function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
        	if (!ctrl) return;
            ctrl.$parsers.push(function(viewValue) {
                if (viewValue.length < Number(attrs.ypMinlength)) {
                    ctrl.$setValidity('minlengths', false);
                } else {
                    ctrl.$setValidity('minlengths', true);
                }
                return viewValue;
            });
        }
    }
});