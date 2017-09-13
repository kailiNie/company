(function(){
	'use strict';
	angular.module('starter.controllers').controller('addCreditCardCtrl',addCreditCardCtrl);
	//信用卡
	function addCreditCardCtrl($scope,$state,popTemplateSer,$ionicPopup){
		var informPop = new popTemplateSer.informHelp($scope);

		$scope.name1 = '聂开枥';

		$scope.goSupportBank = function(){
		 	$state.go('pay.supportBank');
		};
		//帮助
		$scope.popHelp = function($event){
			informPop.pop.show($event);
			 /*var alertPopup = $ionicPopup.alert({
               title: 'Don\'t eat that!',
               template: 'It might taste good'
             });
             alertPopup.then(function(res) {
               console.log('Thank you for not eating my delicious ice cream cone');
             });*/
		};

		/*$scope.closes = function(){
			console.log('进入');
		}*/
	}

	addCreditCardCtrl.$inject = ['$scope','$state','popTemplateSer','$ionicPopup'];
})();