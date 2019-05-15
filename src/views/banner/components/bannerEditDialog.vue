<template>
	<el-dialog title="首页banner编辑" :visible.sync="dialogFormVisible">
		<el-form :model="editFrom" ref="advertform">
			<el-form-item label="图片路径" :label-width="formLabelWidth">
				<el-col width='400'>
					<img :src="editFrom.imgUrl" mode='widthFix' style="width:100%"  @click="ImgClick">
				</el-col>
				<el-alert title="注：首页banner比例为2.14 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
			</el-form-item>
			<el-form-item label="banner标题" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="editFrom.title"  autocomplete="off" placeholder="请输入banner标题"></el-input>
            </div>
          </el-form-item> 
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="upData">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script type="text/javascript">
	import {bannerUpdate} from '@/api/banner'
	export default {
		props: ['editFrom'],
		data () {
			return {
				dialogFormVisible:false,
				formLabelWidth: '120px',
			}
		},
		methods:{
		  showEditDialog(){
            let that = this; 
            that.dialogFormVisible = true;
          },
          ImgClick(){
          	this.$emit('ImgClick');
          },
          upData(){
          	let that=this
          	bannerUpdate(that.editFrom).then(function(res){
          		if(res==''){
          			that.$message.success({
          				showClose: true,
          				message: "更新成功",
          				duration: 2000
          			});	
          			that.dialogFormVisible = false;
          			that.$emit('getBannerList');
          		}
          		else{
          			that.$message.error({
          				showClose: true,
          				message: "更新失败",
          				duration: 2000
          			});
          		}
          	})
          }
		}
	}
</script>
<style type="text/css" scoped>
.avatar-uploader-icon{
	width:100%;
	height: 142px;
	line-height:142px;
	text-align: center;
	font-size: 18px;
	border:  1px solid #ddd;
}
</style>
