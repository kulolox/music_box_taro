import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtButton } from 'taro-ui';

export default class Demo extends Component {
  config = {
    navigationBarTitleText: 'DEMO'
  };
  pay = () => {
    Taro.requestPayment({
      timeStamp: new Date().getTime().toString(),
      nonceStr: 'hello world',
      package: `prepay_id=0001`,
      signType: 'MD5',
      paySign: '22D9B4E54AB1950F51E0649E8810ACD6',
      success: function (res) {
        console.log('success:', res);
      },
      fail: function (res) {
        console.log('fail:', res);
      },
      complete: function (res) {
        console.log('complete:', res);
      }
    });
  };
  render() {
    return (
      <View>
        <AtButton onClick={this.pay}>支付</AtButton>
      </View>
    );
  }
}
