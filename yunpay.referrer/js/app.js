// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngFileUpload', 'starter.systemConstant', 'ngImgCrop'])
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
			/*var WZY_HTMLVersion = '1400';*/

			$stateProvider
				.state('referrer', {
					url: '/referrer',
					abstract: true,
					templateUrl: 'html/templates/seller.html?v=' + WZY_HTMLVersion
				})
				.state('referrer.userArget', {
					url: '/userArget',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/userArget.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.regist', {
					url: '/regist/{fromState}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/regist.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.referrerCenter', {
					url: '/referrerCenter',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/referrerCenter.html?v=' + WZY_HTMLVersion,
							controller: 'referrerCenter'
						}
					}
				})
				.state('referrer.addCommission', {
					url: '/addCommission',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/addCommission.html?v=' + WZY_HTMLVersion,
							controller: 'addCommission'
						}
					}
				})
				.state('referrer.moneyDetail', {
					url: '/moneyDetail/{id}/{time}/{amount}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/moneyDetail.html?v=' + WZY_HTMLVersion,
							controller: 'moneyDetail'
						}
					}
				})
				.state('referrer.integralDetail', {
					url: '/integralDetail',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/referrerManagers/integralDetail.html?v=' + WZY_HTMLVersion,
							//controller: 'integralDetailCtrl'
						}
					}
				})
				.state('referrer.balanceDetail', {
					url: '/balanceDetail',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/balanceDetail.html?v=' + WZY_HTMLVersion,
							controller: 'balanceDetail'
						}
					}
				})
				.state('referrer.transactionDetail', {
					url: '/transactionDetail/{type}/{state}/{orderId}/{time}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/transactionDetail.html?v=' + WZY_HTMLVersion,
							controller: 'transactionDetail'
						}
					}
				})
				.state('referrer.safeInfo', {
					url: '/safeInfo',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/safeInfo.html?v=' + WZY_HTMLVersion,
							controller: 'safeInfo'
						}
					}
				})
				.state('referrer.realNameApprove', {
					url: '/realNameApprove',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/realNameApprove.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.changePassword', {
					url: '/changePassword',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/changePassword.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.withdraw', {
					url: '/withdraw',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/withdraw.html?v=' + WZY_HTMLVersion,
							controller: 'withdraw'
						}
					}
				})
				.state('referrer.myBankCard', {
					url: '/myBankCard',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/myBankCard.html?v=' + WZY_HTMLVersion,
							controller: 'myBankCard'
						}
					}
				})
				.state('referrer.cardDetail', {
					url: '/cardDetail/{cardId}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/cardDetail.html?v=' + WZY_HTMLVersion,
							controller: 'cardDetail'
						}
					}
				})
				.state('referrer.addBankCard', {
					url: '/addBankCard',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/addBankCard.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.personageOperation', {
					url: '/personageOperation/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/personageOperation.html?v=' + WZY_HTMLVersion,
							controller: 'personageOperation'
						}
					}
				})
				.state('referrer.merchantOperation', {
					url: '/merchantOperation/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/merchantOperation.html?v=' + WZY_HTMLVersion,
							controller: 'merchantOperation'
						}
					}
				})
				.state('referrer.platformOperation', {
					url: '/platformOperation/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/platformOperation.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.agencyOperation', {
					url: '/agencyOperation/{code}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/agencyOperation.html?v=' + WZY_HTMLVersion
						}
					}
				})
				.state('referrer.referrerIntroduce', {
					url: '/referrerIntroduce',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/referrerIntroduce.html?v=' + WZY_HTMLVersion,
							controller: 'referrerIntroduce'
						}
					}
				})
				.state('referrer.IDclosedWaring', {
					url: '/IDclosedWaring',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/IDclosedWaring.html?v=' + WZY_HTMLVersion,
							controller: 'IDclosedWaring'
						}
					}
				})
				//任务市场
				.state('referrer.missionMarket', {
					url: '/missionMarket',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/missionMarket.html?v=' + WZY_HTMLVersion,
							controller: 'missionMarket'
						}
					}
				})
				//任务详情
				.state('referrer.missionDetail', {
					url: '/missionDetail/{id}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/missionDetail.html?v=' + WZY_HTMLVersion,
							controller: 'missionDetail'
						}
					}
				})
				//我的任务
				.state('referrer.myMission', {
					url: '/myMission',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/myMission.html?v=' + WZY_HTMLVersion,
							controller: 'myMission'
						}
					}
				})
				//我的任务详情
				.state('referrer.myMissionDetail', {
					url: '/myMissionDetail/{id}',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/myMissionDetail.html?v=' + WZY_HTMLVersion,
							controller: 'myMissionDetail'
						}
					}
				})
				//我的佣金
				.state('referrer.myCommission', {
					url: '/myCommission',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/myCommission.html?v=' + WZY_HTMLVersion,
							controller: 'myCommission'
						}
					}
				})
				//推广协议
				.state('referrer.pupularizeXieYi', {
					url: '/pupularizeXieYi',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/pupularizeXieYi.html?v=' + WZY_HTMLVersion,
							controller: 'pupularizeXieYi'
						}
					}
				})
				//分享中转页面
				.state('referrer.shareHelpPage', {
					url: '/shareHelpPage',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/shareHelpPage.html?v=' + WZY_HTMLVersion,
							controller: 'shareHelpPage'
						}
					}
				})
				//已有账号登录页面
				.state('referrer.loginInByPhone', {
					url: '/loginInByPhone',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/loginInByPhone.html?v=' + WZY_HTMLVersion
						}
					}
				})
				//我的推客
				.state('referrer.myReferrer', {
					url: '/myReferrer',
					cache: 'false',
					views: {
						'content': {
							templateUrl: 'html/referrer/referrerManagers/myReferrer.html?v=' + WZY_HTMLVersion
						}
					}
				})

			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/referrer/referrerCenter');

		}
	]);