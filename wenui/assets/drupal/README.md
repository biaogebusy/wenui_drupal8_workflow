## WENUI
- drupal
- html5

## WENUI Drupal8 Theme 的编辑
```
// 站点根目录

 1）git clone git@gitlab.davyin.net:wwei/wenui.git wenui
 2）cp siteName.package.json  package.json
 3）npm install
 4) 基本操作(### 前端开发)
 5) LESS(##### 开始使用 UI LESS)
 6) Script(#### Script 编辑)

```


## WENUI Drupal8 Theme 的创建

### 在根目录下载UI库文件（所有操作均在根目录，docroot外一级）
```
git clone git@gitlab.davyin.net:wwei/wenui.git wenui
```

### 移出配置文件和执行文件
```
cp ../wenui/default.package.json  ./siteName.package.json
cp ./wenui/gulpfile.js  ./ & cp ./wenui/tasks  ./tasks
```

### 根据需要编辑 siteName.package.json 文件
```
 "name": siteName（英文且不可以有符号和空格，为主题名称）
 "version": 版本号
	"dir": {
	  "source": "source", （UI库文件目录，一般不需要修改）
		  "app": "app" （主题内生成文件的文件目录，一般不需要修改）
	},
	"drupal": {
	  "host": "wenui.wenroo.sh", (项目Http访问地址)
	  "folder": "default", （项目sites name，如果是单站点，为default）
	  "theme": {
	    "path": "/docroot/theme", （主题文件目录 默认为 /docroot/theme , 多站点情况 /docroot/sites/siteName/themes）
	    "name": "wenui" (主题名称，如需分割只可用"_" )
	  }
	},
```

### 生成配置文件 & 安装NPM工具 / 并保留配置文件以便切换
```
 cp siteName.package.json package.json

 npm install

 vim .gitignore
 #添加
 node_modules/
 node_modules/*

```
- 这里保留siteName.package.json配置文件以方便在多站点情况下切换使用，UI库可以共用。
- 编辑.gitignore，排除node_modules工具的提交



### 创建 Drupal Theme

```
 gulp create:drupal8:theme
```


## Theme 开发（所有操作均在根目录，docroot外一级）


### 前端开发
```
  npm run watch-css
  // 监听 assets/less/* 文件的变动并编译
  // !开启Less后使用

  npm run watch-js
  // 监听 assets/scripts/index.js 文件和所有关联文件的变动并编译
  // !开启index.js后使用

  npm run watch
	// 同时监听js和css文件的变动并编译
  // !开启Less和Script后使用

	npm run build-js
	// 压缩编译js文件
	// !开启index.js后使用

	npm run build-css
	// 压缩编译css文件
  // !开启Less后使用

	npm run build
	// 压缩编译js和css文件
  // !开启Less和index.js后使用

```

#### LESS 编辑

##### 建议
- 这里不强制使用本UI
- UI的LESS开发方式和JS开发方式可以单独使用一种，两者没有关联

##### 开始使用 UI LESS
```
  1) 使用方法

	gulp drupal:wenui:less

	// 自动引入起始文件到 theme/themeName/assets/less/
	// 主题自动引入加载文件
	// 开启后需要清除drupal缓存

	2) 编辑Theme路径
	themeName/index.less
	@wenui: "docroot/路径/themeName/assets/less";

	3）使用说明

	请阅读theme/themeName/assets/less/index.less
```


#### Script 编辑

##### 建议
- 这里所有操作方法只是建议不强制 如果熟悉 可以自由使用
- 简单情况直接使用theme libraries方式加入插件
- 所有使用的JS库使用bower install pluginName --save-dev的方式加入
- - 需要注意，如果是给index.js使用不需要提交
- - 如果是drupal.js使用，theme libraries方式加入的插件，请提交到版本库

##### theme/js/drupal.js
- js/drupal.js 写公共javascript

##### assets/scripts/index.js
- js逻辑繁杂时使用，小型站点没有逻辑繁杂的不需要使用，有学习价值。
- 用前端的方式来管理js的方式，也就是所谓的正确的前端开发方式，但在drupal里并不适合所有情况
- 这里面可以使用 require 自定义的方法库和公共方法

###### 开始使用 index.js
- 可以使用es6方式开发，工具会自动转成es5方法
- require 或者 import 方式调用 wenui提供的js方法
- require 或者 import 方式调用 theme内bower的安装的插件
```
  1) 使用方法

	gulp drupal:wenui:script

	// 自动引入起始文件到 theme/themeName/assets/scripts/index.js
	// 主题自动引入加载文件
  // 开启后需要清除drupal缓存

  2) ! 使用import方法加入wenui提供的插件（这里会持续更新，你们也可以提供合适的给我，我选择性加入有代表性的自定义方法。）
```




