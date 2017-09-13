/**
 * 选择城市 服务
 * 使用方法 yp-selectcity
 */
(function(){
	'use strict';
	angular.module('starter.directives').directive('ypSelectcity',['popover',function(popover) {
    return {
        restrict: "A",
       	require: "?ngModel",
        link: function(scope, ele, attrs, ctrl) { 
        	if(!ctrl) return;

        	ele.addClass('color_c7c7c7');
        	//给ng-bind 赋值
        	scope.ngBind = scope.ypPlaceholder;
        	//监听ng-bind 如果没有
        	scope.$watch('ngBind',function(value){
        		/*if(value ==''){

        		};*/
        	 	if(value != scope.ypPlaceholder){
        	 		ele.removeClass('color_c7c7c7');
        	 		ele.addClass('color_444');
        	 	}
        	});
        }
    }
}]);
})();
