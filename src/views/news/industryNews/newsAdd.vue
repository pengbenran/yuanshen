<template>
  <div class="app-container">
   <el-form :model="newsAddData"  :rules="newsAddDataarules" ref="AddruleForm">
    <el-form-item label="新闻标题" :label-width="formLabelWidth"  prop="title">
      <el-input v-model="newsAddData.title" placeholder="请输入标题" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="新闻简介" :label-width="formLabelWidth"  prop="intro">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newsAddData.intro"></el-input>
    </el-form-item>
    <el-form-item label="新闻作者" :label-width="formLabelWidth"  prop="author">
      <el-input v-model="newsAddData.author" placeholder="请输入作者" autocomplete="off"></el-input>
    </el-form-item>
   <!--  <el-form-item label="图片" :label-width="formLabelWidth" prop="itemImg">
        <div class="avatar-uploader" @click="UpLoadShow">
            <img v-if="newsAddData.back_img" :src="newsAddData.back_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
    </el-form-item> -->
    <el-form-item label="新闻正文" :label-width="formLabelWidth"  prop="subject">
      <Editors v-model="newsAddData.subject" ref="Editor"/>
    </el-form-item> 
  </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
    <UpLoadImg ref='UploadImg' @GetDataImg='GetDataImg' :proportion='proportion'/>
  </div>
</template>

<script>
import UpLoadImg from '@/components/UpLoadImg/UpLoadImg';
import Editors from "@/components/Editor/Editor";
import {NewsAdd} from "@/api/new"
export default {
  components:{Editors,UpLoadImg},
  data() {
    return {
      newsAddData: {
       stye:'2',
       title:'',
       back_img:'',
       intro:'',
       author:'',
       createUser:'',
       updateUser:'',
       createTime:'',
       updateTime:'',
       subject:''
      },
      newsAddDataarules:{
        title:[
        { required: true, message: '请输入标题', trigger: 'blur' },
        ],
         intro:[
        { required: true, message: '请输入简介', trigger: 'blur' },
        ],
         author:[
        { required: true, message: '请输入作者', trigger: 'blur' },
        ],
         itemImg:[
        { required: true, message: '请设置图片', trigger: 'blur' },
        ],
        itemImg:[
        { required: true, message: '请设置图片', trigger: 'blur' },
        ],
        subject:[
        { required: true, message: '请设置详情', trigger: 'blur' },
        ],
      },
      formLabelWidth:'120px',
      proportion:1.293,

    }
  },
  methods: {
    //新闻添加
     submit(){
      let that=this
       NewsAdd(that.newsAddData).then(res => {
         if(res == ''){
            that.$message({ message: '添加成功', type: 'success'});
            that.$router.push({path:'/news/industryNews'})
         }
       }).catch(err => {
          that.$message.error('失败');
       })
     },
    UpLoadShow(){
        this.$refs.UploadImg.showDialog(true)
    },

     //图片返回
     GetDataImg(imgurl){
        let that = this;
        this.newsAddData.back_img = imgurl;
        // that.imageIndex== undefined ? that.AddData.imgUrls.push(ImgUrl) : that.AddData.imgUrls[that.imageIndex] = ImgUrl;
     }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
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
    width: 230px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>

