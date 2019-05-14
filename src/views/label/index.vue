<template>
    <div class="app-container">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="toLabelAdd">新增标签</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data='labelList' highlight-current-row style="width: 100%;">
        <el-table-column label="标签编号" prop="labelCode">
        </el-table-column>
        <el-table-column label="标签名称" prop="name">
        </el-table-column>
        <el-table-column label="标签描述" prop="labelDeclare">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeLabel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
    <labelAddDialog :addFrom='addFrom' ref="labelAddDialog" @getLabelList='getLabelList'></labelAddDialog>
      <!-- 编辑界面 -->
    <labelEditDialog :editFrom='editFrom' ref="labelEditDialog"></labelEditDialog>
  </div>
</template>

<script>
  import labelAddDialog from './components/labelAddDialog'
  import labelEditDialog from './components/labelEditDialog'
  import {labelList,labelDel} from '@/api/label'
  export default {
    data () {
      return {
        editFrom:{},
        addFrom:{
          name:'',
          id:'',
          labelCode:'',
          labelDeclare:'',
          labelImg:''
        },
        labelList:[],
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      that.getLabelList()
    },
    components: {labelAddDialog,labelEditDialog },
    methods: {
      // 获取首页banner
      getLabelList(){
        let that=this
        labelList().then(function(res){
          that.labelList=res
          // console.log('res',res)
        })
      },
      // 删除标签
      removeLabel(index,row){
        let that=this
        labelDel(row).then(function(res){
          if(res==''){
            that.$message.success({
              showClose: true,
              message: "删除成功",
              duration: 2000
            }); 
            that.getLabelList()
          }
        })
      },
      //编辑
     showEditDialog(index,row){
        let that = this;
        that.editFrom = row;
        that.$refs.labelEditDialog.showEditDialog()
      },
      // 新增
      toLabelAdd(){
        let that = this;
        that.$refs.labelAddDialog.showAddDialog()
      },
      GetDataImg(ImgUrl){
        let that=this
        this.addFrom.url=ImgUrl
        this.editFrom.url = ImgUrl
      },
      ImgClick(){
        let that=this
        that.$refs.UploadImg.showDialog(true)
      }  
    }
  }
</script>

<style lang="scss">
 
</style>
