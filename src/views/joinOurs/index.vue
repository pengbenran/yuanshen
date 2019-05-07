<template>
  <div class="app-container">
      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="8" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="邮箱"/>
                </div>
            </el-col>
            <el-col :span="16"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
            </el-col>
        </el-row>      
      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="id" prop="id"/>
          <el-table-column align="center" label="标题" prop="title"/>
          <el-table-column align="center" label="内容" prop="content"/>
          <el-table-column align="center" label="邮箱" prop="emile"/>
          <el-table-column align="center" label="状态" prop="status">
              <template slot-scope="scope">
                  <el-tag type="info" v-if="scope.row.status == 1">待处理</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="提交时间" prop="subTime"/>
          <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="removeMemberLevel(scope.row)">处理</el-button>
                <el-button size="mini" type="danger" @click="removeMemberLevel(scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-card>
        <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDataList" /> -->
  </div>
</template>
<script>
// import API from '@/api/member'
// import Pagination from '@/components/Pagination' 
  export default {
    components:{},
    data () {
      return {
        List:[{id:1,title:'我要加盟',content:'我要加盟请联系我',emile:'77737327@qq.cm',subTime:'2019-05-01 11:22:22',status:1},{id:2,title:'我要加盟',content:'我要加盟请联系我',emile:'77737327@qq.cm',subTime:'2019-05-01 11:22:22',status:1},{id:3,title:'我要加盟',content:'我要加盟请联系我',emile:'77737327@qq.cm',subTime:'2019-05-01 11:22:22',status:2},],
        listLoading:false,
        listQuery: {
          page: 1,
          limit: 10,
        },
        total:8,
      }
    },
    mounted () {
    },
    methods: { 
      handleFilter(){

      },
      
      //删除
      async removeMemberLevel(row){
        let that = this;
        let data;
        let conRes = await that.$confirm('是否删除该用户银行卡信息？','提示',{
             confirmButtonText:'删除',
             cancelButtonText:'取消',
             type:'warning'
         }).then(()=>{
           API.removeBankCard(row).then(function(res){
             that.GetDataList();
           })
         }).catch(() => {
            
         });
      },
    }
  }
</script>

<style lang="scss">
  
</style>
