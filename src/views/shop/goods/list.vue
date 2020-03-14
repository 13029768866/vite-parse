<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
		
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
				<el-tab-pane :label="tab.name" :key="tabI"
			v-for="(tab,tabI) in tabbars">
			
				<button-search ref="buttonSearch" 
				placeholder="要搜索的商品名称" 
				@search="searchEvent">
				<!-- 左边 -->
					<template #left>
						<el-button type="success" 
						size="mini">发布商品</el-button>
						<el-button type="danger" 
						size="mini">批量删除</el-button>
					</template>
					<!-- 高级搜索表单 -->
					<template #form>
						<el-form inline ref="form" :model="form"
						label-width="80px">
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name" 
								placeholder="商品名称"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品编码" class="mb-0">
								<el-input v-model="form.code" 
								placeholder="商品编码"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品类型" class="mb-0">
								<el-select v-model="form.type" size="mini"
								placeholder="请选择商品类型">
									<el-option label="区域一" 
									value="shanghai"></el-option>
									<el-option label="区域二" 
									value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类" class="mb-0">
								<el-input v-model="form.category" 
								placeholder="商品分类"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button type="info" size="mini"
								@click="searchEvent">
									搜索</el-button>
								<el-button size="mini"
								@click="clearSearch">清空筛选条件</el-button>
							</el-form-item>
						</el-form>
					</template>
				</button-search>
				
				
			</el-tab-pane>
		</el-tabs>
		
	</div>
</template>

<script>
	import buttonSearch from "@/components/common/button-search.vue"
	export default {
		components: {
			buttonSearch
		},
		data() {
			return {
				tabIndex: 0,
				tabbars:[
					{ name:"审核中"},
					{ name:"出售中" },
					{ name:"已下架"},
					{ name:"库存预警" },
					{ name:"回收站" },
				],
				form:{
					name:"",
					code:"",
					type:"",
					category:""
				}
			}
		},
		methods: {
			// 加载数据
			handleClick(tab,event) {
				console.log(tab.index);
			},
			// 清空筛选条件
			clearSearch(){
				this.form = {
					name:"",
					code:"",
					type:"",
					category:""
				}
				// this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
			},
			// 搜索事件
			searchEvent(e){
				// 简单搜索
				if (typeof e === 'string') {
					return console.log('简单搜索',e);
				}
				// 高级搜索
				console.log('搜索事件');
			}
		},
	}
</script>

<style>
</style>
