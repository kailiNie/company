/**
 * 云付自定义键盘
 * $ionicActionSheet 与这个合作使用 ionicActionSheet 添加showTemplate这个方法 这个是弹出金额输入框方法
 */

(function(){
	'use strict';
	angular.module('starter.directives').directive('ypKeyboard',ypKeyboard);

	function ypKeyboard($ionicActionSheet){
		return {
			restrict: "EAC",
			scope : {
				ypOption : '@',
			},
			link : function (scope,element, attrs){
				//注册一个方法
				element.on('click',function($event){
					//如果 keyType ==='amount' 调用金额弹出框
					var keytype = $event.target.getAttribute("ypkeytype");
 					
 					if(keytype === 'amount'){
 						$ionicActionSheet.showTemplate({'title':'应收金额:','buttonClicked' : function(amount){
              			 	console.log('进入');
              			 	console.log(amount);

         				}});
 					}
					 
				});
 			 }
		}
	}

	ypKeyboard.$inject = ['$ionicActionSheet'];

})();