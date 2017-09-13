/**
 * 百度地图 dir
 * 使用方法
 * <yp-baidu-map></yp-baidu-map map-sun-fn='sunfn(param)'> //成功还是 传出参数必须是 param 字符串写法
 */
(function(){
	'use strict';
angular.module('starter.directives').directive('ypBaiduMap',  ypBaiduMap);

    function ypBaiduMap(systemConfig,$window,$sce) {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            scope : {
            	mapSunFn : '&'
            },
            template:    
            '<div id="qqmap" class="ssp-qq-map"  data-tap-disabled="true"  style="height:{{mapHeight}};" >'+
                '<iframe id="mapPage" width="100%" height="100%" frameborder=0 ng-src={{mapSrc}}>  </iframe>'+
             '</div>',
            link: function(scope, element, attrs, ctrl) {
                //地图路径
      			scope.mapSrc = $sce.trustAsResourceUrl('http://apis.map.qq.com/tools/locpicker?key=747BZ-GIMKF-2QVJL-JMNVI-T5DU5-5KB4J&referer=spp&search=1&type=1');
 				//高度
                scope.mapHeight = ($window.innerHeight - 50) + 'px!important';
                //加载地图
                $window.addEventListener('message', function(event) {
	                    var loc = event.data;
	                    if (loc && loc.module == 'locationPicker') {
	                        var latlng = loc.latlng;
	                        systemConfig.getAddressBylat(latlng.lat, latlng.lng, function(res) {
	                            res = JSON.parse(res.data);
	                            var data = res.result;

	                            var param = {
	                            	'location' : data.location,
	                            	'nation' : "中国",
	                            	'province' :  data.ad_info.province,
	                            	'city' : data.ad_info.city,
	                            	'district' :  data.ad_info.district,
	                            	'address' : data.address
	                            }
	                             param = JSON.stringify(param);
	                             scope.mapSunFn({'param':param});
	                        }); 
	                    };
	                }, false);
            },
        }
    }
    ypBaiduMap.$inject = ['systemConfig','$window','$sce'];
})()