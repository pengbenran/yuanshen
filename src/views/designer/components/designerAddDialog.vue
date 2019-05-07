<template>
 <el-dialog title="首页banner新增" :visible.sync="addFormVisible">
        <el-form :model="addFrom" ref="advertform">
          <el-form-item label="设计师姓名" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="addFrom.name"  autocomplete="off" placeholder="请输入设计师姓名"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="图片路径" :label-width="formLabelWidth">
           <el-col width='400' v-if="addFrom.url==''">
            <i class="el-icon-plus avatar-uploader-icon" @click="ImgClick"></i>
          </el-col>
          <el-col width='400' v-else>
            <img :src="addFrom.url" mode='widthFix' style="width:100%"  @click="ImgClick">
          </el-col>
          <el-alert title="注：设计师介绍图片比例为2.8 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="addFrom.sorts"  autocomplete="off" placeholder="请输入排列顺序"></el-input>
            </div>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
</template>
<script type="text/javascript">
  // import Api_adv from '@/api/adv'
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
        Api_adv.HomeBannerSave(that.addFrom).then(function(res){
          if(res.code==0){
           that.$message.success({
            showClose: true,
            message: "新增成功",
            duration: 2000
          });
          that.addFormVisible = false;
          that.$emit('getHomeBanner');
          }
          else{
             that.$message.error({
                  showClose: true,
                  message: "新增失败",
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
