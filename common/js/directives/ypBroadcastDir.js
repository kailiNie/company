/**
 * @Author   NieKaili
 * @DateTime 2017-07-31
 * @des 广播指令进行滚动播报
 */
angular.module('starter.directives').directive('ypBroadcast', ['$interval', function($interval) {
    return {
        restrict: "EAC",
        transclude: true,
        template: '<ion-list class="waringText" ng-show="ngShow">' + 
        				'<ion-item class="row">' + 
        		   			'<div class="col col-10">' + 
        		    		   '<i class="spp-laba1 iconfont"></i>' + 
        		    		'</div>' + '<div class="col col-80">' + 
        		    			'<p id="ypBroadcastId" style="left: 0px;">' + '{{brcastText}} {{brcastText}}' + '</p>' +
        		    	   '</div>' + 
        		    	   '<div class="col col-10" ng-click="closeWaringText()">' + 
        		    	   		'<i class="spp-guanbi iconfont"></i>' + 
        		    	   	'</div>' + 
        		        '</ion-item>' + 
        		    '</ion-list>',
        scope: {
            ngShow: '=?',
            brcastText: '=?'
        },
        link: function(scope, element, attrs) {
            scope.brcastText = '因业务调整暂停“扫一扫”功能，开放时间另行通知。为您带来不便敬请谅解';
            try {
                var ele = document.getElementById('ypBroadcastId'),timer
                    goAuto = function() {
                        var i = 0;
                         timer = $interval(function() {
                            i = i - 0.1;
                            ele.style.left = i + 'px'
                        }, 1, 6640).then(function() {
                            $interval.cancel(timer);
                            ele.style.left = 0 + 'px';
                            goAuto();
                        });
                    };
                if (scope.ngShow) {
                    goAuto();
                }
            } catch (e) {
                console.log(e);
            }
            //关闭广播
            scope.closeWaringText = function() {
            	scope.ngShow = false;
            };
            //退出控制器 停止计时器
            scope.$on('$destroy',function(){
            	if (scope.ngShow) {
                    $interval.cancel(timer);
                }
            });
        }
}
}]);