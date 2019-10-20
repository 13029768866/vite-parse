/* 
	路由自动生成规则
	* 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
	* 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
	* 三、填写后不会自动生成
 */

let routes = [
	{
		path: '/',
		name: 'layout',
		redirect:{name:'index'},
		//component:()=>import('@/views/layout.vue'),
		component: 'layout',
		children: [{			
			component: 'index/index'
		},
		{// 商品列表			
			component:'shop/goods/list'
		}
		]
	},
	{//登录页
		component: 'login/index'
	},
	{
		path:'*',
		redirect:{name:'index'}
	}
]

// 获取路由信息方法
let getRoutes = function(){
	createRoute(routes)
	return routes
}

// 自动生成路由
function createRoute(arr){
	for (let i = 0; i < arr.length; i++) {
		// " * "重定向直接返回
		if(!arr[i].component) return
		// 去除index
		let val = getPathVal(arr[i].component)
		// 自动生成name
		arr[i].name = arr[i].name || val.replace(/[/]/g,'_')
		// 自动生成path
		arr[i].path = arr[i].path || `/${val}`
		// 自动生成component
		let componentFun = import (`@/views/${arr[i].component}`)
		arr[i].component = () => componentFun
		// 存在子路由进行递归
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}

// 去除路由末尾index
function getPathVal(str){
	// 获取最后一个‘/’索引
	let idx = str.lastIndexOf('/')
	// 获取最后一个‘/’后面的参数
	let val = str.substring(idx+1,str.length)
	// 根据val进行相应处理
	if( val === 'index'){
		return str.substring(idx,-1)
	}
	return str
}

export default getRoutes()
	
