angular.module('starter.controllers', [])

	.controller('regist', [
		'$scope',
		'$state',
		'$ionicPopover',
		'$ionicHistory',
		'$stateParams',
		'validate',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'sendPhoneValidCode',
		'referrerdata',
		function($scope, $state,$ionicPopover,$ionicHistory, $stateParams,validate, seller, common, systemConfig, dialog, systemConstant, userInfo, sendPhoneValidCode, referrerdata) {
			var type = 1,
				fromState =	$stateParams.fromState;
			
			$scope.data = {
				fromState:fromState,
				showPwd: false,
				user: {
					userPhone: '',
					userPwd: '',
					phoneCode: ''
				}
			};
			/*$scope.sendValidate = function(cb) {
				return sendPhoneValidCode.getValidateCode(type,cb);
			};*/

			$scope.sendValidate = function() {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.getValidateCode({
						'phoneNumber': $scope.data.user.userPhone,
						'smsType': 1
					}, function(data, msg) {
						dialog.tipsSuccess('已发送验证码');
					});
			};

			var VoiceValidatePopover = null;
			$ionicPopover.fromTemplateUrl('html/referrer/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				VoiceValidatePopover = pop;
			});
			$scope.showVoiceValidateToggle = false;
			$scope.showVoiceValidate = function() {
				$scope.showVoiceValidateToggle = true;
			};
			$scope.getVoiceValidate = function() {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.getValidateCode({
							'phoneNumber': $scope.data.user.userPhone,
							'smsType': 2
						}, function() {
							VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
						},
						function(data, msg) {
							dialog.tipsError(msg);
						});
			};
			$scope.VoiceValidatePopoverHide = function() {
				VoiceValidatePopover.hide();
			}

			$scope.fun = {
				goLoginInByPhone: function() {
					$state.go('referrer.loginInByPhone');
				},
				changeShowPwd: function() {
					var inputPwd = document.getElementById('password');
					if($scope.data.showPwd) {
						$scope.data.showPwd = !$scope.data.showPwd;
						inputPwd.type = 'password';
					} else {
						$scope.data.showPwd = !$scope.data.showPwd;
						inputPwd.type = 'text';
					};
				},
				userRegist: function() {

					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'userPhone': '您的手机号',
							'phoneCode': '手机验证码',
							'userPwd': '您的密码'
						}
					});

					if(isOkform1) {
						/*referrerdata.ReferrerRegister({*/
							referrerdata.lowerReferrerRegister({
								'PhoneNumber': $scope.data.user.userPhone,
								'SmsCode': $scope.data.user.phoneCode,
								'Password': $scope.data.user.userPwd
							},
							function() {
								dialog.tipsSuccess('登录成功', function() {
									if(fromState==401||fromState=='401'){
										$ionicHistory.goBack();
									}else{
										$state.go('referrer.referrerCenter');
									}
								});
							}
						)
					}
				}
			};

		}
	])
	.controller('referrerCenter', [
		'$scope', '$state', '$stateParams', 'merchants2', 'referrerdata', 'dialog',
		function($scope, $state, $stateParams, merchants2, referrerdata, dialog) {

			var clipboard = new Clipboard(document.getElementById("d_clip_button"));

			clipboard.on('success', function(e) {
				dialog.tipsSuccess('复制成功');
				e.clearSelection();
			});
			clipboard.on('error', function(e) {
				dialog.tips('请选择“拷贝”进行复制!');
			});

			$scope.data = {};

			$scope.fun = {
				goAddCommission: function() {
					$state.go('referrer.addCommission');
				},
				goBalanceDetail: function() {
					$state.go('referrer.balanceDetail');
				},
				goSafeInfo: function() {
					$state.go('referrer.safeInfo');
				},
				goWithdraw: function() {
					$state.go('referrer.withdraw');
				},
				goPersonageOperation: function() {
					$state.go('referrer.personageOperation', {
						'code': $scope.data.invitationCode
					});
				},
				goMerchantOperation: function() {
					$state.go('referrer.merchantOperation', {
						'code': $scope.data.invitationCode
					});
				},
				goPlatformOperation: function() {
					$state.go('referrer.platformOperation', {
						'code': $scope.data.invitationCode
					});
				},
				goAgencyOperation: function() {
					$state.go('referrer.agencyOperation', {
						'code': $scope.data.invitationCode
					});
				},
				goReferrerIntroduce: function() {
					$state.go('referrer.referrerIntroduce');
				},
				goMissionMarket: function() {
					$state.go('referrer.missionMarket');
				}
			};
			referrerdata.ReferrerCenterInfo(function(data) {
				$scope.data = data;
			});

		}
	])
	.controller('addCommission', [
		'$scope', '$state', '$stateParams', 'merchants2', 'referrerdata', 'page',
		function($scope, $state, $stateParams, merchants2, referrerdata, page) {
			$scope.data = {
				ReferrerAccount: {},
				CommisstionMoney: []
			};
			$scope.page = {};
			$scope.fun = {
				goMoneyDetail: function(id, time, amount) {
					$state.go('referrer.moneyDetail', {
						'id': id,
						'time': time,
						'amount': amount
					});
				}
			};
			referrerdata.ReferrerAccount(function(data) {
				$scope.data.ReferrerAccount = data;
			});
			var pageQR = page.page({
				scope: $scope,
				url: "/api/referrer/CommisstionMoney",
				parame: {},
				initData: function(data, isReload) {
					angular.forEach(data, function(item) {
						item.createTime = item.createTime.substr(0, 10)
					});

					if(isReload) {
						$scope.data.CommisstionMoney = [];
					};
					$scope.data.CommisstionMoney = $scope.data.CommisstionMoney.concat(data);
				}
			});

			$scope.page = {
				CommisstionMoney: pageQR
			};

			pageQR.pageInit();
		}
	])
	.controller('moneyDetail', [
		'$scope', '$state', '$stateParams', 'merchants2', 'referrerdata',
		function($scope, $state, $stateParams, merchants2, referrerdata) {
			var id = $stateParams.id,
				time = $stateParams.time,
				amount = $stateParams.amount,
				getCommissionListBegin = function(type) {
					referrerdata.CommissionList({
						'id': $scope.data.id,
						'type': type
					}, function(data) {
						$scope.data.CommissionListBegin = data;
						switch(type) {
							case -1:
								$scope.data.CommissionList0 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList0;
								break;
							case 1:
								$scope.data.CommissionList1 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList1;
								break;
							case 2:
								$scope.data.CommissionList2 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList2;
								break;
							case 3:
								$scope.data.CommissionList3 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList3;
								break;
							case 4:
								$scope.data.CommissionList4 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList4;
								break;
							case 5:
								$scope.data.CommissionList5 = $scope.data.CommissionListBegin;
								$scope.data.CommissionListEnd = $scope.data.CommissionList5;
								break;
							default:
								break;
						}
					})
				};
			$scope.data = {
				id: id,
				time: time,
				amount: amount,
				checkShop: '全部',
				CommissionListBegin: [], //初始数据
				CommissionList0: [0], //全部
				CommissionList1: [0], //个人
				CommissionList2: [0], //商家
				CommissionList3: [0], //代理
				CommissionList4: [0], //平台
				CommissionList5: [0], //推广佣金
				CommissionListEnd: [] //显示数据
			};
			$scope.fun = {
				changshop: function() {
					switch($scope.data.checkShop) {
						case '全部':
							$scope.data.CommissionListEnd = $scope.data.CommissionList0;
							break;
						case '个人':
							if($scope.data.CommissionList1[0] == 0) {
								getCommissionListBegin(1);
							} else {
								$scope.data.CommissionListEnd = $scope.data.CommissionList1;
							}
							break;
						case '商家':
							if($scope.data.CommissionList2[0] == 0) {
								getCommissionListBegin(2);
							} else {
								$scope.data.CommissionListEnd = $scope.data.CommissionList2;
							}
							break;
						case '代理':
							if($scope.data.CommissionList3[0] == 0) {
								getCommissionListBegin(3);
							} else {
								$scope.data.CommissionListEnd = $scope.data.CommissionList3;
							}
							break;
						case '平台':
							if($scope.data.CommissionList4[0] == 0) {
								getCommissionListBegin(4);
							} else {
								$scope.data.CommissionListEnd = $scope.data.CommissionList4;
							}
							break;
						case '推广佣金':
							if($scope.data.CommissionList5[0] == 0) {
								getCommissionListBegin(5);
							} else {
								$scope.data.CommissionListEnd = $scope.data.CommissionList5;
							}
							break;
						default:
							break;
					}
				}
			};
			getCommissionListBegin(-1);
		}
	])
	.controller('balanceDetail', [
		'$scope', '$state', '$stateParams', 'merchants2', 'referrerdata', 'changeTime',
		function($scope, $state, $stateParams, merchants2, referrerdata, changeTime) {
			$scope.data = {
				nodata: false,
				detail: []
			};
			$scope.fun = {
				goTransactionDetail: function(type, state, orderId, time) {
					if(type != 1&&type!=4) {
						$state.go('referrer.transactionDetail', {
							'type': type,
							'state': state,
							'orderId': orderId,
							'time': time
						});
					};
				}
			};
			referrerdata.FundsFlowList(function(data) {
				angular.forEach(data, function(item) {
					switch(item.state) {
						case 1:
						case 3:
						case 8:
							item.stateName = '审核转账中';
							break;
						case 4:
							item.stateName = '提现成功';
							break;
						case 2:
						case 5:
						case 9:
							item.stateName = '提现失败';
							break;
						default:
							break;
					}
					if(item.type == 1) {
						item.createTime = item.createTime.substr(0, 10);
						item.itemName = '佣金收益';
					}
					if(item.type == 2) {
						item.itemName = '提现';
						item.orderId = item.relationId;
					}
					if(item.type == 3) {
						item.itemName = '手续费';
						item.orderId = item.relationId;
					}
					$scope.data.detail.push(item);
				});
				if($scope.data.detail.length == 0) {
					$scope.data.nodata = true;
				} else {
					$scope.data.nodata = false;
				}
			})
		}
	])
	.controller('transactionDetail', [
		'$scope', '$state', '$stateParams', 'referrerdata',
		function($scope, $state, $stateParams, referrerdata) {
			//type: 2、提现    3、手续费
			var type = $stateParams.type,
				state = $stateParams.state,
				time = $stateParams.time,
				stateName = '',
				stateEN = '',
				orderId = $stateParams.orderId,
				title = type == 3 ? '手续费' : '提现';
			switch(state) {
				case '1':
					stateName = '待审核';
					stateEN = 'wait';
					break;
				case '3':
					stateName = '转账中';
					stateEN = 'wait';
					break;
				case '8':
					stateName = '初审通过';
					stateEN = 'wait';
					break;
				case '4':
					stateName = '转账成功';
					stateEN = 'succeed';
					break;
				case '2':
					stateName = '审核不通过';
					stateEN = 'defeat';
					break;
				case '5':
					stateName = '转账失败';
					stateEN = 'defeat';
					break;
				case '9':
					stateName = '初审不通过';
					stateEN = 'defeat';
					break;
				default:
					break;
			};
			$scope.data = {
				type: type,
				state: state,
				stateName: stateName,
				time: time,
				stateEN: stateEN,
				orderId: orderId,
				title: title,
				Info: {}
			};
			referrerdata.WithdrawalModel({
				'Id': $scope.data.orderId
			}, function(data) {
				data.bankCardNoLastFour = data.bankCardNo.substr(data.bankCardNo.length - 4, 4);
				$scope.data.Info = data;
			});

		}
	])
	.controller('safeInfo', [
		'$scope', '$state', '$stateParams', 'referrerdata', 'userInfo',
		function($scope, $state, $stateParams, referrerdata, userInfo) {
			$scope.data = {};
			$scope.fun = {
				goRealNameApprove: function() {
					$state.go('referrer.realNameApprove');
				},
				goChangePassword: function() {
					$state.go('referrer.changePassword');
				},
				goMyBankCard: function() {
					$state.go('referrer.myBankCard');
				}
			};
			referrerdata.ReferrerBaseInfo(function(data) {
				switch(data.state) {
					case 0:
						data.stateName = '正常';
						break;
					case 1:
						data.stateName = '冻结';
						break;
					case 2:
						data.stateName = '封号';
						break;
					default:
						break;
				};
				$scope.data = data;
				userInfo.setUserPhone(data.phoneNumber);
				userInfo.setUserRealName(data.realName);
			})
		}
	])
	.controller('realNameApprove', [
		'$scope',
		'$state',
		'$ionicHistory',
		'$ionicPopover',
		'validate',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'sendPhoneValidCode',
		'bank',
		'referrerdata',
		function($scope, $state, $ionicHistory, $ionicPopover, validate, seller, common, systemConfig, dialog, systemConstant, userInfo, sendPhoneValidCode, bank, referrerdata) {
			$scope.data = {
				isArget: true,
				bankCardName: '',
				user: {
					realName: '',
					idCard: '',
					bankCardNo: '',
					userPhone: '',
					phoneCode: ''
				}
			};
			/*$scope.sendValidate = function(cb) {
				return sendPhoneValidCode.getValidateCode(type,cb);
			};*/
			$scope.sendValidate = function() {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.RealNameSmsCode({
						'phoneNumber': $scope.data.user.userPhone,
						'smsType': 1
					}, function(data, msg) {
						dialog.tipsSuccess('已发送验证码');
					});
			};

			var VoiceValidatePopover = null;
			$ionicPopover.fromTemplateUrl('html/referrer/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				VoiceValidatePopover = pop;
			});
			$scope.showVoiceValidateToggle = false;
			$scope.showVoiceValidate = function() {
				$scope.showVoiceValidateToggle = true;
			};
			$scope.getVoiceValidate = function() {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.RealNameSmsCode({
							'phoneNumber': $scope.data.user.userPhone,
							'smsType': 2
						}, function() {
							VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
						},
						function(data, msg) {
							dialog.tipsError(msg);
						});
			};
			$scope.VoiceValidatePopoverHide = function() {
				VoiceValidatePopover.hide();
			}

			$scope.fun = {
				showBankInfo: function() {
					bank.getBankInfo(
						$scope.data.user.bankCardNo,
						function(msg, data) {
							$scope.data.bankCode = '';

							if(!msg && data) {
								if(!data || !data.addible) {
									$scope.data.bankCardName = '系统暂不支持' + data.bankName + '银行卡,请选择其他银行卡';
									return;
								};
								if(data.cardType != 'DC') {
									$scope.data.bankCardName = '系统只能绑定储蓄卡,请选择其他银行卡';
									return;
								};

								$scope.data.bankCode = data.bankCode;
								$scope.data.bankCardName = data.bankName;
							} else {
								$scope.data.bankCardName = msg;
							};
						});
				},
				userRegist: function() {

					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'realName': '您的姓名',
							'idCard': '您的身份证',
							'bankCardNo': '您的卡号',
							'userPhone': '您的手机号',
							'phoneCode': '短信验证码',

						}
					});

					if(isOkform1) {
						if(!$scope.data.bankCode) {
							dialog.tips($scope.data.bankCardName);
							return;
						};
						referrerdata.AddBankCardFirst({
							'realName': $scope.data.user.realName,
							'idcardNumber': $scope.data.user.idCard,
							'cardNumber': $scope.data.user.bankCardNo,
							'phone': $scope.data.user.userPhone,
							'bankName': $scope.data.bankCardName,
							'SmsCode': $scope.data.user.phoneCode,
							'bankCode': $scope.data.bankCode
						}, function() {
							dialog.tipsSuccess('实名认证成功', function() {
								/*$state.go('referrer.safeInfo');*/
								$ionicHistory.goBack();
							});
						});
					};
				}
			};
		}
	])
	.controller('changePassword', [
		'$scope',
		'$state',
		'$ionicHistory',
		'$ionicPopover',
		'validate',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'sendPhoneValidCode',
		'referrerdata',
		function($scope, $state, $ionicHistory, $ionicPopover, validate, seller, common, systemConfig, dialog, systemConstant, userInfo, sendPhoneValidCode, referrerdata) {
			var phoneNumber = userInfo.getUserPhone();
			$scope.data = {
				phoneNumber: phoneNumber,
				showPwd: false,
				user: {
					userPwd: '',
					phoneCode: ''
				}
			};
			/*$scope.sendValidate = function(cb) {
				return sendPhoneValidCode.getValidateCode(type,cb);
			};*/
			$scope.sendValidate = function(cb) {
				return referrerdata.SafeSmsCode({
					'smsType': 1
				}, function(data, msg) {
					dialog.tipsSuccess('已发送验证码');
				});
			};

			var VoiceValidatePopover = null;
			$ionicPopover.fromTemplateUrl('html/referrer/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				VoiceValidatePopover = pop;
			});
			$scope.showVoiceValidateToggle = false;
			$scope.showVoiceValidate = function() {
				$scope.showVoiceValidateToggle = true;
			};
			$scope.getVoiceValidate = function() {
				return referrerdata.SafeSmsCode({
						'smsType': 2
					}, function() {
						VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
					},
					function(data, msg) {
						dialog.tipsError(msg);
					});
			};
			$scope.VoiceValidatePopoverHide = function() {
				VoiceValidatePopover.hide();
			}

			$scope.fun = {
				changeShowPwd: function() {
					var inputPwd = document.getElementById('password');
					if($scope.data.showPwd) {
						$scope.data.showPwd = !$scope.data.showPwd;
						inputPwd.type = 'password';
					} else {
						$scope.data.showPwd = !$scope.data.showPwd;
						inputPwd.type = 'text';
					};
				},
				userRegist: function() {

					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'userPwd': '您想更改的密码',
							'phoneCode': '短信验证码'
						}
					});

					if(isOkform1) {
						referrerdata.UpdateSafePassword({
								'safePassword': $scope.data.user.userPwd,
								'code': $scope.data.user.phoneCode
							},
							function() {
								dialog.tipsSuccess('密码修改成功', function() {
									$ionicHistory.goBack();
									/*$state.go('referrer.safeInfo');*/
								});
							});
					}
				}
			};
		}
	])

	.controller('myBankCard', [
		'$scope', '$state', 'referrerdata', 'common',
		function($scope, $state, referrerdata, common) {

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
				hasRealName: true
			};

			$scope.fun = {
				getShowBankNo: common.getShowBankNo,
				addCard: function() {
					$state.go('referrer.addBankCard');
				},
				goToCardDetail: function(id) {
					$state.go('referrer.cardDetail', {
						'cardId': id
					});
				}
			};

			referrerdata.BankCardList(function(data) {
				var result = {};
				angular.forEach(data, function(item) {
					result = getBank(item.bankCode);
					item.desc = result || {};

				});
				$scope.data.data = data;
			});

			referrerdata.ReferrerBaseInfo(function(data) {
				if(data.realName == null) {
					$scope.data.hasRealName = false;
				} else {
					$scope.data.hasRealName = true;
				};
			});
		}
	])
	.controller('cardDetail', [
		'$scope', 'referrerdata', '$state', '$stateParams', '$ionicHistory', 'dialog', 'common', 'validate',
		function($scope, referrerdata, $state, $stateParams, $ionicHistory, dialog, common, validate) {

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

			$scope.user = {};

			$scope.fun = {
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

							referrerdata.UnbundlingBankCard({
								'id': cardId,
								'safeCode': pwd
							}, function(data) {
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
			referrerdata.BankCardList(function(data) {
				angular.forEach(data, function(item) {
					item.desc = getBank(item.bankCode) || {};
					item.cardNo = item.cardNo.substr(item.cardNo.length - 4, 4);
					if(item.id == cardId) {
						$scope.data = item;
					};
				});
			});
			referrerdata.WithdrawalsUserInfo(function(data) {
				$scope.user.hasPwd = data.isSetSecurityPwd;
			});
		}
	])
	.controller('addBankCard', [
		'$scope', '$ionicHistory', '$ionicPopover', 'validate', 'referrerdata', 'dialog', 'popover', 'bank', 'userInfo',
		function($scope, $ionicHistory, $ionicPopover, validate, referrerdata, dialog, popover, bank, userInfo) {
			var popoverT = null,
				realName = userInfo.getUserRealName(),
				city = popover.city($scope, {
					event: {
						okFun: function() {
							var cityText = city.fun().getText(),
								cityArr = cityText.split(',');

							$scope.data.cityText = cityText;
							$scope.data.areaCode = city.fun().getlaseId();
							$scope.data.provincial = cityArr[0];
							$scope.data.city = cityArr[1];
							$scope.data.hasCityName = true;
						}
					}
				});
			$ionicPopover.fromTemplateUrl('html/referrer/addBankCardModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				/*pop.show(document.getElementById('help'));*/
				popoverT = pop;
			});
			$scope.sendValidate = function(cb) {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.RealNameSmsCode({
						'phoneNumber': $scope.data.userPhone,
						'smsType': 1
					}, function(data, msg) {
						dialog.tipsSuccess('已发送验证码');
					});
			};

			var VoiceValidatePopover = null;
			$ionicPopover.fromTemplateUrl('html/referrer/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				VoiceValidatePopover = pop;
			});
			$scope.showVoiceValidateToggle = false;
			$scope.showVoiceValidate = function() {
				$scope.showVoiceValidateToggle = true;
			};
			$scope.getVoiceValidate = function() {
				return validate.element($scope.form1.userPhone, '手机号') &&
					referrerdata.RealNameSmsCode({
							'phoneNumber': $scope.data.userPhone,
							'smsType': 2
						}, function() {
							VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
						},
						function(data, msg) {
							dialog.tipsError(msg);
						});
			};
			$scope.VoiceValidatePopoverHide = function() {
				VoiceValidatePopover.hide();
			}

			$scope.data = {
				'realName': realName,
				'userPhone': '',
				'phoneCode': '',
				'cityText': '点击设置开户行所在城市',
				'isArget': true,
				'fullName': '',
				'bankCardNo': '',
				'bankCardName': '请设置银行卡开户行',
				'hasBackName': false,
				'hasCityName': false,
				'securityPwd': '',
				'bankCode': '',
				'cityInfo': '',
				'provincial': '',
				'areaCode': '',
				'bankCode': ''
			};

			$scope.popover = {
				city: city
			};

			$scope.fun = {
				showPopoverT: function() {
					popoverT.show(document.getElementById('help'))
				},
				hidePopoverT: function() {
					popoverT.hide();
				},
				showBankInfo: function() {
					bank.getBankInfo(
						$scope.data.bankCardNo,
						function(msg, data) {
							$scope.data.bankCode = '';

							if(!msg && data) {
								if(!data || !data.addible) {
									$scope.data.bankCardName = '系统暂不支持' + data.bankName + '银行卡,请选择其他银行卡';
									$scope.data.hasBackName = false;
									return;
								}
								if(data.cardType != 'DC') {
									$scope.data.bankCardName = '系统只能绑定储蓄卡,请选择其他银行卡';
									$scope.data.hasBackName = false;
									return;
								}

								$scope.data.bankCode = data.bankCode;
								$scope.data.bankCardName = data.bankName;
								$scope.data.hasBackName = true;
							} else {
								$scope.data.bankCardName = msg;
								$scope.data.hasBackName = false;
							}
						});
				},
				addCardSubmit: function() {
					var isOkform1 = validate.form($scope.form1, {
							'message': {
								'fullName': '您的姓名',
								'bankCardNo': '您的银行卡号',
								'bankCardName': '开户行名称',
								'userPhone': '您的手机号',
								'phoneCode': '手机验证码'
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
						referrerdata.AddBankCard({
							'realName': $scope.data.realName,
							'cardNumber': $scope.data.bankCardNo,
							'phone': $scope.data.userPhone,
							'bankName': $scope.data.bankCardName,
							'areaId': $scope.data.areaCode,
							'SmsCode': $scope.data.phoneCode,
							'bankCode': $scope.data.bankCode
						}, function() {
							dialog.tipsSuccess('添加银行卡成功', function() {
								/*$state.go('referrer.addBankCard');*/
								$ionicHistory.goBack();
							});
						});

						//$scope.data.bankCode='CMB';
						//$scope.data.bankCardName='招商银行';
						/*dialog.passWord(
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
						);*/

					}
				}
			};

			/*merchants2.iscapitalaccount(function(data) {
				$scope.data.hasPwd = data;
			});*/
		}
	])
	.controller('withdraw', [
		'$scope', '$state', '$ionicHistory', '$stateParams', '$ionicPopover', 'referrerdata', 'validate', 'dialog', 'common', 'systemConstant',
		function($scope, $state, $ionicHistory, $stateParams, $ionicPopover, referrerdata, validate, dialog, common, systemConstant) {
			var bankList = common.bankList,
				maxAmount = 20000,
				minAmount = 100,
				validaAmount = function() {
					var amount = $scope.data.user.amount,
						withdrawalFee = $scope.data.user.withdrawalFee;

					if(!amount) {
						$scope.data.user.withdrawalAmountText = '账户余额:' + $scope.data.user.withdrawalAmount;
						return false;
					};
					if(!validate.checkAmount(amount, false)) {
						$scope.data.user.withdrawalAmountText = '请输入正确的金额';
						return false;
					};
					amount = parseFloat(amount);
					if(amount < minAmount) {
						$scope.data.user.withdrawalAmountText = '单笔提现金额不能低于' + minAmount;
						return false;
					};
					if(amount > maxAmount) {
						$scope.data.user.withdrawalAmountText = '单笔提现金额不能超过' + maxAmount;
						return false;
					};

					if(parseFloat((amount + withdrawalFee).toFixed(2)) > $scope.data.user.withdrawalAmount) {
						$scope.data.user.withdrawalAmountText = '余额不足';
						return false;
					};
					return withdrawalFee;
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
				};
			$scope.data = {
				withdrawalType: 2,
				tixianMothed: systemConstant.tixianMothed,
				bank: [],
				showBankMethod: '',
				cardChecked: {},
				user: {},
				showBtn: false
			};
			$scope.fun = {
				getShowBankNo: common.getShowBankNo,
				show: function(type) {
					$scope.data.withdrawalType = type;
					$scope.data.user.amount = '';
				},
				clearAmount: function() {
					$scope.data.user.amount = '';
					validaAmount();
				},
				changeAmount: function() {
					var result = validaAmount(),
						showBtn = false;

					if(!result) {
						$scope.data.showBtn = false;
						return;
					}

					$scope.data.showBtn = true;

					$scope.data.user.withdrawalAmountText = '要扣除￥' + result + '手续费';
				},
				getAll: function() {
					var withdrawalAmount = $scope.data.user.withdrawalAmount,
						withdrawalFee = $scope.data.user.withdrawalFee;
					if(withdrawalAmount < (maxAmount + withdrawalFee)) {

						amount = (withdrawalAmount - withdrawalFee);

						if(amount < 0) {
							amount = 0;
						}

						amount = amount.toFixed(2);
					} else {
						amount = maxAmount;
					}
					$scope.data.user.amount = amount;
					this.changeAmount();
				},
				save: function() {
					if(!$scope.data.user.amount) {
						dialog.tipsError('请输入正确的金额');
						return false;
					};
					var result = validaAmount();

					if(!result) {
						return false;
					};

					var isPost = true;

					dialog.passWord(
						'提现',
						'',
						'',
						function(pwd, prop) {
							if(!isPost) {
								return false;
							};
							if(!validate.checkPwd(pwd, true)) {
								return false;
							};
							isPost = false;

							referrerdata.WithdrawalApply({
								'amount': $scope.data.user.amount,
								'withdrawalType': $scope.data.withdrawalType,
								'cardId': $scope.data.cardChecked.id,
								'SafePassword': pwd
							}, function() {
								prop.close();
								dialog.tipsSuccess('提现成功', function() {
									$scope.data.user.amount = '';
									$ionicHistory.goBack();
								});

							}).finally(function() {
								isPost = true;
							});
						},
						'提现'
					);
				},
				getCard: function(item) {
					$scope.data.withdrawalType = 2;
					$scope.data.cardChecked = angular.extend($scope.data.cardChecked, item);
				}
			};
			referrerdata.BankCardList(
				function(data) {
					var result = {};
					angular.forEach(data, function(item) {
						result = getBank(item.bankCode);
						item.desc = result || {};
					});
					$scope.data.bank = data;
					$scope.data.showBankMethod = data.length;
					$scope.data.cardChecked = angular.extend($scope.data.cardChecked, data[0]);
				}
			);
			referrerdata.WithdrawalsUserInfo(function(data) {
				$scope.data.user = data;
				$scope.data.user.withdrawalAmountText = '账户余额:￥' + $scope.data.user.withdrawalAmount;
				minAmount = (data.minimumWithdrawalAmount > 0) ? data.minimumWithdrawalAmount : minAmount;
				maxAmount = (data.maximumWithdrawalAmount > 0) ? data.maximumWithdrawalAmount : maxAmount;
			});
		}
	])
	.controller('personageOperation', [
		'$scope', '$state', '$stateParams', 'referrerdata', 'weixin', 'systemConstant',
		function($scope, $state, $stateParams, referrerdata, weixin, systemConstant) {
			var code = $stateParams.code,
				doamin = systemConstant.webDoamin;
			$scope.img = {
				imgUrl: 'img/juhepayQR.png'
			};
			$scope.data = {
				code: code == 0 ? '' : code
			};
			referrerdata.ParamQrCode({
				'type': 1,
				'code': $scope.data.code
			}, function(data) {
				if(data.qrCodeType == 1) {
					$scope.img.imgUrl = 'img/juhepayQR.png';
				} else {
					$scope.img.imgUrl = data.qrCodeUrl;
				}
			});
			var wei = weixin.weiXin();
			wei.init(function() {
				wei.share({
					title: '个人收款业务', // 分享标题
					desc: '快速开通，即开即用，无需任何费用，多通道、快速收款、提现秒到。', // 分享描述
					link: "http://" + doamin + "/#/referrer/personageOperation/" + code + "", // 分享链接
					imgUrl: "http://" + doamin + "/img/share-personageOperation.jpg", // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			});
		}
	])
	.controller('merchantOperation', [
		'$scope', '$state', '$stateParams', 'referrerdata', 'weixin', 'systemConstant',
		function($scope, $state, $stateParams, referrerdata, weixin, systemConstant) {
			var code = $stateParams.code,
				doamin = systemConstant.webDoamin;
			$scope.img = {};
			$scope.data = {
				code: code == 0 ? '' : code
			};
			referrerdata.ParamQrCode({
				'type': 2,
				'code': $scope.data.code
			}, function(data) {
				if(data.qrCodeType == 1) {
					$scope.img.imgUrl = 'img/taidupayQR.png';
				} else {
					$scope.img.imgUrl = data.qrCodeUrl;
				}
			});
			var wei = weixin.weiXin();
			wei.init(function() {
				wei.share({
					title: '商家收银业务', // 分享标题
					desc: '强大的支付系统、店铺管理系统、营销系统、高效率实现交易闭环。让店铺快速迈入移动互联网+的时代。', // 分享描述
					link: "http://" + doamin + "/#/referrer/merchantOperation/" + code + "", // 分享链接
					imgUrl: "http://" + doamin + "/img/share-merchantOperation.jpg", // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			});
		}
	])
	.controller('platformOperation', [
		'$scope', '$state', '$stateParams', '$ionicHistory', 'referrerdata', 'validate', 'dialog', 'weixin', 'systemConstant',
		function($scope, $state, $stateParams, $ionicHistory, referrerdata, validate, dialog, weixin, systemConstant) {
			var code = $stateParams.code,
				doamin = systemConstant.webDoamin;
			$scope.data = {
				hasinvitationCode: code == 0 ? "" : code,
				user: {},
				type: 4,
				Name: '',
				userPhone: '',
				Address: '',
				invitationCode: ''
			};
			if($scope.data.hasinvitationCode) {
				$scope.data.invitationCode = $scope.data.hasinvitationCode;
			};
			$scope.fun = {
				userRegist: function() {
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'Name': '联系人姓名',
							'userPhone': '联系人电话',
							'Address': '详细地址',
							'invitationCode': '邀请码'
						}
					});
					if($scope.data.hasinvitationCode) {
						$scope.data.hasinvitationCode = $scope.data.hasinvitationCode;
					};
					if(isOkform1) {
						referrerdata.BusinessApply({
								'type': $scope.data.type,
								'name': $scope.data.Name,
								'phone': $scope.data.userPhone,
								'address': $scope.data.Address,
								'code': $scope.data.invitationCode
							},
							function() {
								dialog.tipsSuccess('提交申请成功', function() {
									/*$state.go('referrer.referrerCenter');*/
									$ionicHistory.goBack();
								});
							}
						)
					};
				}
			};
			var wei = weixin.weiXin();
			wei.init(function() {
				wei.share({
					title: '平台支付对接', // 分享标题
					desc: '一套最具灵活的组合平台支付工具，只提供技术方案，不参与资金清算，0成本快速接入，安全省心高效的支付系统。', // 分享描述
					link: "http://" + doamin + "/#/referrer/platformOperation/" + code + "", // 分享链接
					imgUrl: "http://" + doamin + "/img/share-platformOperation.jpg", // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			});
			/*referrerdata.LoginInfo(function(data) {
				$scope.data.user = data;
				if($scope.data.user.invitationCode) {
					$scope.data.hasinvitationCode = true;
					$scope.data.invitationCode = $scope.data.user.invitationCode;
				} else {
					$scope.data.hasinvitationCode = false;
				};
			});*/
		}
	])
	.controller('agencyOperation', [
		'$scope', '$state', '$stateParams', '$ionicHistory', 'referrerdata', 'validate', 'dialog', 'weixin', 'systemConstant',
		function($scope, $state, $stateParams, $ionicHistory, referrerdata, validate, dialog, weixin, systemConstant) {
			var code = $stateParams.code,
				doamin = systemConstant.webDoamin;
			$scope.data = {
				hasinvitationCode: code == 0 ? "" : code,
				type: 3,
				Name: '',
				userPhone: '',
				Address: '',
				invitationCode: ''
			};
			if($scope.data.hasinvitationCode) {
				$scope.data.invitationCode = $scope.data.hasinvitationCode;
			};
			$scope.fun = {
				userRegist: function() {
					var isOkform1 = validate.form($scope.form1, {
						'message': {
							'Name': '联系人姓名',
							'userPhone': '联系人电话',
							'Address': '详细地址',
							'invitationCode': '邀请码'
						}
					});

					if(isOkform1) {
						referrerdata.BusinessApply({
								'type': $scope.data.type,
								'name': $scope.data.Name,
								'phone': $scope.data.userPhone,
								'address': $scope.data.Address,
								'code': $scope.data.invitationCode
							},
							function() {
								dialog.tipsSuccess('提交申请成功', function() {
									/*$state.go('referrer.referrerCenter');*/
									$ionicHistory.goBack();
								});
							}
						)
					};
				}
			};
			var wei = weixin.weiXin();
			wei.init(function() {
				wei.share({
					title: '推荐代理', // 分享标题
					desc: '现全国招募代理合伙人，共同拓展市场，共同分享支付行业大蛋糕！', // 分享描述
					link: "http://" + doamin + "/#/referrer/agencyOperation/" + code + "", // 分享链接
					imgUrl: "http://" + doamin + "/img/share-agencyOperation.jpg", // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			});
			/*referrerdata.LoginInfo(function(data) {
				$scope.data.user = data;
				if($scope.data.user.invitationCode) {
					$scope.data.hasinvitationCode = true;
					$scope.data.invitationCode = $scope.data.user.invitationCode;
				} else {
					$scope.data.hasinvitationCode = false;
				};
			});*/
		}
	])
	.controller('referrerIntroduce', [
		'$scope',
		'referrerdata',
		function($scope, referrerdata) {

		}
	])
	.controller('IDclosedWaring', [
		'$scope',
		function($scope) {

		}
	])

	//任务市场
	.controller('missionMarket', [
		'$scope',
		'$state',
		'$ionicPopover',
		'$timeout',
		'referrerdata',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		'page',
		'weixin',
		function($scope, $state, $ionicPopover,$timeout,
			referrerdata, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices, page, weixin) {
			var wei = weixin.weiXin();
			$scope.data = {
				missionList: []
			}

			$scope.fun = {
				goMyMission: function() {
					$state.go('referrer.myMission');
				},
				goMissionDetail: function(item) {
					$state.go('referrer.missionDetail', {
						'id': item.id
					});
				},
				getMission: function(item) {
					if(!item.isDraw) {
						dialog.tipsError('已领取该任务！')
					} else {
						referrerdata.referrerTaskReceive(item.id, function(data) {
							if(data === false) {
								dialog.tipsError('请先登录')
							} else {
								dialog.tipsSuccess('成功领取任务', function() {
									item.isDraw = !item.isDraw
									item.hasGetTheMission = item.isDraw ? '领取任务' : '已领取';
								})
							}
						})
					}
				}
			}

			$scope.$on('$ionicView.afterEnter', function() {
				var referrerUrl = systemConstant.webDoamin,
					shareLinkUrl = "http://" + referrerUrl + '/#/referrer/missionMarket',
					shareImgUrl = "http://" + referrerUrl + "/img/popularizeMission.png";
				console.log(shareLinkUrl)
				wei.init(function() {
					wei.share({
						title: '很简单的赚钱任务【态度任务】', // 分享标题
						desc: '动动手指躺着都能赚钱的节奏；快快行动起来吧！', // 分享描述
						link: shareLinkUrl, // 分享链接
						imgUrl: shareImgUrl, // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
				});
			}, false);
			
			
			var pageQR = page.page({
				scope: $scope,
				url: "/api/referrer/getReferrerTaskMarketList",
				initData: function(data, isReload) {

					angular.forEach(data, function(item) {
						item.branchName = item.branchName || '旗舰店';
						item.allName = item.name + '（' + item.branchName + '）' + item.couponFaceValue + '元代金券';
						item.hasGetTheMission = item.isDraw ? '领取任务' : '已领取';
					})

					if(isReload) {
						$scope.data.missionList = [];
					}
					if(data) {
						$scope.data.missionList = $scope.data.missionList.concat(data);
					}
				}
			});

			$scope.page = pageQR;
			
			$timeout(function(){
				pageQR.pageInit();
			},500)
			
		}
	])

	//任务市场任务详情
	.controller('missionDetail', [
		'$scope',
		'$state',
		'$ionicPopover',
		'$ionicScrollDelegate',
		'$stateParams',
		'$timeout',
		'referrerdata',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		'weixin',
		function($scope, $state, $ionicPopover, $ionicScrollDelegate, $stateParams, $timeout,
			referrerdata, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices, weixin) {
			var missionId = $stateParams.id,
				wei = weixin.weiXin();
			$scope.data = {
				flexTogggle: false,
				missionInfo: {},
				btnContent: '领取任务'
			};
			$scope.fun = {
				changeFlexToggle: function() {
					$scope.data.flexTogggle = !$scope.data.flexTogggle;
					$ionicScrollDelegate.resize();
				},
				getThisMission: function() {
					if($scope.data.missionInfo.isDraw) {
						referrerdata.referrerTaskReceive(missionId, function(data) {
							if(data === false) {
								dialog.tipsError('请先登录')
							} else {
								dialog.tipsSuccess('成功领取任务', function() {
									$scope.data.missionInfo.isDraw = !$scope.data.missionInfo.isDraw
									$scope.data.btnContent = $scope.data.missionInfo.isDraw ? '领取任务' : '已领取';
								})
							}
						})
					}
				},
				goPopularizeXieYi: function() {
					$state.go('referrer.pupularizeXieYi');
				},
				goback: function() {
					$state.go('referrer.missionMarket')
				}
			};

			referrerdata.getReferrerTaskMarketDetails(missionId, function(data) {
				$timeout(function() {
					data.branchName = data.branchName || '旗舰店';
					data.allName = data.name + '（' + data.branchName + ')' + data.couponFaceValue + '元代金券';
					if(!data.isDraw) {
						$scope.data.btnContent = '已领取'
					}
					$scope.data.missionInfo = data;

					var referrerUrl = systemConstant.webDoamin,
						shareLinkUrl = "http://" + referrerUrl + '/#/referrer/missionDetail/' + missionId,
						shareImgUrl = "http://" + referrerUrl + "/img/popularizeMission.png";

					wei.init(function() {
						wei.share({
							title: $scope.data.missionInfo.name + '（' + $scope.data.missionInfo.branchName + '）', // 分享标题
							desc: '很简单的赚钱任务，动动手指躺着都能赚钱的节奏；快来领取吧！', // 分享描述
							link: shareLinkUrl, // 分享链接
							imgUrl: shareImgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户确认分享后执行的回调函数
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
							}
						});
					});
				}, 500)
			})
		}
	])

	//我的任务
	.controller('myMission', [
		'$scope',
		'$state',
		'$ionicPopover',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		'page',
		function($scope, $state, $ionicPopover,
			seller, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices, page) {

			$scope.data = {
				missionList: []
			}

			$scope.fun = {
				goMissionDetail: function(item) {
					$state.go('referrer.myMissionDetail', {
						'id': item.id
					});
				},
				goMyCommission: function() {
					$state.go('referrer.myCommission');
				},
				goMissionMarket: function() {
					$state.go('referrer.missionMarket');
				}
			}

			var pageQR = page.page({
				scope: $scope,
				url: "/api/referrer/getReferrerTaskList",
				initData: function(data, isReload) {
					angular.forEach(data, function(item) {
						item.branchName = item.branchName || '旗舰店';
						item.allName = item.name + '（' + item.branchName + '）' + item.couponFaceValue + '元代金券';
					})
					if(isReload) {
						$scope.data.missionList = [];
					}
					if(data) {
						$scope.data.missionList = $scope.data.missionList.concat(data);
					}
				}
			});

			$scope.page = pageQR;

			pageQR.pageInit();
		}
	])

	//我的任务详情
	.controller('myMissionDetail', [
		'$scope',
		'$state',
		'$ionicPopover',
		'$ionicHistory',
		'$window',
		'$ionicScrollDelegate',
		'$sce',
		'$timeout',
		'$stateParams',
		'referrerdata',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		'weixin',
		function($scope, $state, $ionicPopover, $ionicHistory, $window, $ionicScrollDelegate, $sce, $timeout, $stateParams,
			referrerdata, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices, weixin) {
			var myMissionId = $stateParams.id,
				wei = weixin.weiXin(),
				myPopover = {
					waringTips: null,
					share: null
				},
				clipboard = new Clipboard(document.getElementById("d_clip_button")),
				mapHeight = function() {
					var height1 = document.getElementsByClassName('scroll-content')[0].offsetHeight,
						height2 = $window.innerHeight - 50,
						height = '';
					if(height1 - 50 >= height2) {
						height = height1 - 50;
					} else {
						height = height2;
					};
					return height;
				},
				pageIn = function() {

					referrerdata.getReferrerTaskDetails(myMissionId, function(data) {

						$scope.data.getInfo = data;

						$scope.data.getInfo.data.branchName = $scope.data.getInfo.data.branchName || '旗舰店';

						$scope.data.getInfo.allName = $scope.data.getInfo.data.name + '（' + $scope.data.getInfo.data.branchName + '）' + $scope.data.getInfo.data.couponFaceValue + '元代金券';

						$scope.data.mapSrc = $sce.trustAsResourceUrl(systemConstant.mapUrl + '&type=1&coord=' + data.latitude + ',' + data.pointLongitude);

						if(!WZY_isOfficial) {
							var userUrl = 'm3.taidupay.com';
						} else if(WZY_isOfficial) {
							var userUrl = 'csm.taidupay.com';
						}
						$scope.data.pageUrl = 'http://' + userUrl + '/#/pay/popularizeCardGet/' + data.data.id;
						var shareLinkUrl = $scope.data.pageUrl;
						//中转页配置
						var shareHelpPageUrl = 'http://' + systemConstant.webDoamin + '/#/referrer/shareHelpPage?params=' + encodeURIComponent(shareLinkUrl);
						//中转页配置
						console.log(shareHelpPageUrl)
						wei.init(function() {
							wei.share({
								title: $scope.data.getInfo.data.name + '（' + $scope.data.getInfo.data.branchName + '）￥' + ((Math.round(($scope.data.getInfo.data.couponFaceValue - 0) * 100)) / 100) + '代金券', // 分享标题
								desc: '友谊的小船怎能说翻就翻，土豪就是这么任性，快来领券吧！', // 分享描述
								link: shareHelpPageUrl, // 分享链接
								imgUrl: "http://" + userUrl + "/img/sharePageLogo.jpg", // 分享图标
								type: '', // 分享类型,music、video或link，不填默认为link
								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							});
						});
					})
				};

			clipboard.on('success', function(e) {
				dialog.tipsSuccess('复制成功');
				e.clearSelection();
			});
			clipboard.on('error', function(e) {
				dialog.tips('请选择“拷贝”进行复制!');
			});

			$ionicPopover.fromTemplateUrl('html/referrer/myMissionDetailModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				/*pop.show(document.getElementById('showTips'));*/
				myPopover.waringTips = pop;
			});

			$ionicPopover.fromTemplateUrl('html/referrer/shareModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slid-in-up'
			}).then(function(pop) {
				/*pop.show(document.getElementById("shareModal"));*/
				myPopover.share = pop;
			});

			$scope.data = {
				pageUrl: '',
				showIndex: 1,
				mapHeight: (mapHeight()) + 'px!important',
				mapSrc: $sce.trustAsResourceUrl(systemConstant.mapUrl + '&type=1'),
				getInfo: {}
			}
			$scope.fun = {
				showSharePopover: function() {
					myPopover.share.show(document.getElementById("shareModal"));
				},
				sharePopoverHide: function() {
					myPopover.share.hide();
				},
				showHelpPopover: function() {
					myPopover.waringTips.show(document.getElementById('showTips'));
				},
				closeHelpPopover: function() {
					myPopover.waringTips.hide();
				},
				goback: function() {
					if($scope.data.showIndex == 2) {
						$scope.data.showIndex = 1;
					} else {
						$ionicHistory.goBack();
					}
				},
				showMap: function() {
					$ionicScrollDelegate.scrollTop();
					$scope.data.showIndex = 2;
				},
				goPopularizeXieYi: function() {
					$state.go('referrer.pupularizeXieYi');
				}
			};

			pageIn();
		}
	])

	//我的佣金
	.controller('myCommission', [
		'$scope',
		'$state',
		'$ionicPopover',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		'page',
		function($scope, $state, $ionicPopover,
			seller, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices, page) {

			$scope.data = {
				flexTogggle:true,
				QRcode:'',
				yesterdayTotal: '',
				monthTotal: '',
				dayProfitTotal: []
			}
			
			$scope.data.QRcode = systemConstant.QRcode;
			$scope.fun = {
				changeFlexToggle:function(){
					$scope.data.flexTogggle = !$scope.data.flexTogggle
				}
			}
			var pageQR = page.page({
				scope: $scope,
				dataFiled: 'data',
				url: "/api/referrer/getReferrerCommission",
				initData: function(data, isReload) {
					if(this.page.pageIndex == 1) {
						$scope.data.yesterdayTotal = data.yesterdayTotal;
						$scope.data.monthTotal = data.monthTotal;
					}
					if(isReload) {
						$scope.data.dayProfitTotal = [];
					}
					if(data) {
						$scope.data.dayProfitTotal = $scope.data.dayProfitTotal.concat(data.data);
					}
				}
			});

			$scope.page = pageQR;

			pageQR.pageInit();
		}
	])

	//推广协议
	.controller('pupularizeXieYi', [
		'$scope',
		'$state',
		'$ionicPopover',
		'$stateParams',
		'seller',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		function($scope, $state, $ionicPopover, $stateParams,
			seller, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices) {

		}
	])
	//分享中转页面
	.controller('shareHelpPage', [
		'$scope', '$state', '$stateParams', '$ionicPopover', '$ionicScrollDelegate',
		'merchants2', 'dialog', 'common', 'userInfo', 'systemConstant',
		function($scope, $state, $stateParams, $ionicPopover, $ionicScrollDelegate,
			merchants2, dialog, common, userInfo, systemConstant) {

			var goWhere = decodeURIComponent(window.location.href.split('params=')[1]);

			location.href = goWhere;

		}
	])
	// 已有账号登录页面
	.controller('loginInByPhone', [
		'$scope',
		'$state',
		'$stateParams',
		'$ionicPopover',
		'$ionicHistory',
		'$timeout',
		'referrerdata',
		'common',
		'systemConfig',
		'dialog',
		'systemConstant',
		'userInfo',
		'validate',
		'rexServices',
		function($scope, $state, $stateParams, $ionicPopover, $ionicHistory,$timeout,
			referrerdata, common, systemConfig, dialog, systemConstant, userInfo, validate, rexServices) {
			//验证对象
			$scope.rexObj = rexServices.rexObj;
			$scope.data = {
				isArget: false,
				user: {
					userPhone: '',
					phoneCode: ''
				}
			};

			$scope.sendValidate = function() {
				return validate.checkPhone($scope.data.user.userPhone, '手机号') &&
					referrerdata.getLoginSmsCode({
						'phoneNumber': $scope.data.user.userPhone
					}, function(data, msg) {
						dialog.tipsSuccess('已发送验证码');
					});
			};

			var VoiceValidatePopover = null;
			$ionicPopover.fromTemplateUrl('html/referrer/waringDialogModal.html?v=' + WZY_HTMLVersion + '', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(pop) {
				VoiceValidatePopover = pop;
			});
			$scope.showVoiceValidateToggle = false;
			$scope.showVoiceValidate = function() {
				$scope.showVoiceValidateToggle = true;
			};
			$scope.getVoiceValidate = function() {
				return validate.checkPhone($scope.data.user.userPhone, '手机号') &&
					referrerdata.getLoginSmsCode({
							'phoneNumber': $scope.data.user.userPhone
						}, function() {
							VoiceValidatePopover.show(document.getElementById("VoiceValidate"));
						},
						function(data, msg) {
							dialog.tipsError(msg);
						});
			};
			$scope.VoiceValidatePopoverHide = function() {
				VoiceValidatePopover.hide();
			}

			$scope.fun = {
				userRegist: function(form1) {
					var boolean = rexServices.checkForm(form1, ['phone', 'verCode']);
					if(!boolean) {
						return;
					}
					var result = {};
					result.phoneNumber = $scope.data.user.userPhone;
					result.smsCode = $scope.data.user.phoneCode;
					referrerdata.referrerLogin(
						result,
						function() {
							dialog.tipsSuccess('绑定成功', function() {
								$ionicHistory.goBack();
								$timeout(function(){
									$ionicHistory.goBack();
								},100)
							});
						});
				}
			};

		}
	])

;