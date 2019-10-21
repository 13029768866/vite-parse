<template>
	<div>
	<!-- 设置全屏 -->
	<el-container style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;">
		<el-header 
			style="background-color:rgb(84, 92, 100) ;"
			class="d-flex align-items-center"
		>
			<!-- logo -->
			<!-- flex+mr-auto实现两侧分布 -->
			<a class="h5 text-light mb-0 mr-auto">剑来后台管理平台</a>
			<!-- 导航菜单 -->
			<el-menu
				:default-active="navBarMenu.navBarCurrentIdx"				
				mode="horizontal"
				@select="handleSelect"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b">
				<el-menu-item
					v-for="(item,idx) in navBarMenu.list"
					:key ="idx"
					:index = "idx | numToStr"
				>{{item.name}}</el-menu-item>			
									
				<el-submenu index="99">
					<template slot="title">
						<el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
						wzj加油
					</template>
					<el-menu-item index="2-1">修改</el-menu-item>
					<el-menu-item index="2-2">退出</el-menu-item>									
				</el-submenu>
			</el-menu>
		</el-header>
		<!-- 设置滚动条 -->
		<el-container style="height: 100%;padding-bottom: 60px;">
			<!-- 侧边导航栏 -->
			<el-aside width="200px">
				<el-menu default-active="2"  @select="sildeSelect">											      								
						<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">导航二</span>
						</el-menu-item>
						<el-menu-item index="3" disabled>
							<i class="el-icon-document"></i>
							<span slot="title">导航三</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">导航四</span>
						</el-menu-item>
					</el-menu>
			</el-aside>
			<!-- 主体内容 -->
			<el-main>Main</el-main>
		</el-container>
	</el-container>
	</div>
</template>

<script>
	import mixins from '@/mixins/mixins'
	export default {
		mixins: [mixins],
		data(){
			return {				
				navBarMenu:{
					navBarCurrentIdx:'0',
					list:[
						{name:"首页"},
						{name:"商品"},
						{name:"订单"},
						{name:"会员"},
						{name:"设置"}
					]
				}
			}	  
		},		
		methods: {
			handleSelect(key, keyPath) {
			 console.log(key, keyPath);
			},
			sildeSelect(key, keyPath) {
			 console.log(key, keyPath);
			},
		}
	}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
   
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>
