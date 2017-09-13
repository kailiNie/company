/**
 * 自定义必填项
 * 如果是<p></p> ypRequired 代表
 *  <p class="spp-desc color_c7c7c7"
                       ng-click="fun.showMap()" yp-required='点击设置店铺地址' ng-model='data.user.Address'>
                        {{data.user.Address}}
                    </p>
        必须与ng-model 一起使用 才有效果 ng-model存放的是检测必填项的值            
 */
(function(){ 'use strict';
angular.module('starter.directives').directive('ypRequired', function($parse) {
    return {
        restrict: "AE",
        require: "?ngModel",
        scope : {
            ypRequired : '@',
        },
        link: function(scope, ele, attr, ctrl) {
            if (!ctrl) return;
            //默认检查字符
            var validStr =  scope.ypRequired || 'http';
            attr.required = true; // force truthy in case we are on non input element
            ctrl.$validators.required = function(modelValue, viewValue) {
                //判断有没有http 如果有这样的字说明不是本地的 为了页面简化所以加了个判断
                var   requiredValid;
                if(scope.ypRequired){
                     requiredValid = viewValue.indexOf(validStr) >=0 ? false : true; 
                }else{
                     requiredValid = viewValue.indexOf(validStr)  >=0 ? true : false; 
                }
                return !attr.required ||  requiredValid;
            
            };
            //同步
            attr.$observe('required', function() {
                ctrl.$validate();
            });
          
        }
    }
});
})();