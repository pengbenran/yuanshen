<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="产品名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品英文名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.egName" placeholder="请输入英文名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="主图" :label-width="formLabelWidth"  prop="lordImg">
      <div class="avatar-uploader"   @click="UpLoadShow(1)">
        <img v-if="designerDto.lordImg" :src="designerDto.lordImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon">
        </i></div>
    </el-form-item>
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
import {PItemAdd} from "@/api/product"
export default {
  data() {
    return { 
      designerDto: {
       isLarge:"1",
       lordImg:'',
    //    imgUrls:[]
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
    PItemAdd(that.designerDto).then(function(res){
        if(res==''){
          that.$router.push({path:'/product/ItemList'})
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
.imagesBox{
display: inline-block;height: 178px;width: 1780px;
}
.imagesBoxList{
    display: inline-block;height: 180px;width: 313px;
}
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .avatar-uploader-icon,.avatar-uploader img{
    font-size: 28px;
    color: #8c939d;
    width: 313px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader .boxImg{
    display: inline-block;height: 178px;width: 313px;
}
.avatar-uploader .avatar{
    display: inline-block;height: 178px;width: 313px;
}
</style>

