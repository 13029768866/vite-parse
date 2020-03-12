<template>
	<div>
		
	<el-container style="position: absolute;top: 55px;bottom: 0;left: 0;right: 0;">
		<el-header class="d-flex align-items-center border-bottom">
			<!-- 头部 -->
			<div class="d-flex mr-auto align-items-center">
				<el-select class="mr-2" placeholder="请选择图片排序方式" 
				size="mini" v-model="searchForm.order"
				style="width: 150px;">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
				<el-input class="mr-2" size="mini" 
				placeholder="输入相册名称" v-model="searchForm.keyword"
				style="width: 150px;"></el-input>
				<el-button type="success" size="mini" >搜索</el-button>
			</div>
			<el-button type="warning" size="mini"
			@click="unChoose" v-if="chooseList.length > 1">
							取消选中</el-button>
			<el-button type="danger" size="mini"
			@click="imageDel(null)" v-if="chooseList.length > 1">
			批量删除</el-button>
			<el-button type="success" size="mini" @click="photoAblumAddOrEdit(-1)">创建相册</el-button>
			<el-button type="warning" size="mini"
				@click="uploadModel = true"
			>上传图片</el-button>
		</el-header>
		
		<el-container>
		<el-aside width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;" class="bg-white border-right">
			<!-- 侧边 | 相册列表-->
			<ul class="list-group list-group-flush">
				<li class="list-group-item list-group-item-action d-flex align-items-center" style="cursor: pointer;" 
				v-for="(item,index) in phototAlbums" :key="index"
				:class="{'active sum-active':photoAlbumIndex === index}"
				@click.stop="albumChange(index)">
					{{item.name}}  
					<el-dropdown class="ml-auto">
						<span class="btn btn-light btn-sm border">
						{{item.num}}
						<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
						<el-dropdown-item
							@click.stop.native="photoAblumAddOrEdit(index)"
						>修改</el-dropdown-item>
						<el-dropdown-item
							@click.stop.native = "photoAlbumDel(index)"
						>删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

				</li>
			</ul>
			
		</el-aside>
		<el-container>
			<el-main style="position: absolute;top: 60px;left:200px;bottom: 60px;right: 0;">
				<!-- 主内容 -->
				<el-row :gutter="10">
					<el-col :span="24" :lg="4" :md="6" :sm="8"
				v-for="(item,index) in imageList" :key="index">
				
					<el-card class="box-card mb-3 position-relative" 
					style="cursor: pointer;"
					:body-style="{'padding':'0'}" shadow="hover">
					
						<div class="border"
						:class="{'border-danger':item.ischeck}">
							
							<span class="badge badge-danger"
							style="position: absolute;right: 0;top: 0;"
							v-if="item.ischeck">
							{{item.checkOrder}}</span>
						
							
							<img :src="item.url" class="w-100" 
							style="height: 100px;" 
							@click="chooseImage(item)"/>
							<div class="w-100 text-white px-1" style="background: rgba(0,0,0,0.5);margin-top: -25px;position: absolute;">
								<span class="small">{{item.name}}</span>
							</div>
							
							<div class="p-2 text-center">
								<el-button-group>
									<el-button icon="el-icon-view" size="mini" class="p-2" @click="previewImage(item)"></el-button>
									<el-button icon="el-icon-edit" size="mini" class="p-2" @click="imageEdit(item,index)"></el-button>
									<el-button icon="el-icon-delete" size="mini" class="p-2" @click="imageDel(index)"></el-button>
								</el-button-group>
							</div>
							
						</div>						
					</el-card>
				</el-col>
				</el-row>			 
			</el-main>
		</el-container>
		</el-container>
		
		<el-footer class="border-top d-flex align-items-center px-0">
			<!-- 底部 -->
			<div style="width: 200px; flex-shrink: 0;" class="h-100 d-flex align-items-center justify-content-center border-right">
				<el-button-group>
					<el-button size="mini">上一页</el-button>
					<el-button size="mini">下一页</el-button>
				</el-button-group>
			</div>
			<div style="flex: 1;" class="px-2">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
			</el-pagination>
			</div>
		</el-footer>
	</el-container>
	
	<!-- 修改|创建相册 -->
	<el-dialog :title="photoAlbumTitle" :visible.sync="photoAlbumModel">
		<el-form ref="form" :model="photoModelForm" label-width="80px">
			<el-form-item label="相册名称">
				<el-input v-model="photoModelForm.name" size="medium"
				placeholder="请输入相册名称"></el-input>
			</el-form-item>
			<el-form-item label="相册排序">
				<el-input-number v-model="photoModelForm.order" 
				:min="0" size="medium"
				></el-input-number>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="photoAlbumModel = false">取 消</el-button>
			<el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
		</div>
	</el-dialog>
	
	<!-- 上传图片 -->
	<el-dialog title="上传图片" :visible.sync="uploadModel">
		
		<div class="text-center">
		<el-upload
			class="upload-demo w-100"
			drag
			action="https://jsonplaceholder.typicode.com/posts/"
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
		</div>
	</el-dialog>
	
	<!-- 预览图片 -->
	<el-dialog :visible.sync="previewModel" width="60vw" top="5vh">
		<div style="margin: -60px -20px -30px -20px;">
			<img :src="previewUrl" class="w-100" />
		</div>
	</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchForm:{
					order:"",
					keyword:""
				},
				// 相册相关变量
				photoAlbumIndex:0,
				phototAlbums:[],
				photoAlbumModel:false,
				photoAlbumEditIdx: -1,
				photoAlbumTitle: "",
				photoModelForm:{
					name: '',
					order: 0
				},
				uploadModel: false,
				/* 照片区域 */
				previewModel:false,
				previewUrl:"",
				imageList:[],
				// 选中相片数组
				chooseList:[],
				currentPage: 1
				
			}
		},
		mounted() {
			this.__init()
		},
		methods: {
			__init() {
				for (let i = 0; i < 20; i++) {
					this.phototAlbums.push({
						name:"相册"+i,
						num:Math.floor(Math.random()*100),
						order:0
					})
				}
				
				for (let i = 0; i < 30; i++) {
					this.imageList.push({ 
						id:i,
						url:"https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
						name:`图片${i}`,
						ischeck:false,
						checkOrder:0
					})
				}
			},
			/* 相册方法 */
			// 切换相册
			albumChange(index){
				this.albumIndex = index
			},
			// 删除相册
			photoAlbumDel(index){
				this.$confirm('是否删除该相册', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.phototAlbums.splice(index,1)
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				})
			},
			// 增加或修改相册信息
			photoAblumAddOrEdit(idx){
				// console.log(this.phototAlbums[idx])
				switch (idx){
					case -1:			
						this.photoModelForm = {
							name:"",
							order:0
						}
						this.photoAlbumTitle = "创建相册"
						this.photoAlbumEditIdx = idx
						this.photoAlbumModel = true
						break;					
					default:
						let photoInfo = this.phototAlbums[idx]
						this.photoAlbumEditIdx = idx
						this.photoModelForm.name = photoInfo.name
						this.photoModelForm.order = photoInfo.order
						this.photoAlbumTitle = "修改相册"
						this.photoAlbumModel = true
						break;
				}
				
			},
			/* 模态框方法 */
			confirmAlbumModel(){			
				if(this.photoAlbumEditIdx > -1){
					this.confirmAdd()
				}else{
					this.confirmEdit()
				}				
			},
			/* 确认增加 */
			confirmAdd(){
				let photoInfo = this.phototAlbums[this.photoAlbumEditIdx]
				photoInfo.name = this.photoModelForm.name
				photoInfo.order = this.photoModelForm.order
			
				this.photoAlbumModel = false
			},
			/* 确认修改 */
			confirmEdit(){
				this.phototAlbums.unshift({
					name: this.photoModelForm.name,
					order: this.photoModelForm.order,
					num: 0
				})			
				this.photoAlbumModel = false
			},
			// 预览图片
			previewImage(item){
				this.previewUrl = item.url
				this.previewModel = true
			},
			// 修改图片名称
			imageEdit(item,index){
				this.$prompt('请输入新名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue:item.name,
					inputValidator(val){
						if (val === '') {
							return '图片名称不能为空'
						}
					}
				}).then(({ value }) => {
					item.name = value
					this.$message({
						message: '修改成功',
						type: 'success'
					});
				})
			},
			// 删除当前图片
			imageDel(index){
				console.log(index)
				this.$confirm(index != null?'是否删除该图片?':'是否删除选中图片?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(index != null){
						this.imageList.splice(index,1)
					}else{
						this.imageList = this.imageList.filter(img =>{
							return !this.chooseList.some(choose => choose.id === img.id)
						})
						this.chooseList = []
					}					
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				})
			},
			// 选择相片
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
			},
			/* 取消选中 */
			unChoose(){
				this.imageList.map(img => {
				 let idx =	this.chooseList.findIndex(choose => choose.id === img.id)
				 if(idx > -1){
					 img.ischeck = false
					 img.checkOrder = 0
					 this.chooseList.splice(idx,1)
				 }				
				})
			},
			handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			}
			
		},
	}
</script>

<style>
.sum-active{
	color: #67C23A!important;
    background-color: #f0f9eb!important;
    border-color: #c2e7b0!important;
}
</style>
