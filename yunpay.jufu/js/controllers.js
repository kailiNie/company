angular.module('starter.controllers', [])

	// 商家注册
	.controller('sellerregist', [
		'$scope',
		'$state',
		'validate',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		function($scope, $state, validate, seller, common, systemConfig, dialog, systemConstant, userInfo) {

			var guid = common.getGUID(),
				trim=function (str) {
					return str.replace(new RegExp(/( )/g),'');
				},
				ToCDB=function ToCDB(str){
					var tmp = "";
					for(var i=0;i<str.length;i++)
					{
						if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375)
						{
							tmp += String.fromCharCode(str.charCodeAt(i)-65248);
						}
						else
						{
							tmp += String.fromCharCode(str.charCodeAt(i));
						}
					}
					return tmp
				},
				hasInvter = false;

			$scope.data = {
				isArget: true,
				codeUrl: systemConfig.getValidateCode(guid),
				user: {
					userPhone: '',
					userPwd: '',
					reuserPwd: '',
//					validatecode: '',
					phoneCode: '',
					inviterCode: '',
					inviter: ''
				}
			};

			$scope.sendValidate = function(cb) {
				return validate.element($scope.form1.userPhone, '手机号') &&
//					validate.element($scope.form1.validatecode, '验证码') &&
					systemConfig.registerSmsCode(
						$scope.data.user.userPhone,
//						$scope.data.user.validatecode,
						guid,
						cb,
						function(data, msg) {
							dialog.tipsError(msg);
							$scope.fun.getvalidatecode();
						}
					);
			};

			$scope.fun = {
				userRegist: function() {

					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'userPhone': '您的手机号',
							'phoneCode': '手机验证码',
							'userPwd': '您的密码',
							'reuserPwd': '您的密码'
//							'validatecode': '图形验证码'
						}
					});

					if(isOkform1) {
						if($scope.data.user.userPwd != $scope.data.user.reuserPwd) {
							dialog.tips('密码不一致');
							return false;
						}
						if(!$scope.data.user.inviterCode) {
							dialog.alert('邀请码必填,若无邀请码您可联系客服热线：<br/><a href="tel:400-961-5200">400-961-5200</a>');
							return false;
						}
						if(!hasInvter) {
							dialog.alert('邀请码错误,请重新填写,若无邀请码您可联系客服热线：<br/><a href="tel:400-961-5200">400-961-5200</a>');
							return false;
						}

						seller.regist(
							$scope.data.user,
							function() {
								dialog.tipsSuccess('登录成功', function() {
									$state.go('merchants.merchantInfo');
									userInfo.setSureFirstGoinShopCenter($scope.data.user.userPhone, 1)
								});
							});
					}
				},
				getvalidatecode: function() {
					$scope.data.codeUrl = systemConfig.getValidateCode(guid);
				},
				getInviter: function() {
					var inviterCode = ToCDB(trim($scope.data.user.inviterCode));
					console.log(inviterCode);
					if(inviterCode && inviterCode.length == 5) {
						seller.getrecommendphonenum(
							inviterCode,
							function(data, msg, code) {
								hasInvter = true;
								$scope.data.user.inviter = '推荐人:' + data;
							},
							function(data, msg, code) {
								hasInvter = false;
								$scope.data.user.inviter = msg;
							});
					} else {
						hasInvter = false;
						$scope.data.user.inviter = '推荐码不存在';
					}
				}
			};
			seller.ReferrerCode(function(data){
				$scope.data.hadReferInvter = data.code
				if($scope.data.hadReferInvter){
					$scope.data.user.inviterCode = $scope.data.hadReferInvter;
					$scope.data.user.inviter = '推荐人:' + $scope.data.user.inviterCode;
					hasInvter = true;
				}
			});

		}
	])
	// 身份证信息填写
	.controller('merchantInfo', [
		'$scope', '$state', 'merchants2','validate','dialog','seller',
		function($scope, $state, merchants2,validate,dialog,seller) {
			$scope.data={
				'user':{
					'Name':'',
					'idcard':''					
				}
			}
			merchants2.getsellerstatus(function(data){
				if(data&&data.isSetShopkeepInfo){
					$state.go('merchants.sureShopName')
				}
			});
			$scope.fun = {
				save: function(){
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'Name': '您的姓名',
							'idcard': '您的身份证号码'
						}
					});
					if(isOkform1){
						if($scope.data.user.Name.length>12){
							dialog.tips('输入姓名不超过12个单位');
						}else{
							dialog.confirm('请输入正确的身份信息，方便日后找回密码', function() {
								seller.updateshopkeeperinfo($scope.data.user,function(){
									$state.go('merchants.sureShopName')
								})								
							});	
						}											
					}					
				}
			}
		}
	])
	// 店铺名称确认
	.controller('sureShopName', [
		'$scope', '$state', 'merchants2','validate','dialog',
		function($scope, $state, merchants2,validate,dialog) {
			$scope.data={
				'user':{
					'Name':'',			
				}

			};
			merchants2.getsellerstatus(function(data){
				if(data&&data.isSetShopBaseInfo){
					$state.go('merchants.myQRcode')
				}
			});
			$scope.fun = {
				save: function(){
					var shopName = encodeURIComponent($scope.data.user.Name)
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'Name': '您的店铺名称'
						}
					});
					merchants2.activateqrcodepay(shopName,function(data){
						$scope.data.myQRcode = data;
					})
					if(isOkform1){
						if($scope.data.user.Name.length>12){
							dialog.tips('输入店铺名不超过12个单位');
						}else{
							dialog.tipsSuccess('已为您的店铺生成您的专属二维码', function() {
								$state.go('merchants.myQRcode',{'shopName':shopName})
							});	
						}											
					}					
				}
			}
		}
	])
	// 生成二维码
	.controller('myQRcode', [
		'$scope', '$state', 'merchants2','$stateParams',
		function($scope, $state, merchants2,$stateParams) {
			var shopName = decodeURIComponent($stateParams.shopName);
			angular.forEach(document.getElementsByClassName('back-button'),function(item){
				item.className+=' displaynone';
			})
			$scope.data={
				qrUrl:''
			};
			merchants2.getshopqrcodeurl(0,
				function(data) {
					$scope.data.qrUrl = data;
				});
			$scope.fun={
				gomerchantsIndex:function(){
					$state.go('merchants.index')
				}
			}
		}
	])
	// 申请商家入驻
	/*.controller('sellerregisterapply', [
		'$scope', 'merchants2', 'validate', 'dialog',
		function($scope, merchants2, validate, dialog) {

			$scope.data = {
				showFlag: 1,
				hasshop: false,
				shopName: '',
				user: {}
			};

			$scope.fun = {
				change: function() {

					var phone = $scope.data.user.ReferrerPhoneNumber;
					$scope.data.hasshop = false;

					if(validate.checkPhone(phone, false)) {
						merchants2.getshopnamebyphonenum(phone,
							function(data) {
								$scope.data.hasshop = true;
								$scope.data.shopName = '推荐您的商家:' + data;
							},
							function(data) {
								$scope.data.shopName = '推荐您的商家:暂无';
							})
					}

				},
				save: function() {

					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'Name': '您的姓名',
							'PhoneNumber': '您的手机号',
							'Address': '您的地址'
						}
					});

					if(isOkform1) {
						if(!$scope.data.hasshop &&
							$scope.data.user.ReferrerPhoneNumber) {
							dialog.confirm('找不到推荐您的商家,是否确认继续入驻?', function() {
								merchants2.registerapply(
									$scope.data.user,
									function(data) {
										dialog.tipsSuccess('申请提交成功', function() {
											$scope.data.showFlag = 2;
										});
									});
							});
							return;
						} else {
							merchants2.registerapply(
								$scope.data.user,
								function(data) {
									dialog.tipsSuccess('申请提交成功', function() {
										$scope.data.showFlag = 2;
									});
								});
						}
					}

				}
			};

		}
	])
	// 入驻成功
	.controller('sellersettledSuccess', [
		'$scope',
		'$state',
		'$stateParams',
		'dialog',
		'weixin',
		'seller',
		function($scope, $state, $stateParams, dialog, weixin, seller) {
			var wei = weixin.weiXin(),
				type = $stateParams.type,
				shopId = $stateParams.shopId;

			wei.init();

			$scope.data = {
				type: type
			};

			$scope.fun = {
				go: function() {
					wei.scane(function(result) {
						seller.applyqrcodepay(result, shopId, function() {
							dialog.tipsSuccess('绑定成功', function() {
								$state.go('seller.settledBindSuccess', {
									'type': type
								});
							})
						});
					});
				},
				setPwd: function() {
					$state.go('merchants.setPassword', {
						'type': 1
					});
				},
				goCent: function() {
					$state.go('merchants.index');
				}
			};

		}
	])*/
	// 商家中心	
	.controller('merchantsIndex', [
		'$scope', 'merchants2', '$state', '$ionicPopover', 'userInfo',
		function($scope, merchants2, $state, $ionicPopover, userInfo) {

			$scope.data = {
				"blanceAmount": 0,
				"sales": 0,
				"totalScore": 0,
				"commentTotal": 0,
				"bonusAmount": 0,
				"branchCount": 0,
				"shopName": "店铺名称",
				"shopLogo": "img/smileOn.jpg"
			};

			merchants2.getsellerstatus(function(data) {
				if(data && !data.isSetShopkeepInfo) {
					$state.go('merchants.merchantInfo');
				} else if(data && !data.isSetShopBaseInfo) {
					$state.go('merchants.sureShopName');
				} else {
					merchants2.getInfo(function(data) {
						$scope.data = data;

						if(userInfo.getSureFirstGoinShopCenter($scope.data.phoneNumber) == 1) {
							$ionicPopover.fromTemplateUrl('html/merchants/balanceAccountModal.html', {
								scope: $scope,
								animation: 'slide-in-up'
							}).then(function(pop) {
								pop.show(document.getElementById('save'));
								popover = pop;
							});
							userInfo.setSureFirstGoinShopCenter(data.phoneNumber, 2)
						}

					});
				}

			});

			$scope.fun = {
				kefu: function() {
					qimoChatClick();
				},
				closethis: function() {
					popover.hide()
				},
				getNow: function() {
					$state.go('merchants.withdraw', {
						'type': 3
					})
					popover.remove()
				},
				goBlanceAmount: function(blanceAmount) {
					$state.go("merchants.balanceAccount", {
						"type": 1
					});
				},
				goSaleDetail: function() {
					$state.go("merchants.saleDetail",{
						'branchShopId':'-1',
						'type':'10',
						'shopName':$scope.data.shopName
					});
				},
				goPointDetail: function() {
					$state.go("merchants.pointDetail");
				},
				goComingSoon: function() {
					$state.go("merchants.comingSoon");
				},
				goShop: function() {
					$state.go('merchants.shopList');
				},
				goComment: function() {
					$state.go("merchants.comment");
				},
				goReward: function() {
					$state.go("merchants.balanceAccount", {
						"type": 2
					});
				},
				goDataInfo: function() {
					$state.go("dataInfo.dataInfo")
				},
				goScanCodeCenter: function() {
					$state.go("merchants.scanCodeCenter", {
						'type': 1,
						'code': 0
					})
				},
				//聚合收款
				quickPay : function (){
					$state.go("pay.quickPay");
				}
			}

		}
	])
	// 商家设置中心
	.controller('setCenter', [
		'$scope', '$state', 'merchants2','$ionicPopover','seller','dialog',
		function($scope, $state, merchants2,$ionicPopover,seller,dialog) {
			seller.login()
			var popoverT = null;
			$scope.data = {
				"isSetShopkeepInfo": true,
				"isSetShopBaseInfo": true,
				"isCapitalAccount": true,
				"phoneNum": "*****"
			};
			$scope.user = {
				
			};

			//merchants2.getPhoneNumber(function(data){
			//  $scope.data.userPhone=data;
			//});
			$ionicPopover.fromTemplateUrl('html/merchants/setCenterModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function (pop) {
				/*pop.show(document.getElementById('help'));*/
				popoverT = pop;
			});
			
			$scope.fun = {
				showPopoverT:function(){
					popoverT.show(document.getElementById('help'))
				},
				hidePopoverT:function(){		
					popoverT.hide();
				},
				postCode:function(){
					merchants2.updatesalesman(
						{
							'Code':$scope.data.invitationCode,						
						},
						function() {
							dialog.tipsSuccess('提交成功', function() {
								popoverT.hide();
								history.go(0);
							});
						}
					)
				},
				goShop: function() {
					$state.go('merchants.editShop');
				},
				gotoSettled: function() {
					$state.go('seller.settled');
				},
				gotoShop: function() {
					$state.go('seller.shopInfo');
				},
				goToUpdatePhone: function() {
					$state.go('merchants.editPhoneNumber');
				},
				goToMyClerk: function() {
					$state.go('merchants.myClerk');
				},
				goToMyCards: function() {
					$state.go('merchants.myCards');
				},
				goToSetPwd: function() {
					if(!$scope.data.isCapitalAccount) {
						$state.go('merchants.setPassword', {
							'type': 1
						});
					} else {
						$state.go('merchants.editPassword', {
							'type': '1'
						});
					}
				},
				goToSetLoginPwd: function() {
					$state.go('merchants.setPassword', {
						'type': 2
					});
				},
				back: function() {
					$state.go('merchants.index');
				},
				//认证
				bankAuthentication : function(){
					$state.go('pay.bankAuthentication');
				}

			};

			merchants2.getsellerstatus(function(data) {
				$scope.data = data;
			});
			
			merchants2.ShopSalesManCode(function(data){				
				if(data.recommendCode){
					$scope.user.hasCode = true;
					$scope.user.userCode = data.recommendCode;
				}else{
					$scope.user.hasCode = false;
				}
			});
		}
	])
	// 商家银行卡列表
	.controller('merchantsmyCards', [
		'$scope', 'merchants2', '$state', 'common',
		function($scope, merchants2, $state, common) {

			var bankList = common.bankList,
				getBank = function(code) {
					//return bankList[0];
					var result = {};
					angular.forEach(bankList, function(item) {
						if(item.id == code) {
							result = item;
						}
					});
					return result;
				};

			$scope.data = {
				data: {},
				hasData: false
			};

			$scope.fun = {
				getShowBankNo: common.getShowBankNo,
				addCard: function() {
					$state.go('merchants.addCard');
				},
				goToCardDetail: function(id) {
					$state.go('merchants.cardDetail', {
						'cardId': id
					});
				}

			};

			merchants2.getCardsList(function(data) {
				var result = {};
				angular.forEach(data, function(item) {
					result = getBank(item.bankCode);
					item.desc = result || {};

				});
				$scope.data.data = data;
				$scope.data.hasData = data.length == 0;
			});
		}
	])
	// 商家银行卡详情
	.controller('merchantscardDetail', [
		'$scope', 'merchants2', '$state', '$stateParams', '$ionicHistory', 'dialog', 'common', 'validate',
		function($scope, merchants2, $state, $stateParams, $ionicHistory, dialog, common, validate) {

			var bankList = common.bankList,
				getBank = function(code) {
					//return bankList[0];
					var result = {};
					angular.forEach(bankList, function(item) {
						if(item.id == code) {
							result = item;
						}
					});
					return result;
				};

			var cardId = $stateParams.cardId;

			$scope.data = {};

			$scope.fun = {
				addCard: function() {
					$state.go('merchants.addCard');
				},
				save: function() {
					var isPost = true;
					dialog.passWord(
						'解绑银行卡',
						'',
						'',
						function(pwd, prop) {
							if(!isPost) {
								return false;
							}
							if(!validate.checkPwd(pwd, true)) {
								return false;
							}
							isPost = false;
							$scope.data.securityPwd = pwd;

							merchants2.unbindCard(cardId, pwd, function(data) {
								prop.close();
								dialog.tipsSuccess('解绑成功', function() {
									$ionicHistory.goBack();
								});
							}).finally(function() {
								isPost = true;
							});

						},
						'解绑'
					);
				}
			};
			merchants2.getCardsDetail(cardId, function(data) {
				data.desc = getBank(data.bankCode) || {};
				$scope.data = data;
			})
		}
	])
	// 新增银行卡
	.controller('merchantsaddCard', [
		'$scope', '$ionicHistory', 'validate', 'merchants2', 'dialog', 'popover', 'bank',
		function($scope, $ionicHistory, validate, merchants2, dialog, popover, bank) {
			var city = popover.city($scope, {
				event: {
					okFun: function() {
						var cityText = city.fun().getText(),
							cityArr = cityText.split(',');

						$scope.data.cityText = cityText;
						$scope.data.areaCode = city.fun().getlaseId();
						$scope.data.provincial = cityArr[0];
						$scope.data.city = cityArr[1];
					}
				}
			});

			$scope.data = {
				'cityText': '点击设置开户行所在城市',
				'isArget': true,
				'fullName': '',
				'bankCardNo': '',
				'bankCardName': '请设置银行卡开户行',
				'securityPwd': '',
				'bankCode': '',
				'cityInfo': '',
				'provincial': '',
				'areaCode': '',
				'bankCode': '',
				'hasPwd': false
			};

			$scope.popover = {
				city: city
			};

			$scope.fun = {
				showBankInfo: function() {
					bank.getBankInfo(
						$scope.data.bankCardNo,
						function(msg, data) {
							$scope.data.bankCode == '';

							if(!msg && data) {
								if(!data || !data.addible) {
									$scope.data.bankCardName = '系统暂不支持' + data.bankName + '银行卡,请选择其他银行卡';
									return;
								}
								if(data.cardType != 'DC') {
									$scope.data.bankCardName = '系统只能绑定储蓄卡,请选择其他银行卡';
									return;
								}

								$scope.data.bankCode = data.bankCode;
								$scope.data.bankCardName = data.bankName;
							} else {
								$scope.data.bankCardName = msg;
							}
						});
				},
				addCardSubmit: function($event) {
					var isOkform1 = validate.form($scope.form1, {
							'message': {
								'fullName': '姓名',
								'bankCardNo': '银行卡号',
								'bankCardName': '开户行名称'
							}
						}),
						isPost = true;

					if(isOkform1) {

						if(!$scope.data.bankCode) {
							dialog.tips($scope.data.bankCardName);
							return;
						}
						if(!$scope.data.areaCode) {
							dialog.tips('请设置开户行所在城市');
							return;
						}

						//$scope.data.bankCode='CMB';
						//$scope.data.bankCardName='招商银行';
						dialog.passWord(
							'绑定银行卡',
							'',
							'',
							function(pwd, prop) {
								if(!isPost) {
									return false;
								}
								if(!validate.checkPwd(pwd, true)) {
									return false;
								}
								isPost = false;
								$scope.data.securityPwd = pwd;

								merchants2.addCard($scope.data, function(data) {
									prop.close();
									dialog.tipsSuccess('绑定成功', function() {
										$ionicHistory.goBack();
									});
								}).finally(function() {
									isPost = true;
								});

							},
							'绑定'
						);

					}
				}
			}

			merchants2.iscapitalaccount(function(data) {
				$scope.data.hasPwd = data;
			});
		}
	])
	//修改安全密码
	.controller('merchantssetPassword', [
		'$scope', '$state', '$stateParams', '$ionicHistory', 'merchants2', 'validate', 'dialog', 'sendPhoneValidCode',
		function($scope, $state, $stateParams, $ionicHistory, merchants2, validate, dialog, sendPhoneValidCode) {

			// 1:安全密码;2:登陆密码
			var type = $stateParams.type;

			$scope.data = {
				userPhone: '',
				password: '',
				repassword: '',
				phoneCode: ''
			};

			$scope.sendValidate = function(cb) {
				return sendPhoneValidCode.getValidateCode(cb);
			};

			$scope.fun = {
				setPasswordSubmit: function() {
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'password': '密码',
							'repassword': '确认密码',
							'phoneCode': '验证码'
						}
					});

					if(isOkform1) {
						if($scope.data.password.length != 6) {
							dialog.tips('请输入6位数密码');
							return false;
						}
						if($scope.data.password != $scope.data.repassword) {
							dialog.tips('密码不一致');
							return false;
						}

						merchants2.setSecurityPwd({
								"securityPwd": $scope.data.password,
								"smsCode": $scope.data.phoneCode,
								"idCardLastNum": null,
								"fullName": null
							},
							function(data) {
								dialog.tipsSuccess('密码设置成功', function() {
									//$state.go("merchants.setCenter");

									var tit = $ionicHistory.backTitle();
									if(tit &&
										$ionicHistory.backView() &&
										tit.indexOf('绑定') == -1) {
										$ionicHistory.goBack();
									} else {
										$state.go("merchants.setCenter");
									}

								});
							});

					}
				}
			};

			merchants2.getPhoneNumber(function(data) {
				$scope.data.userPhone = data;
			});

		}
	])
	// 修改密码
	.controller('merchantseditPassword', [
		'$scope', '$state', 'merchants2', '$stateParams', '$ionicHistory',
		'validate', 'dialog', 'sendPhoneValidCode',
		function($scope, $state, merchants2, $stateParams, $ionicHistory, validate, dialog, sendPhoneValidCode) {

			// 1:安全密码;2:登陆密码
			var type = $stateParams.type;

			$scope.data = {
				userPhone: '',
				userName: '',
				cardNum: '',
				password: '',
				repassword: '',
				phoneCode: ''
			}

			merchants2.getPhoneNumber(function(data) {
				$scope.data.userPhone = data;
			});

			$scope.sendValidate = function(cb) {
				return sendPhoneValidCode.getValidateCode();
			};

			$scope.fun = {
				editPasswordSubmit: function() {
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'userName': '姓名',
							'cardNum': '身份证后五位数号码',
							'password': '密码',
							'repassword': '确认密码',
							'phoneCode': '验证码'
						}
					});

					if(isOkform1) {
						if($scope.data.password.length != 6) {
							dialog.tips('请输入6位数密码');
							return false;
						}
						if($scope.data.cardNum.length != 5) {
							dialog.tips('请输入身份证后五位数号码');
							return false;
						}
						if($scope.data.password != $scope.data.repassword) {
							dialog.tips('密码不一致');
							return false;
						}

						merchants2.setSecurityPwd({
							"securityPwd": $scope.data.password,
							"smsCode": $scope.data.phoneCode,
							"idCardLastNum": $scope.data.cardNum,
							"fullName": $scope.data.userName
						}, function(data) {
							dialog.tipsSuccess('密码修改成功', function() {
								//$state.go("merchants.setCenter");
								var tit = $ionicHistory.backTitle();
								if(tit &&
									$ionicHistory.backView() &&
									tit.indexOf('绑定') == -1) {
									$ionicHistory.goBack();
								} else {
									$state.go("merchants.setCenter");
								}
							});
						});

					}
				}
			};
		}
	])
	// 销售明细
	.controller('merchantssaleDetail', [
		'$scope', 'merchants2', '$state', '$stateParams','$filter','page', 'common', 'systemConfig', 'popover',
		function($scope, merchants2, $state, $stateParams,$filter, page, common, systemConfig, popover) {

			var date = popover.date($scope, '', {
					event: {
						okFun: function(data) {

							var result = date.fun().getText().replace(new RegExp(',', 'gm'), '-');

							$scope.data.searchday = result;

							var branchShopId = pageList.set.parame.branchShopId;

							pageList.set.parame = {
								'branchShopId': branchShopId,
								'dt': result,
								'days':1
							};

							pageList.reload();
						}
					}
				}),
				type = $stateParams.type,
				branchShopId = $stateParams.branchShopId,
				shopName = decodeURIComponent($stateParams.shopName),
				diffDay= 0,
				waringText = '';

			switch (type){
				case '11':
					diffDay=1;
					waringText = '昨日订单';
					break;
				case '12':
					diffDay=7;
					waringText = '上周订单';
					break;
				case '13':
					diffDay=0;
					waringText = '全部订单';
					break;
				default:
					break;
			};

			$scope.data = {
				shopName:shopName,
				type:type,
				waringText:waringText,
				data: [],
				searchday: ''
			};

			$scope.page = {};

			$scope.popover = {
				date: date
			};

			$scope.fun = {
				common: common.pageCommon(),
				goDetail: function(id) {
					$state.go('merchants.orderDetail', {
						'orderId': id,
						'code': 0,
						'source':3
					});
				},
				showDate: function($event) {
					date.fun().showDialog($event);
				}
			};

			var pageList = page.page({
				scope: $scope,
				url: "/api/qrcodepay/sellerorderlist",
				parame: {
					'branchShopId': -1,
					'dt': '',
					'days':'1'
				},
				initData: function(data, isReload) {
					if(isReload) {
						$scope.data.data = [];
					}
					$scope.data.data = $scope.data.data.concat(data);
				}
			});

			$scope.page = pageList;

			systemConfig.getServerTime(function(data) {
				var result = data.split(' ')[0],
					arr=result.split('-'),
					searchDay=function(){
						var lastday = new Date(new Date(arr[0],(parseInt(arr[1])-1),arr[2]) - (diffDay)* 24 * 60 * 60 * 1000)
						return $filter('date')(lastday, "yyyy-MM-dd");
					}();

				date.changeDataSource(result);

				date.set.selectVal = searchDay.replace(new RegExp('-', 'gm'), ',');

				pageList.set.parame = {
					'branchShopId': branchShopId,
					'dt': diffDay>0?searchDay:'',
					'days':diffDay>0?diffDay:null
				};

				pageList.pageInit();

				$scope.data.searchday=diffDay>0?searchDay:'';

			});


		}
	])
	// 商家订单详情
	.controller('merchantsOrderDetail', [
		'$scope',
		'$stateParams',
		'merchants2',
		function($scope, $stateParams, merchants2) {
			var orderId = $stateParams.orderId,
				code = $stateParams.code,
				source=$stateParams.source;

			$scope.data = {};

			switch (source){
				case '1':
					// 商家扫码支付订单详情
					merchants2.Qsellerorderdetailbyno(orderId, function(data) {
						var score = 0;
						angular.forEach(data.scoreList, function(item) {
							score = score + item.score;
						});
						data.score = score;
						$scope.data = data;
					});
					break;
				case '2':
					// 收银员扫码支付订单详情
					merchants2.Ssellerorderdetailbyno(code, orderId, function(data) {
						var score = 0;
						angular.forEach(data.scoreList, function(item) {
							score = score + item.score;
						});
						data.score = score;
						$scope.data = data;
					});
					break;
				case '3':
					// 普通订单详情
					merchants2.getgodorderdetail(orderId, function(data) {
						var score = 0;
						angular.forEach(data.scoreList, function(item) {
							score = score + item.score;
						});
						data.score = score;
						$scope.data = data;
					});
					break;
			}

			/*$scope.$on('$stateChangeSuccess', function(event, toState, toParams, formState, fromParams) {
			 if(formState.name == "merchants.scanCodeSucceed") {
			 if(code == 0) {

			 } else {

			 }

			 } else {

			 }
			 })*/

		}
	])
	// 资金收支明细
	.controller('merchantsbudgetDetail', [
		'$scope', '$state', 'common', 'page', 'popover', 'systemConfig',
		function($scope, $state, common, page, popover, systemConfig) {
			var searchInday = '',
				searchOutday = '',
				date = popover.date($scope, '', {
					event: {
						okFun: function(data) {
							var result = date.fun().getText().replace(new RegExp(',', 'gm'), '-');
							$scope.data.searchday = result;

							if($scope.data.showFlag) {
								pageIn.set.parame = {
									'feeOutInStatusEnum': 1,
									'dt': result
								};
								pageIn.reload();
							} else {
								pageOut.set.parame = {
									'feeOutInStatusEnum': 2,
									'dt': result
								};
								pageOut.reload();
							}
						}
					}
				});

			$scope.data = {
				showFlag: true,
				searchday: '',
				in: [],
				out: []
			};

			$scope.popover = {
				date: date
			};

			$scope.fun = {
				show: function(flag) {
					if(flag) {
						searchOutday = $scope.data.searchday;
						$scope.data.searchday = searchInday;
					} else {
						searchInday = $scope.data.searchday;
						$scope.data.searchday = searchOutday;
					}
					$scope.data.showFlag = flag;
				},
				common: common.pageCommon(),
				goToIn: function(relationId, feeType) {
					if(feeType == 20) { //线下扫码
						$state.go("merchants.orderDetail", {
							'orderId': relationId,
							'code': 0,
							'source':3
						});
					}
					if(feeType == 30) { //提现退款=30
						//$state.go("merchants.incomeDetail",{'orderId':relationId,'type':feeType});
					}
					if(feeType == 1 || feeType == 4) { //提现=1,提现手续费=4
						//$state.go("merchants.defrayDetail",{'orderId':relationId,'type':feeType});
						//$state.go('merchants.withdrawDetail',{'id':relationId});
						$state.go('merchants.withdrawDe', {
							'id': relationId
						});
					}
				},
				showDate: function($event) {
					date.fun().showDialog($event);
				}
			};

			var pageIn = page.page({
					scope: $scope,
					url: "/api/fundsflow/businessfundsflowlist",
					parame: {
						'feeOutInStatusEnum': 1,
						'dt': ''
					},
					initData: function(data, isReload) {
						if(isReload) {
							$scope.data.in = [];
						}
						$scope.data.in = $scope.data.in.concat(data);
					}
				}),
				pageOut = page.page({
					scope: $scope,
					url: "/api/fundsflow/businessfundsflowlist",
					parame: {
						'feeOutInStatusEnum': 2,
						'dt': ''
					},
					initData: function(data, isReload) {
						if(isReload) {
							$scope.data.out = [];
						}
						$scope.data.out = $scope.data.out.concat(data);
					}
				});

			$scope.page = { in: pageIn,
				out: pageOut
			};

			pageIn.pageInit();
			pageOut.pageInit();

			systemConfig.getServerTime(function(data) {
				var result = data.split(' ')[0];
				date.changeDataSource(result);
				date.set.selectVal = result.replace(new RegExp('-', 'gm'), ',');
				/*pageIn.set.parame = {'feeOutInStatusEnum': 1, 'dt': $scope.data.searchday};
				 pageOut.set.parame = {'feeOutInStatusEnum': 2, 'dt': $scope.data.searchday};
				 */
			});

		}
	])
	// 提现详情
	.controller('merchantswithdrawDetail', [
		'$scope', 'merchants2', '$stateParams',
		function($scope, merchants2, $stateParams) {

			var relativeId = $stateParams.id,
				feeType = $stateParams.type;

			merchants2.getWithdrawDetail(
				relativeId,
				feeType,
				function(data) {
					$scope.data = data;
				});

		}
	])
	// 商家资金账户
	.controller('merchantsbalanceAccount', [
		'$scope', 'merchants2', '$state', '$stateParams', '$ionicPopover',
		function($scope, merchants2, $state, $stateParams, $ionicPopover) {
			var type = $stateParams.type,
				title = (type == 2 ? "奖金" : "资金"),
				popover = null;

			$scope.data = {
				title: title,
				type: type
			};

			$scope.fun = {
				closethis: function() {
					popover.hide()
				},

				getNow: function() {
					$state.go('merchants.withdraw', {
						'type': 3
					})
					popover.remove()
				},

				goBudgetDetail: function() {
					if(type == 1) {
						$state.go('merchants.budgetDetail');
					} else {

						$state.go('merchants.bonusDetail');
					}
				},

				goTiXian: function() {
					$state.go('merchants.withdraw', {
						'type': type
					});

				}
			}

			$ionicPopover.fromTemplateUrl('html/merchants/balanceAccountModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {

				popover = pop;
			});

			merchants2.getInfo(function(data) {
				if(type == 1) {
					$scope.data.amount = data.blanceAmount;
				} else {
					$scope.data.amount = data.bonusAmount;
				}
			});

			$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
				if(fromState.name == 'merchants.index') {

					if(type == 1) {

						merchants2.gethass0withdrawal(function(data) {
							if(data === true) {
								popover.show(document.getElementById('save'));
							}
						})

					}
				}
			});

		}
	])
	// 商家提现
	.controller('merchantswithdraw', [
		'$scope', '$state', '$ionicHistory', '$stateParams', '$ionicPopover', 'merchants2', 'validate', 'dialog', 'common','systemConstant',
		function($scope, $state, $ionicHistory, $stateParams, $ionicPopover, merchants2, validate, dialog, common,systemConstant) {

			var type = $stateParams.type,
				tixianType = (type > 2 ? 1 : type),
				settlementMode = (type == 3 ? '10' : '2'),
				maxAmount = 20000,
				minAmount = 100,
				bankList = common.bankList,
				validaAmount = function() {
					var amount = $scope.data.post.amount,
						withdrawalFee = $scope.data.withdrawalFee,
						result = 0;

					if(!amount) {
						$scope.data.user.withdrawalAmountText = '账户余额:' + $scope.data.user.withdrawalAmount;
						return false;
					}
					if(!validate.checkAmount(amount, false)) {
						$scope.data.user.withdrawalAmountText = '请输入正确的金额';
						return false;
					}
					amount = parseFloat(amount);
					if(amount < minAmount) {
						$scope.data.user.withdrawalAmountText = '单笔提现金额不能低于' + minAmount;
						return false;
					}
					if(amount > maxAmount) {
						$scope.data.user.withdrawalAmountText = '单笔提现金额不能超过' + maxAmount;
						return false;
					}

					result = getwithdrawalFee(amount, 2);
					if(parseFloat((amount + result).toFixed(2)) > $scope.data.user.withdrawalAmount) {
						$scope.data.user.withdrawalAmountText = '余额不足';
						return false;
					}
					return result;
				},
				setwithdrawalFee = function() {
					switch($scope.data.tixianType) {
						case 0:
							$scope.data.withdrawalFee = $scope.data.user.t0WithdrawalFee;
							break;
						case 1:
							$scope.data.withdrawalFee = $scope.data.user.t1WithdrawalFee;
							break;
					}
				},
				setwithdrawalTips = function() {
					var serviceDateTime = $scope.data.user.serviceDateTime,
						arrServiceTime = 0,
						earliest = 9 * 60,
						last = 22 * 60;

					if(!serviceDateTime) {
						return;
					}
					arrServiceTime = serviceDateTime.split(' ');
					arrServiceTime = arrServiceTime[1].split(':');
					if(((parseInt(arrServiceTime[0]) * 60) + (parseInt(arrServiceTime[1]))) > last) {
						$scope.data.showwithdrawalTips = 2;
					}
				},
			// 根据amount计算手续费
				getwithdrawalFee = function(amount, type) {
					var withdrawalFee = $scope.data.withdrawalFee,
						result = 0;

					switch(type) {
						case 2:
							result = amount * withdrawalFee * 0.001;
							break;
						case 1:
						default:
							result = (amount - amount / (1 + withdrawalFee * 0.001));
							break;
					}

					if(result < 0.01) {
						result = 0.01;
					}

					// console.log('计算数据:'+amount+'结果1:'+result +'结果2:'+(amount * withdrawalFee *0.001));
					return parseFloat(result.toFixed(2));
				},
				getBank = function(code) {
					//return bankList[0];
					var result = {};
					angular.forEach(bankList, function(item) {
						if(item.id == code) {
							result = item;
						}
					});
					return result;
				},
				tipsPopover;

			$scope.data = {
				showFlag: 1,
				tixianType: 1,
				title: (tixianType == 2 ? "奖金" : "资金"),
				type: type,
				withdrawalFee: '',
				showBtn: false,
				showwithdrawalTips: 1,
				tixianMothed:systemConstant.tixianMothed,
				bank: [],
				user: {},
				post: {
					amount: '',
				}
			};

			$scope.fun = {
				getShowBankNo: common.getShowBankNo,
				showType: function(type) {
					$scope.data.post.amount = "";
					$scope.data.tixianType = type;

					setwithdrawalFee();
					this.changeAmount();

				},
				getCard: function(item) {
					$scope.data.showFlag = 1;
					$scope.data.post = angular.extend($scope.data.post, item);
				},
				back: function() {
					if($scope.data.showBank) {
						$scope.data.showBank = false;
					} else {
						$ionicHistory.goBack();
					}
				},
				show: function(index) {
					$scope.data.showFlag = index;
				},
				withdrawlist: function() {
					$state.go('merchants.withdrawList', {
						'type': tixianType
					});
				},
				shopTips: function(index, $event) {
					tipsPopover.show($event);
				},
				save: function() {
					if(!$scope.data.post.amount) {
						dialog.tipsError('请输入正确的金额');
						return false;
					}
					var result = validaAmount(),
						msg = '';
					if(!result) {
						return;
					}
					var data = $scope.data.post,
						isPost = true;
					if($scope.data.tixianType == 0) {
						data.settlementMode = '12';
					} else {
						data.settlementMode = '2';
					}

					if($scope.data.showFlag != 2) {
						data.applyType = 2;
						data.bankCardId = $scope.data.post.id;
					} else {
						data.applyType = 1;
					}

					if(type == 3) {
						data.settlementMode = 10;
					}
					dialog.passWord(
						'提现',
						'',
						'',
						function(pwd, prop) {
							if(!isPost) {
								return false;
							}
							if(!validate.checkPwd(pwd, true)) {
								return false;
							}
							isPost = false;
							data.securityPwd = pwd;

							merchants2.applywithdrawal(tixianType, data, function(data) {
								prop.close();
								if(type == 3) {
									msg = '秒到提现申请成功';
								} else {
									msg = '提现申请成功,请等待审核';
								}
								dialog.tipsSuccess(msg, function() {
									$ionicHistory.goBack();
								});
							}).finally(function() {
								isPost = true;
							});
						},
						'提现'
					);
				},
				changeAmount: function(fee) {
					var result = validaAmount();

					$scope.data.showBtn = result;
					if(!result) {
						return;
					}
					if(fee && fee > 0) {
						result = fee;
					}
					$scope.data.user.withdrawalAmountText = '要扣除￥' + result + '手续费';
				},
				getAll: function() {
					var withdrawalAmount = $scope.data.user.withdrawalAmount,
						maxFee = getwithdrawalFee(maxAmount, 2),
						withdrawalFee = $scope.data.withdrawalFee,
						amount = 0,
						fee = 0;

					if(withdrawalAmount < (maxAmount + maxFee)) {
						fee = getwithdrawalFee(withdrawalAmount, 1);
						amount = (withdrawalAmount - fee);

						if(amount < 0) {
							amount = 0;
						}
						amount = amount.toFixed(2);
					} else {
						amount = maxAmount;
					}
					$scope.data.post.amount = amount;
					this.changeAmount(fee);
				}
			};

			if(type == 3) {
				minAmount = 10;
				maxAmount = 500;
			};

			$ionicPopover.fromTemplateUrl(
				"html/templates/tipspopover.html?v=1151", {
					scope: $scope
				}).then(function(popover) {
				tipsPopover = popover;
			});

			merchants2.userWithdrawalInfo(
				tixianType,
				function(data) {
					$scope.data.user = data;
					/*$scope.data.user.withdrawalAmount=10000;
					 $scope.data.user.t0WithdrawalFee=3.5;*/

					$scope.data.user.withdrawalAmountText = '账户余额:' + $scope.data.user.withdrawalAmount;
					minAmount = (data.minimumWithdrawalAmount > 0) ? data.minimumWithdrawalAmount : 0;
					maxAmount = (data.maximumWithdrawalAmount > 0) ? data.maximumWithdrawalAmount : maxAmount;
					$scope.data.tixianType = 0;
					setwithdrawalFee();
					setwithdrawalTips();
					//$scope.fun.showType(0);
				},
				settlementMode);

			merchants2.getCardsList(function(data) {
				angular.forEach(data, function(item) {
					item.desc = getBank(item.bankCode) || {};
				});
				$scope.data.bank = data;
				$scope.data.showBankMethod = data.length;
				$scope.data.post = angular.extend($scope.data.post, data[0]);
			});
		}
	])
	// 提现记录
	.controller('merchantswithdrawList', [
		'$scope',
		'$stateParams',
		'$state',
		'page',
		'common',
		'popover',
		'systemConfig',
		'merchants2',
		function($scope, $stateParams, $state, page, common, popover, systemConfig, merchants2) {

			var type = $stateParams.type,
				date = popover.date($scope, '', {
					event: {
						okFun: function() {
							var result = date.fun().getText().replace(new RegExp(',', 'gm'), '-');
							$scope.data.searchday = result;
							$scope.data.showIndex = 1;
							merchants2.withdrawaldatelist(result, function(data) {
								$scope.data.day = data;
							});
						}
					}
				});

			$scope.data = {
				searchday: '全部',
				showIndex: 0,
				all: [],
				day: []
			};

			$scope.fun = {
				show: function(num) {
					$scope.data.showFlag = num;
				},
				showDate: function($event) {
					date.fun().showDialog($event);
				},
				view: function(item) {
					$state.go('merchants.withdrawDe', {
						'id': item.id
					});
				},
				common: common.pageCommon()
			};

			$scope.popover = {
				date: date
			};

			var pageAll = page.page({
				scope: $scope,
				url: "/api/withdrawal/withdrawalrecordlist",
				initData: function(data, isReload) {
					$scope.data.all = $scope.data.all.concat(data);
				}
			});

			pageAll.pageInit();

			$scope.page = pageAll;

			systemConfig.getServerTime(function(data) {
				var searchday = data.split(' ')[0];

				date.changeDataSource(searchday);
				date.set.selectVal = searchday.replace(new RegExp('-', 'gm'), ',');
			});

		}
	])
	// 提现详情
	.controller('withdrawDeCtrl', [
		'$scope', 'merchants2', '$stateParams',
		function($scope, merchants2, $stateParams) {
			$scope.data = {};
			var relativeId = $stateParams.id;
			merchants2.getwithdrawdetailid(relativeId, function(data) {
				var result = {};
				switch(data.withdrawalStatus) {
					// 失败
					case 2:
					case 5:
					case 9:
						result = {
							withdrawbgc: 'bg_ff8797',
							statuimg: "img/false-withdraw.png",
							statutext: '提现失败，已退款',
							apply: '申请',
							type: data.type,
							bankName: data.bankCardName,
							bankCardNo: data.bankCardNo,
							withdrawalDateTime: data.withdrawalDateTime,
							casharriveDateTime: '',
							casharriveDateTimestatu: '',
							withdrawalStatusName: data.withdrawalStatusName,
							drawbackReasonstatu: true,
							drawbackReason: '审核未通过',
							amount: data.amount,
							poundage: data.fee,
							settlementMode: data.settlementMode,
							withdrawalAmount: data.withdrawalAmount
						}
						break;
					// 处理中
					case 1:
					case 3:
					case 8:
						result = {
							withdrawbgc: 'bg_84bfff',
							statuimg: "img/wait-withdraw.png",
							statutext: "提现申请已提交",
							type: data.type,
							apply: '',
							bankName: data.bankCardName,
							bankCardNo: data.bankCardNo,
							withdrawalDateTime: data.withdrawalDateTime,
							casharriveDateTime: '',
							casharriveDateTimestatu: '',
							drawbackReason: '',
							drawbackReasonstatu: '',
							withdrawalStatusName: data.withdrawalStatusName,
							amount: data.amount,
							poundage: data.fee,
							settlementMode: data.settlementMode,
							withdrawalAmount: data.withdrawalAmount
						}
						break;
					// 成功
					case 4:
						result = {
							withdrawbgc: 'bg_5dd8ad',
							statuimg: "img/success-withdraw.png",
							statutext: '提现已到账',
							type: data.type,
							apply: '',
							bankName: data.bankCardName,
							bankCardNo: data.bankCardNo,
							withdrawalDateTime: data.withdrawalDateTime,
							casharriveDateTime: data.updateTime,
							casharriveDateTimestatu: true,
							drawbackReason: '',
							drawbackReasonstatu: '',
							withdrawalStatusName: data.withdrawalStatusName,
							amount: data.amount,
							poundage: data.fee,
							settlementMode: data.settlementMode,
							withdrawalAmount: data.withdrawalAmount
						}
						break;
				}
				$scope.data = result;
			});

		}
	])
	// 商家反扫
	.controller('merchantsScanCodeCenter', [
		'$scope', '$state', '$timeout', '$ionicPopover', '$stateParams', 'merchants2', 'validate', 'weixin', 'seller', 'dialog',
		function($scope, $state, $timeout, $ionicPopover, $stateParams, merchants2, validate, weixin, seller, dialog) {
			var type = $stateParams.type,
				code = $stateParams.code,
				wei = weixin.weiXin({
					'code': code
				}),
				queryMin = 1 * 60 * 1000,
				singleMin = 5000,
				paySuccess = function(orderNo) {
					popoverT.hide();

					$state.go('merchants.scanCodeSucceed', {
						'code': encodeURIComponent(code),
						'orderNo': encodeURIComponent(orderNo),
						'amount': encodeURIComponent(parseFloat($scope.data.amount))
					});


				},
				payFail = function() {
					popoverT.hide();
					$state.go('merchants.scanCodeDefeat');
				},
				validatePayAmount = function(amount) {
					var fee = parseInt(parseFloat(amount) * 100);

					if(fee < 1) {
						dialog.tipsError('单次收款金额不低于0.01');
						return false;
					}
					if(fee > 100000) {
						dialog.tipsError('单次收款金额不高于1000');
						return false;
					}
					return fee;
				},
				validateAmount = function(amount) {
					var patrn = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/;
					var b = patrn.test(amount);

					return b && validatePayAmount(amount);
				},
				queryPayResult = function(orderNo) {

					$timeout(function() {

						merchants2.queryanddealmicropaymentorder(
							orderNo,
							type,
							code,
							function(data) {
								if(data && data.flag) {
									paySuccess(orderNo);
								} else {
									// 请求失败,继续轮训
									queryMin = queryMin - singleMin;

									if(queryMin > 0 && (data.data == 'NOTPAY' || data.data == 'USERPAYING')) {

										queryPayResult(orderNo);

									} else {
										// 超过轮训时间,发起冲正请求并跳转页面
										merchants2.closeqrcodeorder(orderNo, type, code, function() {
											// 跳转支付失败页面
											payFail();
										});
									}
								}
							});

					}, singleMin);

				};

			wei.init();

			$ionicPopover.fromTemplateUrl('html/merchants/scanCodeCenterModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				popover = pop;
			});

			$ionicPopover.fromTemplateUrl('html/merchants/scanCodeWaitModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				popoverT = pop;
			});

			$scope.data = {
				showType: type,
				showFlag: 1,
				amount: '',
				qrUrl: ''
			};

			$scope.fun = {
				showCourse: function() {
					popover.show(document.getElementById("showCourse"));
				},
				closePopover: function() {
					popover.hide();
				},
				show: function(type) {
					$scope.data.showFlag = type;
				},
				addAmount: function(type) {
					var amount = $scope.data.amount || '',
						exAmount = ',' + ['', '0', '0.', '0.0'].join(',') + ',';

					switch(type) {
						case 10: // 00
							if(amount === '') {
								amount = '100';
							} else if(amount.indexOf('.') == -1) {
								amount = amount + '00';
							}
							break;
						case 11: // 小数点
							if(amount === '') {
								amount = '0';
							}
							amount = amount + '.';
							break;
						case 12:
							amount = '';
							break;
						default:
							amount = amount + '' + type;
							break;
					};

					if(exAmount.indexOf(',' + amount + ',') > -1) {
						$scope.data.amount = amount;
					} else if(validateAmount(amount)) {
						$scope.data.amount = amount;
					}
				},
				save: function() {
					var amount = $scope.data.amount;
					if(amount.indexOf('.') == (amount.length - 1)) {
						amount = amount.substr(0, amount.length - 1);
						$scope.data.amount = amount;
					}
					if(!validate.checkAmount(amount, true)) {
						return;
					}

					var shopId = 0,
						fee = validatePayAmount(amount);

					if(!fee) {
						return;
					}
					/*if(type == 1 && !shopId && shopId != 0) {
						dialog.tipsError('请选择要收款的店铺');
						return;
					}*/
					queryMin = 1 * 60 * 1000;

					wei.scane(function(result) {

						popoverT.show(document.getElementById("waitingDraw"));

						merchants2.scancodecollection(
							fee,
							result,
							shopId,
							type,
							code,
							function(data) {

								if(!data){
									dialog.tipsError('扫码失败,暂时无法支付');
									return;
								}

								/*alert(0);
								 alert(JSON.stringify(data));
								 alert(data.errCode);*/
								if(data.errcode==1) {
									//alert(1);
									// 支付成功跳转成功页面
									paySuccess(data.data);

								} else if(data.errcode==2){
									//alert(2);
									// 未支付,发起轮训查询支付结果
									queryPayResult(data.data);

								}else if(data.errcode==3){
									//alert(3);
									// 支付失败,
									popoverT.hide();
									dialog.tipsError(data.msg);

								}

							},
							function(){

								popoverT.hide();
								dialog.tipsError('扫码失败,请重试');

							});

					});
				}

			};

			switch(type) {
				case '2':
					break;
				case '1':
					merchants2.getshopqrcodeurl(0,
						function(data) {
							$scope.data.qrUrl = data;
						});
					break;
			}

			/*$timeout(function(){ document.getElementById('amount');},100);*/

		}
	])
	// 反扫成功
	.controller('merchantsScanCodeSucceed', [
		'$scope', '$state', '$stateParams', '$ionicHistory',
		function($scope, $state, $stateParams, $ionicHistory) {

			var orderNo = decodeURIComponent($stateParams.orderNo),
				code = decodeURIComponent($stateParams.code),
				amount = decodeURIComponent($stateParams.amount);

			$scope.data = {
				amount: amount
			};

			$scope.fun = {
				goscanCodeCenter: function() {
					$ionicHistory.goBack();
				},
				goDetail: function() {
					$state.go('merchants.orderDetail', {
						'orderId': orderNo,
						'code': code,
						'source':(code=='0'?1:2)
					});
				}
			};

		}
	])
	// 反扫失败
	.controller('merchantsScanCodeDefeat', [
		'$scope', '$state', '$ionicHistory',
		function($scope, $state, $ionicHistory) {
			$scope.fun = {
				goScanCodeCenter: function() {
					/*$state.go('merchants.scanCodeCenter',{'type':1,'code':0})*/
					$ionicHistory.goBack();
				}
			}
		}
	])
	// 付款成功
	.controller('merchantsPaySucceed', [
		'$scope', '$state', '$stateParams', '$ionicHistory',
		function($scope, $state, $stateParams, $ionicHistory) {
			$scope.fun={
				backPay:function(){
					$ionicHistory.goBack();
				}
			}
		}
	])
	//付款失败
	.controller('payResult', [
		'$scope', '$state', '$stateParams', '$ionicHistory',
		function($scope, $state, $stateParams, $ionicHistory) {
			$scope.fun={
				backPay:function(){
					$ionicHistory.goBack();
				}
			}
		}
	])
	//快捷支付
	.controller('merchantsShortcutPay', [
		'$scope', '$state', '$stateParams','$ionicPopover', '$ionicHistory','validate','dialog','merchants2',
		function($scope, $state, $stateParams,$ionicPopover, $ionicHistory,validate,dialog,merchants2) {
			var amount = $stateParams.amount,
				remark = $stateParams.remark,
				code = $stateParams.code,
				QRId = $stateParams.QRId,
				queryMin = 1 * 60 * 1000,
				singleMin = 5000,
				paySuccess = function() {
					popoverT.hide();
					$state.go('merchants.paySucceed')
				},
				payFail = function() {
					popoverT.hide();
					$state.go('merchants.scanCodeDefeat');
				},
				queryPayResult = function(orderNo) {

					$timeout(function() {

						merchants2.getorderstatus(
							orderNo,
							function(data2) {
								if(data2==1) {
									//支付成功
									paySuccess();
								}else if(data2==3){
									//支付失败
									payFail();
								}else if(data2==2) {
									// 请求失败,继续轮训
									queryMin = queryMin - singleMin;

									if(queryMin > 0) {
										queryPayResult(orderNo);
									} else {
										// 跳转支付失败页面
										payFail();
									}
								}
							});

					}, singleMin);

				};
			$scope.sendValidate = function(cb) {
				return validate.element($scope.form1.userPhone, '手机号') &&
					merchants2.SendSmsCode(
						$scope.data.user.userPhone,
						12,
						function(data, msg) {
							dialog.tipsError(msg);
						}
					);
			};	
			
			$scope.data = {
				cardToggle:false,
				isArget:true,
				isShortcutPay:true,
				user:{
					'amount':amount,
					'remark':remark,
					'cardholderName':'',
					'idCard':'',
					'bankCardNo':'',
					'CVV2Code':'',
					'effectiveDate':'',
					'userPhone':'',
					'phoneCode':'',
					'bankType':''
				}				
			};
			
			$scope.post = {
				'QRId':QRId,
				'remark':remark,
				'amount':'',
				'cardholderName':'',
				'bankCardPhoneNumber':'',
				'smsCode':'',
				'bankCardNo':'',
				'bankCardCvn':'',
				'bankCardExpiryDate':'',
				'credentialsNo':'',
				'bankType':''
			};
			
			$ionicPopover.fromTemplateUrl('html/merchants/scanCodeWaitModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				popoverT = pop;
			});
			
			$scope.fun = {
				showBankInfo:function(){
					merchants2.getbankcardattribute($scope.data.user.bankCardNo,function(data){
						if(data.cardType=='CC'){
							$scope.data.cardToggle==true;
						}else{
							dialog.tips('快捷支付只支持信用卡支付',function(){
								$scope.data.cardToggle=false;
							})
						};
						$scope.data.user.bankType = data.bank;
					});
				},
				userRegist: function() {		
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'amount':'付款金额',
							'cardholderName':'持卡人姓名',
							'idCard':'身份证号码',
							'bankCardNo': '银行卡号',
							'CVV2Code': 'CVV2码',
							'effectiveDate': '有效日期',
							'userPhone': '手机号码',
							'phoneCode': '短信验证码'
						}
					});

					if(isOkform1) {
						if(!validate.checkAmount($scope.data.user.amount,true)){
							dialog.tips('请输入正确金额',function(){
							});
							return false;
						};
						$scope.post.amount = parseInt(parseFloat($scope.data.user.amount) * 100);
						
						var reg =/^[0-9]{2}\/[0-9]{2}$/;
						if(!reg.test($scope.data.user.effectiveDate)){
							dialog.tips('请输入正确有效日期');
							return false;
						};
						$scope.post.bankCardExpiryDate = $scope.data.user.effectiveDate.replace(new RegExp('/', 'gm'), '');
						
						if(!$scope.data.cardToggle){
							dialog.tips('请输入正确的信用卡号');
							return false;
						}
						$scope.post.bankType = $scope.data.user.bankType;
						
						$scope.post.cardholderName = $scope.data.user.cardholderName;
						$scope.post.bankCardPhoneNumber = $scope.data.user.userPhone;
						$scope.post.smsCode = $scope.data.user.phoneCode;
						$scope.post.bankCardNo = $scope.data.user.bankCardNo;
						$scope.post.bankCardCvn = $scope.data.user.CVV2Code;
						$scope.post.credentialsNo = $scope.data.user.idCard;
						
						popoverT.show(document.getElementById("waitingDraw"));
						
						merchants2.epayquickpay(
							$scope.post,
							function(data){
								var orderNo = data.orderNo;
								if(!data.result){
									dialog.tipsError('暂时无法使用快捷支付，请稍后再试');
									return;
								}else{
									merchants2.getorderstatus(
									orderNo,
									function(data2) {
										if(data2==1) {
											//alert(1);
											// 支付成功跳转成功页面
											paySuccess();
		
										} else if(data2==2){
											//alert(2);
											// 未支付,发起轮训查询支付结果
											queryPayResult(orderNo);		
										}else if(data2==3){
											//alert(3);
											// 支付失败,
											payFail();	
										}
									});
								};
							},
							function(){
								popoverT.hide();
								dialog.tipsError('暂时无法使用快捷支付，请稍后再试');
							})
						
						
					};
					
				}
			};
			

		}
	])
	//快捷支付支持银行卡展示
	.controller('merchantsCanUserBank', [
		'$scope', '$state', '$stateParams', '$ionicHistory',
		function($scope, $state, $stateParams, $ionicHistory) {
			$scope.bankList= [
			{ 'id': 'CITIC', 'bankName': '中信银行', 'icon': 'margin-left-5 font30 spp-zhongxinyinhang', 'bgColor': 'bank_c75056','src':'img/zhongxinyinhang.svg' },
			{ 'id': 'CEB', 'bankName': '中国光大银行', 'icon': 'margin-left-5 font30 spp-guangdayinhang', 'bgColor': '' ,'src':'img/guangdayinhang.svg'},
			{ 'id': 'BCOM', 'bankName': '交通银行', 'icon': 'margin-left-5 font30 spp-jiaotongyinhang', 'bgColor': '' ,'src':'img/jiaotongyinhang.svg'},
			{ 'id': 'CIB', 'bankName': '兴业银行', 'icon': 'spp-xingyeyinhang', 'bgColor': '' ,'src':'img/xingyeyinhang.svg'},
			{ 'id': 'CMB', 'bankName': '招商银行', 'icon': 'spp-zhaoshangyinhang', 'bgColor': 'bank_ec6671' ,'src':'img/zhaoshangyinhang.svg'},
			{ 'id': 'init-PAC', 'bankName': '平安银行', 'icon': 'spp-pinganyinhang', 'bgColor': 'bank_ec6671' ,'src':'img/pinganyinhang.svg'},
			{ 'id': 'CMBC', 'bankName': '中国民生银行', 'icon': 'margin-left-5 font30 spp-minshengyinhang', 'bgColor': '' ,'src':'img/minshengyinhang.svg'},
			{ 'id': 'GDB', 'bankName': '广东发展银行', 'icon': 'margin-left-5 font30 spp-guangfayinhang', 'bgColor': '' ,'src':'img/guangfayinhang.svg'},
			{ 'id': 'BCM', 'bankName': '交通银行', 'icon': 'margin-left-5 font30 spp-jiaotongyinhang', 'bgColor': '' ,'src':'img/jiaotongyinhang.svg'},
			{ 'id': 'init-Citybank', 'bankName': '交通银行', 'icon': 'margin-left-5 font30 spp-huaqiyinhang', 'bgColor': '' ,'src':'img/huaqiyinhang.svg'},
			{ 'id': 'ICBC', 'bankName': '中国工商银行', 'icon': 'spp-gongshangyinhang', 'bgColor': 'bank_ec6671' ,'src':'img/gongshangyinhang.svg'},
			{ 'id': 'BOC', 'bankName': '中国银行', 'icon': 'line-height-33 spp-zhongguoyinhang', 'bgColor': '' ,'src':'img/zhongguoyinhang.svg'},
            { 'id': 'ABC', 'bankName': '中国农业银行', 'icon': 'spp-nongyeyinhang', 'bgColor': '' ,'src':'img/nongyeyinhang.svg'},
            { 'id': 'HXB', 'bankName': '华夏银行', 'icon': 'margin-left-5 font30 spp-huaxiayinhang', 'bgColor': '' ,'src':'img/huaxiayinhang.svg'},
            { 'id': 'PSBC', 'bankName': '中国邮政储蓄', 'icon': 'font30 spp-youzhengyinhang', 'bgColor': 'bank_006a45','src':'img/youzhengyinhang.svg' }
          ]
			

		}
	])
	
	;

	