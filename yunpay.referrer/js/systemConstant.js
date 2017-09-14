//正式测试切换开关，false测试，true正式;
var WZY_isOfficial = false;

if(typeof(angular) != 'undefined') {
	angular.module('starter.systemConstant', [])
		.factory('systemConstant', [
			function() {

				if(WZY_isOfficial) {
					//推客正式域名
					var webDomain = "referrer.taidupay.com",
						apiDomain = "referrerapi.taidupay.com";
						QRcode = 'img/tuikezhengshi.jpg';
				} else if(!WZY_isOfficial) {
					//推客测试域名
					/*var webDomain = "127.0.0.1:8020/SPP.H5/yunpay.referrer/", */
					var webDomain = "test.referrer.taidupay.com",
						apiDomain = "test.referrerapi.taidupay.com";
						QRcode = 'img/tuikeceshi.jpg';
					/*apiDomain = "192.168.0.236";*/
				}

				return {
					QRcode:QRcode,
					domain: apiDomain,
					webDoamin: webDomain,
					apiDomain: apiDomain,
					mapUrl: 'http://apis.map.qq.com/tools/locpicker?key=747BZ-GIMKF-2QVJL-JMNVI-T5DU5-5KB4J&referer=spp&search=1',
					tixianMothed: {
						bank: true,
						weixin: false
					},
					dataSource: {
						industries: 'http://' + webDomain + '/json/industriesData.json',
						city: 'http://' + webDomain + '/json/city.json',
						maxDailySales: 'http://' + webDomain + '/json/maxDailySalesData.json'
						/*industries:'http://localhost:63342/yunpay.seller/json/industriesData.json',
						 city:'http://localhost:63342/yunpay.seller/json/city.json',
						 maxDailySales:'http://localhost:63342/yunpay.seller/json/maxDailySalesData.json'*/
					}
				};

			}
		]);
}