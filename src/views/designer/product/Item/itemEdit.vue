<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="产品名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品英文名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.egName" placeholder="请输入英文名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品中心背景图" :label-width="formLabelWidth"  prop="lordImg">
      <div class="avatar-uploader"   @click="UpLoadShow(1)">
        <img v-if="designerDto.lordImg" :src="designerDto.lordImg" class="avatar">
      </div>
    </el-form-item>
    <!--<el-form-item label="产品详情" :label-width="formLabelWidth"  prop="subject">
      <Editors v-model="designerDto.imgUrls[0]" ref="Editor"/>
    </el-form-item> -->
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
import {PItemEdit} from "@/api/product"
export default {
  data() {
    return { 
      designerDto: {
       lordImg:'',
       isLarge:"1",
      },
      selectType:'',
      selectIndex:'',
      proportion:1.742,
      formLabelWidth:'120px'
    }
  },
  components:{Editors,Uploadimg},
  mounted(){
    let that=this
    this.designerDto = this.$route.query;
  },
  methods: {
   UpLoadShow(type,index){
    let that=this
    that.selectType=type
    index != undefined ? that.selectIndex=index : that.selectIndex=undefined
    that.$refs.UploadImg.showDialog(true)
   },


   // 设计师新增
   submit(){
    let that=this
    PItemEdit(that.designerDto).then(function(res){
        if(res==''){
          that.$router.push({path:'/product'})
        }
      })
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

