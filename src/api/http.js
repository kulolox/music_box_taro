import Taro from '@tarojs/taro';

const BASE_URL = 'https://api.xujianfeng.club/';

class HttpRequest {
  async request(params, method = 'GET') {
    const { url, data } = params;
    let contentType = 'application/json';
    contentType = params.contentType || contentType;

    const reg = /^https?:\/\//i;

    const option = {
      url: reg.test(url) ? url : BASE_URL + url,
      data,
      method,
      header: {
        'content-type': contentType,
        accessToken: ''
      }
    };
    return Taro.request(option);
  }

  get(url, data = '') {
    const params = { url, data };
    return this.request(params);
  }

  post(url, data, contentType) {
    const params = { url, data, contentType };
    return this.request(params, 'POST');
  }

  put(url, data = '') {
    const params = { url, data };
    return this.request(params, 'PUT');
  }

  delete(url, data = '') {
    const params = { url, data };
    return this.request(params, 'DELETE');
  }
}

export default new HttpRequest();
