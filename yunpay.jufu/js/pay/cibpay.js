$(function(){
    //code={1}&qrId={2}&shopName={3}
    var getUrlParam=function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURI(r[2]); return null;
        },
        checkAmount= function (amount,type) {
            // var patrn = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
            var patrn='';
            if(type){
                patrn=/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
            }
            else {
                patrn=   /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/;
            }
            var b = patrn.test(amount);
            return b;
        },
        getPayUserId=function(){
            return localStorage.getItem('spp_payUserId') || '';
        },
        setPayUserId=function(userId){
            localStorage.setItem('spp_payUserId', userId);
        },
        paySuccess=function(data){
            dialog.showLoading('付款成功,正在跳转...');
            setTimeout(function () {
                location.href='/#/merchants/merchantspaySucceed';
            }, 100);

            //dialog.hideLoading();
            //dialog.tipsSuccess('付款成功,正在跳转...',function(){
            //    location.href='/#/pay/succeed/'+data.orderId+'/'+data.orderNo;
            //});
        },
        payError=function(data){
            dialog.showLoading('付款失败,正在跳转...');
            setTimeout(function () {
                location.href='/#/pay/fail';
            }, 100);

            //dialog.hideLoading();
            //dialog.tipsError('付款失败,正在跳转...',function(){
            //    location.href='/#/pay/fail/'+data.orderId+'/'+data.orderNo;
            //});
        },

        weixinPay=function(weiData,data){

            var weiOption={
                    successFun:function(){
                        paySuccess(data);
                    },
                    errorFun:function(){
                        payError(data);
                    },
                    cancelFun:function(){
                        dialog.hideLoading();
                    }
                },
                weixinOnBridgeReady = function (data, option) {
                    var defaults = {
                        successFun: '',
                        errorFun: '',
                        cancelFun:''
                    };
                    var set = $.extend(defaults, option);

                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": data.appId, //公众号名称，由商户传入
                            "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": data.nonceStr, //随机串
                            "package": data.package,
                            "signType": "MD5", //微信签名方式：
                            "paySign": data.paySign //微信签名
                        },
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                if (set.successFun) {
                                    set.successFun();
                                }
                            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                if (set.cancelFun) {
                                    set.cancelFun();
                                }
                            } else {
                                if (set.errorFun) {
                                    set.errorFun();
                                }
                            }
                        }
                    );
                };

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', weixinOnBridgeReady(weiData, weiOption), false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', weixinOnBridgeReady(weiData, weiOption));
                    document.attachEvent('onWeixinJSBridgeReady', weixinOnBridgeReady(weiData, weiOption));
                }
            } else {
                weixinOnBridgeReady(weiData,weiOption);
            }

        },
        aliPay=function (payData,data){
            var options = {
                "tradeNO" : payData.tradeNO
            };
            AlipayJSBridge.call('tradePay', options ,function(result){

                if(result.resultCode == '9000'){
                    paySuccess(data);
                }
                else{
                    payError(data);
                }

            });
        },
        qqPay=function(payData,data){
            mqq.tenpay.pay(
                payData,
                function(result,resultCode){
                    if(result && result.resultCode==0){
                        // 成功
                        paySuccess(data);
                    }
                    else if(result && result.resultCode==-1){
                        // 取消
                        dialog.hideLoading();
                    }
                    else{
                        //  失败
                        payError(data);
                    }
                }
            );
        },
        addAmount=function(type) {
			var	amount=$('#amount').val(),
				olderAmount = $('#amount').val();
//				exAmount = ',' + ['', '0', '0.', '0.0'].join(',') + ',';
			switch(type) {
				case '10': // 00
					if(amount === '') {
						amount = '100';
					} else if(amount.indexOf('.') == -1) {
						amount = amount + '00';
					}
					break;
				case '11': // 小数点
					if(amount === '') {
						amount = '0';
					}
					amount = amount + '.';
					break;
				default:
					amount = amount + '' + type;
					break;
			};
			$('#amount').val(amount);
			if(amount.indexOf('0')==0&&amount[1]&&amount[1]!='.'){
				$('#amount').val(amount[1]);
			}
			if(amount.indexOf('.')!=amount.lastIndexOf('.')){
				$('#amount').val(olderAmount);
			};	
			if(amount.indexOf('.')>-1 && amount.length-amount.indexOf('.')>3){
				$('#amount').val(olderAmount);
			};
			if(amount.indexOf('.')>-1 && amount.length-amount.indexOf('.')==3 && amount[amount.length-1]=='0'){
				$('#amount').val(olderAmount);
			};					
			if(amount>99999.99){
				$('#amount').val(olderAmount);
			}
//			if(exAmount.indexOf(',' + amount + ',') > -1) {
//				$('#amount').val(amount);
//			} else if(checkAmount(amount)) {
//				$('#amount').val(amount);
//			};				
		},
        title=(getUrlParam('shopName')) || '获取店铺信息失败,请重新扫描',
        weixinCode=getUrlParam('code'),
        qrCode=getUrlParam('qrId'),
        domain='skapi3.taidupay.com',
        dialog={
            dialogShow:function(id,msg,cb){
                $('#'+id).removeClass('hide').find('span').html(msg);
                $('#backdrop').removeClass('hide');

                setTimeout(function () {
                    $('#'+id).addClass('hide');
                    $('#backdrop').addClass('hide');
                    if(cb){
                        cb();
                    }
                }, 2000);

            },
            tipsError:function(msg,cb){
                this.dialogShow('tipsDialogError',msg,cb);
            },
            tipsSuccess:function(msg,cb){
                this.dialogShow('tipsDialogSuccess',msg,cb);
            },
            showLoading:function(msg){
                msg=msg || '数据加载中';
                $('#loading').removeClass('hide').find('p').html(msg);
                $('#backdrop').removeClass('hide');
            },
            hideLoading:function(){
                $('#loading').addClass('hide');
                $('#backdrop').addClass('hide');
            },
        };

    $('#title').html(title);

    $('#amount').on('keyup',function(){
        var amount=$('#amount').val();
        if(amount==''){
        	$('#showAmount').html("￥0")
        }
        if (amount!=''&&!checkAmount(amount)){
            dialog.tipsError('请输入正确的支付金额');
            return false;
        }
        if(amount){
        	$('#showAmount').html("￥"+amount+"")
        }        
    });
    
    $('#keyboard').find('.key-input').each(function(index,element){
    	element.onclick=function(){
    		var type = '';
    		switch ($(this).html()){
    			case '00':
    				type = '10';
    				break;
    			case '.':
    				type = '11';
    				break;
    			default:
    				type = $(this).html()
    				break;
    		}
    		addAmount(type);
    	}
    })
    
	$('#clear-amount').on('click',function(){
		$('#amount').val('');
	})
	
	$('#goShortcut').on('click',function(){
		var amount=$('#amount').val(),
			remark=$('#remarks').val(),
			code=weixinCode || 0,
			QRId=qrCode || 0;
		if(!qrCode){
            dialog.tipsError('获取店铺信息失败,请重新扫描');
            return false;
        }		
		location.href = "/#/merchants/merchantsShortcutPay/"+amount+"/"+remark+"/"+QRId+"/"code"";
	})	
	
    $('#save').on('click',function(){
        if(!qrCode){
            dialog.tipsError('获取店铺信息失败,请重新扫描');
            return;
        }		
        var amount=$('#amount').val();
        	if(amount[amount.length-1]=='.'){
        		amount = amount.substr(0,amount.length-1)
        	}
        if(!checkAmount(amount,true)){
            dialog.tipsError('请输入正确支付金额');
            return;
        }
        if(amount<0.01){
            dialog.tipsError('单次支付金额不能低于￥0.01');
            return false;
        }
        if (amount>20000){
            dialog.tipsError('单次支付金额不能超过￥20,000');
            return false;
        }

        var user={
            QRId:qrCode || 0,
            Code:weixinCode || 0,
            UserId:getPayUserId(),
            Amount:amount,
            Remarks:$('#remarks').val()
        };

        dialog.showLoading();
        $.post(
            'http://'+domain+'/api/SwiftPass/postswiftpassapipay',
            user,
            function(data){

                if(!data){
                    dialog.hideLoading();
                    dialog.tipsError('下单失败');
                    return;
                }
                if(!data.flag){
                    dialog.hideLoading();
                    dialog.tipsError(data.msg);
                    return;
                }

                data=data.data;
                setPayUserId(data.payVerify);
                var payInfo=JSON.parse(data.payInfo);

                switch (data.payMentEnum){
                    case 1:
                         weixinPay(payInfo,data);
                        break;
                    case 2:
                        aliPay(payInfo,data);
                        break;
                    case 3:
                        qqPay(payInfo,data);
                        break;
                    case 4:// JD
                    default:
                        dialog.hideLoading();
                        dialog.tipsError('仅支持微信和支付宝付款');
                        break;
                }
            },
            'json'
        );

        return false;
    });

    $('#amount').focus();
});
