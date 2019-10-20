let routes = [
	{
		path: '/',
		name: 'layout',
		redirect:{name:'index'},
		//component:()=>import('@/views/layout.vue'),
		component: 'layout',
		children: [{
			path: '/index',
			name: 'index',
			component: 'index/index'
		}]
	},
	{//登录页
		path: '/login',
		name: 'login',
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
		// 自动生成component
		let componentFun = import (`@/views/${arr[i].component}`)
		arr[i].component = () => componentFun
		// 存在子路由进行递归
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}

export default getRoutes()
	
