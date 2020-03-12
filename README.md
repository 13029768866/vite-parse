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

## 三、后台首页布局

### 1、双导航联动

后台首页采取双导航，侧边栏导航通过计算属性由头部导航选中项决定

```js
data() {
			return {
				// 头部导航栏
				headerNavBar: {					
					list: [
						{
							name: "首页",			
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页"
								},
								{
									icon: "el-icon-s-claim",
									name: "商品列表"
								},
							]
						},
						{
							name: "商品",
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页"
								},								
							]
						},
						{
							name: "订单",
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页"
								},
								{
									icon: "el-icon-s-claim",
									name: "商品列表"
								},
							]
						},
						{
							name: "会员",
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页"
								},							
							]
						},
						{
							name: "设置",
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页"
								},
								{
									icon: "el-icon-s-claim",
									name: "商品列表"
								},
							]
						},
					]
				},
				// 头部选中项
				headerNavActive: '0',
				// 侧边栏选中项
				sildeNavActive: '0'
			}
		},
		computed: {
			// 根据头部导航选择对应的侧边栏目录
			headerTosllideMenus() {
				return this.headerNavBar.list[this.headerNavActive].sllideMenu || []
			}			
		},
		methods: {
			// 头部导航选中
			headerNavSelect(key) {			
				this.headerNavActive = key
				this.sildeNavActive = "0"
			},
			// 侧边栏选中
			slideNavSelect(key) {
				this.sildeNavActive = key
			}
		}
```

### 2、面包屑导航

#### 2.1、生成面包屑

```js
// 获取面包屑
getRouterBreadcrumb(){
    // console.log(this.$route.matched)
    this.breadcrumbArr = []
    let breadcrumbArr = this.$route.matched.filter(route => route.name)
    let arr = []
    breadcrumbArr.forEach(breadcrumb => {
        // 过滤layout和index
        if(breadcrumb.name === "index" || breadcrumb.name === "layout") return;
        arr.push({
            name: breadcrumb.name,
            path: breadcrumb.path,
            title: breadcrumb.meta.title,
        })
        // 添加第一级目录
        if (arr.length) {
            arr.unshift({ name:'index',path:'/index',title:'后台首页' })
        }					
        this.breadcrumbArr = arr			
    })
}
```

#### 2.2、根据面包屑切换路由（监听路由变化）

```js
watch:{
    '$route'(to, from) {				
        this.getRouterBreadcrumb()
    }
}
```

#### 2.3、刷新页面路由本地化存储

```js
watch:{
    '$route'(to, from) {	
        localStorage.setItem('routerStatus',JSON.stringify({
            header: this.headerNavActive,
            slide: 	this.sildeNavActive
        }))
        this.getRouterBreadcrumb()
    }
},
    saveRouterStatus(){
        let routerStatus = localStorage.getItem('routerStatus')
        if(routerStatus){
            routerStatus = JSON.parse(routerStatus)
            this.headerNavActive = routerStatus.header
            this.sildeNavActive = routerStatus.slide
        }
    }
```

## 四、相册管理

### 1、相册列表的增删改查

### 2、图片的增删改查

### 3、照片多选，中间取消的数字排序

```js
imgList:[{ 
    id:i,
    url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
    name:"图片",
    ischeck:false,
    checkOrder:0
}] // 照片数组，isCheck决定是否选中，checkOrder是角标序号
chooseList: [] // 选中数组
	chooseImage(item){
        /* 选中 */
        if(!item.ischeck){
            item.ischeck = true
            this.chooseList.push(item)
            item.checkOrder = this.chooseList.length
            return
        }
        /* 取消选中 */
        // 获取取消选中索引
        let idx = this.chooseList.findIndex(choose => choose.id === item.id)
        // 取消中途选中重新计算之后的序号
        let chooseListLength = this.chooseList.length
        if(idx + 1 < chooseListLength){
            for(let i = idx; i < chooseListLength; i++){
                let imgOrderIdx = this.imageList.findIndex(img => img.checkOrder === this.chooseList[i].checkOrder)
                if(imgOrderIdx > -1){
                    this.imageList[imgOrderIdx].checkOrder--
                }
            }
        }
        // 删除
        this.chooseList.splice(idx,1)	
        // 修改状态
        item.ischeck = false
        // 重置序号
        item.checkOrder = 0
			}
```

