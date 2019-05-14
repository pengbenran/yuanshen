<template>
  <el-dialog title="标签编辑" :visible.sync="dialogFormVisible">
    <el-form :model="editFrom" ref="advertform">
      <el-form-item label="标签编号" :label-width="formLabelWidth" >
        <div class="inputGoods">
          <el-input v-model="editFrom.labelCode"  autocomplete="off" placeholder="请输入标签编号" disabled></el-input>
        </div>
      </el-form-item> 
      <el-form-item label="标签名称" :label-width="formLabelWidth" >
        <div class="inputGoods">
          <el-input v-model="editFrom.name"  autocomplete="off" placeholder="请输入标签名称"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="标签描述" :label-width="formLabelWidth" >
        <div class="inputGoods">
          <el-input v-model="editFrom.labelDeclare"  autocomplete="off" placeholder="请输入标签描述"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-foot er">
      <el-button @click.native="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="labelUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
  import {labelUpdate} from '@/api/label'
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
      // 修改标签
      labelUpdate(){
        let that=this
        labelUpdate(that.editFrom).then(function(res){
          if(res==''){
            that.$message.success({
              showClose: true,
              message: "更新成功",
              duration: 2000
            }); 
            that.dialogFormVisible = false;
            that.$emit('getLabelList');
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

</style>
