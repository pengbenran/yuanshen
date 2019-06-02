<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="产品名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品英文名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.egName" placeholder="请输入英文名称" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="绑定分类" :label-width="formLabelWidth"  prop="itemId">
        <el-select v-model="designerDto.itemId" placeholder="请选择"  @change='selectChange'>
        <el-option v-for="item in ItemList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item> 

    <el-form-item label="产品中心背景图" :label-width="formLabelWidth"  prop="lordImg">
      <div class="  "   @click="UpLoadShow(1)">
        <img v-if="designerDto.lordImg" :src="designerDto.lordImg" class="avatar">
      </div>
    </el-form-item>
    <el-form-item label="产品详情" :label-width="formLabelWidth"  prop="subject">
      <Editors v-model="designerDto.imgUrls[0]" ref="Editor"/>
    </el-form-item> 
   <!--  <el-form-item label="图片集" :label-width="formLabelWidth"  prop="photo">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in designerDto.imgUrls" :key="item" :index='index'  @click="UpLoadShow(2,index)">
        <img :src="item" class="avatar boxImg">
      </div>
      <div class="avatar-uploader imagesBoxList"  @click="UpLoadShow(2,1)">
        <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
      </div>
    </el-form-item> -->
 
  </el-form>
   <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :proportion='proportion'/>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
  </div>
</template>

<script>
import Editors from "@/components/Editor/Editor";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
import {decorateUpdate,PItemList} from "@/api/product"
export default {
  data() {
    return { 
      designerDto: {
       isLarge:"1",
       lordImg:'',
       imgUrls:[]
      },
      selectType:'',
      selectIndex:'',
      proportion:1,
      formLabelWidth:'120px',
      ItemList:[]
    }
  },
  components:{Editors,Uploadimg},
  mounted(){
    let that=this
    this.designerDto = this.$route.query;
    console.log(this.designerDto)
    if(this.designerDto.idx==0){
      that.proportion=0.819
    }
    else{
      that.proportion=1.742
    }
        this.getProductList();
  },
  methods: {
   UpLoadShow(type,index){
    let that=this
    that.selectType=type
    index != undefined ? that.selectIndex=index : that.selectIndex=undefined
    that.$refs.UploadImg.showDialog(true)
   },

 // 获取设计师列表
    getProductList(){
      let that=this
      PItemList({pageIndex:0,pageSize:10}).then(function(res){
        that.ItemList=res
      })
    },

   // 设计师新增
   submit(){
    let that=this
    decorateUpdate(that.designerDto).then(function(res){
        if(res==''){
          that.$router.push({path:'/product'})
        }
      })
   },

   //分类名称赋值
   selectChange(e){
     console.log("够啦啊是大",e)
       this.designerDto.itemName = this.ItemList.find(f => f.id == e).name;
   },

    //图片返回赋值
    GetDataImg(ImgUrl){
      let that = this;
      if(that.selectType==1){
        that.designerDto.lordImg=ImgUrl
      }
      else{
        that.selectIndex != undefined 
           ? that.designerDto.imgUrls.push(ImgUrl)
           : that.designerDto.imgUrls[that.selectIndex]=ImgUrl
      }    
    }
  }
}
</script>

<style scoped>
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .avatar{
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>

