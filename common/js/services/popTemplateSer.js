/**
 * 弹出页面服务 漂浮在页面首页
 */
(function() {
    'use strict';
    angular.module('starter.services').factory('popTemplateSer', popTemplateSer);
        function popTemplateSer($ionicPopover,$rootScope,$ionicBackdrop) {


        var popTemplateSerObj = {
            pop: {
                popSale: '', //业务员
                popSetSafePas: '', //安全密码
                popinputSafePas : '', //输入安全密码
                cashCoupon: '',
                integralCashCoupon:'',//积分提现劵
                popInform : ''
            },
            upSaleManTem: upSaleManTem,
            remSetSafePasTem: remSetSafePasTem, //提示设置下安全密码
            inputSafePasTem: inputSafePasTem, //输入安全密码
            cashCouponTem : cashCouponTem,
            integralCashCouponTem : integralCashCouponTem, //积分提现劵
            payBackList : payBackList, //选择银行卡列表
            informHelp : informHelp,
        };

         var popupStack = [];
         
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        	for(var i in popTemplateSerObj.pop){
        		if(popTemplateSerObj.pop[i]){
        			popTemplateSerObj.pop[i].remove();
        		}
        	}	 
        });
        //加载业务员模板
        function upSaleManTem($scope) {
            var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/upSaleMan.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up'
            })
            //promise对象
            this.promise.then(function(pop) {
                _this.pop = pop;
                //公共promise
                popTemplateSerObj.pop.popSale = pop;
            });
        };
        //告知帮助页面
        function informHelp($scope){
             var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/informHelp.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up'
            })
            //promise对象
            this.promise.then(function(pop) {
                _this.pop = pop;
                  // $ionicBackdrop.retain();
                //公共promise
                popTemplateSerObj.pop.popInform = pop;
                //关闭事件
                pop.scope.closes = function(){
                    pop.hide();
                 };
                
            });
        }
        //提醒设置安全密码
        function remSetSafePasTem($scope) {
            var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/remSafePassword.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up'
            })
            //promise对象
            this.promise.then(function(pop) {
                _this.pop = pop;
                //公共promise
                popTemplateSerObj.pop.popSetSafePas = pop;
 
            });
        };
        //输入安全密码
        function inputSafePasTem($scope) {
        	var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/inputSafePassword.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up'
            });
            this.promise.then(function(pop) {
                 _this.pop = pop;
                 popTemplateSerObj.pop.popinputSafePas = pop;
                 //绑定关闭方法
                  
            });
        };
        //提现秒到劵 传入作用域
        function cashCouponTem($scope){
            var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/cashCoupon.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose : true,
            });
            this.promise.then(function(pop) {
                 _this.pop = pop;
                 popTemplateSerObj.pop.cashCoupon = pop;
            });
        };
        //积分提现劵
        function integralCashCouponTem($scope){
             var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/integralCashpop.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose : true,
            });
            this.promise.then(function(pop) {
                 _this.pop = pop;
                 popTemplateSerObj.pop.integralCashCoupon = pop;
               
            });
        };
        //选择银行卡列表
        function payBackList($scope){
            var _this = this;
            this.promise = $ionicPopover.fromTemplateUrl('html/popTem/payManager/payList.html?v=' + WZY_HTMLVersion + '', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose : true,
            });
            this.promise.then(function(pop) {
                 _this.pop = pop;
            });
        }
        return popTemplateSerObj;
    }
    popTemplateSer.$inject = ['$ionicPopover','$rootScope','$ionicBackdrop']; 
})();