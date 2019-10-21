<template>
	<div>
	<!-- 设置全屏 -->
	<el-container style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;">
		<el-header>
			<el-menu
				:default-active="activeIndex2"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b">
				<el-menu-item index="1">处理中心</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" disabled>消息中心</el-menu-item>
				<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
