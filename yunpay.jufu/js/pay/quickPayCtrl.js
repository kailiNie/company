/**
 * 快捷付款
 */

(function(){
	'use strict';
	angular.module('starter.controllers').controller('quickPayCtrl',quickPayCtrl);
	//进入
	function quickPayCtrl($scope,popTemplateSer){
		 var payBackListPop = new  popTemplateSer.payBackList($scope);

		$scope.saves = function($event){
 
		 	 payBackListPop.pop.show($event);
		};



	};

	quickPayCtrl.$inject = ['$scope','popTemplateSer'];
})();