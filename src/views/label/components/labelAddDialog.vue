<template>
 <el-dialog title="标签新增" :visible.sync="addFormVisible">
        <el-form :model="addFrom" ref="advertform">
          <el-form-item label="标签名称" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="addFrom.name"  autocomplete="off" placeholder="请输入标签名称"></el-input>
            </div>
          </el-form-item> 
          <el-form-item label="标签名称" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="addFrom.labelCode"  autocomplete="off" placeholder="请输入标签编码"></el-input>
            </div>
          </el-form-item> 
          <el-form-item label="标签描述" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="addFrom.labelDeclare"  autocomplete="off" placeholder="请输入标签描述"></el-input>
            </div>
          </el-form-item>    
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
</template>
<script type="text/javascript">
  import {labelAdd} from '@/api/label'
	export default {
		props: ['addFrom'],
		data () {
			return {
				addFormVisible:false,
				formLabelWidth: '120px',
			}
		},
    methods:{
      showAddDialog(){
            let that = this;
            that.addFormVisible = true;
      },
      ImgClick(){
            this.$emit('ImgClick');
      },
      submit(){
        let that=this
        labelAdd(that.addFrom).then(function(res){
          if(res==''){
           that.$message.success({
            showClose: true,
            message: "新增成功",
            duration: 2000
          });
          that.addFormVisible = false;
          that.$emit('getLabelList');
          }
          else{
             that.$message.error({
                  showClose: true,
                  message: res.message,
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
