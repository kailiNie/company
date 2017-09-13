// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngFileUpload','starter.directives', 'starter.systemConstant', 'ngImgCrop'])
	.run([
		'$ionicPlatform',
		function($ionicPlatform) {

			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if(window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}

			});
		}
	])
	.constant("$ionicLoadingConfig", {
		"template": "<ion-spinner></ion-spinner>",
		"noBackdrop": true
	})
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$ionicConfigProvider',
		'$httpProvider',
		function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

			$ionicConfigProvider.tabs.style("standard").position('bottom');
			$ionicConfigProvider.navBar.alignTitle("center");
			$ionicConfigProvider.scrolling.jsScrolling(true);
			$ionicConfigProvider.views.transition("andriod");
			$httpProvider.defaults.withCredentials = true;
			//  ngClipProvider.setPath("lib/zeroclipboard-master/dist/ZeroClipboard.swf");
			var HTMLVersion = '1264';

			$stateProvider
				.state('seller', {
					url: '/seller',
					abstract: true,
					templateUrl: 'html/templates/seller.html?v=' + HTMLVersion
				})
				.state('merchants', {
					url: '/merchants',
					abstracFt: true,
					templateUrl: 'html/templates/seller.html?v=' + HTMLVersion
				})
				.state('pay', {
					url: '/pay',
					abstracFt: true,
					templateUrl: 'html/templates/seller.html?v=' + HTMLVersion
				})
				// 注册
				.state('seller.regist', {
					url: '/sellerregist',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/seller/regist.html?v=' + HTMLVersion
						}
					}
				})
				//身份证信息确认
				.state('merchants.merchantInfo', {
					url: '/merchantInfo',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/merchantInfo.html?v=' + HTMLVersion
						}
					}
				})
				//店铺名称确认
				.state('merchants.sureShopName', {
					url: '/sureShopName',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/sureShopName.html?v=' + HTMLVersion,
						}
					}
				})
				//生成二维码
				.state('merchants.myQRcode', {
					url: '/myQRcode/{shopName}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/myQRcode.html?v=' + HTMLVersion,
							controller: 'myQRcode'
						}
					}
				})
				// 1.个人信息完善
				// 2.根据店铺名称生成二维码
				//


				/*// 申请入驻商家
				.state('seller.registerapply', {
					url: '/sellerregisterapply',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/seller/registerapply.html?v=' + HTMLVersion
						}
					}
				})
				// 完善店铺信息
				.state('seller.settled', {
					url: '/sellersettled',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/seller/settled.html?v=' + HTMLVersion
						}
					}
				})
				// 入驻成功
				.state('seller.settledSuccess', {
					url: '/sellersettledSuccess/{type}/{shopId}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/seller/settledSuccess.html?v=' + HTMLVersion,
							controller: 'sellersettledSuccess'
						}
					}
				})
				// 绑定成功
				.state('seller.settledBindSuccess', {
					url: '/sellersettledBindSuccess/{type}/{shopId}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/seller/settledBindSuccess.html?v=' + HTMLVersion,
							controller: 'sellersettledSuccess'
						}
					}
				})*/
				// 商家中心
				.state('merchants.index', {
					url: '/merchantsIndex',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/index.html?v=' + HTMLVersion,
							controller: 'merchantsIndex'
						}
					}
				})
				// 商家资金账户
				.state('merchants.balanceAccount', {
					url: '/balanceAccount/{type}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/balanceAccount.html?v=' + HTMLVersion,
							controller: 'merchantsbalanceAccount'
						}
					}
				})
				// 销售明细
				.state('merchants.saleDetail', {
					url: '/saleDetail/{branchShopId}/{type}/{shopName}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/saleDetail.html?v=' + HTMLVersion,
							controller: 'merchantssaleDetail'
						}
					}
				})
				// 商家设置中心
				.state('merchants.setCenter', {
					url: '/setCenter',
					//cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/setCenter.html?v=' + HTMLVersion,
							controller: 'setCenter'
						}
					}
				})
				//修改安全密码
				.state('merchants.setPassword', {
	              url: '/setPassword/{type}',
	              cache: 'false',
	              views: {
	                'content': {
	                  templateUrl: 'html/merchants/setPassword.html?v=' + HTMLVersion
	                }
	              }
	            })
				// 商家订单详情
				.state('merchants.orderDetail', {
					url: '/orderDetail/{orderId}/{code}/{source}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/orderDetail.html?v=' + HTMLVersion,
							controller: 'merchantsOrderDetail'
						}
					}
				})
				// 新增银行卡
				.state('merchants.addCard', {
					url: '/merchantsaddCard',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/addCard.html?v=' + HTMLVersion
						}
					}
				})
				// 商家提现
				.state('merchants.withdraw', {
					url: '/withdraw/{type}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/withdraw.html?v=' + HTMLVersion,
							controller: 'merchantswithdraw'
						}
					}
				})
				// 提现记录
				.state('merchants.withdrawList', {
					url: '/withdrawList/{type}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/withdrawList.html?v=' + HTMLVersion,
							controller: 'merchantswithdrawList'
						}
					}
				})
				// 商家银行卡列表
				.state('merchants.myCards', {
					url: '/myCards',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/myCards.html?v=' + HTMLVersion,
							controller: 'merchantsmyCards'
						}
					}
				})
				// 商家银行卡详情
				.state('merchants.cardDetail', {
					url: '/cardDetail/{cardId}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/cardDetail.html?v=' + HTMLVersion,
							controller: 'merchantscardDetail'
						}
					}
				})
				// 修改密码
				.state('merchants.editPassword', {
					url: '/editPassword/{type}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/editPassword.html?v=' + HTMLVersion
						}
					}
				})
				// 提现详情
				.state('merchants.withdrawDetail', {
					url: '/withdrawDetail/{id}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/withdrawDetail.html?v=' + HTMLVersion,
							controller: 'merchantswithdrawDetail'
						}
					}
				})
				// 提现详情
				.state('merchants.withdrawDe', {
					url: '/withdrawDe/{id}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/withdrawDe.html?v=' + HTMLVersion,
							controller: 'withdrawDeCtrl'
						}
					}
				})
				// 资金收支明细
				.state('merchants.budgetDetail', {
					url: '/budgetDetail',
					//cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/budgetDetail.html?v=' + HTMLVersion,
							controller: 'merchantsbudgetDetail'
						}
					}
				})
				// 商家服务协议
				.state('merchants.userArget', {
					url: '/userArget',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/userArget.html?v=' + HTMLVersion
						}
					}
				})
				// 商家反扫
				.state('merchants.scanCodeCenter', {
					url: '/merchantsscanCodeCenter/{type}/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/scanCodeCenter.html?v=' + HTMLVersion,
							controller: 'merchantsScanCodeCenter'
						}
					}
				})
				// 反扫成功
				.state('merchants.scanCodeSucceed', {
					url: '/merchantsscanCodeSucceed/{code}/{orderNo}/{amount}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/scanCodeSucceed.html?v=' + HTMLVersion,
							controller: 'merchantsScanCodeSucceed'
						}
					}
				})
				// 反扫失败
				.state('merchants.scanCodeDefeat', {
					url: '/merchantsscanCodeDefeat',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/scanCodeDefeat.html?v=' + HTMLVersion,
							controller: 'merchantsScanCodeDefeat'
						}
					}
				})
				//收款成功
				.state('merchants.paySucceed', {
					url: '/merchantspaySucceed',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/paySucceed.html?v=' + HTMLVersion,
							controller: 'merchantsPaySucceed'
						}
					}
				})
				.state('merchants.shortcutPay', {
					url: '/merchantsShortcutPay/{amount}/{remark}/{QRId}/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/shortcutPay.html?v=' + HTMLVersion
						}
					}
				})
				.state('merchants.canUserBank', {
					url: '/merchantsCanUserBank',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/merchants/canUserBank.html?v=' + HTMLVersion,
							controller: 'merchantsCanUserBank'
						}
					}
				})
				// 扫码失败,二维码未激活
				.state('pay.scanefail', {
					url: '/scanefail',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/pay/scanefail.html?v=' + HTMLVersion
						}
					}
				})
				// 扫描失败,使用微信是支付
				.state('pay.useWeiXin', {
					url: '/useWeiXin',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/pay/useWeiXin.html?v=' + HTMLVersion
						}
					}
				})
				// 支付失败
				.state('pay.fail', {
					url: '/fail',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/pay/fail.html?v=' + HTMLVersion,
							controller:'payResult'
						}
					}
				})
				//快捷收款
				.state('pay.quickPay', {
					url: '/quickPay',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/pay/quickPay.html?v=' + HTMLVersion,
							controller:'quickPayCtrl'
						}
					}
				})
				//新增银行卡
				.state('pay.addCreditCard', {
					url: '/addCreditCard',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/bankManager/addCreditCard.html?v=' + HTMLVersion,
							controller:'addCreditCardCtrl'
						}
					}
				})
				//支持银行卡
				.state('pay.supportBank', {
					url: '/supportBank',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/bankManager/supportBank.html?v=' + HTMLVersion,
							controller:'supportBankCtrl'
						}
					}
				}).state('pay.bankAuthentication', {
					url: '/bankAuthentication',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/bankManager/bankAuthentication.html?v=' + HTMLVersion,
							controller:'bankAuthenticationCtrl'
						}
					}
				})
/*addBankAuthentication*/
			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/merchants/merchantsIndex');

		}
	]);