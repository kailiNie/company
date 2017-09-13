/**
 * 银行卡号有效性检测
 * 
 */

(function(){ 
    'use strict';
angular.module('starter.directives').directive('ypBankvalid',ypBankvalid);
    function ypBankvalid(merchants,systemConstant,ypDataSer,common) {
    return {
        restrict: "A",
        require: "ngModel",
        scope:{
             ypBankvalid : '&'
        },
        link: function(scope, ele, attrs, ctrl) { 
        	if(!ctrl) return;
        	//绑定鼠标离开时间
        	ele.on('blur',function($even){
                console.log(ctrl.$viewValue);
                //长度大于0 的时候发生请求
                if(!Boolean(ctrl.$viewValue)) return;
                //发生请求
        	 	merchants.cardAscription(ctrl.$viewValue, function(res) {
                    if(res.data.validated){
                       var param =   ypDataSer.accKeyArray(common.bankList,'bankCode',res.data.bank)[0];
                        param = JSON.stringify(param)
                        scope.ypBankvalid({'param':param});
                    }
        	 	 	valid(res.data);
        	 	});
        	});

        	function valid(res) {
                if(res.validated){
                   ctrl.$setValidity('bankCardNo', true);  
                }else{
                   ctrl.$setValidity('bankCardNo', false);  
                }
            }

        }
    }
}
 ypBankvalid.$inject = ['merchants','systemConstant','ypDataSer','common'];
})();
 
