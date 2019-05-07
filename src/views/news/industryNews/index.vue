<template>
    <div class="app-container">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--列表-->
      <el-table :data="newsList" highlight-current-row style="width: 100%;">
        <el-table-column label="行业新闻编号" prop="newsId">
        </el-table-column>
        <el-table-column label="行业新闻背景图" width='300'>
           <template slot-scope="scope">
            <img  :src="scope.row.bcgImg" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>

        <el-table-column label="新闻标题" prop="title">
        </el-table-column>
        <el-table-column label="发布时间" prop="createDate">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toNewsEdit(scope.$index)">编辑</el-button>
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
        newsList:[
        {createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        bcgImg:'https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg',
        content: "https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg"},
        {
        createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        bcgImg:'https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg',
        content: "https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg"},
        {
        createDate: "2019-04-13 15:19:13",
        newsId: 203,
        title: '我是一条新闻标题',
        bcgImg:'https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg',
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
      //编辑
      toNewsEdit(index){
        let that = this;
        that.$router.push({ path: 'industryNews/newsEdit?id='+index})
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
