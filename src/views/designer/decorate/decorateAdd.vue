<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="装饰名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
   <el-form-item label="装饰作品集" :label-width="formLabelWidth"  prop="photo">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in designerDto.imgUrls" :key="item" :index='index'  @click="UpLoadShow(1,index)">
        <img :src="item" class="avatar boxImg">
         <span  @click.stop='deleImg(item,index)'><i class="el-icon-delete"></i></span>
      </div>
      <div class="avatar-uploader imagesBoxList"  @click="UpLoadShow(1,-1)">
        <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
      </div>
    </el-form-item>
  </el-form>
   <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :proportion='proportion'/>
   <upImg @UpListImg='UpListImg'  ref='upImg' />
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/Editor";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
import upImg from '@/components/UpImgList/index'
import {adornAdd} from "@/api/designer"
export default {
  data() {
    return { 
      designerDto: {
       lordImg:'',
       imgUrls:[]
      },
      selectType:'',
      selectIndex:'',
      proportion:1.76,
      formLabelWidth:'120px'
    }
  },
  components:{Editor,Uploadimg,upImg},
  mounted(){
    let that=this
    
  },
  methods: {
   UpLoadShow(proportion,index){
    let that=this
    that.proportion=proportion
    that.selectIndex=index
    that.$refs.UploadImg.showDialog(true)
   },

 //批量上传回调
       UpListImg(ImgUrl){
        this.designerDto.imgUrls.push(ImgUrl)
      },

      //删除
      deleImg(img,index){
        this.designerDto.imgUrls.splice(index,1)
      },
   // 设计师新增
   submit(){
    let that=this
    adornAdd(that.designerDto).then(function(res){
        if(res==''){
          that.$router.push({path:'/decorate'})
        }
      })
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
.avatar-uploader,.avatar-uploader-icon img{
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
.dialog-footer{margin-top:20px; }
</style>

