<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto mt-5 pt-5" style="height: 500px;">
					<div class="card">
						<div class="card-header  bg-white">
							<h3 class="text-center mb-0">剑来管理系统</h3>
						</div>
						<div class="card-body">
							<el-form ref="loginForm" :model="form" :rules="rules">
								<el-form-item prop="username">
									<el-input 
										v-model="form.username" 
										size="medium"								
										placeholder="请输入用户名"
									></el-input>									
								</el-form-item>
								<el-form-item prop="password">
									<el-input
										v-model="form.password" 
										size="medium"
										type="password"
										placeholder="请输入密码"
									></el-input>
								</el-form-item>
								<el-button 
									class="w-100"
									size="medium"
									type="primary"
									@click ="submit"
								>立即创建</el-button>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				form:{
					username: "",
					password: ""
				},
				rules:{
					username:[
						{required:true,message:"请输入用户名",trigger:'blur'}
					],
					password:[
						{required:true,message:"请输密码",trigger:'blur'}
					]
				}
			}
		},
		methods:{
			submit(){
				this.$refs.loginForm.validate((res) =>{
					if(!res) return;
					this.$router.push({name:'index'})
				})
			}
		}
	}
</script>

