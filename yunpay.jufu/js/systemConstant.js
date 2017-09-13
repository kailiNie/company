angular.module('starter.systemConstant', [])
    .factory('systemConstant', [
        function () {
            /*var webDomain = "m.taidupay.com",
                apiDomain = "webapi.taidupay.com";*/
            /*var webDomain = "bm.taidupay.com",
                apiDomain = "bwebapi.taidupay.com";*/
            /*var webDomain = "csm.taidupay.com",
                apiDomain = "cswebapi.taidupay.com";*/
            /*var webDomain = "127.0.0.1:8020/yunpay.jufu",*/
            var webDomain = "sk3.taidupay.com",
                apiDomain = "skapi3.taidupay.com";

            return {
                domain: apiDomain,
                webDoamin: webDomain,
                apiDomain: apiDomain,
                tixianMothed:{
                    bank:true,
                    weixin:false
                },
                dataSource:{
                    industries:'http://'+webDomain+'/json/industriesData.json',
                    city:'http://'+webDomain+'/json/city.json',
                    maxDailySales:'http://'+webDomain+'/json/maxDailySalesData.json'
                    /*industries:'http://localhost:63342/yunpay.seller/json/industriesData.json',
                     city:'http://localhost:63342/yunpay.seller/json/city.json',
                     maxDailySales:'http://localhost:63342/yunpay.seller/json/maxDailySalesData.json'*/
                }
            };

        }
    ]);
