<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="设计师姓名" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入设计师姓名" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="设计师性别" :label-width="formLabelWidth"  prop="sex">
      <el-radio v-model="designerDto.sex" label="1">男</el-radio>
     <el-radio v-model="designerDto.sex" label="2">女</el-radio>
   </el-form-item>
    <el-form-item label="设计师年龄" :label-width="formLabelWidth"  prop="age">
      <el-input v-model="designerDto.age" placeholder="请输入设计师年龄" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="设计师简介" :label-width="formLabelWidth"  prop="introduce">
      <el-input v-model="designerDto.introduce" placeholder="请输入设计师简介" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="设计师头像" :label-width="formLabelWidth"  prop="photo">
      <div class="avatar-uploader"   @click="UpLoadShow(1)">
        <img v-if="designerDto.photo" :src="designerDto.photo" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i></div>
    </el-form-item>
    <el-form-item label="设计师作品集" :label-width="formLabelWidth"  prop="images">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in designerDto.imgReels" :key="index" :index='index' @click="UpLoadShow(2,index)">
        <img :src="item" class="boxImg">
        <span @click.stop='deleImg(index)'><i class="el-icon-error"></i></span>
      </div>
      <upImg @UpListImg='UpListImg'  ref='upImg' />
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
import upImg from '@/components/UpImgList/index'
import {desiginerAdd} from "@/api/designer"
export default {
  data() {
    return { 
      designerDto: {
        introduce:'',
        photo:'',
        imgReels:[]
      },
      selectType:'',
      selectIndex:'',
      proportion:1,
      formLabelWidth:'120px'
    }
  },
  computed:{
  
  },
  components:{Uploadimg,upImg},
  methods: {
   UpLoadShow(type,index){
    let that=this
    that.selectType=type
    that.selectIndex=index
    that.$refs.UploadImg.showDialog(true)
   },
   // 设计师新增
   submit(){
    let that=this
    desiginerAdd(that.designerDto).then(function(res){
      if(res==''){
        that.$router.push({path:'/designer'})
      }
    })
   },
       //批量上传回调
       UpListImg(ImgUrl){
        this.designerDto.imgReels.push(ImgUrl)
      },

      //删除
      deleImg(index){
        this.designerDto.imgReels.splice(index,1)
      },


   
    //图片返回赋值
    GetDataImg(ImgUrl){
      let that = this;
      if(that.selectType==1){
        that.designerDto.photo=ImgUrl
      }
      else{
        that.designerDto.imgReels.splice(that.selectIndex,1)
        that.designerDto.imgReels.push(ImgUrl)
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
    display: inline-block;height: 180px;width: 180px;
}
.imagesBoxList span{width: 3rem;height: 3rem;position: absolute;right:0;top:0;}
.imagesBoxList span i{font-size: 1.4rem;}
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader .boxImg{
    display: inline-block;height: 178px;width: 178px;
}
.avatar-uploader .avatar{
    display: inline-block;height: 178px;width: 178px;
}
</style>

