<h1 align="center">基于React开发的迷你实时天气预报组件</h1>

<div align="center">

<img src='https://apia.aidioute.cn/resource/vue-mini-weather/weather.png' />

![GitHub watchers](https://img.shields.io/github/watchers/hjiachuang/react-mini-weather?style=social) ![GitHub stars](https://img.shields.io/github/stars/hjiachuang/react-mini-weather?style=social) ![GitHub forks](https://img.shields.io/github/forks/hjiachuang/react-mini-weather?style=social)
<br />
![GitHub package.json version](https://img.shields.io/github/package-json/v/hjiachuang/react-mini-weather?style=flat-square) ![GitHub](https://img.shields.io/github/license/hjiachuang/react-mini-weather?style=flat-square) ![GitHub open issues](https://img.shields.io/github/issues/hjiachuang/react-mini-weather?style=flat-square) ![GitHub closed issues](https://img.shields.io/github/issues-closed/hjiachuang/react-mini-weather) ![GitHub last commit](https://img.shields.io/github/last-commit/hjiachuang/react-mini-weather?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/hjiachuang/react-mini-weather?style=flat-square)

</div>

### 项目展示
效果同 [vue-mini-weather展示页](https://apia.aidioute.cn/resource/vue-mini-weather/)

> 基于React框架开发的一款迷你天气预报展示的小组件，目前只支持中国大陆的天气预报，原因在更新公告中有，有问题请提[issue](https://github.com/hjiachuang/react-mini-weather/issues)

### 使用
没有打包上传到npm仓库，具体内容看下面的注意事项。

复制 `src> lib` 整个目录到自己的项目中，然后
```javascript
  import ReactMiniWeather from 'xxxxxx/lib' //目录结构就看你自己的项目了

  <App>
    <ReactMiniWeather />
  </App>
```

### 参数说明
同 [vue-mini-weather](https://github.com/hjiachuang/vue-mini-weather)

### 注意
刚学react不久。不知道如何打包ract组件成库，尝试了百度各种做法，在引入组件使用的时候控制台总会报很多个重复的错误，报错的内容:
> Expected an assignment or function call and instead saw an expression

不知道怎么解。而且，按道理能用import引入组件的，报错提示没有export组件？？只能用require引入。

所以我干脆直接丢github仓库了，给有需要的人直接在项目里把源文件放进去直接引用好了，就不打包了。

组件源文件在 `src> lib` 目录中，需要把lib整个文件夹复制过去，`iconJson` 是动态天气图标的源文。

直接 `git clone` 整个项目，`yarn install` 安装依赖，然后 `yarn start` 可以运行展示页面。

> 目前还有个bug，就是动态修改color这个prop，不会导致组件重新渲染更改颜色，具体原因可以看源码，有能力的可以提issue，我看看如何改合适。在此感谢。


### 依赖

* [axios](https://github.com/axios/axios)

* [lottie-web](https://github.com/airbnb/lottie-web)

* [antd](https://github.com/ant-design/ant-design)，仅使用了 `message` 组件。
