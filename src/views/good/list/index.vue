<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-button type="primary" @click="AddGoods">新增商品</el-button>
      </el-col>
      <el-col :span="8" >
        <div class="filter-container">
          <el-input v-model="listQuery.key" clearable class="filter-item" style="width: 300px;" placeholder="商品名称"/>
        </div>
      </el-col>
      <el-col :span="4"> 
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="GoodsList" tooltip-effect="dark" style="width: 100%">
          <el-table-column align="center" prop="id"  label="商品id"></el-table-column>
          <el-table-column align="center" prop="name"  label="商品名称"></el-table-column> 
          <el-table-column align="center" prop="imgUrls"  label="商品图片">
            <template slot-scope="scope">
               <img :src="scope.row.imgUrls[0]" width="80">
            </template>
          </el-table-column>  
          <el-table-column align="center" prop="price" label="价格" ></el-table-column>     
          <el-table-column align="center" prop="sales" label="销量" ></el-table-column>   
          <el-table-column align="center" prop="itemName" label="分类" ></el-table-column>
          <el-table-column align="center" prop="type" label="类型" ></el-table-column>   
          <el-table-column align="center" prop="sales" label="销量" ></el-table-column>
          <el-table-column align="center" prop="labels" label="标签" >
              <template slot-scope="scope">
                  <el-tag v-for="item in scope.row.labelNames">{{item}}</el-tag>
              </template>
          </el-table-column>          
          <el-table-column align="center" prop="createTime" label="添加时间" ></el-table-column>
          <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.row.id,scope.row.itemId)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="GetProData" />
      </el-col>
    </el-row>

   <!-- <GoodDialog ref="GoodDialog"/> -->
  </div>
</template>

<script>
import {GoodList,DeleteGood} from '@/api/good'
import Pagination from '@/components/Pagination/index'
import upImg from '@/components/UpImgList/index'
import {getKindDetail} from "@/api/kind";
// import GoodDialog from './Component/GoodDialog'


  export default {
    components: {Pagination,upImg},
    data () {
      return {
        loading:false,
        GoodsList:[],
        listQuery:{
          pageIndex: 1,
          pageSize: 10,
          key:''
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       // this.GetGoodsList();
       this.GetProData();//获取商品列表

    },
    methods: {
      handleFilter(){
        this.GetProData();
      },
      //获取商品列表
      GetProData(){
        let that = this;
        GoodList(that.listQuery).then(res => {
          if(res != ''){
            that.GoodsList = res.productList;
            that.total=res.pageInfo.total
          }
        })
      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        let data = {}
        data.id=row.id
        
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            DeleteGood(data).then(res => {
              if(res == ''){
                that.loading = false;
                that.$message({ message: '删除成功', type: 'success'});
                that.GetProData()
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
      //添加商品
      AddGoods(){
        let that = this;
        this.$router.push('add')
      },  
      //编辑数据 index下标、row指定当前条数据
      handlEdit(id,itemId){
        let that = this;
        let params={}
        params.id=itemId
        getKindDetail(params).then(function(res){
          that.$router.push({
            path:`edit?id=${id}&itemId1=${res.parentId}`
          })
        })
        
      },   
    }
  }
</script>

<style lang="scss">
  
</style>
