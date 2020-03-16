<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;margin-bottom: 0!important;">
		<router-link :to="{name:'shop_goods_list'}" style="position: absolute;top: 12px;left: 200px;">
			<el-button size="mini">回到商品列表</el-button>
		</router-link>
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
				<el-tab-pane label="基础设置">基础设置</el-tab-pane>
				<el-tab-pane label="商品规格">商品规格</el-tab-pane>
				<el-tab-pane label="商品属性">商品属性</el-tab-pane>		    
				<el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
				<el-tab-pane label="商品详情">商品详情</el-tab-pane>
			<el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				tabIndex: 0
			}
		},
		mounted() {
			console.log(this.ceshi)
		},
		methods: {
			// 加载数据
			handleClick(tab,event) {
				console.log(tab.index);
			},
		},
		computed:{
			...mapState({
				ceshi: state => state.goodsCreate.ceshi
			})
		}
	}
</script>

<style>
</style>
