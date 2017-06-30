# Web前端开发规范
前言: 前端项目采用react框架, 项目考虑到PC和手机等多端开发, 根据react本身特点和项目开发需求特此定出如下规范:

---

## 目录

1. [HTML](#html)
2. [CSS](#css)
3. [JS](#js)
4. [React](#react)
5. [图片](#image)
6. [文件](#file)
7. [目录](#directory)
8. [书写](#writting)

<a name="html"></a>
### 一、HTML
1. 所有文件统一使用UTF-8编码（无BOM）
2. 统一为html5声明类型``<!DOCTYPE html>``
3. 标签必须闭合
4. 元素属性采用双引号
5. 尽量使用语义化标签, 如``<nav></nav>``
6. img标签必须有alt属性, 属性值为图片名或描述性文字, 如``<img alt="量财富">``
7. html整个结构采用项目html模板

<a name="css"></a>
### 二、CSS
1. 统一采用sass开发
2. 不需要兼容IE8及以下浏览器
3. !important 除特殊情况外避免使用
4. 采用BEM命名规则:块（block）__ 元素（element）-- 修饰符（modifier）, 

##### 命名约定的模式如下： 
* 注意是两个下划线和两个-号
* block 代表了更高级别的抽象或组件。
* block__element 代表block的后代，用于形成一个完整的block的整体。
* block--modifier代表block的不同状态或不同版本。
如
```html
<div class="media">
    <img src="logo.png" alt="Foo Corp logo" class="media__img--small">
    <div class="media__body">
        <h3 class="media__body__tit">Hello World</h3>
        <p class="media__body__info">Welcome to liangcaifu!</p>
    </div>
</div>  
```
其中media表示模块名, 包括media_img和media_body两个子组块, media__img--small为media_img子组块小尺寸图片的类名。


<a name="js"></a>
### 三、JS
1. dom操作尽量使用id, 有利于减少样式和脚本的耦合
2. 少声明全局变量, 多使用命令空间和闭包

<a name="react"></a>
### 四、React
##### 命名
* 扩展名: 使用 jsx 作为 React 组件的扩展名
* 文件名: 文件命名采用帕斯卡命名法，如：ReservationCard.jsx
* 引用名: 组件引用采用帕斯卡命名法，其实例采用驼峰式命名法。
* 组件命名: 使用文件名作为组件名。如：ReservationCard.jsx 组件的引用名应该是 ReservationCard

##### jsx
* 属性过多分行写
* 自闭和标签之前留一个空格
* JSX使用双引号，对其它所有JS属性使用单引号
* 属性名采用驼峰式命名法  
```html
<Foo bar="bar" />
    <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
    >
    <Spazz />
</Foo>
```

<a name="image"></a>
### 五、图片
1. 大尺寸图片采用jpg格式, 小尺寸图片采用png格式
2. H5移动端以@2x切图作为图标
3. 图标采用"icon_"开头来命名, 如"icon-arrow"
4. 图标尽量采用SVG-sprite

<a name="file"></a>
### 六、文件
1. 组件(components文件夹中)必须写上注释, 说明作用以及变量含义
2. 每个文件必须添加以下注释头部, 如:
```js
/*
* @Author: yankang
* @Date:   2017-06-14 14:52:29
* @Last Modified by:   yankang
* @Last Modified time: 2017-06-16 15:38:47
*/
```
第3条和第4条可以根据需要决定是否添加


<a name="directory"></a>
### 七、目录
    |—— mode_modules   npm安装的模块
    |—— lib   其它库框架
    |—— sass_common   公共样式
    |—— webpack.config.js   打包编译配置文件
    |—— README.md   前端规范文件
    |—— package.json   npm包管理文件
    |—— sass_common   公共样式
    |—— app   静态资源
    |   |—— liangcaifu   项目名
    |   |   |—— src   源代码目录
    |   |   |   |—— html 视图
    |   |   |   |—— components   页面组件
    |   |   |   |—— css 编辑后的样式
    |   |   |   |—— sass    样式源代码
    |   |   |   |—— img    图片目录
    |   |   |   |—— js 编译后的js
    |   |   |—— dist    发布目录
    |   |   |   |—— {version}   版本号
    |   |   |   |   |—— css 发布后的样式
    |   |   |   |   |—— imgs    发布压缩后的图片
    |   |   |   |   |—— js  发布后的js
    |   |   |   |   |—— html  发布后的html

<a name="writting"></a>
### 八、书写
1. 一次缩进采用一个tab键
2. 每行代码结尾空格全部删除
