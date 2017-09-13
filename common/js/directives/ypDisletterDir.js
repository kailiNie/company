/**
 * @Author   NieKaili
 * @DateTime 2017-08-07
 * @des 禁止输入英文
 */
angular.module('starter.directives').directive('ypDisletter', ['$parse', function($parse) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ngModel) {
            var oldValue, disabled = false;
            //记录就找
            ele.on('keydown', function(event) {
                oldValue = ngModel.$viewValue;
            });
            ngModel.$viewChangeListeners.push(function() {
                var reg = /[a-zA-Z]/;
                disabled = reg.test(ngModel.$viewValue);
                try {
                    if (disabled) {
                        $parse(attrs.ngModel).assign(scope, oldValue);
                    }
                } catch (e) {
                    //如果出现不合格的数字 系统默认给1个0的值
                    $parse(attrs.ngModel).assign(scope, '');
                }
            });
        }
    }
}]);