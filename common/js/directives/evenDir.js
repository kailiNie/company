(function(){
    'use strict';
angular.module('starter.directives').directive('even',even);
 function even() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, ele, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$parsers.push(function(viewValue) {
                if (viewValue % 2 === 0) {
                    ctrl.$setValidity('even', true);
                } else {
                    ctrl.$setValidity('even', false);
                }
                return viewValue;
            });
        }
    }
} 

})();