/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des  禁止输入空格 中间前后空额禁止输入 正则 \s 禁止输入
 * 使用方法 <input ng-model='test' yp-distrim ng-trim='false'> 
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
(function(){ 'use strict';
    
angular.module('starter.directives').directive('ypDistrim', ['$parse', function($parse) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
            if (!ctrl) return;
            attrs.$set('ng-trim', false);
            //监听keyDown事件
            var oldValue, disabled = false;
            //记录就找
            ele.on('keydown', function(event) {
                oldValue = ctrl.$viewValue;
            });
            //监控model变化 从而监控输入的model值 判断是不是\s/\ 
            ctrl.$viewChangeListeners.push(function() {
                var reg = /\s/;
                disabled = reg.test(ctrl.$viewValue);
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
})();