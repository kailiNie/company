(function() {
    angular.module('starter.directives',[]).directive('scrollHeight', scrollHeight)

    function scrollHeight($window) {
        return {
            restrict: 'AE',
            link: function(scope, element, attr) {
                
                console.log($window.innerHeight);

                element[0].style.height = ($window.innerHeight*0.8*0.4) + 'px';
            }
        }
    }

    scrollHeight.$inject = ['$window'];
})();