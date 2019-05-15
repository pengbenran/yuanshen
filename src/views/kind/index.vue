<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="24">
          <el-button type="success"  icon="el-icon-plus" @click="AddGoodsCat">分类新增</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="GoodsCatList" tooltip-effect="dark" style="width: 100%">
          <el-table-column align="center"  prop="itemName" label="分类名称"></el-table-column>
          <el-table-column align="center"  prop="isRoot" label="是否为根级">
            <template slot-scope="scope">
                <el-tag :type="scope.row.isRoot == 1 ? 'error' : 'success' ">{{ scope.row.isRoot == 2? '否' : '是' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center"  prop="itemImg" label="分类图片">
             <template slot-scope="scope" v-if="scope.row.isRoot == 1">
                <img :src="scope.row.itemImg" :alt="scope.row.itemName" width="60">
             </template>
          </el-table-column>
          <el-table-column align="center"  prop="parentName" label="父级Id" >
             <template slot-scope="scope">
                <el-tag type='success'>{{scope.row.parentName == null ? '根级' : scope.row.parentName}}</el-tag>
             </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <GoodsCatAddDialog ref="GoodsCatAddDialog" @ImgClick="ImgClick" @GetDataLits="GetDataLits" :addFrom='addFrom'/>
    <GoodsCatEditDialog ref="GoodsCatEditDialog" @ImgClick="ImgClick" @GetDataLits="GetDataLits" :editFrom='editFrom'/>
    <!-- 图片裁剪 -->
    <uploadImg :proportion="proportion" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
  </div>
</template>

<script>
 import uploadImg from '@/components/UpLoadImg/UpLoadImg'
 import {GetList,DeleteList,GetRootList} from "@/api/kind";
import GoodsCatAddDialog from './component/GoodsCatAddDialog'
import GoodsCatEditDialog from './component/GoodsCatEditDialog'
// import Pagination from '@/components/Pagination'
  export default {
    components: {GoodsCatAddDialog,GoodsCatEditDialog,uploadImg},
    data () {
      return {
        loading:false,
        GoodsCatList:[],
        AddDialogShow:false,
        listQuery:{
          page: 1,
          limit: 10,
        },
        editFrom:{},
        addFrom:{
         parentId:'',
         parentName:'',
         isRoot:'1',
         itemImg:'',
         itemName:'',
         rank:0,
         itemDeclare:''
       },
       proportion:0.579,
       total:10,
       tagarr:[],
       rootList:[]
      }
    },
    mounted () {
        this.GetDataLits();
        this.getRootList()
    },
    methods: {
      GetDataImg(ImgUrl){
        let that=this
        this.addFrom.itemImg=ImgUrl
        this.editFrom.itemImg = ImgUrl
      },
       ImgClick(){
        let that=this
        that.$refs.UploadImg.showDialog(true)
      } , 

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            DeleteList(row).then(res => {
              if(res==''){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetDataLits();
              }else{
                  this.$message.error('删除失败');
              }
              that.loading = false;
            }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },



      //获取分类数据
      GetDataLits(){ 
          let that = this;
          GetList().then(res =>{
              if(res != undefined){
                that.GoodsCatList = res
              }else{
                that.$message.error('失败');
              }
          }).catch(err => {
              that.$message.error('失败');
          })
      },
      // 获取根分类
      getRootList(){
        let that=this
        GetRootList().then(function(res){
          that.rootList=res
        })
      },



      //添加商品分类
      AddGoodsCat(){
        let that = this;
        that.$refs.GoodsCatAddDialog.DiaLogShow(that.rootList)
      },
      
      //编辑数据 index下标、row指定当前条数据
      handlEdit(row){
        let that = this;
        that.editFrom=row
        console.log(that.rootList);
        this.$refs.GoodsCatEditDialog.EditDiaLogShow(that.rootList)
      }   
    }
  }
</script>

<style lang="scss">
  
</style>
