<template>
    <div class="app-container">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="toNewsAdd">新增新闻</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="newsList" highlight-current-row style="width: 100%;">
        <el-table-column label="新闻编号" prop="newsId">
        </el-table-column>
        <el-table-column label="新闻标题" prop="title">
        </el-table-column>
        <el-table-column label="发布时间" prop="createDate">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toNewsEdit(scope.$index)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeNews(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import {DeleteNew} from "@/api/new"
  export default {
    data () {
      return {
        newsList:[
        {createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        content: "https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg"},{createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        content: "https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg"},{createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        content: "https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg"}],
        editFrom:{},
        addFrom:{
          goodId:'',
          type:1,
          url:'',
          status:1,
          sorts:''
        },
        proportion:2.8,
        type:2,
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      // that.getHomeBanner()
    },
    components: { },
    methods: {
      // 获取首页banner
      // getHomeBanner(){
      //   let params={}
      //   let that=this
      //   that.addFrom={goodId:'',type:1,url:'',status:1,sorts:''}
      //   params.type=1
      //   Api_adv.HomeBannerList(params).then(function(res){
      //     that.bannerList=res.rows
      //   })
      // },
      // 删除首页banner
      // removeMemberLevel(index,row){
      //   let that=this
      //   Api_adv.HomeBannerDel(row).then(function(res){
      //     if(res.code==0){
      //       that.$message.success({
      //         showClose: true,
      //         message: "删除成功",
      //         duration: 2000
      //       }); 
      //       that.getHomeBanner()
      //     }
      //   })
      // },

    //获取新闻列表
    GetNewsList(){
      let that = this;

    },

    //删除新闻列表
     removeNews(index,row){
        let that = this;
        that.loading = true;
        // let data = {
        //   ids:[row.id]
        // }
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            DeleteNew(row).then(res => {
              if(res == ''){
                that.$message({ message: '删除成功', type: 'success'});
              }else{
                that.$message.error('失败');
              }
            }).catch(err => {
              that.$message.error('失败');              
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
     },
   

      //编辑
      toNewsEdit(index){
        let that = this;
        that.$router.push({ path: 'companyNews/newsEdit?id='+index})
      },
      // 新增
      toNewsAdd(){
        let that = this;
        that.$router.push({ path: 'companyNews/newsAdd' })
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
