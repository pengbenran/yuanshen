<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="primary" @click="AddGoods">新增商品</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="GoodsList" tooltip-effect="dark" style="width: 100%">
          <el-table-column align="center" prop="sn"  label="商品编号"></el-table-column>
          <el-table-column align="center" prop="goodName"  label="商品名称"></el-table-column> 
          <el-table-column align="center" prop="thumbnail"  label="商品图片">
            <template slot-scope="scope">
               <img :src="scope.row.thumbnail" width="80">
            </template>
          </el-table-column>  
          <el-table-column align="center" prop="price" label="价格" ></el-table-column>     
          <el-table-column align="center" prop="catName" label="所属分类" ></el-table-column>   
          <el-table-column align="center" prop="showSales" label="销量" ></el-table-column>
          <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetGoodsList" /> -->
      </el-col>
    </el-row>

   <!-- <GoodDialog ref="GoodDialog"/> -->
  </div>
</template>

<script>
// import API from '@/api/goods'
// import Pagination from '@/components/Pagination'
// import GoodDialog from './Component/GoodDialog'

  export default {
    components: { },
    data () {
      return {
        loading:false,
        GoodsList:[{catName: "实木家具",
        createTime: 1554628359302,
        goodName: "测试商品",
        id: 818256390164480,
        images: "https://image.etuetf.com/advImage/7a67c24e-3686-4d56-8ba7-b219eebb3e42.jpg",
        inventory: 75,
        price: 1,
        showSales: 1,
        sn: "1554628284936893062",
        thumbnail: "https://image.etuetf.com/advImage/48e19f1d-cb72-468e-8eb6-dffa304343cb.jpg"
        }],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       // this.GetGoodsList();
    },
    methods: {
      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            // API.DeleteGood({goodId:row.goodId}).then(res => {
            //   if(res.code == 0){
            //       this.$message({ message: '删除成功', type: 'success'});
            //       that.GetGoodsList();
            //   }else{
            //       this.$message.error('删除失败');
            //   }
            //   that.loading = false;
            // }).catch(err => {})
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
      handlEdit(index,row){
        let that = this;
        this.$router.push({
          path:'edit',
          query:row
        })
      },   
    }
  }
</script>

<style lang="scss">
  
</style>
