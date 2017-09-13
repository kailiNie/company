/**
 * @Author   NieKaili
 * @DateTime 2017-07-26
 * @des  禁止输入特殊字符指令 记录旧值 全局匹配输入完是否有只有英文/字母 需要配合禁止输入中文一起使用
 * 如果正则true ==>还原到旧值 
 * 使用方法 <input ng-model='test' yp-disnum>
 * @{@link [http://pd.taidupay.com/tdzf/complete/index.html]}
 */
angular.module('starter.directives').directive('ypDisnum', function($parse) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
        	if(!ctrl) return;
            var oldValue, disabled = false;
            //记录旧值
            ele.on('keydown', function(event) {
                oldValue = ctrl.$viewValue;
            });
            ctrl.$viewChangeListeners.push(function() {
                var reg = /\d/g;
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
});
 