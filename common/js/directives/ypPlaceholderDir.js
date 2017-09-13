/**
 * 自定义placeholder
 */
(function(){ 'use strict';
angular.module('starter.directives').directive('ypPlaceholder',['bank',function(bank) {
    return {
        restrict: "EA",
       	scope : {
       		ypPlaceholder : '@'
       },
        link: function(scope, ele, attrs, ctrl) { 
            console.log('进入');
                console.log(scope.ypPlaceholder);
            console.log('进入');
        /*	ele.addClass('color_c7c7c7');
        	//给ng-bind 赋值
        	scope.ngBind = scope.ypPlaceholder;
        	//监听ng-bind 如果没有
        	scope.$watch('ngBind',function(value){
        		if(value ==''){

        		};
        	 	if(value != scope.ypPlaceholder){
        	 		ele.removeClass('color_c7c7c7');
        	 		ele.addClass('color_444');
        	 	}
        	});*/
        }
    }
}]);
})();