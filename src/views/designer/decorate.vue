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
      <el-table :data="decorateList" highlight-current-row style="width: 100%;">
        <el-table-column label="装饰设计编号" prop="id">
        </el-table-column>
        <el-table-column label="装饰设计名称" prop="name">
        </el-table-column>
        <el-table-column  label="装饰设计背景图"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.lordImg" width="80" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="jumpEdit(scope.row.id,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeDesiginer(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import {decorateList,decorateDelete} from '@/api/decorate'
  export default {
    data () {
      return {
        decorateList:[],
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
        catBackgroundId:'',
        listQuery:{
          key:'',
          pageIndex:0,
          pageSize:10
        }
      }
    },
    mounted () {
      let that=this
      that.getDecorateList()
    },
    components: {},
    methods: { 
      // 获取设计师列表
      getDecorateList(){
        let that=this
        decorateList(that.listQuery).then(function(res){
          that.decorateList=res
        })
      },
      // 删除设计师
      removeDesiginer(id){
        let params={}
        let that=this
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
         params.id=id
         decorateDelete(params).then(function(res){
          if(res==""){
            that.$message.success({
              showClose: true,
              message: "删除成功",
              duration: 2000
            }); 
            that.getDecorateList()
          }
        })
        })  
      },
      //编辑
      jumpEdit(id,row){
        let that = this;
        that.$router.push({ path: '/decorate/decorateEdit',query:row })
      },
      // 新增
      jumpDesignerAdd(){
        let that = this;
        that.$router.push({ path: '/decorate/decorateAdd' })
      } 
    }
  }
</script>

<style lang="scss">
 
</style>
