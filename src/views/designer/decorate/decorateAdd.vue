<template>
  <div class="app-container">
   <el-form :model="designerDto" ref="AddruleForm">
    <el-form-item label="装饰名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="designerDto.name" placeholder="请输入装饰名称" autocomplete="off"></el-input>
    </el-form-item>
   <el-form-item label="装饰作品集" :label-width="formLabelWidth"  prop="photo">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in designerDto.imgUrls" :key="item" :index='index'  @click="UpLoadShow(1,index)">
        <img :src="item" class="avatar boxImg">
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
import {adornAdd} from "@/api/designer"
export default {
  data() {
    return { 
      designerDto: {
       lordImg:'22',
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
      deleImg(index){
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
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .boxImg{
    display: inline-block;height: 178px;width: 178px;
}
.imagesBoxList{
    display: inline-block;height: 178px;width: 178px;position: relative;
}
.imagesBoxList span{position: absolute;right:0;top:0;}
.imagesBoxList span i{font-size: 1.4rem;}
</style>

