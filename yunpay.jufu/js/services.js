angular.module('starter.services', [])
    .directive('even', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {
          ngModelController.$parsers.push(function (viewValue) {
            if (viewValue % 2 === 0) {
              ngModelController.$setValidity('even', true);
            } else {
              ngModelController.$setValidity('even', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('phone', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\d{8}$/;

            if (pattern.test(viewValue)) {
              ngModelController.$setValidity('phone', true);
            } else {
              ngModelController.$setValidity('phone', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('email', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (pattern.test(viewValue)) {
              ngModelController.$setValidity('email', true);
            } else {
              ngModelController.$setValidity('email', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('amount', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;

            if (pattern.test(viewValue)) {
              ngModelController.$setValidity('amount', true);
            } else {
              ngModelController.$setValidity('amount', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('validatecode',function(){
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /\d{4}$/;

            if (viewValue.length == 4 && pattern.test(viewValue)) {
              ngModelController.$setValidity('validatecode', true);
            } else {
              ngModelController.$setValidity('validatecode', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('phonecode', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /\d{5}$/;

            if (viewValue.length == 5 && pattern.test(viewValue)) {
              ngModelController.$setValidity('phonecode', true);
            } else {
              ngModelController.$setValidity('phonecode', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('userpwd', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {

          ngModelController.$parsers.push(function (viewValue) {

            var pattern = /^[A-Za-z0-9]{6,30}/;

            if (viewValue.length >= 6 && pattern.test(viewValue)) {
              ngModelController.$setValidity('userpwd', true);
            } else {
              ngModelController.$setValidity('userpwd', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('idcard', function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attrs, ngModelController) {
          var isIdCardNo = function (num) {
            var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
            var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2","x");
            var varArray = new Array();
            var intValue;
            var lngProduct = 0;
            var intCheckDigit;
            var intStrLen = num.length;
            var idNumber = num.toUpperCase();
            // initialize
            if ((intStrLen != 15) && (intStrLen != 18)) {
              return false;
            };
            // check and set value
            for (i = 0; i < intStrLen; i++) {
              varArray[i] = idNumber.charAt(i);
              if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                return false;
              } else if (i < 17) {
                varArray[i] = varArray[i] * factorArr[i];
              }
            };

            if (intStrLen == 18) {
              //check date
              var date8 = idNumber.substring(6, 14);
              if (isDate8(date8) == false) {
                return false;
              }
              // calculate the sum of the products
              for (i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
              }
              // calculate the check digit
              intCheckDigit = parityBit[lngProduct % 11];
              // check last digit
              if (varArray[17] != intCheckDigit) {
                return false;
              }
            }
            else {        //length is 15
              //check date
              var date6 = idNumber.substring(6, 12);
              if (isDate6(date6) == false) {
                return false;
              }
            }
            return true;
          };

          var isDate6 = function (sDate) {
            if (!/^[0-9]{6}$/.test(sDate)) {
              return false;
            }
            var year, month, day;
            year = sDate.substring(0, 4);
            month = sDate.substring(4, 6);
            if (year < 1700 || year > 2500) { return false; }
            if (month < 1 || month > 12) { return false; }
            return true;
          };

          var isDate8 = function (sDate) {
            if (!/^[0-9]{8}$/.test(sDate)) {
              return false;
            }
            var year, month, day;
            year = sDate.substring(0, 4);
            month = sDate.substring(4, 6);
            day = sDate.substring(6, 8);
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year < 1700 || year > 2500) { return false; }
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) { return false; }
            if (day < 1 || day > iaMonthDays[month - 1]) { return false; }
            return true;
          };

          ngModelController.$parsers.push(function (viewValue) {

            if (isIdCardNo(viewValue)) {
              ngModelController.$setValidity('idcard', true);
            } else {
              ngModelController.$setValidity('idcard', false);
            }
            return viewValue;
          });

        }
      }
    })
    .directive('ccpInputClose', function () {
      return {
        restrict: "AE",
        replace: false,
        transclude: true,
        template: function (element, attr) {

          /*element.after('<a class="button ion-close-round icon ccp_input_close" ng-show="'+attr.ngModel+'" ng-click="alert();"></a>');*/
          element.after('<i class="ion-close-round icon ccp_input_close" ng-show="' + attr.ngModel + ' && ' + !attr.ngDisabled + '" ng-click="' + attr.ngModel + '=\'\';"></i>');

        }
        /*,
         link: function(scope, element, attrs, ctrl) {
         scope.clearInput=function(){
         console.log('xx嘻嘻嘻x');
         };
         }*/
      }
    })
    .directive('sendPhoneCode', [
      'validate',
      '$interval',
      '$timeout',
      function (validate, $interval, $timeout) {
        return {
          restrict: "AE",
          replace: false,
          transclude: true,
          template: function (element, attr) {

            element.after('<a class="button button-positive sendPhoneCode {{send.css}}" ng-click="sendPhoneCode()"><span>{{send.text}}</span></a>');

          },
          link: function (scope, element, attrs, ctrl) {
            var count = 120;
            scope.send = {
              css: '',
              text: '发送验证码'
            };
            scope.sendPhoneCode = function () {
              console.log('sendPhoneCode');
              scope.send.css = 'disabled';
              scope.send.text = '正在发送';
//            $timeout(function () {
//              if (scope.send.text == '正在发送') {
//                scope.send.css = '';
//                scope.send.text = '发送验证码';
//              }
//            }, 3000);
              var cb = function () {

                scope.send.css = 'disabled';
                var i = count;
                var timer = $interval(function () {
                  i--;
                  scope.send.text = i + '秒';
                }, 1000, count).then(function () {
                  $interval.cancel(timer);
                  scope.send.css = '';
                  scope.send.text = '发送验证码';
                });

              };
			  cb();
              return scope.sendValidate(cb);
            };
          }
        }
      }
    ])
    .factory('userInfo', [
      function (validate,systemConstant) {
        var storagePrefix='spp_';
        return {
          setPayUserId:function(userId){
            localStorage.setItem(storagePrefix+'payUserId', userId);
          },
          getPayUserId:function(){
            return localStorage.getItem(storagePrefix+'payUserId') || '';
          },
          setSureFirstGoinShopCenter:function(phone,time){
            localStorage.setItem(storagePrefix+phone+'_sureFirstInShopCenter', time);
          },
          getSureFirstGoinShopCenter:function(phone){
            return localStorage.getItem(storagePrefix+phone+'_sureFirstInShopCenter') || '';
          }/*,
          setUserAuthorizecode:function(authorizecode){
            localStorage.setItem(storagePrefix+'_authorizecode', authorizecode);
          },
          getUserAuthorizecode:function(authorizecode){
            return localStorage.getItem(storagePrefix+'_authorizecode') || '';
          },*/
        }
      }
    ])
    .factory('payMethod', [
      'dialog',
      'browser',
      'systemConstant',
      function (dialog,browser,systemConstant) {

        var aliPay = function (option) {

            },
            weixinOnBridgeReady = function (data, option) {
              var defaults = {
                successFun: '',
                errorFun: ''
              };
              var set = angular.extend(defaults, option);

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
                      if (angular.isFunction(set.successFun)) {
                        set.successFun();
                      }
                      //dialog.tipsSuccess('付款成功');
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                      dialog.tipsError('付款取消');
                    } else {
                      if (angular.isFunction(set.errorFun)) {
                        set.errorFun();
                      }
                      //dialog.tipsError('付款失败');
                    }
                  }
              );
            };

        return {
          aliPay: function (option) {
            return aliPay(option);
          },
          weixinPay: function (data, option) {
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', weixinOnBridgeReady(data, option), false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', weixinOnBridgeReady(data, option));
                document.attachEvent('onWeixinJSBridgeReady', weixinOnBridgeReady(data, option));
              }
            } else {
              weixinOnBridgeReady(data,option);
            }
          }
        };
      }
    ])

    .factory('common', [
      '$http',
      '$ionicPopup',
      '$ionicLoading',
      '$timeout',
      '$state',
      'systemConstant',
      'dialog',
      'userInfo',
      function ($http, $ionicPopup, $ionicLoading, $timeout, $state, systemConstant, dialog, userInfo) {

        var baseHttp = function (option, successFun, errorFun, finalFun,isFirst) {
          option = option || {};
          if (option.url && option.url.indexOf('http://') < 0) {
            option.url = 'http://' + systemConstant.apiDomain + option.url;
          }
          option.params = option.params || {};

          //option.params[userInfo.getUserKey.memberId] = userInfo.getUserId();
          //option.params[userInfo.getUserKey.sellerId] = userInfo.getSellerId();
          //option.params['version'] = systemConstant.version;
          //option.params['X-Requested-Data'] = getdata();
          //option.params['X-Requested-By'] = systemConstant.domain;

          return $http(option).then(
              function (data) {
                if (successFun && angular.isFunction(successFun)) {
                  successFun(data.data);
                }
              },
              function (data) {
                if (errorFun && angular.isFunction(errorFun)) {
                  errorFun(data.data);
                }
              }).finally(function () {
            if (finalFun && angular.isFunction(finalFun)) {
              finalFun();
            }
          });
        };

        var http = function (okFun, errFun, option, isShowLoading) {

          if (!isShowLoading) {
            $ionicLoading.show();
          }

          return baseHttp(option,
              function (res) {
                if (res && angular.isString(res)) {
                  res = angular.fromJson(res);
                }
                if (res && res.flag) {
                  if (okFun && angular.isFunction(okFun)) {
                    okFun(res.data, res.msg, res.errCode,res);
                  }
                }
                else {
                  if (errFun && angular.isFunction(errFun)) {
                    errFun(res.data, res.msg, res.errCode,res);
                  }
                  else {
                    dialog.tips(res.msg);
                  }
                }
              },
              function () {
                dialog.tips('网络异常，请重试');
              },
              function () {
                if (!isShowLoading) {
                  $ionicLoading.hide()
                }
              });

        };
        // type:1 原图,2:320x320，3：100x100
        var getImgSrc = function (url, type,defaultImg) {

          var isDefault = false;
          if (url &&
              (url.indexOf('wx.qlogo.cn') > -1 ||
              url.indexOf('.360buyimg.com') > -1 ||
              url.indexOf('img/wu80x80.png')>-1)
          ) {
            return url;
          }
          if (!url) {
            isDefault = true;
            /*url= '/default/default_user.png';*/
            switch (defaultImg){
              case 1:
                url = 'http://' + systemConstant.imgDomain + '/default/defult_100.jpg';
                break;
              default:
                url = 'http://' + systemConstant.imgDomain + '/default/default_user.png';
                break;
            }
          }

          var dominUrl = 'http://' + systemConstant.imgDomain,
              getImg = function (url, str) {
                var typeImg = url.substr(url.lastIndexOf('.')),
                    imgName = url.substr(0, url.lastIndexOf('.'));

                if (imgName.indexOf('_') > -1) {
                  imgName = imgName.substring(0, imgName.indexOf('_'));
                }

                if (!isDefault) {
                  imgName = dominUrl + imgName + '_' + str + typeImg;
                }
                else {
                  imgName = imgName + '_' + str + typeImg;
                }
                return imgName;
              };

          if (url.indexOf('http') > -1) {
            dominUrl = '';
            //url = url.replace('3523', '8081')
          }

          switch (type) {
            case 2:
              url = getImg(url, '320x320');
              break;
            case 3:
              url = getImg(url, '100x100');
              break;
            case 4:
              url=getImg(url,'640x640');
              break;
            case 1:
            default:
              url = dominUrl + url;
              break;

          }
          return url;
        };

        var getScore = function (score) {
          var num = 5,
              html = '',
              scoreHtml = '<i class="iconfont spp-xinghuang font_color_fd9f01" ></i>',
              unScoreHtml = '<i class="iconfont spp-xinghui"></i>';
          /*'<i class="ion-ios-star-half"></i>'*/
          if (!score) {
            score = 0;
          }
          for (var i = 0; i < score; i++) {
            html += scoreHtml;
          }
          for (var i = 0; i < (num - score) ; i++) {
            html += unScoreHtml;
          }
          return html;
        };

        return {
          getUrlParam:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURI(r[2]); return null;
          },
          http: function (option, successFun, errorFun, finalFun) {
            return baseHttp(option, successFun, errorFun, finalFun);
          },
          httpPost: function (url, data, okFun, errFun, option, isShowLoading) {
            option = option || { 'url': url, 'params': data,'data':data, 'method': 'POST' };
            return http(okFun, errFun, option, isShowLoading);
          },
          httpGet: function (url, data, okFun, errFun, option, isShowLoading) {
            option = option || { 'url': url, 'params': data, 'method': 'GET' };
            option.params['timestamp'] = new Date().getTime();
            return http(okFun, errFun, option, isShowLoading);
          },
          getImgSrc: function (url, type,defaultImg) {
            return getImgSrc(url, type,defaultImg);
          },
          getScore: function (score) {
            return getScore(score);
          },
          getShowBankNo: function (bankNo) {
            if (!bankNo) { return ''; }
            var len = bankNo.length,
                count = parseInt(len / 4),
                yu = len % 4,
                temp = '';

            for (var i = 0; i < count; i++) {
              temp += bankNo.substr(i * 4, 4);
              if ((count - 1) != i || yu != 0) {
                temp += ' ';
              }
            }

            if (temp) {
              temp += bankNo.substr(len - yu);
              return temp;
            }
            else {
              return bankNo;
            }
          },
          getShowPhone: function (phone) {
            if (!phone || phone.length != 11) {
              return phone;
            }
            var res = '';
            res = phone.substr(0, 3) + ' ';
            res += phone.substr(3, 4) + ' ';
            res += phone.substr(7, 4);
            return res;
          },
          pageCommon: function () {
            return {
              getday:function(datetime){
                if(!datetime){return;}
                var arr=datetime.split(' ');
                return arr[0];
              },
              getTime:function(datetime){
                if(!datetime){return;}
                var arr=datetime.split(' ');
                return arr[1];
              },
              getDateStr:function(addDayCount,date,type) {
                if(date){
                  date=date.substring(0,date.indexOf(' '));
                }
                var dd =new Date(date)|| new Date();
                //alert();
                dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期

                var y = dd.getFullYear();
                var m = parseInt(dd.getMonth())+1;//获取当前月份的日期
                var d = dd.getDate();

                switch (type){
                  case 1:
                    return m+"-"+d;
                    break;
                  default:
                    return y+"-"+m+"-"+d;
                    break;
                }
              },
              getUserPhone: function (phone) {
                if (phone) {

                  return phone.substring(0, 3) + '****' + phone.substring(7, 11);
                }
                else {
                  return '';
                }
              },
              getAmount: function (amount) {
                if (amount >= 0) {
                  return '+&nbsp;' + amount.toFixed(2);
                }
                else {
                  return '-&nbsp;' + (amount * -1).toFixed(2);
                }
              }
            };
          },
          getGUID:function(){
            var guid = "";
            for (var i = 1; i <= 32; i++){
              var n = Math.floor(Math.random()*16.0).toString(16);
              guid +=   n;
              if((i==8)||(i==12)||(i==16)||(i==20))
                guid += "-";
            }
            return guid;
          },
          bankList: [
            { 'id': 'CMB', 'bankName': '招商银行', 'icon': 'spp-zhaoshang', 'bgColor': 'bank_ec6671' },
            { 'id': 'CCB', 'bankName': '中国建设银行', 'icon': 'spp-jiansheyinxing', 'bgColor': '' },
            { 'id': 'ABC', 'bankName': '中国农业银行', 'icon': 'spp-nongyeyinxing', 'bgColor': '' },
            { 'id': 'BOC', 'bankName': '中国银行', 'icon': 'line-height-33 spp-zhongguoyinxing', 'bgColor': '' },
            { 'id': 'ICBC', 'bankName': '中国工商银行', 'icon': 'spp-gongshangyinxing', 'bgColor': 'bank_ec6671' },
            { 'id': 'SPDB', 'bankName': '上海浦东发展银行', 'icon': ' spp-guangdongpufayinxing', 'bgColor': '' },
            { 'id': 'BCOM', 'bankName': '交通银行', 'icon': 'margin-left-5 font30 spp-jiaotongyinxing', 'bgColor': '' },
            { 'id': 'CMBC', 'bankName': '中国民生银行', 'icon': 'margin-left-5 font30 spp-minshengyinxing', 'bgColor': '' },
            { 'id': 'SDB', 'bankName': '深圳发展银行', 'icon': 'margin-left-5 font30 spp-sdb', 'bgColor': '' },
            { 'id': 'GDB', 'bankName': '广东发展银行', 'icon': 'margin-left-5 font30 spp-guangdongfazhanyinxing', 'bgColor': '' },
            { 'id': 'CITIC', 'bankName': '中信银行', 'icon': 'margin-left-5 font30 spp-zhongxinyinxing', 'bgColor': 'bank_c75056' },
            { 'id': 'HXB', 'bankName': '华夏银行', 'icon': 'margin-left-5 font30 spp-huaxiayinxing', 'bgColor': '' },
            { 'id': 'CIB', 'bankName': '兴业银行', 'icon': 'spp-xingyeyinxing', 'bgColor': '' },
            { 'id': 'init-GZNCXYS', 'bankName': '广州市农村信用合作社', 'icon': 'spp-guangzhoushinongcunxinyonghezuoshe', 'bgColor': '' },
            { 'id': 'init-GZSY', 'bankName': '广州市商业银行', 'icon': 'spp-guangzhoushishangyeyinxing', 'bgColor': '' },
            { 'id': 'SRCB', 'bankName': '上海农村商业银行', 'icon': 'spp-shanghainongshangyinxingyy-copy', 'bgColor': '' },
            { 'id': 'PSBC', 'bankName': '中国邮政储蓄', 'icon': 'font30 spp-zhongguoyouzhengchuxu', 'bgColor': 'bank_006a45' },
            { 'id': 'CEB', 'bankName': '中国光大银行', 'icon': 'margin-left-5 font30 spp-zhongguoguangdayinxing', 'bgColor': '' },
            { 'id': 'SHB', 'bankName': '上海银行', 'icon': 'spp-iconcopy-copy', 'bgColor': '' },
            { 'id': 'BOB', 'bankName': '北京银行', 'icon': 'margin-left-5 font30 spp-beijingyinxing', 'bgColor': '' },
            { 'id': 'CBHB', 'bankName': '渤海银行', 'icon': 'font30 spp-bohaiyinxing', 'bgColor': 'bank_ec6671' },
            { 'id': 'init-BJNCSY', 'bankName': '北京农村商业银行', 'icon': 'font30 spp-beijingnongcunshangyeyinxing', 'bgColor': '' }
          ]
        };
      }
    ])

    .factory('validate', [
      'dialog',
      function (dialog) {

        var focusInput = function (element) {
          var focusOn = element[0].querySelector('[autofocus]');
          if (focusOn) {
            focusOn.focus();
          }
        };

        return {
          form: function (form, option) {

            var message = {
                  'required': '请输入',
                  'phone': '手机号错误',
                  'phonecode': '手机验证码错误',
                  'userpwd': '密码由数字或字母组成（6-20位）',
                  'amount': '请输入正确的金额',
                  'email': '邮箱错误',
                  'idcard': '身份证错误',
                  'validatecode':'验证码错误'
                },
                validateArr = ['required', 'phone', 'phonecode', 'userpwd', 'amount', 'email', 'idcard','validatecode'];

            if (!form.$valid) {

              if (form.$error.length == 0) {
                return false;
              }

              var name = '', errorMes = '', attrName = '', errorArr;
              for (var i = 0; i < validateArr.length; i++) {
                attrName = validateArr[i];
                errorArr = form.$error[attrName];
                if (attrName && errorArr && errorArr.length > 0) {
                  break;
                }
              }
              /*for(var  o in form.$error){
               attrName=o;
               break;
               }*/
              name = form.$error[attrName][0].$name;

              switch (attrName) {
                case 'required':
                  errorMes = message[attrName] + option['message'][name];
                  break;
                default:
                  errorMes = message[attrName];
                  break;
              }
              dialog.tips(errorMes);
            }

            return form.$valid;
          },
          element: function (ele, msg) {

            var message = {
                  'required': '请输入',
                  'phone': '手机号错误',
                  'phonecode': '手机验证码错误',
                  'userpwd': '密码由数字或字母组成（6-20位）',
                  'amount': '请输入正确的金额',
                  'email': '邮箱错误',
                  'idcard': '身份证错误',
                  'validatecode':'验证码错误'
                },
                validateArr = ['required', 'phone', 'phonecode', 'userpwd', 'amount', 'email', 'idcard','validatecode'];

            if (!ele.$valid) {

              var name = '', errorMes = '', attrName = '', errorArr;
              for (var i = 0; i < validateArr.length; i++) {
                attrName = validateArr[i];
                errorArr = ele.$error[attrName];
                if (attrName && errorArr) {
                  break;
                }
              }

              switch (attrName) {
                case 'required':
                  errorMes = message[attrName] + msg;
                  break;
                default:
                  errorMes = message[attrName];
                  break;
              }
              dialog.tips(errorMes);

            }

            return ele.$valid;
          },
          checkAmount: function (amount, showTips) {
            var patrn = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
            var b = patrn.test(amount);
            if (!b && showTips) {
              dialog.tips('请输入正确的金额');
            }
            return b;
          },
          checkPhone: function (phone, showTips) {
            var patrn = /(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\d{8}$/;
            var b = patrn.test(phone);
            if (!b && showTips) {
              dialog.tips('请输入正确的手机号');
            }
            return b;
          },
          checkPwd: function (pwd, showTips) {
            //var patrn = /^[A-Za-z0-9]{6,20}/;
            //var b = patrn.test(pwd);
            //if (!b && showTips) {
            //  dialog.tips('密码错误');
            //}
            //return b;
            var b=pwd && pwd.length==6;
            if(!b && showTips){
              dialog.tipsError('安全密码错误');
            }
            return b;
          }
        }
      }
    ])

    .factory('dialog', [
      '$timeout',
      '$ionicPopup',
      function ($timeout, $ionicPopup) {
        var tips=function(data,callBack){
          var tipsPopup = $ionicPopup.tips(data);

          $timeout(function () {
            tipsPopup.close();
            if (angular.isFunction(callBack)) {
              callBack();
            }
          }, 2000);
        };
        return {
          tipsError:function(msg,cb){
            tips({
              template: msg,
              popupCss:'tipsDialogError'
            },cb);
          },
          tipsSuccess:function(msg,cb){
            tips({
              template: msg,
              popupCss:'tipsDialogSuccess'
            },cb);
          },
          tips: function (msg, cb) {
            tips({
              template: msg,
              popupCss:'tipsDialogError'
            },cb);
          },
          alert: function (title, okFun, option) {
            var defaults = { 'title': title, 'okText': '确定', 'okFun': okFun };
            defaults = angular.extend(defaults, option);
            $ionicPopup.alert(defaults);
          },
          confirm: function (title, okFun, cancelFun, option) {
            var defaults = {
              title: '温馨提示', // String. 弹窗的标题。
              subTitle: '', // String (可选)。弹窗的副标题。
              template: title, // String (可选)。放在弹窗 body 内的 html 模板。
              templateUrl: '', // String (可选)。放在弹窗 body 内的 html 模板的 URL。
              cancelText: '取消',// String (默认: 'Cancel')。取消按钮的文字。
              cancelType: '',// String (默认: 'button-default')。取消按钮的类型。
              okText: '确定',// String (默认: 'OK')。 OK 按钮的文字。
              okType: '',// String (默认: 'button-positive')。
              popupCss:'ssp-confirm'
            };

            defaults = angular.extend(defaults, option);

            $ionicPopup.confirm(defaults).then(function (res) {
              if (res) {
                if (angular.isFunction(okFun)) {
                  okFun();
                }
              }
              else {
                if (angular.isFunction(cancelFun)) {
                  cancelFun();
                }
              }
            });

          },
          passWord: function (act, actDesc, sub, okFun, okText) {
            /*var patrn=/^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;

             if(!patrn.test(amount) ){
             this.tips('请输入正确的金额');
             return false;
             }*/

            var prompt = $ionicPopup.prompt({
              popupCss: 'pwd',
              title: '请输入安全密码',
              template: act,
              titleDesc: sub,
              actDesc: actDesc,
              inputType: 'password',
              inputPlaceholder: '请输入安全密码',
              cancelText: '取消',// String (默认: 'Cancel')。取消按钮的文字。
              cancelType: '',// String (默认: 'button-default')。取消按钮的类型。
              okText: okText || '支付',// String (默认: 'OK')。 OK 按钮的文字。
              okType: '',// String (默认: 'button-positive')。
              okTap: function (res) {
                //prompt.close();


                okFun(res, prompt);

                return 'open';
              }
            })
          }
        }
      }
    ])

    .factory('productAttr', [
      '$ionicPopover',
      'common',
      function ($ionicPopover, common) {
        var ProductAttr = function (option) {
          var defaults = {
            event: {
              hideClick: null
            }
          };

          this.set = angular.extend(defaults, option);
        };

        ProductAttr.prototype = {
          set: {},
          fun: function () {
            var that = this, set = this.set;
            return {
              setDialog: function (popover) {
                that.dialog = popover;
              },
              show: function ($event) {
                that.dialog.show($event);
              },
              hide: function ($event) {
                if (angular.isFunction(set.event.hideClick)) {
                  set.event.hideClick.call(that);
                }
                if (angular.isFunction(that.dialog.hide)) {
                  that.dialog.hide($event);
                }
              }
            }
          },
          dialog: {},
          data: []
        };

        return {
          ProductAttr: function (option, scope) {
            var good = new ProductAttr(option);
            $ionicPopover.fromTemplateUrl("templates/common/productAttrPopover.html?v=1", {
              scope: scope
            }).then(function (popover) {
              good.fun().setDialog(popover);
            });
            return good;
          }
        };
      }
    ])

    .factory('popover',['$ionicPopover',
      '$ionicScrollDelegate',
      '$timeout',
      'common',
      'systemConstant',
      function ($ionicPopover,$ionicScrollDelegate,$timeout, common,systemConstant) {

        var sliderData={},
            sliderDialog={},
            Slider=function(option){
              var defaults = {
                    swiperName:'',
                    dataUrl:'',
                    data:null,
                    templateUrl:'',
                    scope:null,
                    level:3,
                    selectVal:'',
                    event: {
                      cancelFun:null,
                      okFun:null
                    }
                  },
                  that=this,
                  set = this.set = angular.extend(defaults, option);


              this.selectData={};
              this.selectOKData={};
              this.data={};
              this.swiper={};


              if(sliderDialog[set.swiperName]) {
                sliderDialog[set.swiperName].remove();
              }

              $ionicPopover.fromTemplateUrl(
                  set.templateUrl,
                  {
                    scope: set.scope
                  }).then(function (popover) {
                sliderDialog[set.swiperName]=popover;
                that.dialog = popover;
              });

              if(set.data){
                sliderData[set.swiperName]=set.data;
              }
              if (sliderData[set.swiperName]){
                that.fun().initData(sliderData[set.swiperName]);
              }
              else{
                common.httpGet(set.dataUrl,{}, function (data) {
                  sliderData[set.swiperName]=data;
                  that.fun().initData(data);
                });
              }
            };

        Slider.prototype={
          tool:{
            toArray:function(child){
              if(!child){
                return;
              }
              var result=[];
              angular.forEach(child,function(item,index){
                if(item.data) {
                  item.data.Id = index;
                  result.push(item.data);
                }
                else{
                  console.log(item);
                }
              });
              return result;
            },
            getIndex:function(id,arrayData){
              var index=-1;
              if(!id || !arrayData || arrayData.length==0){
                return index;
              }
              for(var i=0;i<arrayData.length;i++){
                if(index>-1){
                  break;
                }
                if(arrayData[i].Id==id){
                  index=i;
                  break;
                }
              }
              return index;
            }
          },
          fun:function(){
            var that=this,set=this.set,tool=that.tool;
            return {
              initData:function(data){
                var one=[],two=[],three=[],
                    child={},third={},
                    secondIndex= 0,thirdIndex=0;

                one=that.tool.toArray(data);
                if(one && one.length>0) {
                  two = that.tool.toArray(data[one[0].Id].child);
                }
                if(two && two.length>0){
                  three = that.tool.toArray(data[one[0].Id].child[two[0].Id].child);
                }

                that.data={
                  "1":one,
                  "2":two,
                  "3":three
                };
                that.selectData={
                  "1":one[0],
                  "2":two && two[0],
                  "3":three && three[0]
                };
              },
              showDialog: function ($event) {
                that.dialog.show($event);

                if(!that.swiper[1]) {
                  $timeout(function () {
                    for (var i = 1; i <= set.level; i++) {
                      (function (arg) {

                        that.swiper[i] = new Swiper('.'+set.swiperName+'swiper' + i, {
                          slidesPerView: 3,
                          //initialSlide :2,
                          direction: 'vertical',
                          observer: true,
                          mousewheelControl: true,
                          spaceBetween: 30,
                          onSlideChangeEnd: function (swiper) {
                            that.fun().changeData(swiper.activeIndex, arg);
                          }
                        });

                      })(i);
                    }
                    var selectVal=set.selectVal;

                    if(selectVal) {
                      var selectArr=selectVal.split(','),
                          result={
                            '1':{'Id':parseInt(selectArr[0])},
                            '2':{'Id':parseInt(selectArr[1])},
                            '3':{'Id':parseInt(selectArr[2])}
                          };

                      that.selectOKData=angular.extend({}, result);
                      that.fun().selectItem(result);

                      $timeout(function(){
                        var data=that.selectOKData;
                        if(data['1'] && data['1'].Id && !data['1'].Name){
                          data['1']=that.data['1'][that.tool.getIndex(data['1'].Id,that.data['1'])];
                        }
                        if(data['2'] && data['2'].Id && !data['2'].Name){
                          data['2']=that.data['2'][that.tool.getIndex(data['2'].Id,that.data['2'])];
                        }
                        if(data['3'] && data['3'].Id && !data['3'].Name){
                          data['3']=that.data['3'][that.tool.getIndex(data['3'].Id,that.data['3'])];
                        }
                        that.selectData=angular.extend({},data);
                      });

                    }

                  });
                }

              },
              hideDialog: function ($event) {
                that.dialog.hide($event);
              },
              setDialog: function (popover) {
                that.dialog = popover;
              },
              setData:function(type){
                /*if(!(type<set.level && type>0)){
                 return;
                 }*/
                if (type>=set.level){
                  return;
                }

                var oneId=that.selectData["1"].Id,
                    index=(parseInt(type)+1),
                    data=sliderData[set.swiperName][oneId],
                    changedata=[];

                switch (type){
                  case 1:
                    if(data && data.child){
                      changedata=tool.toArray(data.child);
                    }
                    else{
                      changedata=[];
                    }
                    break;
                  case 2:
                    if(that.selectData[2] && data.child) {
                      changedata = tool.toArray(data.child[that.selectData[2].Id].child);
                    }
                    else{
                      changedata=[];
                    }
                    break;
                }

                that.data[index]=changedata;
                that.selectData[index]=changedata[0];

                $timeout(function(){
                  that.swiper[index].slideTo(0, 100,false);
                  $timeout(function(){
                    that.fun().changeData(0,index);
                  });
                });
              },
              changeData:function(index,type){
                if(!(type<(set.level+1) && type>0)){
                  return;
                }

                $timeout(function(){
                  that.selectData[type] = that.data[type][index];
                  that.fun().setData(type);
                });
              },
              selectItem:function(selectVal){
                if(!selectVal || !selectVal['1'] || !selectVal['1'].Id){
                  return;
                }

                var okSelect=that.selectData,
                    nowSelectStr=','+selectVal['1'].Id+
                        ','+(selectVal['2'] && selectVal['2'].Id)+
                        ','+(selectVal['3'] && selectVal['3'].Id)+',',
                    okSelectStr=','+(okSelect && okSelect['1'].Id)+
                        ','+(okSelect && okSelect['2'] && okSelect['2'].Id)+
                        ','+(okSelect && okSelect['3'] && okSelect['3'].Id)+',';

                if(nowSelectStr==okSelectStr){
                  return;
                }
                else{
                  that.selectData=angular.extend(okSelect,selectVal);
                }

                var data=sliderData[set.swiperName][selectVal["1"].Id].child,
                    oneData=that.data["1"],
                    twoData=that.tool.toArray(data),
                    threeData=(selectVal['2'] && selectVal['2'].Id) ? that.tool.toArray(data[selectVal['2'].Id].child):[],
                    oneIndex= (that.tool.getIndex(selectVal['1'].Id,oneData)),
                    twoIndex=selectVal['2']? (that.tool.getIndex(selectVal['2'].Id,twoData)):0,
                    threeIndex=selectVal['3']?(that.tool.getIndex(selectVal['3'].Id,threeData)):0;

                $timeout(function(){
                  that.data['2']=twoData;
                  that.data['3']=threeData;
                  $timeout(function(){
                    that.swiper[1].slideTo(oneIndex, 100,false);
                    if(that.set.level>1) {
                      that.swiper[2].slideTo(twoIndex, 100, false);
                    }
                    if(that.set.level>2) {
                      that.swiper[3].slideTo(threeIndex, 100, false);
                    }
                  });
                });
              },
              getText:function(){
                var data=that.selectOKData,
                    result='',
                    index;

                if(!data){
                  return result;
                }

                for(var i=1;i<=set.level;i++){
                  result+=((data[i] && data[i].Name)?(data[i].Name+','):'')
                }
                result=result.substr(0,result.length-1)
                return result;
              },
              getlaseId:function(){
                var data=that.selectOKData,
                    result='';

                if(!data){
                  return result;
                }

                for (var i=set.level;i>0;i--){
                  if(result){
                    break;
                  }
                  if (data[i] && data[i].Id && data[i].IsEnd){
                    result=data[i].Id;
                  }
                }
                return result;
              },
              isSelectItem:function(){
                return (that.selectOKData && that.selectOKData[1] && that.selectOKData[1].Id);
              },
              cancel:function($event){
                if (angular.isFunction(set.event.cancelFun)){
                  set.event.cancelFun();
                }
                this.selectItem(that.selectOKData);
                this.hideDialog($event);
              },
              ok:function($event){
                that.selectOKData=angular.extend({}, that.selectData);
                if (angular.isFunction(set.event.okFun)){
                  set.event.okFun();
                }
                this.hideDialog($event);
              }
            };
          }
        };

        return {
          date: function (scope,maxdate,option) {

            if(!maxdate) {
              maxdate = '2017-02-28';
            }

            var getData=function(maxdate){
              if(!maxdate){
                return;
              }

              var maxdate=maxdate,
                  maxArr=maxdate.split('-');

              if (!(maxArr && maxArr.length==3)){
                return;
              }

              var mindate='2016-10-01',
                  minArr=mindate.split('-'),
                  minYear=parseInt(minArr[0]),
                  maxYear=parseInt(maxArr[0]),
                  minMonth=parseInt(minArr[1]),
                  maxMonth=parseInt(maxArr[1]),
                  minDay=parseInt(minArr[2]),
                  maxDay=parseInt(maxArr[2]),
                  minTempMonth= 0,
                  maxTempMonth= 0,
                  tempMonth= 0,
                  minTempDay= 0,
                  maxTempDay= 0,
                  tempDay= 0,
                  nowYear= 0,
                  nowMonth= 0,
                  monthChild={},
                  yearChild={},
                  data={},
                  getdaycount=function(year,month){
                    var date=new Date();
                    date.setFullYear(year);
                    date.setMonth(month);
                    date.setDate(0)
                    return date.getDate();
                  },
                  getday=function(i){
                    if(i<10){
                      return '0'+i;
                    }
                    else if(i>9){
                      return i;
                    }
                    else{
                      return 0;
                    }
                  };

              for (var i=minYear;i<=maxYear;i++){
                nowYear=i;
                minTempMonth=1;
                maxTempMonth=12;
                yearChild={};

                if(nowYear==minYear){
                  minTempMonth=minMonth;
                }
                if(nowYear==maxYear){
                  maxTempMonth=maxMonth;
                }
                for (var j = minTempMonth; j <= maxTempMonth; j++) {
                  nowMonth=j;
                  minTempDay=1;
                  monthChild={};
                  maxTempDay=getdaycount(nowYear,nowMonth);
                  if (nowYear==minYear && nowMonth==minMonth){
                    minTempDay=minDay;
                  }
                  if(nowYear==maxYear && nowMonth==maxMonth){
                    maxTempDay=maxDay;
                  }
                  for (var k=minTempDay;k<=maxTempDay;k++){
                    tempDay=getday(k);
                    monthChild[k]={
                      'data':{
                        'Name':tempDay,
                        'IsEnd':true
                      }
                    };
                  }

                  tempMonth=getday(j);
                  yearChild[j] = {
                    'data':{
                      'Name': tempMonth
                    },
                    'child':monthChild
                  };
                }
                data[nowYear]={
                  'data':{
                    'Name':nowYear
                  },
                  'child':yearChild
                };
              }

              return data;
            };

            var defaults={
              swiperName:'date',
              data:getData(maxdate),
              templateUrl:'html/templates/datepopover.html?v=1151',
              scope:scope
            };
            option=angular.extend(defaults,option);

            var popoverSlider = new Slider(option);
            popoverSlider.changeDataSource=function(maxdate){
              var data=getData(maxdate);
              sliderData[option.swiperName]=data;
              popoverSlider.fun().initData(data);
            };
            return popoverSlider;
          },
          city: function (scope,option) {
            var defaults={
              swiperName:'city',
              dataUrl:systemConstant.dataSource.city,
              templateUrl:'html/templates/citypopover.html?v=1151',
              scope:scope
            };
            option=angular.extend(defaults,option);
            var popoverSlider = new Slider(option);
            return popoverSlider;
          },
          industries:function(scope,option){
            var defaults={
              swiperName:'industries',
              dataUrl:systemConstant.dataSource.industries,
              templateUrl:'html/templates/industriespopover.html?v=1151',
              scope:scope
            }
            option=angular.extend(defaults,option);
            var popoverSlider = new Slider(option);
            return popoverSlider;
          },
          maxDailySales:function(scope,option){
            var defaults={
              swiperName:'maxDailySales',
              level:1,
              dataUrl:systemConstant.dataSource.maxDailySales,
              templateUrl:'html/templates/maxDailySalespopover.html?v=1151',
              scope:scope
            }
            option=angular.extend(defaults,option);
            var popoverSlider = new Slider(option);
            return popoverSlider;
          },
          confirm:function(scope,option){

            $ionicPopover.fromTemplateUrl(
                'html/templates/confirmpopover.html?v=1151',
                {
                  scope: scope
                }).then(function (popover) {

            });

          },
          passWord:function(option,scope){

          }
        };
      }])

    .factory('page', [
      '$ionicLoading',
      '$timeout',
      '$ionicScrollDelegate',
      'userInfo',
      'common',
      function ($ionicLoading, $timeout, $ionicScrollDelegate, userInfo, common) {

        var Page=function(option){
          var defaults={
            url:'',
            initData:'',
            dataFiled:'',
            parame:{},
            initNoResultShow: true,
            upNoResultShow: true,
            downNoResultShow: true,
            page:{
              pageIndex:0,
              pageSize:30
            }
          };
          this.set = angular.extend(defaults, option);
        };

        Page.prototype={
          getpageData:function(isFirst,isReload){
            var set=this.set,parame={};

            set.page.pageIndex++;

            parame=angular.extend(set.parame,set.page);

            if(isFirst) {
              $ionicLoading.show();
            }

            return common.httpGet(
                set.url,
                parame,
                function(data){

                  var pageData=data;
                  if(set.dataFiled){
                    pageData=data[set.dataFiled];
                  }
                  set.initNoResultShow = (set.page.pageIndex == 1) && (!pageData || pageData.length==0);
                  set.upNoResultShow = (!pageData || pageData.length<set.page.pageSize);

                  //console.log(set.page);
                  //console.log(data);
                  if (angular.isFunction(set.initData)) {
                    if (data) {
                      set.initData(data, isReload);
                    }
                  }
                },
                null,
                null,
                true
            ).
            then(
                function () {
                  if(isFirst) {
                    $ionicLoading.hide();
                  }
                  else{
                    $timeout(function () {
                      set.scope.$broadcast('scroll.infiniteScrollComplete');
                    }, 1000);
                  }
                });

          },
          up:function(){
            this.getpageData(false,false);
          },
          pageInit:function(){
            this.getpageData(true,false);
          },
          reload:function(){
            this.set.page.pageIndex = 0;
            this.getpageData(false,true);
            $ionicScrollDelegate.scrollTop(true);
          },
          initNoResultShow: function () {
            return this.set.initNoResultShow;
          },
          upNoResultShow: function () {
            return this.set.upNoResultShow;
          }
        };

        return{
          page:function(option){
            return new  Page(option);
          }
        };

      }
    ])

    .factory('uploadImg', [
      '$timeout',
      '$ionicLoading',
      'Upload',
      'dialog',
      'systemConstant',
      'weixin',
      'browser',
      function ($timeout, $ionicLoading, Upload, dialog,systemConstant,weixin,browser) {
        var UploadImg = function (option) {
          var defaults = {
            single: false,
            filesCount: 4,
            maxSize:50,
            filesPattern: '.jpg,.jpge,.png,.gif,.jpeg',
            data: {}
          };
          this.set = angular.extend(defaults, option);
          this.files = [];
          this.imgchange=function(){};
        };
        UploadImg.prototype = {
          validate: function (files) {
            var set = this.set,
                flag = true,
                flagSize=true,
                count = 0,
                hasFiles = this.files,
                errorFileName='',
                getSuffix = function (fileName) {
                  var index = fileName.lastIndexOf('.'),
                      suffix = fileName.substr(index);
                  return suffix;
                };

            if (!files || !files.length) {
              return false;
            }

            angular.forEach(hasFiles, function () {
              count++;
            });

            if (!set.single && ((count + files.length) > set.filesCount)) {
              dialog.tips('最多只能上传' + set.filesCount + '张图片');
              return false;
            }

            angular.forEach(files, function (item) {
              if (flag) {
                if (item.type &&
                    set.filesPattern.toUpperCase().indexOf(getSuffix(item.name).toUpperCase()) == -1) {
                  errorFileName+=item.name+';<br/>';
                  flag = false;
                }
              }
              if(flagSize){
                if(item.size>1024*1024*set.maxSize){
                  flagSize=false;
                }
              }
            });

            if (!flag) {
              dialog.tips('当前格式'+errorFileName+',只能上传' + set.filesPattern + '格式的图片');
              return false;
            }
            if (!flagSize){
              dialog.tips('不可上传大于'+set.maxSize+'M的图片');
              return false;
            }
            return true;
          },
          removeFile: function () {
            this.files = {};
          },
          compress:function(source_img_obj,quality, output_format){

            var cvs = document.createElement('canvas');
            cvs.width = source_img_obj.naturalWidth;
            cvs.height = source_img_obj.naturalHeight;
            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
            var newImageData = cvs.toDataURL(mime_type, quality/100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;

          },
          addFile: function (files) {
            var set = this.set,
                that = this,
                uploadFile=function(file,filename){

                  var data = set.data || {};
                  data['file'] = file;
                  data['username'] = filename;

                  $ionicLoading.show();

                  Upload.upload({
                    url:'http://'+systemConstant.apiDomain+'/api/AliyunOss/UploadOss',
                    data: data
                  }).then(function (resp) {
                    console.log(resp);

                    $ionicLoading.hide();

                    if (resp &&resp.data && resp.data.flag ) {
                      if (!set.single) {
                        that.files.push({ 'imgUrl': resp.data.data });
                      }
                      else {
                        that.files=[];
                        that.files.push({ 'imgUrl': resp.data.data});
                      }
                      that.imgchange();
                    }
                    else {
                      dialog.tips('上传失败');
                    }
                  }, function (resp) {

                    $ionicLoading.hide();

                    dialog.tips('上传失败');

                  }, function (evt) {

                  })
                };

            if (!this.validate(files)) {
              return false;
            }

            for (var i = 0; i < files.length; i++) {
              var file = files[i],
                  filename=file.username;

              if (!file.$error) {

                lrz(file).then(function (rst) {
                      console.log(rst);

                      uploadFile(rst.file,filename);
                    })
                    .catch(function (err) {
                      dialog.tipsError(err);

                      uploadFile(file,filename);
                    })
                    .always(function () {
                      // 不管是成功失败，都会执行
                    });

              }
            }

          }
        };

        var WeiXinImg=function(option){
          var defaults = {
                single: false,
                filesCount: 4,
                filesPattern: '.jpg,.jpge,.png,.gif,.jpeg',
                data: {}
              },
              wei=weixin.weiXin();

          wei.init();
          this.set = angular.extend(defaults, option);

          this.weixin=wei;
          this.files = [];
        };
        WeiXinImg.prototype={
          validate: function () {
            var set = this.set,
                count = 0,
                hasFiles = this.files;

            angular.forEach(hasFiles, function () {
              count++;
            });
            if (!set.single && ((count + files.length) > set.filesCount)) {
              dialog.tips('最多只能上传' + set.filesCount + '张图片');
              return false;
            }
            return true;
          },
          addFile:function(){
            var set = this.set,
                data = set.data || {},
                that = this;

            if (!this.validate(files)) {
              return false;
            }

            this.weixin.uploadImg(function(localIds,serverId){
              alert(localIds);
              if (!set.single) {
                that.files.push({ 'imgUrl': localIds });
              }
              else {
                that.files=[];
                that.files.push({ 'imgUrl': localIds});
              }
              that.imgchange();
            });
          },
          imgchange:function(){

          }
        };

        return {
          uploadImg: function (option) {
            return new UploadImg(option);
          }
        };
      }
    ])

    .factory('systemConfig', [
      'common',
      'systemConstant',
      function (common,systemConstant) {
        return {
          sendsalesmanactivatesmscode:function(code,phone,okFun){
            return common.httpPost('/api/shopauthorizesales/sendsalesmanactivatesmscode',{'authorizeCode':code,'phone':phone},okFun);
          },
          getValidateCode:function(guid){
            return 'http://'+systemConstant.apiDomain+'/api/Comm/ImgCode?imgGuiCode='+guid+'&d='+new Date();
          },
          registerSmsCode:function(phoneNumber,okFun,errFun){
            return common.httpGet('/api/Comm/RegisterSmsCode',
                {'phoneNumber':phoneNumber},
                okFun,errFun);
          },
          getServerTime:function(okFun){
            return common.httpGet('/api/comm/GetServerTime',{},okFun);
          }
        };
      }
    ])

    .factory('browser',[
      'systemConstant',
      function(systemConstant){
        return {
          isWeiXin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              return true;
            } else {
              return false;
            }
          },
          isAplipay: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/aplipay/i) == "aplipay") {
              return true;
            } else {
              return false;
            }
          },
          isApp:function(){
            return systemConstant.isApp;
          },
          getsource:function(){
            //  0未知 1微信 2安卓 3IOS 4网站
            var source=0;
            if(this.isApp()){
              if(systemConstant.platform=='ios'){
                source=3;
              }
              else{
                source=2;
              }
            }
            else{
              if(this.isWeiXin()){
                source=1;
              }
              else{
                source=4;
              }
            }

            return source;
          }
        }
      }
    ])

    .factory('weixin', [
      'common',
      'systemConstant',
      'dialog',
      'browser',
      function (common,systemConstant,dialog,browser) {

        var WeiXin = function (option) {

          var  defaults={
            url:'http://'+systemConstant.webDoamin+'/',
            code:''
          };

          this.set=angular.extend(defaults,option);
          if(this.set.code=='0'){
            this.set.code='';
          }
          this.setweixin=false;

        };

        WeiXin.prototype = {
          set: {},
          init: function (readyFun) {
            var set=this.set,that=this;
            if(that.setweixin){
              return;
            }
            common.httpGet(
                '/api/WeiXin/WinXinJsConfig',
                {
                  'url':set.url,
                  'authorizecode':set.code
                },
                function(data){

                  wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data['appId'], // 必填，公众号的唯一标识
                    timestamp:data['timestamp'] , // 必填，生成签名的时间戳
                    nonceStr: data['nonceStr'], // 必填，生成签名的随机串
                    signature: data['signature'],// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','chooseImage','previewImage','uploadImage','downloadImage','scanQRCode','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });

                  wx.ready(function(){

                    if(angular.isFunction(readyFun)){
                      readyFun();
                    }
                    if(angular.isObject(readyFun)){
                      angular.forEach(readyFun,function(item,index){
                        item();
                      });
                    }

                    that.setweixin=true;
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                  });

                  wx.error(function(res){

                    dialog.tipsError(JSON.stringify(res));

                  });

                });

          },
          scane:function(cb){
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if(angular.isFunction(cb)){
                  cb(result);
                }
              }
            });
          },
          share: function (data) {
            /*return{
             onMenuShareTimeline:function(){ wx.onMenuShareTimeline(data)},
             onMenuShareAppMessage:function(){wx.onMenuShareAppMessage(data)},
             onMenuShareQQ:function(){wx.onMenuShareQQ(data)},
             onMenuShareWeibo:function(){wx.onMenuShareWeibo(data)},
             onMenuShareQZone:function(){wx.onMenuShareQZone(data)}
             };*/
            /*// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
             onMenuShareTimeline:wx.onMenuShareTimeline({
             title: '', // 分享标题
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             }),

             // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
             onMenuShareAppMessage:wx.onMenuShareAppMessage({
             title: '', // 分享标题
             desc: '', // 分享描述
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             type: '', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             }),

             // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
             onMenuShareQQ:wx.onMenuShareQQ({
             title: '', // 分享标题
             desc: '', // 分享描述
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             }),

             // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
             onMenuShareWeibo:wx.onMenuShareWeibo({
             title: '', // 分享标题
             desc: '', // 分享描述
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             }),

             // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
             onMenuShareQZone:wx.onMenuShareQZone({
             title: '', // 分享标题
             desc: '', // 分享描述
             link: '', // 分享链接
             imgUrl: '', // 分享图标
             success: function () {
             // 用户确认分享后执行的回调函数
             },
             cancel: function () {
             // 用户取消分享后执行的回调函数
             }
             })*/
          },
          uploadImg: function (callBack) {

            // 拍照或从手机相册中选图接口
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                // 上传图片接口
                wx.uploadImage({
                  localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID

                    common.httpGet(
                        '/api/AliyunOss/UpLoadOssByWeiXinMediaId',
                        {'mediaId':serverId,'fileName':localIds+'_'+serverId+'.jpg'},
                        function(data,message,status){
                          if(angular.isFunction(callBack)){
                            callBack(localIds[0],serverId,message);
                          }
                        });

                  }
                });
              }

            });

            /* // 预览图片接口
             wx.previewImage({
             current: '', // 当前显示图片的http链接
             urls: [] // 需要预览的图片http链接列表
             });

             // 下载图片接口
             wx.downloadImage({
             serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
             isShowProgressTips: 1, // 默认为1，显示进度提示
             success: function (res) {
             var localId = res.localId; // 返回图片下载后的本地ID
             }
             });*/

          },
          getLocation:function(cb){
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                if(angular.isFunction(cb)){
                  cb(res);
                }
                //var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                //var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                //var speed = res.speed; // 速度，以米/每秒计
                //var accuracy = res.accuracy; // 位置精度
              }
            });
          }
        };

        return {
          weiXin: function (option) {
            return new WeiXin(option);
          },
          getCode:function(state){
            //if(!browser.isWeiXin()){
            //  return;
            //}
            //if (document.cookie.indexOf("myOpenId=")>-1){
            //
            //}
            //else {
            //  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + systemConstant.weixinAppId +
            //      '&redirect_uri=' + encodeURIComponent('http://'+systemConstant.apiDomain+'/api/God/setopenidbycode') +
            //      '&response_type=code&scope=snsapi_base&state=' + encodeURIComponent(state) +
            //      '#wechat_redirect';
            //  location.href=url;
            //}
          }
        };
      }
    ])

    .factory('bank',['common',
      function(common){

        var cardTypeMap = {
              DC:"储蓄卡",
              CC:"信用卡",
              SCC:"准贷记卡",
              PC:"预付费卡"
            },
            bankcardList = [
              {
                bankName:"中国邮政储蓄银行",
                bankCode:"PSBC",
                patterns:[
                  {
                    reg:/^(621096|621098|622150|622151|622181|622188|622199|955100|621095|620062|621285|621798|621799|621797|620529|621622|621599|621674|623218|623219)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(62215049|62215050|62215051|62218850|62218851|62218849)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622812|622810|622811|628310|625919)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"中国工商银行",
                bankCode:"ICBC",
                patterns:[
                  {
                    reg:/^(620200|620302|620402|620403|620404|620406|620407|620409|620410|620411|620412|620502|620503|620405|620408|620512|620602|620604|620607|621151|620612|620704|620706|620707|620708|620709|620710|620609|620712|620713|620714|620802|620711|620904|620905|621001|620902|621103|621105|621106|621107|621102|621203|621204|621205|621206|621207|621208|621209|621210|621302|621303|621202|621305|621306|621307|621309|621311|621313|621211|621315|621304|621402|621404|621405|621406|621407|621408|621409|621410|621502|621317|621511|621602|621603|621604|621605|621608|621609|621610|621611|621612|621613|621614|621615|621616|621617|621607|621606|621804|621807|621813|621814|621817|621901|621904|621905|621906|621907|621908|621909|621910|621911|621912|621913|621915|622002|621903|622004|622005|622006|622007|622008|622010|622011|622012|621914|622015|622016|622003|622018|622019|622020|622102|622103|622104|622105|622013|622111|622114|622017|622110|622303|622304|622305|622306|622307|622308|622309|622314|622315|622317|622302|622402|622403|622404|622313|622504|622505|622509|622513|622517|622502|622604|622605|622606|622510|622703|622715|622806|622902|622903|622706|623002|623006|623008|623011|623012|622904|623015|623100|623202|623301|623400|623500|623602|623803|623901|623014|624100|624200|624301|624402|623700|624000)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622200|622202|622203|622208|621225|620058|621281|900000|621558|621559|621722|621723|620086|621226|621618|620516|621227|621288|621721|900010|623062|621670|621720|621379|621240|621724|621762|621414|621375|622926|622927|622928|622929|622930|622931|621733|621732|621372|621369|621763)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(402791|427028|427038|548259|621376|621423|621428|621434|621761|621749|621300|621378|622944|622949|621371|621730|621734|621433|621370|621764|621464|621765|621750|621377|621367|621374|621731|621781)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(9558)\d{15}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(370246|370248|370249|370247|370267|374738|374739)\d{9}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(427010|427018|427019|427020|427029|427030|427039|438125|438126|451804|451810|451811|458071|489734|489735|489736|510529|427062|524091|427064|530970|530990|558360|524047|525498|622230|622231|622232|622233|622234|622235|622237|622239|622240|622245|622238|451804|451810|451811|458071|628288|628286|622206|526836|513685|543098|458441|622246|544210|548943|356879|356880|356881|356882|528856|625330|625331|625332|622236|524374|550213|625929|625927|625939|625987|625930|625114|622159|625021|625022|625932|622889|625900|625915|625916|622171|625931|625113|625928|625914|625986|625925|625921|625926|625942|622158|625917|625922|625934|625933|625920|625924|625017|625018|625019)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(45806|53098|45806|53098)\d{11}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622210|622211|622212|622213|622214|622220|622223|622225|622229|622215|622224)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(620054|620142|620184|620030|620050|620143|620149|620124|620183|620094|620186|620148|620185)\d{10}$/g,
                    cardType:"PC"
                  },
                  {
                    reg:/^(620114|620187|620046)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"中国农业银行",
                bankCode:"ABC",
                patterns:[
                  {
                    reg:/^(622841|622824|622826|622848|620059|621282|622828|622823|621336|621619|622821|622822|622825|622827|622845|622849|623018|623206|621671|622840|622843|622844|622846|622847|620501)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(95595|95596|95597|95598|95599)\d{14}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(103)\d{16}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(403361|404117|404118|404119|404120|404121|463758|519412|519413|520082|520083|552599|558730|514027|622836|622837|628268|625996|625998|625997|622838|625336|625826|625827|544243|548478|628269)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622820|622830)\d{10}$/g,
                    cardType:"SCC"
                  }
                ]
              },
              {
                bankName:"中国银行",
                bankCode:"BOC",
                patterns:[
                  {
                    reg:/^(621660|621661|621662|621663|621665|621667|621668|621669|621666|456351|601382|621256|621212|621283|620061|621725|621330|621331|621332|621333|621297|621568|621569|621672|623208|621620|621756|621757|621758|621759|621785|621786|621787|621788|621789|621790|622273|622274|622771|622772|622770|621741|621041)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621293|621294|621342|621343|621364|621394|621648|621248|621215|621249|621231|621638|621334|621395|623040|622348)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625908|625910|625909|356833|356835|409665|409666|409668|409669|409670|409671|409672|512315|512316|512411|512412|514957|409667|438088|552742|553131|514958|622760|628388|518377|622788|628313|628312|622750|622751|625145|622479|622480|622789|625140|622346|622347)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(518378|518379|518474|518475|518476|524865|525745|525746|547766|558868|622752|622753|622755|524864|622757|622758|622759|622761|622762|622763|622756|622754|622764|622765|558869|625905|625906|625907|625333)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(53591|49102|377677)\d{11}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(620514|620025|620026|620210|620211|620019|620035|620202|620203|620048|620515|920000)\d{10}$/g,
                    cardType:"PC"
                  },
                  {
                    reg:/^(620040|620531|620513|921000|620038)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"中国建设银行",
                bankCode:"CCB",
                patterns:[
                  {
                    reg:/^(621284|436742|589970|620060|621081|621467|621598|621621|621700|622280|622700|623211|623668)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(421349|434061|434062|524094|526410|552245|621080|621082|621466|621488|621499|622966|622988|622382|621487|621083|621084|620107)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(436742193|622280193)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(553242)\d{12}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(625362|625363|628316|628317|356896|356899|356895|436718|436738|436745|436748|489592|531693|532450|532458|544887|552801|557080|558895|559051|622166|622168|622708|625964|625965|625966|628266|628366|622381|622675|622676|622677)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(5453242|5491031|5544033)\d{11}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622725|622728|436728|453242|491031|544033|622707|625955|625956)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(53242|53243)\d{11}$/g,
                    cardType:"SCC"
                  }
                ]
              },
              {
                bankName:"中国交通银行",
                bankCode:"COMM",
                patterns:[
                  {
                    reg:/^(622261|622260|622262|621002|621069|621436|621335)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(620013)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(405512|601428|405512|601428|622258|622259|405512|601428)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(49104|53783)\d{11}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(434910|458123|458124|520169|522964|552853|622250|622251|521899|622253|622656|628216|622252|955590|955591|955592|955593|628218|625028|625029)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622254|622255|622256|622257|622284)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(620021|620521)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"招商银行",
                bankCode:"CMB",
                patterns:[
                  {
                    reg:/^(402658|410062|468203|512425|524011|622580|622588|622598|622609|95555|621286|621483|621485|621486|621299)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(690755)\d{9}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(690755)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(356885|356886|356887|356888|356890|439188|439227|479228|479229|521302|356889|545620|545621|545947|545948|552534|552587|622575|622576|622577|622578|622579|545619|622581|622582|545623|628290|439225|518710|518718|628362|439226|628262|625802|625803)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(370285|370286|370287|370289)\d{9}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620520)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"中国民生银行",
                bankCode:"CMBC",
                patterns:[
                  {
                    reg:/^(622615|622616|622618|622622|622617|622619|415599|421393|421865|427570|427571|472067|472068|622620)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(545392|545393|545431|545447|356859|356857|407405|421869|421870|421871|512466|356856|528948|552288|622600|622601|622602|517636|622621|628258|556610|622603|464580|464581|523952|545217|553161|356858|622623|625912|625913|625911)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(377155|377152|377153|377158)\d{9}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"中国光大银行",
                bankCode:"CEB",
                patterns:[
                  {
                    reg:/^(303)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(90030)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(620535)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(620085|622660|622662|622663|622664|622665|622666|622667|622669|622670|622671|622672|622668|622661|622674|622673|620518|621489|621492)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(356837|356838|486497|622657|622685|622659|622687|625978|625980|625981|625979|356839|356840|406252|406254|425862|481699|524090|543159|622161|622570|622650|622655|622658|625975|625977|628201|628202|625339|625976)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"中信银行",
                bankCode:"CITIC",
                patterns:[
                  {
                    reg:/^(433670|433680|442729|442730|620082|622690|622691|622692|622696|622698|622998|622999|433671|968807|968808|968809|621771|621767|621768|621770|621772|621773|622453|622456)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622459)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(376968|376969|376966)\d{9}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(400360|403391|403392|404158|404159|404171|404172|404173|404174|404157|433667|433668|433669|514906|403393|520108|433666|558916|622678|622679|622680|622688|622689|628206|556617|628209|518212|628208|356390|356391|356392|622916|622918|622919)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"华夏银行",
                bankCode:"HXBANK",
                patterns:[
                  {
                    reg:/^(622630|622631|622632|622633|999999|621222|623020|623021|623022|623023)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(523959|528709|539867|539868|622637|622638|628318|528708|622636|625967|625968|625969)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"深发/平安银行",
                bankCode:"SPABANK",
                patterns:[
                  {
                    reg:/^(621626|623058)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(602907|622986|622989|622298|627069|627068|627066|627067|412963|415752|415753|622535|622536|622538|622539|998800|412962|622983)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(531659|622157|528020|622155|622156|526855|356869|356868|625360|625361|628296|435744|435745|483536|622525|622526|998801|998802)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620010)\d{10}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"兴业银行",
                bankCode:"CIB",
                patterns:[
                  {
                    reg:/^(438589)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(90592)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(966666|622909|438588|622908)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(461982|486493|486494|486861|523036|451289|527414|528057|622901|622902|622922|628212|451290|524070|625084|625085|625086|625087|548738|549633|552398|625082|625083|625960|625961|625962|625963)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620010)\d{10}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"上海银行",
                bankCode:"SHBANK",
                patterns:[
                  {
                    reg:/^(621050|622172|622985|622987|620522|622267|622278|622279|622468|622892|940021)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(438600)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(356827|356828|356830|402673|402674|486466|519498|520131|524031|548838|622148|622149|622268|356829|622300|628230|622269|625099|625953)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"浦东发展银行",
                bankCode:"SPDB",
                patterns:[
                  {
                    reg:/^(622516|622517|622518|622521|622522|622523|984301|984303|621352|621793|621795|621796|621351|621390|621792|621791)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(84301|84336|84373|84385|84390|87000|87010|87030|87040|84380|84361|87050|84342)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(356851|356852|404738|404739|456418|498451|515672|356850|517650|525998|622177|622277|628222|622500|628221|622176|622276|622228|625957|625958|625993|625831)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622520|622519)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(621151)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"广发银行",
                bankCode:"GDB",
                patterns:[
                  {
                    reg:/^(622516|622517|622518|622521|622522|622523|984301|984303|621352|621793|621795|621796|621351|621390|621792|621791)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622568|6858001|6858009|621462)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(9111)\d{15}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(406365|406366|428911|436768|436769|436770|487013|491032|491033|491034|491035|491036|491037|491038|436771|518364|520152|520382|541709|541710|548844|552794|493427|622555|622556|622557|622558|622559|622560|528931|558894|625072|625071|628260|628259|625805|625806|625807|625808|625809|625810)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(685800|6858000)\d{13}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"渤海银行",
                bankCode:"BOHAIB",
                patterns:[
                  {
                    reg:/^(621268|622684|622884|621453)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"广州银行",
                bankCode:"GCB",
                patterns:[
                  {
                    reg:/^(603445|622467|940016|621463)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"金华银行",
                bankCode:"JHBANK",
                patterns:[
                  {
                    reg:/^(622449|940051)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622450|628204)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"温州银行",
                bankCode:"WZCB",
                patterns:[
                  {
                    reg:/^(621977)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622868|622899|628255)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"徽商银行",
                bankCode:"HSBANK",
                patterns:[
                  {
                    reg:/^(622877|622879|621775|623203)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(603601|622137|622327|622340|622366)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628251|622651|625828)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"江苏银行",
                bankCode:"JSBANK",
                patterns:[
                  {
                    reg:/^(621076|622173|622131|621579|622876)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(504923|622422|622447|940076)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628210|622283|625902)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"南京银行",
                bankCode:"NJCB",
                patterns:[
                  {
                    reg:/^(621777|622305|621259)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622303|628242|622595|622596)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"宁波银行",
                bankCode:"NBBANK",
                patterns:[
                  {
                    reg:/^(621279|622281|622316|940022)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621418)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625903|622778|628207|512431|520194|622282|622318)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"北京银行",
                bankCode:"BJBANK",
                patterns:[
                  {
                    reg:/^(623111|421317|422161|602969|422160|621030|621420|621468)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(522001|622163|622853|628203|622851|622852)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"北京农村商业银行",
                bankCode:"BJRCB",
                patterns:[
                  {
                    reg:/^(620088|621068|622138|621066|621560)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625526|625186|628336)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"汇丰银行",
                bankCode:"HSBC",
                patterns:[
                  {
                    reg:/^(622946)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622406|621442)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622407|621443)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622360|622361|625034|625096|625098)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"渣打银行",
                bankCode:"SCB",
                patterns:[
                  {
                    reg:/^(622948|621740|622942|622994)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622482|622483|622484)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"花旗银行",
                bankCode:"CITI",
                patterns:[
                  {
                    reg:/^(621062|621063)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625076|625077|625074|625075|622371|625091)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"东亚银行",
                bankCode:"HKBEA",
                patterns:[
                  {
                    reg:/^(622933|622938|623031|622943|621411)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622372|622471|622472|622265|622266|625972|625973)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(622365)\d{11}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"广东华兴银行",
                bankCode:"GHB",
                patterns:[
                  {
                    reg:/^(621469|621625)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"深圳农村商业银行",
                bankCode:"SRCB",
                patterns:[
                  {
                    reg:/^(622128|622129|623035)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"广州农村商业银行股份有限公司",
                bankCode:"GZRCU",
                patterns:[
                  {
                    reg:/^(909810|940035|621522|622439)\d{12}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"东莞农村商业银行",
                bankCode:"DRCBCL",
                patterns:[
                  {
                    reg:/^(622328|940062|623038)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625288|625888)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"东莞市商业银行",
                bankCode:"BOD",
                patterns:[
                  {
                    reg:/^(622333|940050)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621439|623010)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622888)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"广东省农村信用社联合社",
                bankCode:"GDRCC",
                patterns:[
                  {
                    reg:/^(622302)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622477|622509|622510|622362|621018|621518)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"大新银行",
                bankCode:"DSB",
                patterns:[
                  {
                    reg:/^(622297|621277)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622375|622489)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622293|622295|622296|622373|622451|622294|625940)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"永亨银行",
                bankCode:"WHB",
                patterns:[
                  {
                    reg:/^(622871|622958|622963|622957|622861|622932|622862|621298)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622798|625010|622775|622785)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"星展银行香港有限公司",
                bankCode:"DBS",
                patterns:[
                  {
                    reg:/^(621016|621015)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622487|622490|622491|622492)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622487|622490|622491|622492|621744|621745|621746|621747)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"恒丰银行",
                bankCode:"EGBANK",
                patterns:[
                  {
                    reg:/^(623078)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622384|940034)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"天津市商业银行",
                bankCode:"TCCB",
                patterns:[
                  {
                    reg:/^(940015|622331)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(6091201)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622426|628205)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"浙商银行",
                bankCode:"CZBANK",
                patterns:[
                  {
                    reg:/^(621019|622309|621019)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(6223091100|6223092900|6223093310|6223093320|6223093330|6223093370|6223093380|6223096510|6223097910)\d{9}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"南洋商业银行",
                bankCode:"NCB",
                patterns:[
                  {
                    reg:/^(621213|621289|621290|621291|621292|621042|621743)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(623041|622351)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625046|625044|625058|622349|622350)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620208|620209|625093|625095)\d{10}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"厦门银行",
                bankCode:"XMBANK",
                patterns:[
                  {
                    reg:/^(622393|940023)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(6886592)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(623019|621600|)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"福建海峡银行",
                bankCode:"FJHXBC",
                patterns:[
                  {
                    reg:/^(622388)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621267|623063)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(620043|)\d{12}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"吉林银行",
                bankCode:"JLBANK",
                patterns:[
                  {
                    reg:/^(622865|623131)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940012)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622178|622179|628358)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"汉口银行",
                bankCode:"HKB",
                patterns:[
                  {
                    reg:/^(990027)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622325|623105|623029)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"盛京银行",
                bankCode:"SJBANK",
                patterns:[
                  {
                    reg:/^(566666)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622455|940039)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(623108|623081)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622466|628285)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"大连银行",
                bankCode:"DLB",
                patterns:[
                  {
                    reg:/^(603708)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622993|623069|623070|623172|623173)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622383|622385|628299)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"河北银行",
                bankCode:"BHB",
                patterns:[
                  {
                    reg:/^(622498|622499|623000|940046)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622921|628321)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"乌鲁木齐市商业银行",
                bankCode:"URMQCCB",
                patterns:[
                  {
                    reg:/^(621751|622143|940001|621754)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622476|628278)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"绍兴银行",
                bankCode:"SXCB",
                patterns:[
                  {
                    reg:/^(622486)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(603602|623026|623086)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628291)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"成都商业银行",
                bankCode:"CDCB",
                patterns:[
                  {
                    reg:/^(622152|622154|622996|622997|940027|622153|622135|621482|621532)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"抚顺银行",
                bankCode:"FSCB",
                patterns:[
                  {
                    reg:/^(622442)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940053)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622442|623099)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"郑州银行",
                bankCode:"ZZBANK",
                patterns:[
                  {
                    reg:/^(622421)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940056)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(96828)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"宁夏银行",
                bankCode:"NXBANK",
                patterns:[
                  {
                    reg:/^(621529|622429|621417|623089|623200)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628214|625529|622428)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"重庆银行",
                bankCode:"CQBANK",
                patterns:[
                  {
                    reg:/^(9896)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622134|940018|623016)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"哈尔滨银行",
                bankCode:"HRBANK",
                patterns:[
                  {
                    reg:/^(621577|622425)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940049)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622425)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"兰州银行",
                bankCode:"LZYH",
                patterns:[
                  {
                    reg:/^(622139|940040|628263)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621242|621538|621496)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"青岛银行",
                bankCode:"QDCCB",
                patterns:[
                  {
                    reg:/^(621252|622146|940061|628239)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621419|623170)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"秦皇岛市商业银行",
                bankCode:"QHDCCB",
                patterns:[
                  {
                    reg:/^(62249802|94004602)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621237|623003)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"青海银行",
                bankCode:"BOQH",
                patterns:[
                  {
                    reg:/^(622310|940068)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622817|628287|625959)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(62536601)\d{8}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"台州银行",
                bankCode:"TZCB",
                patterns:[
                  {
                    reg:/^(622427)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940069)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(623039)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622321|628273)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(625001)\d{10}$/g,
                    cardType:"SCC"
                  }
                ]
              },
              {
                bankName:"长沙银行",
                bankCode:"CSCB",
                patterns:[
                  {
                    reg:/^(694301)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940071|622368|621446)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625901|622898|622900|628281|628282|622806|628283)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620519)\d{13}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"泉州银行",
                bankCode:"BOQZ",
                patterns:[
                  {
                    reg:/^(683970|940074)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622370)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621437)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628319)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"包商银行",
                bankCode:"BSB",
                patterns:[
                  {
                    reg:/^(622336|621760)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622165)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622315|625950|628295)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"龙江银行",
                bankCode:"DAQINGB",
                patterns:[
                  {
                    reg:/^(621037|621097|621588|622977)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(62321601)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622860)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622644|628333)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"上海农商银行",
                bankCode:"SHRCB",
                patterns:[
                  {
                    reg:/^(622478|940013|621495)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625500)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(622611|622722|628211|625989)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"浙江泰隆商业银行",
                bankCode:"ZJQL",
                patterns:[
                  {
                    reg:/^(622717)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(628275|622565|622287)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"内蒙古银行",
                bankCode:"H3CB",
                patterns:[
                  {
                    reg:/^(622147|621633)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628252)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"广西北部湾银行",
                bankCode:"BGB",
                patterns:[
                  {
                    reg:/^(623001)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628227)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"桂林银行",
                bankCode:"GLBANK",
                patterns:[
                  {
                    reg:/^(621456)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621562)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628219)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"龙江银行",
                bankCode:"DAQINGB",
                patterns:[
                  {
                    reg:/^(621037|621097|621588|622977)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(62321601)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622475|622860)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625588)\d{10}$/g,
                    cardType:"SCC"
                  },
                  {
                    reg:/^(622270|628368|625090|622644|628333)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"成都农村商业银行",
                bankCode:"CDRCB",
                patterns:[
                  {
                    reg:/^(623088)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622829|628301|622808|628308)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"福建省农村信用社联合社",
                bankCode:"FJNX",
                patterns:[
                  {
                    reg:/^(622127|622184|621701|621251|621589|623036)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628232|622802|622290)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"天津农村商业银行",
                bankCode:"TRCB",
                patterns:[
                  {
                    reg:/^(622531|622329)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622829|628301)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"江苏省农村信用社联合社",
                bankCode:"JSRCU",
                patterns:[
                  {
                    reg:/^(621578|623066|622452|622324)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622815|622816|628226)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"湖南农村信用社联合社",
                bankCode:"SLH",
                patterns:[
                  {
                    reg:/^(622906|628386|625519|625506)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"江西省农村信用社联合社",
                bankCode:"JXNCX",
                patterns:[
                  {
                    reg:/^(621592)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628392)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"商丘市商业银行",
                bankCode:"SCBBANK",
                patterns:[
                  {
                    reg:/^(621748)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628271)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"华融湘江银行",
                bankCode:"HRXJB",
                patterns:[
                  {
                    reg:/^(621366|621388)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628328)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"衡水市商业银行",
                bankCode:"HSBK",
                patterns:[
                  {
                    reg:/^(621239|623068)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"重庆南川石银村镇银行",
                bankCode:"CQNCSYCZ",
                patterns:[
                  {
                    reg:/^(621653004)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"湖南省农村信用社联合社",
                bankCode:"HNRCC",
                patterns:[
                  {
                    reg:/^(622169|621519|621539|623090)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"邢台银行",
                bankCode:"XTB",
                patterns:[
                  {
                    reg:/^(621238|620528)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"临汾市尧都区农村信用合作联社",
                bankCode:"LPRDNCXYS",
                patterns:[
                  {
                    reg:/^(628382|625158)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"东营银行",
                bankCode:"DYCCB",
                patterns:[
                  {
                    reg:/^(621004)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628217)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"上饶银行",
                bankCode:"SRBANK",
                patterns:[
                  {
                    reg:/^(621416)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628217)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"德州银行",
                bankCode:"DZBANK",
                patterns:[
                  {
                    reg:/^(622937)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628397)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"承德银行",
                bankCode:"CDB",
                patterns:[
                  {
                    reg:/^(628229)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"云南省农村信用社",
                bankCode:"YNRCC",
                patterns:[
                  {
                    reg:/^(622469|628307)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"柳州银行",
                bankCode:"LZCCB",
                patterns:[
                  {
                    reg:/^(622292|622291|621412)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622880|622881)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(62829)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"威海市商业银行",
                bankCode:"WHSYBANK",
                patterns:[
                  {
                    reg:/^(623102)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628234)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"湖州银行",
                bankCode:"HZBANK",
                patterns:[
                  {
                    reg:/^(628306)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"潍坊银行",
                bankCode:"BANKWF",
                patterns:[
                  {
                    reg:/^(622391|940072)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628391)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"赣州银行",
                bankCode:"GZB",
                patterns:[
                  {
                    reg:/^(622967|940073)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628233)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"日照银行",
                bankCode:"RZGWYBANK",
                patterns:[
                  {
                    reg:/^(628257)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"南昌银行",
                bankCode:"NCB",
                patterns:[
                  {
                    reg:/^(621269|622275)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940006)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628305)\d{11}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"贵阳银行",
                bankCode:"GYCB",
                patterns:[
                  {
                    reg:/^(622133|621735)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(888)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628213)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"锦州银行",
                bankCode:"BOJZ",
                patterns:[
                  {
                    reg:/^(622990|940003)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628261)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"齐商银行",
                bankCode:"QSBANK",
                patterns:[
                  {
                    reg:/^(622311|940057)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628311)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"珠海华润银行",
                bankCode:"RBOZ",
                patterns:[
                  {
                    reg:/^(622363|940048)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628270)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"葫芦岛市商业银行",
                bankCode:"HLDCCB",
                patterns:[
                  {
                    reg:/^(622398|940054)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"宜昌市商业银行",
                bankCode:"HBC",
                patterns:[
                  {
                    reg:/^(940055)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622397)\d{11}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"杭州商业银行",
                bankCode:"HZCB",
                patterns:[
                  {
                    reg:/^(603367|622878)\d{12}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622397)\d{11}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"苏州市商业银行",
                bankCode:"JSBANK",
                patterns:[
                  {
                    reg:/^(603506)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"辽阳银行",
                bankCode:"LYCB",
                patterns:[
                  {
                    reg:/^(622399|940043)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"洛阳银行",
                bankCode:"LYB",
                patterns:[
                  {
                    reg:/^(622420|940041)\d{11}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"焦作市商业银行",
                bankCode:"JZCBANK",
                patterns:[
                  {
                    reg:/^(622338)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(940032)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"镇江市商业银行",
                bankCode:"ZJCCB",
                patterns:[
                  {
                    reg:/^(622394|940025)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"法国兴业银行",
                bankCode:"FGXYBANK",
                patterns:[
                  {
                    reg:/^(621245)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"大华银行",
                bankCode:"DYBANK",
                patterns:[
                  {
                    reg:/^(621328)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"企业银行",
                bankCode:"DIYEBANK",
                patterns:[
                  {
                    reg:/^(621651)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"华侨银行",
                bankCode:"HQBANK",
                patterns:[
                  {
                    reg:/^(621077)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"恒生银行",
                bankCode:"HSB",
                patterns:[
                  {
                    reg:/^(622409|621441)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622410|621440)\d{11}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622950|622951)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625026|625024|622376|622378|622377|625092)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"临沂商业银行",
                bankCode:"LSB",
                patterns:[
                  {
                    reg:/^(622359|940066)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"烟台商业银行",
                bankCode:"YTCB",
                patterns:[
                  {
                    reg:/^(622886)\d{10}$/g,
                    cardType:"DC"
                  }
                ]
              },
              {
                bankName:"齐鲁银行",
                bankCode:"QLB",
                patterns:[
                  {
                    reg:/^(940008|622379)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(628379)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"BC卡公司",
                bankCode:"BCCC",
                patterns:[
                  {
                    reg:/^(620011|620027|620031|620039|620103|620106|620120|620123|620125|620220|620278|620812|621006|621011|621012|621020|621023|621025|621027|621031|620132|621039|621078|621220|621003)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625003|625011|625012|625020|625023|625025|625027|625031|621032|625039|625078|625079|625103|625106|625006|625112|625120|625123|625125|625127|625131|625032|625139|625178|625179|625220|625320|625111|625132|625244)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"集友银行",
                bankCode:"CYB",
                patterns:[
                  {
                    reg:/^(622355|623042)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(621043|621742)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622352|622353|625048|625053|625060)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620206|620207)\d{10}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"大丰银行",
                bankCode:"TFB",
                patterns:[
                  {
                    reg:/^(622547|622548|622546)\d{13}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(625198|625196|625147)\d{10}$/g,
                    cardType:"CC"
                  },
                  {
                    reg:/^(620072)\d{13}$/g,
                    cardType:"PC"
                  },
                  {
                    reg:/^(620204|620205)\d{10}$/g,
                    cardType:"PC"
                  }
                ]
              },
              {
                bankName:"AEON信贷财务亚洲有限公司",
                bankCode:"AEON",
                patterns:[
                  {
                    reg:/^(621064|622941|622974)\d{10}$/g,
                    cardType:"DC"
                  },
                  {
                    reg:/^(622493)\d{10}$/g,
                    cardType:"CC"
                  }
                ]
              },
              {
                bankName:"澳门BDA",
                bankCode:"MABDA",
                patterns:[
                  {
                    reg:/^(621274|621324)\d{13}$/g,
                    cardType:"DC"
                  }
                ]
              }
            ],
            isFunction=angular.isFunction,
            extend=angular.extend,
            getCardTypeName =function(cardType){
              if(cardTypeMap[cardType]){
                return cardTypeMap[cardType]
              }
              return undefined;
            },
            getBankNameByBankCode=function(bankcode){
              for(var i = 0 , len = bankcardList.length ; i < len ; i++){
                var bankcard = bankcardList[i];
                if(bankcode == bankcard.bankCode){
                  return bankcard.bankName;
                }
              }
              return "";
            },
            _getBankInfoByCardNo=function(cardNo,cbf){
              for(var i = 0 , len = bankcardList.length ; i < len ; i++){
                var bankcard = bankcardList[i];
                var patterns = bankcard.patterns;
                for(var j = 0 , jLen = patterns.length ; j < jLen ; j++){
                  var pattern = patterns[j];
                  if((new RegExp(pattern.reg)).test(cardNo)){
                    var info = angular.extend(bankcard,pattern);
                    //delete info.patterns;
                    //delete info.reg;
                    info['cardTypeName'] = getCardTypeName(info['cardType']);
                    return cbf(null,info);
                  }
                }
              }
              return cbf(null);
            },
            _getBankInfoByCardNoAsync=function(cardNo,cbf){
              var errMsg = "";
              common.httpGet(
                  '/api/Shop/getbankcardattribute',
                  {'cardNo':cardNo},
                  function(data){
                    if(!data || !data.validated){
                      //dialog.tipsError('');
                      cbf('获取银行卡类型失败');
                      return;
                    }
                    var info = {};
                    info['bankName'] = getBankNameByBankCode(data.bank);
                    info['cardType'] = data.cardType;
                    info['bankCode'] = data.bank;
                    info['cardTypeName'] = getCardTypeName(data.cardType);
                    info['addible']=data.addible;
                    info['backName'] = info['bankName'];//向下兼容，修改字段错别字
                    //if(!data || !data.addible){
                    //  cbf('系统暂不支持'+info['bankName']+'银行卡,请选择其他银行卡');
                    //  return;
                    //}
                    cbf(null,info);
                  });
              //_getBankInfoByCardNo(cardNo,function(err,info){
              //  if(!err && info){
              //    return cbf(null,info);
              //  }else{
              //
              //    common.httpGet(
              //        '/api/Shop/getbankcardattribute',
              //        {'cardNo':cardNo},
              //        function(data){
              //          if(!data || !data.validated){
              //            //dialog.tipsError('');
              //            cbf('获取银行卡类型失败');
              //            return;
              //          }
              //          var info = {};
              //          info['bankName'] = getBankNameByBankCode(data.bank);
              //          info['cardType'] = data.cardType;
              //          info['bankCode'] = data.bank;
              //          info['cardTypeName'] = getCardTypeName(data.cardType);
              //          info['backName'] = info['bankName'];//向下兼容，修改字段错别字
              //          //if(!data || !data.addible){
              //          //  cbf('系统暂不支持'+info['bankName']+'银行卡,请选择其他银行卡');
              //          //  return;
              //          //}
              //          cbf(null,info);
              //        });
              //  }
              //});
            };
        return{
          getBankInfo:function(cardNo,cbf){
            var	errMsg = '';
            if(!isFunction(cbf)){
              cbf = function(){};
            }
            if(isNaN(cardNo)){
              cardNo = parseInt(cardNo);
              if(isNaN(cardNo)){
                checkFlag = false;
                errMsg = '银行卡号必须是数字';
                return cbf(errMsg)
              }
            }
            if(cardNo.toString().length < 15 || cardNo.toString().length > 19){
              checkFlag = false;
              errMsg = '银行卡位数必须是15到19位';
              return cbf(errMsg)
            }
            _getBankInfoByCardNoAsync(cardNo,function(err,bin){
              cbf(err,bin);
            });
          }
        };
      }])

    .factory('user', [
      'common',
      function (common) {

        return{
          postswiftpassapipay:function(data,okFun){
            return common.httpPost('/api/SwiftPass/postswiftpassapipay',data,okFun);
          },
          godcomment:function(data,okFun){
            return common.httpPost('/api/comment/godcomment',data,okFun);
          },
          payorderquery:function(orderNo,payVerify,okFun){
            return common.httpPost('/api/SwiftPass/payorderquery',{'orderNo':orderNo,'payVerify':payVerify},okFun);
          }
        };

      }
    ])

    .factory('seller',[
      'common',
      'browser',
      function(common,browser){
        return {
          login:function(){
            return common.httpGet('/api/God/Login?p=15018679165',{},function(){});
          },
          getrecommendphonenum:function(recommendCode,okFun,errorFun) {
            return common.httpGet('/api/God/getrecommendphonenum',{'recommendCode':recommendCode},okFun,errorFun);
          },
          regist:function(data,okFun){
            var data={
              'PhoneNumber':data.userPhone,
              'SmsCode':data.phoneCode,
              'RecommendCode':data.inviterCode,
              'Password':data.userPwd,
              'Code':localStorage.getItem('spp_weixincode'),
              'Source':browser.getsource()
            };
            return common.httpPost('/api/God/businessregister',data,okFun);
          },
          settled:function(data,okFun){
            var data={
              'ShopkeeperName':data.realName,
              'IdNumber':data.idCard,
              'IdCardInHand':data.img3,
              'IDCardPositive':data.img1,
              'IDCardNegative':data.img2
            };
            return common.httpPost('/api/God/updateshopkeeperinfo',data,okFun);
          },
          saveShopInfo:function(data,okFun){
            return common.httpPost('/api/God/updateshopbaseinfo',data,okFun);
          },
          applyqrcodepay:function(id,shopId,okFun){
            return common.httpPost('/api/qrcodepay/applyqrcodepay',{'code':id,'branchShopId':shopId},okFun);
          },
          addbranchshop:function(data,okFun){
            return common.httpPost('/api/branchshop/addbranchshop',data,okFun);
          },
          updateshopkeeperinfo:function(data,okFun){
          	var data = {
          	  'ShopkeeperName':data.Name,
              'IdNumber':encodeURIComponent(data.idcard)
          	};
            return common.httpPost('/api/god/updateshopkeeperinfo',data,okFun);
          },
			ReferrerCode: function( okFun) {
				return common.httpGet('/api/god/ReferrerCode', {}, okFun);
			}
        };
      }
    ])

    .factory('memchants',[
      'common',
      function(common){
        return {
          godInfo: function (okFun) {
            return common.httpGet('/api/God/godinfo',{},okFun);
          },
          getgodorderdetail:function(orderId,okFun){
            return common.httpGet('/api/qrcodepay/getgodorderdetail',{'orderId':orderId},okFun);
          }
        }
      }
    ])

    .factory('sendPhoneValidCode', [
      'common',
      function (common) {
        return {
          getValidateCode:function(okFun){
            return common.httpPost('/api/Comm/changesecuritypwdsmscode',{},okFun);
          }
        };
      }
    ])

    .factory('merchants2',[
      'common',
      'dialog',
      function(common,dialog){
        return {
          getshopqrcodeurlbycode:function(authorizecode,okFun){
            return common.httpGet('/api/shopauthorizesales/getshopqrcodeurl',{'authorizecode':authorizecode},okFun);
          },
          getshopqrcodeurl:function(branchShopId,okFun){
            return common.httpGet('/api/qrcodepay/getshopqrcodeurl',{'branchShopId':branchShopId},okFun)
          },
          closeqrcodeorder:function(orderNo,type,code,okFun){
            if(type=='1') {
              return common.httpGet('/api/qrcodepay/closeqrcodeorder', {
                'orderNo': orderNo
              }, okFun);
            }
            else if(type=='2'){
              return common.httpGet('/api/shopauthorizesales/closeqrcodeorder', {
                'orderNo': orderNo,
                'authorizecode':code
              }, okFun);
            }
          },
          queryanddealmicropaymentorder:function(orderNo,type,code,okFun) {
            if (type == '1') {
              return common.httpGet('/api/swiftpass/queryanddealmicropaymentorder', {
                'orderNo': orderNo
              }, okFun);
            }
            else if(type=='2'){
              return common.httpGet('/api/shopauthorizesales/queryanddealmicropaymentorder', {
                'orderNo': orderNo,
                'authorizecode':code
              }, okFun);
            }
          },
          scancodecollection:function(fee,codeNumber,shopId,type,code,okFun,errorFun){
            if(type=='1') {
              return common.httpGet('/api/swiftpass/scancodecollection', {
                'amount': fee,
                'codeNumber': codeNumber,
                'branchShopId': shopId
              }, okFun,errorFun);
            }
            else if(type=='2') {
              return common.httpGet('/api/shopauthorizesales/scancodecollection', {
                'authorizecode': code,
                'amount': fee,
                'codeNumber': codeNumber
              }, okFun,errorFun);
            }
          },
          getshopnamebyphonenum:function(phoneNum,okFun,errorFun){
            return common.httpGet('/api/registerapply/getshopnamebyphonenum',{'phoneNum':phoneNum},okFun,errorFun)
          },
          registerapply:function(data,okFun){
            return common.httpPost('/api/registerapply/registerapply',data,okFun);
          },
          setisworkingtime:function(authorizecode,isWorkingTime,okFun){
            return common.httpGet('/api/shopauthorizesales/setisworkingtime',{'authorizecode':authorizecode,'isWorkingTime':isWorkingTime},okFun);
          },
          getsellerstatus:function(okFun,errorFun){
            return common.httpGet('/api/God/getsellerstatus',{},okFun,errorFun);
          },
          login:function(p,okFun){
            return common.httpGet('/api/comm/shortcutlogin',{id:p},okFun);
          },
          getInfo: function (okFun) {
            return common.httpGet('/api/God/sellerinfo',{},okFun);
          },
          gethass0withdrawal:function(okFun){
            return common.httpGet('/api/withdrawal/gethass0withdrawal',{},okFun);
          },
          getEcodeDetail:function(ecodeId,okFun){
            return common.httpGet('/api/qrcodepay/payqrcodeinfo',{'id':ecodeId},okFun);
          },
          addClerk:function(data,okFun){
            return common.httpPost('/api/shopauthorizesales/addshopsalesman',data,okFun);
          },
          activeClerk:function(data,okFun){
            return common.httpPost('/api/shopauthorizesales/salesmanactivate',data,okFun);
          },
          getClerkDetail:function(clerkId,okFun){
            return common.httpGet('/api/shopauthorizesales/shopsalemansingle',{'id':clerkId},okFun);
          },
          disabledClerk:function(clerkId,okFun,errorFun){
            return common.httpPost('/api/shopauthorizesales/disablesalesmanauthorize',{'id':clerkId},okFun,errorFun);
          },
          enabledClerk:function(clerkId,okFun,errorFun){
            return common.httpPost('/api/shopauthorizesales/enablesalesmanauthorize',{'id':clerkId},okFun,errorFun);
          },
          getgodorderdetail:function(orderId,okFun){
            return common.httpGet('/api/qrcodepay/selleordetail',{'orderId':orderId},okFun);
          },
          setSecurityPwd:function(data,okFun){
            return common.httpPost('/api/shop/setcapitalaccount',data,okFun);
          },
          getIsSetPwdFlag:function(okFun){
            return common.httpGet('/api/shop/iscapitalaccount',{},okFun);
          },
          getPhoneNumber:function(okFun){
            return common.httpGet('/api/god/getphonenum',{},okFun);
          },
          addCard:function(data,okFun){
            return common.httpPost('/api/shop/bindmybankcard',data,okFun);
          },
          getCardsList:function(okFun){
            return common.httpGet('/api/shop/getmybankcardlist',{},okFun);
          },
          getCardsDetail:function(cardId,okFun){
            return common.httpGet('/api/Shop/getmybankcardinfo',{'cardId':cardId},okFun);
          },
          unbindCard:function(id,pwd,okFun){
            return common.httpPost('/api/shop/unbindmybankcard',{'id':id,'securityPwd':pwd},okFun);
          },
          getInDetail:function(id,feeType,okFun){
            return common.httpGet('/api/fundsflow/businessfundsflowsingle',{'id':id, 'feeType':feeType},okFun);
          },
          getWithdrawDetail:function(id,feeType,okFun){
            return common.httpGet('/api/withdrawal/withdrawalrecorddetail',{'id':id, 'feeType':feeType},okFun);
          },
          getbankcardattribute:function(no,okFun){
            return common.httpGet('/api/Shop/getbankcardattribute',{'cardNo':no},okFun);
          },
          userWithdrawalInfo:function(type,okFun,settlementMode) {
            settlementMode=settlementMode || '2';
            if (type == 1) {
              return common.httpGet('/api/withdrawal/userwithdrawalinfo', {'settlementMode':settlementMode}, okFun);
            }
            else{
              return common.httpPost('/api/shopbonus/shopbonuswithdrawalinfo',{},okFun);
            }
          },
          applywithdrawal:function(type,data,okFun){
            if(type==1) {
              return common.httpPost('/api/withdrawal/applywithdrawal', data, okFun);
            }
            else{

              return common.httpPost('/api/shopbonus/shopbonusapplywithdrawal', data, okFun);
            }
          },
          iscapitalaccount:function(okFun){
            return common.httpGet('/api/Shop/iscapitalaccount',{},okFun);
          },
          shopsalesmanlist:function(id,okFun){
            return common.httpGet('/api/shopauthorizesales/shopsalesmanlist',{'branchShopId':id},okFun);
          },
          updateshoplogo:function(logoUrl,id,okFun){
            return common.httpGet('/api/god/updateshoplogo',{'logoUrl':logoUrl,'branchShopId':id},okFun);
          },
          updateshopname:function(shopname,subname,id,okFun){
            return common.httpGet('/api/god/updateshopname',{'shopname':shopname,'subname':subname,'branchShopId':id},okFun)
          },
          updateshopaddress:function (data,okFun){
            return common.httpPost('/api/god/updateshopaddress',data,okFun);
          },
          getShopInfo:function(id,okFun){
            return common.httpGet('/api/god/getshopsetinfo',{'branchShopId':id},okFun)
          },
          getcommentcountbyshopid:function(shopId,orderId,okFun){
            return common.httpGet('/api/comment/getcommentcountbyshopid',{'shopId':shopId,'orderId':orderId},okFun);
          },
          salesmanactivateaffirm:function(okFun){
            return common.httpGet('/api/shopauthorizesales/salesmanactivateaffirm',{},okFun);
          },
          getwithdrawdetailid:function(id,okFun){
            return common.httpGet('/api/withdrawal/withdrawalrecorddetail',{'id':id},okFun);
          },
          withdrawaldatelist:function(dt,okFun){
            return common.httpGet('/api/withdrawal/withdrawaldatelist',{'dt':dt},okFun)
          },
          getbranchshoplist:function(okFun){
            return common.httpGet('/api/branchshop/getbranchshoplist',{},okFun)
          },
          getshopstatistics:function(branchShopId,okFun){
            return common.httpGet('/api/shop/getshopstatistics',{"branchShopId":branchShopId},okFun)
          },
          getbindrelation:function(authorizecode,okFun){
            return common.httpGet('/api/shopauthorizesales/getbindrelation',{"authorizecode":authorizecode},okFun)
          },
          Qsellerorderdetailbyno:function(orderNo,okFun){
            return common.httpGet('/api/qrcodepay/sellerorderdetailbyno',{"orderNo":orderNo},okFun)
          },
          Ssellerorderdetailbyno:function(authorizecode,orderNo,okFun){
            return common.httpGet('/api/shopauthorizesales/sellerorderdetailbyno',{"authorizecode":authorizecode,"orderNo":orderNo},okFun)
          },
          unbindshop:function(authorizecode,okFun){
            return common.httpGet('/api/shopauthorizesales/unbindshop',{"authorizecode":authorizecode},okFun)
          },
          getnewcustomerlist:function(beginDate,endDate,branchShopId,okFun){
          	return common.httpGet('/api/shop/getnewcustomerlist',{"beginDate":beginDate,'endDate':endDate,"branchShopId":branchShopId},okFun)
          },
          getreturnedcustomerlist:function(beginDate,endDate,branchShopId,okFun){
          	return common.httpGet('/api/shop/getreturnedcustomerlist',{"beginDate":beginDate,'endDate':endDate,"branchShopId":branchShopId},okFun)
          },
          getrecentcustomerlist:function(days,branchShopId,okFun){
          	return common.httpGet('/api/shop/getrecentcustomerlist',{"days":days,"branchShopId":branchShopId},okFun)
          },
          getrecentuncustomerlist:function(days,branchShopId,okFun){
          	return common.httpGet('/api/shop/getrecentuncustomerlist',{"days":days,"branchShopId":branchShopId},okFun)
          },
          getfrequencycustomerlist:function(times,branchShopId,okFun){
          	return common.httpGet('/api/shop/getfrequencycustomerlist',{"times":times,"branchShopId":branchShopId},okFun)
          },
          getamounttypecustomerlist:function(minAmount,maxAmount,branchShopId,okFun){
          	return common.httpGet('/api/shop/getamounttypecustomerlist',{"minAmount":minAmount,"maxAmount":maxAmount,'branchShopId':branchShopId},okFun)
          },
          activateqrcodepay:function(shopName,okFun){
          	return common.httpGet('/api/god/activateqrcodepay',{"shopName":shopName},okFun)
          },
          ShopSalesManCode:function(okFun){
            return common.httpGet('/api/god/ShopSalesManCode',{},okFun)
          },
          updatesalesman:function(Code,okFun){
            return common.httpPost('/api/god/updatesalesman',Code,okFun)
          },
          SendSmsCode:function(phoneNumber,operationLogEnum,okFun){
            return common.httpPost('/api/comm/SendSmsCode',{'phoneNumber':phoneNumber,'operationLogEnum':operationLogEnum},okFun)
          },
          epayquickpay:function(data,okFun,errorFun){
            return common.httpPost('/api/swiftpass/epayquickpay',data,okFun,errorFun)
          },
          getorderstatus:function(orderNo,okFun){
            return common.httpGet('/api/swiftpass/getorderstatus',{'orderNo':orderNo},okFun)
          }
//        getallcustomerlist:function(pageIndex,pageSize,branchShopId,okFun){
//        	return common.httpGet('/api/Shop/getallcustomerlist',{"pageIndex":pageIndex,'pageSize':pageSize,"branchShopId":branchShopId},okFun)
//        }
        }
      }
    ])

    .factory('sales',['common',
      function(common){
        return{
          login:function(data,okFun){
            common.httpPost('/api/salesman/login',data,okFun);
          },
          update:function(data,okFun){
            common.httpPost('/api/salesman/checkshop',data,okFun);
          },
          agencieslist:function(okFun){
            common.httpGet('/api/salesman/agencieslist',{},okFun);
          },
          updateshopkeeperinfo:function(data,okFun){
            var data={
              'ShopId':data.shopId,
              'ShopkeeperName':data.realName,
              'IdNumber':data.idCard,
              'IdCardInHand':data.img3,
              'IDCardPositive':data.img1,
              'IDCardNegative':data.img2
            };
            return common.httpPost('/api/salesman/updateshopkeeperinfo',data,okFun);
          },
          updateshopbaseinfo:function(data,okFun){
            return common.httpPost('/api/salesman/updateshopbaseinfo',data,okFun);
          }
        };
      }]);
