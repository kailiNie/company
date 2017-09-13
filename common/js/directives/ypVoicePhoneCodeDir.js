/**
 * 发送验证码指令
 */
angular.module('starter.directives').directive('ypVoicePhoneCode', ['common', '$ionicPopover','systemConfig','dialog',
    function(common, $ionicPopover,systemConfig,dialog) {
        return {
            restrict: "AE",
            replace: false,
            transclude: true,
            template: "<ion-item ng-show='smsPop.sendStatus' class = 'voiceValidate'  id='VoiceValidate'>" + 
                            "收不到短信，<a ng-click='getVoiceValidate()'>接听电话</a>获取验证码" + 
                        "</ion-item>",
            link: function(scope, element, attrs, ctrl) {
                var VoiceValidatePopover;
                //显示电话语音验证码
                scope.smsPop = common.smsPop;
                //初始化语音模态框
                $ionicPopover.fromTemplateUrl('html/merchants/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function(pop) {
                   VoiceValidatePopover = pop;
                });
          
                //获取语音电话短信
                scope.getVoiceValidate = function(){
                    //错误
                       var option =  JSON.parse(attrs.ypVoicePhoneCode);
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
                        VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
                    }, function(data, msg) {
                        dialog.tipsError(msg);
                    }); 
                };
                //关闭弹框
                scope.VoiceValidatePopoverHide = function(){
                    VoiceValidatePopover.hide();
                };
            },
        }
     
    }
]);