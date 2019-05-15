<template>
    <div class="app-container">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="jumpDesignerAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="designerList" highlight-current-row style="width: 100%;">
        <el-table-column label="设计师编号" prop="id">
        </el-table-column>
        <el-table-column label="设计师姓名" prop="name">
        </el-table-column>
        <el-table-column prop="sorts" label="排序">
        </el-table-column>
        <el-table-column  label="设计师图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.url" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeMemberLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        designerList:[{name:'张三',createDate: "2019-04-03 09:53:18",
        goodId: 3,
        id: 196,
        sorts: 2,
        status: 1,
        type: 3,
        url: "https://1875.etuetf.com/banner/ea07c8d9-3c7e-4e12-a793-ce71f313633e.jpg"},
        {name:'张三',createDate: "2019-04-03 09:53:18",
        goodId: 3,
        id: 196,
        sorts: 2,
        status: 1,
        type: 3,
        url: "https://1875.etuetf.com/banner/ea07c8d9-3c7e-4e12-a793-ce71f313633e.jpg"},
        {name:'张三',createDate: "2019-04-03 09:53:18",
        goodId: 3,
        id: 196,
        sorts: 2,
        status: 1,
        type: 3,
        url: "https://1875.etuetf.com/banner/ea07c8d9-3c7e-4e12-a793-ce71f313633e.jpg"}],
        editFrom:{},
        addFrom:{
          goodId:'',
          type:3,
          url:'',
          status:1,
          sorts:''
        },
        showCropper:false,
        proportion:2.8,
        type:2,
        formLabelWidth:'120px',
        btnLoading:false,
        connectType:3,
        catBackgroundId:''
      }
    },
    mounted () {
      let that=this
    },
    components: {},
    methods: { 
      // 删除首页banner
      removeMemberLevel(index,row){
       
      },
      //编辑
      showEditDialog(index,row){
        let that = this;
        that.editFrom = row;
        that.$refs.designerEditDialog.showEditDialog()
      },
      // 新增
      jumpDesignerAdd(){
        let that = this;
        that.$router.push({ path: 'designerAdd' })
      },
      GetDataImg(ImgUrl){
        let that=this
        that.addFrom.url=ImgUrl
        that.editFrom.url = ImgUrl
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
