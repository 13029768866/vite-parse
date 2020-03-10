# VUE商城类型后台管理系统

## 一、初始化

1、vue/cli:	根据vue脚手架初始化项目

2、element-ui:	vue	add	element

3、boostrap4：	index.html引入CDN中boostrap的css

## 二、路由设计

本项目采用约定式路由，使文件格式更清晰，查找更方便，减少引入操作，路由过多时观察更方便

### 1、routes抽离统一管理

```js
const routes = [
	{
		path:'/',
		name:'layout',
		redirect:{name:'index'},
		component:'layout',
		children:[
			{
				component:'index/index'
			},
			{
				component:'shop/goods/list'
			}
		]
	},
	{
		component:'login/index'
	},
	{
		path:'*',
		redirect:{name:'index'},
	}
	]
```

### 2、根据component自动生成路由

```js
	// path中index校验
	function checkPathIndex(str){
		const idx = str.lastIndexOf('/')
		const val = str.slice(idx + 1)
		if(val === "index"){
			return str.substring(idx, -1)
		}
		return str
	}
	
	// 根据component自动生成path,name
	function autoCreateRoute(routes){
		routes.map(route => {
			if(!route.component) return;
			const component = checkPathIndex(route.component)
			// 生成path
			route.path = route.path || `/${component}`
			// 生成name
			route.name = route.name || component.replace(/\//g,"_")
			// 这里必须分开书写
			const componentFun = import(`../../views/${route.component}.vue`)
			route.component = () => componentFun
			// 
			if(route.children && route.children.length > 0){
				autoCreateRoute(route.children)
			}
		})
	}
	
	// 获取routes
function getRoutes(routes){
		autoCreateRoute(routes)
		return routes;
}
```

## 三、

