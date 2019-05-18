<template>
    <div class="app-container">
    <el-row class="warp">
     <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="toNewsAdd" v-if="newsList.length<6">新增新闻</el-button>
          </el-form-item>
        </el-form>
      </el-col>
   <el-col :span="24" class="warp-main">
      <!--列表-->
      <el-table :data="newsList" highlight-current-row style="width: 100%;">
        <el-table-column label="新闻编号" prop="id">
        </el-table-column>
        <el-table-column label="新闻标题" prop="title">
        </el-table-column>
        <el-table-column label="新闻简介" prop="intro">
        </el-table-column>
        <el-table-column label="发布者" prop="author">
        </el-table-column>
        <el-table-column label="发布时间" prop="createTime">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toNewsEdit(scope.$index,scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeNews(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import {NewsDelete,NewsList} from "@/api/new"
  export default {
    data () {
      return {
        newsList:[],
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      that.getIndustryNewsList()
    },
    components: { },
    methods: {
       //获取新闻列表
    getIndustryNewsList(){
      let that = this;
      let params={}
      params.style =2   
      params.pageIndex=1
      params.pageSize=10
      NewsList(params).then(function(res){
        that.newsList=res
      })
    },

    //删除新闻列表
     removeNews(id){
        let that = this;
        that.loading = true;
        let params={}
        params.id=id
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            NewsDelete(params).then(res => {
              if(res == ''){
                that.$message({ message: '删除成功', type: 'success'});
                that.getIndustryNewsList()
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
      toNewsEdit(index,id){
        let that = this;
        that.$router.push({ path: `industryNews/newsEdit?id=${id}&index=${index}`})
      },
      // 新增
      toNewsAdd(){
        let that = this;
        that.$router.push({ path: 'industryNews/newsAdd' })
      }
    }
  }
</script>

<style lang="scss">
 
</style>
