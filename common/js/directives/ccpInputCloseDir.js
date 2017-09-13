//删除input ng-model值 样式指令
(function(){
    'use strict';
angular.module('starter.directives',[]).directive('ccpInputClose', function() {
    return {
        restrict: "AE",
        replace: false,
        transclude: true,
        template: function(element, attr) {
            attr.ccpInputClose = attr.ccpInputClose || true;
            /*element.after('<a class="button ion-close-round icon ccp_input_close" ng-show="'+attr.ngModel+'" ng-click="alert();"></a>');*/
            element.after('<i class="ion-close-round icon ssp-input-close" ng-show="!' + attr.ccpInputClose + '||' + attr.ngModel + ' && ' + !attr.ngDisabled + '" ng-click="' + attr.ngModel + '=\'\';"></i>');
            //					element.after('<i class="ion-close-round icon ssp-input-close" ng-show="' + attr.ngModel + ' && ' + !attr.ngDisabled + '" ng-click="closeModel()"></i>');
        },
    }
});
})();