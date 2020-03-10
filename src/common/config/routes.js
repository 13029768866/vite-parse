
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
	
	export default getRoutes(routes);
		
	