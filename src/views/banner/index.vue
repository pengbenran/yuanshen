<template>
    <div class="app-container">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="bannerList" highlight-current-row style="width: 100%;">
        <el-table-column label="编号" prop="id">
        </el-table-column>
        <el-table-column prop="title" label="banner标题">
        </el-table-column>
        <el-table-column  label="banner图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.imgUrl" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="bannerDele(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加界面 -->
      <bannerAddDialog :addFrom='addFrom' ref="bannerAddDialog" @ImgClick="ImgClick"  @getBannerList="getBannerList"></bannerAddDialog>
      <!-- 编辑界面 -->
      <bannerEditDialog :editFrom='editFrom' ref="bannerEditDialog" @ImgClick="ImgClick" @getBannerList="getBannerList"></bannerEditDialog>
      <!-- 图片裁剪 -->
      <uploadImg :proportion="proportion" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import bannerEditDialog from './components/bannerEditDialog'
  import bannerAddDialog from './components/bannerAddDialog'
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
  import {bannerList,bannerDele} from '@/api/banner'
  export default {
    data () {
      return {
        bannerList:[],
        editFrom:{},
        addFrom:{
          imgUrl:'',
          title:'',
          rank:'0',
        },
        proportion:2.14,
        type:2,
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      that.getBannerList()
    },
    components: { bannerEditDialog,bannerAddDialog,uploadImg},
    methods: {
      // 获取首页banner
      getBannerList(){
        let params={}
        let that=this
        params.pageIndex=0
        params.pageSize=10
        bannerList(params).then(function(res){
          that.bannerList=res
        })
      },
      // 删除首页banner
      bannerDele(id){
        let that=this
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        let params={}
        params.id=id
        bannerDele(params).then(function(res){
          if(res==''){
            that.$message.success({
              showClose: true,
              message: "删除成功",
              duration: 2000
            }); 
            that.getBannerList()
          }
        })
      })
        
      },
      //编辑
      showEditDialog(index,row){
        let that = this;
        that.editFrom = row;
        that.$refs.bannerEditDialog.showEditDialog()
      },
      // 新增
      showAddDialog(){
        let that = this;
        that.$refs.bannerAddDialog.showAddDialog()
      },
      GetDataImg(ImgUrl){
        let that=this
        this.addFrom.imgUrl=ImgUrl
        this.editFrom.imgUrl = ImgUrl
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
