<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="装饰名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="装饰背景图" :label-width="formLabelWidth"  prop="lordImg">
      <div class="avatar-uploader"   @click="UpLoadShow(1.76)">
        <img v-if="designerDto.lordImg" :src="designerDto.lordImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon">
        </i></div>
    </el-form-item> -->

    <el-form-item label="装饰作品集" :label-width="formLabelWidth"  prop="photo">
      <div class="avatar-uploader1" v-for="(item,index) in designerDto.imgUrls" :key="item" :index='index'  @click="UpLoadShow(1,index)">
        <img :src="item" class="avatar boxImg">
      </div>
      <div class="avatar-uploader1"  @click="UpLoadShow(1,-1)">
        <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
      </div>
    </el-form-item>
 
  </el-form>
   <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :proportion='proportion'/>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/Editor";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
import {decorateUpdate} from "@/api/decorate"
export default {
  data() {
    return { 
      designerDto: {
       lordImg:'',
       imgUrls:[]
      },
      selectType:'',
      selectIndex:'',
      proportion:1,
      formLabelWidth:'120px'
    }
  },
  components:{Editor,Uploadimg},
  mounted(){
    let that=this
    this.designerDto = this.$route.query;
  },
  methods: {
   // 设计师新增
   submit(){
    let that=this
    decorateUpdate(that.designerDto).then(function(res){
        if(res==''){
          that.$router.push({path:'/decorate'})
        }
      })
   },

   UpLoadShow(proportion,index){
    let that=this
    that.proportion=proportion
    that.selectIndex=index
    that.$refs.UploadImg.showDialog(true)
   },

    //图片返回赋值
    GetDataImg(ImgUrl){
      let that = this;
      if(that.proportion==1.76){
        that.designerDto.lordImg=ImgUrl
      }
      else{
        if(that.selectIndex==-1){
          that.designerDto.imgUrls.push(ImgUrl)
        }
        else{
          that.designerDto.imgUrls[that.selectIndex]=ImgUrl
        }
      }    
    }
  }
}
</script>

<style scoped>
.imagesBox{
display: inline-block;height: 313px;width: 313px;
}
.imagesBoxList{
    display: inline-block;height: 180px;width: 180px;
}
.avatar-uploader,.avatar-uploader1{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader,.avatar-uploader-icon img{
    font-size: 28px;
    color: #8c939d;
    width: 313px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader1,.avatar-uploader-icon1 img{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader1 .boxImg{
    display: inline-block;height: 178px;width: 178px;
}
.avatar-uploader .avatar{
    display: inline-block;height: 178px;width: 313px;
}
</style>

