/**
 * 发送验证码指令
 */
(function(){
    'use strict'
angular.module('starter.directives').directive('sendPhoneCode',  sendPhoneCode);

    function sendPhoneCode($interval, $timeout, dialog, common,systemConfig) {
        return {
            restrict: "AE",
            replace: false,
            transclude: true,
            template: function(element, attr) {
                element.after('<a class="button button-positive ssp-sendPhonCode {{send.css}}" ng-click="sendPhoneCode()"><span>{{send.text}}</span></a>');
            },
            link: function(scope, element, attrs, ctrl) {
                //重置这个语音电话值
                common.smsPop.sendStatus = false;
                //倒计时时间
                var count = 3;
                //页面发送验证码显示字段
                scope.send = {
                    css: '',
                    text: '验证码'
                };
                //定义倒计时方法
                var cb = function() {
                    scope.send.css = 'disabled';
                    var i = count;
                    var timer = $interval(function() {
                        i--;
                        scope.send.text = i + 'S';
                    }, 1000, count).then(function() {
                        //取消停止控制器
                        $interval.cancel(timer);
                        scope.send.css = '';
                        scope.send.text = '验证码';
                        //语音状态 设置为true 显示 电话语音元素
                        common.smsPop.sendStatus = true;
                    });
                };
                //发送验证码事件
                scope.sendPhoneCode = function() {
                   var option =  JSON.parse(attrs.sendPhoneCode);
                    //调用发送验证码信息 有些时候电话号码是输入的 这时候就没有form1.phone对象 就会报错这时候 只需要检测传入的号码正确
                    if(Boolean(option.phoneNum)){
                        if( (option.phoneNum+'').length != 11){
                            dialog.tips('手机号格式错误');
                            return;     
                        }
                    }else{
                        if(scope.form1.phone.$invalid){
                             dialog.tips('手机号格式错误1');
                            return ;   
                        }
                    }   
                    //发送验证码给出弹框
                    systemConfig.sendsmscode(scope.data.user.userPhone,option.enum,option.type, function(data, msg) {
                            //发送成功调用倒计时
                            cb();
                            common.smsPop.smsPopSun();
                        }, function(data, msg) {
                            dialog.tipsError(msg);
                    }); 
                };
            },
        }
    };
 sendPhoneCode.$inject = ['$interval', '$timeout', 'dialog', 'common','systemConfig'];
})();