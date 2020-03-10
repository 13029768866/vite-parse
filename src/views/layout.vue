<template>
	<div>
		<el-container class="main-layout">
			<el-header class="d-flex align-items-center ">
				<a class="h5 mb-0 mr-auto" style="color: skyblue;">{{$config.logo}}</a>
				<el-menu 
					mode="horizontal" 
					style="border-bottom: 1px solid skyblue;"
					:default-active="headerNavActive" 					
					@select="headerNavSelect" 
				>
					<el-menu-item 
						v-for="(headerNav,idx) in headerNavBar.list" 
						:key="idx" 
						:index="idx | numToString"
					>
						{{headerNav.name}}
					</el-menu-item>
					<el-submenu index="6">
						<template slot="title">
							<el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
							</el-avatar>
							summer
						</template>
						<el-menu-item index="6-1">修改</el-menu-item>
						<el-menu-item index="6-2">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-header>
			
			
			<el-container class="aside-wrapper">
				<!-- 侧边栏 -->
				<el-aside 
					width="200px"		
				>
					<el-menu 
						style="height: 100%;"
						:default-active="sildeNavActive" 
						@select="slideNavSelect"
					>
						<el-menu-item 
							v-for="(slideNav,idx) in headerTosllideMenus"
							:key = "idx"
							:index="idx | numToString"
							active-text-color="#fff"
						>
							<i :class="slideNav.icon"></i>
							<span slot="title">{{slideNav.name}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				
				<!-- 主要展示区域 -->
				<el-main>
					<!-- 面包屑 -->
					<div 
						class="border-bottom mb-3"
						style="padding: 20px;margin: -20px;"
						v-if="breadcrumbArr.length"
					>
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item 
								v-for="(breadcrum,idx) in breadcrumbArr"
								:key ="idx"
								:to="{ path: breadcrum.path }"
							>
								{{breadcrum.title}}
							</el-breadcrumb-item>							
						</el-breadcrumb>
					</div>
					<!-- 主内容 -->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import wzjMix from "@/common/mixins/wzjMix.js"
	export default {
		mixins: [wzjMix],
		data() {
			return {
				// 头部导航栏
				headerNavBar: {					
					list: [
						{
							name: "首页",			
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页",
									pathname: "index"
								},
								{
									icon: "el-icon-s-claim",
									name: "商品列表",
									pathname: "shop_goods_list"
								},
							]
						},
						{
							name: "商品",
							sllideMenu: [{
									icon: "el-icon-s-home",
									name: "后台首页",
									pathname: "index"
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
				sildeNavActive: '0',
				// 面包屑导航
				breadcrumbArr: []
			}
		},
		mounted(){
			this.getRouterBreadcrumb()
			this.saveRouterStatus()
		},
		computed: {
			// 根据头部导航选择对应的侧边栏目录
			headerTosllideMenus() {
				return this.headerNavBar.list[this.headerNavActive].sllideMenu || []
			}			
		},
		watch:{
			'$route'(to, from) {	
				localStorage.setItem('routerStatus',JSON.stringify({
					header: this.headerNavActive,
					slide: 	this.sildeNavActive
				}))
				this.getRouterBreadcrumb()
			}
		},
		methods: {
			// 刷新保留路由状态
			saveRouterStatus(){
				let routerStatus = localStorage.getItem('routerStatus')
				if(routerStatus){
					routerStatus = JSON.parse(routerStatus)
					this.headerNavActive = routerStatus.header
					this.sildeNavActive = routerStatus.slide
				}
			},
			// 头部导航选中
			headerNavSelect(key) {			
				this.headerNavActive = key
				this.sildeNavActive = "0"
				this.$router.push({
					name:this.headerTosllideMenus[this.sildeNavActive].pathname
				})
			},
			// 侧边栏选中
			slideNavSelect(key) {
				if(this.sildeNavActive === key) return
				this.sildeNavActive = key		
				this.$router.push({
					name:this.headerTosllideMenus[key].pathname
				})
			},
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
		}
	}
</script>

<style>
	.main-layout {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	.aside-wrapper {
		height: 100%;
		/* padding-bottom: 60px; */
	}

	.el-header {
		text-align: center;
		line-height: 60px;
		border-bottom: 1px solid skyblue;
	}
	
	/* 导航样式修改 */
	.el-menu-item.is-active{
		color: skyblue;
	}
	.el-menu--horizontal > .el-menu-item.is-active {
		border-bottom: 2px solid skyblue;
		color: #303133;
	}

	body>.el-container {
		margin-bottom: 40px;
	}
</style>
