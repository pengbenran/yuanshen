<template>
  <div class="app-container">
   <el-form :model="newsEditData"  :rules="newsEditDataarules" ref="AddruleForm">
    <el-form-item label="新闻标题" :label-width="formLabelWidth"  prop="title">
      <el-input v-model="newsEditData.title" placeholder="请输入标题" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="新闻简介" :label-width="formLabelWidth"  prop="intro">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newsEditData.intro"></el-input>
    </el-form-item>
    <el-form-item label="新闻作者" :label-width="formLabelWidth"  prop="author">
      <el-input v-model="newsEditData.author" placeholder="请输入作者" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth" prop="itemImg">
        <div class="avatar-uploader" @click="UpLoadShow">
            <img v-if="newsEditData.back_img" :src="newsEditData.back_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
    </el-form-item>
    <el-form-item label="新闻正文" :label-width="formLabelWidth"  prop="subject">
      <Editors v-model="newsEditData.subject" ref="Editor" @Set_Content="Get_ContentValue"/>
    </el-form-item> 
  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
    <UpLoadImg ref='UploadImg' @GetDataImg='GetDataImg' :proportion='proportion'/>
  </div>
  </div>
</template>

<script>
import UpLoadImg from '@/components/UpLoadImg/UpLoadImg';
import Editors from "@/components/Editor/Editor";
import {NewsDetail,NewsUpdate} from "@/api/new"
export default {
  data() {
    return {
      newsEditData: {},
      proportion:1.293,
      newsEditDataarules:{
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
      formLabelWidth:'120px'
    }
  },
  components:{Editors,UpLoadImg},
  methods: {
      //Conten字段赋值
      Get_ContentValue(data){
        console.log("过来了吗",data)
        this.newsEditData.content = data
      },
      // 获取新闻详情
      getcompanyNewsDetail(id){
        let params={}
        params.id=id
        let that=this
        NewsDetail(params).then(function(res){
          that.newsEditData=res
        })
      },
       UpLoadShow(){
        this.$refs.UploadImg.showDialog(true)
       },
       GetDataImg(imgurl){
        let that = this;
        this.newsEditData.back_img = imgurl;
       },
       submit(){
        let that=this
        NewsUpdate(that.newsEditData).then(function(res){
          if(res == ''){
            that.$message({ message: '修改成功', type: 'success'});
            that.$router.push({path:'/news/companyNews'})
          }
        })
       }
  },
  mounted(){
    this.getcompanyNewsDetail(this.$route.query.id)
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

