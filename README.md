# K 云音乐

音乐播放器小程序，RE:从零开始的小程序&Taro

## 项目截图

- 首页

  ![首页](/IMAGE/home.png)

- 详情页

  ![详情页](/IMAGE/album.png)

- 播放器

  ![播放器](/IMAGE/player.png)

## 前端技术栈：

- taro2.x 学习 taro，使用的是 react 写法

- redux 状态管理使用了 redux

- taro-ui 好像没得选【现在我想做个好人】

- sass taro-ui 使用的是 sass 预处理语言，为了统一我使用的也是 sass

## 后端技术栈

数据源来自网易云音乐，接口服务来自[网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)

具体使用方式请参展官方文档，写的挺详细的。

- docker
- docker-compose

docker 镜像 steveltn/https-portal，使用 docker-componse 可以通过简单的配置完成证书申请与配置、nginx 端口转发，让我们专注前端开发，而不用花费太多时间在接口数据上面。

## 实现功能

- 轮播图，由于不知道轮播图跳转的逻辑，暂时为纯展示
- 歌单列表，无限滚动加载
- 歌单详情页
- 音乐播放器
  1. 播放/暂停
  2. 上一曲/下一曲
  3. 播放进度拖拽

## 本地预览

```
git clone https://github.com/kulolox/music_box_taro.git

npm install

npm run dev:weapp
```

> 使用微信开发者工具查看，注意微信有接口白名单，你最好自己开后端服务，绑定接口域名

## 线上地址

上不了线，/(ㄒ o ㄒ)/~~

审核时才知道，个人开发者没有音乐类目的小程序权限，可以说个人开发者没有大部分类目的权限，上线审核是无法通过的。

不过主要目的是为了学习，也就无所谓了。而且体验版是可以用的，自己没事听听歌，还不错，也可以给熟悉的人开预览权限，这样他/她也可以使用了。

## 感悟和心得

- taro 是多端框架，目前只使用了微信小程序这部分功能，有空研究下其他的
- 服务器在国外，请求有点慢，而且可以播放的歌曲可能无法获取 url，导致不得不先全量请求一次 url，再根据 url 是否存在来判断歌曲是否播放，播放链接有时效，又需要在每次播放前重新获取一次 url
- 小程序原生还没尝试过，有时间试试
