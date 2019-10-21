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
				:default-active="navCurrentIdx"				
				mode="horizontal"
				@select="handleSelect"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b">
				<el-menu-item index="1">首页</el-menu-item>				
				<el-menu-item index="2" >商品</el-menu-item>
				<el-menu-item index="3" >订单</el-menu-item>
				<el-menu-item index="4" >会员</el-menu-item>
				<el-menu-item index="5" >设置</el-menu-item>
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
				<li v-for="i in 100" :key= "i">{{i}}</li>
			</el-aside>
			<!-- 主体内容 -->
			<el-main>Main</el-main>
		</el-container>
	</el-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				navCurrentIdx: '1'
			}	  
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
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
