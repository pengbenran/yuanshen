<template>
  <div class="app-container">
   <el-form :model="newsAddData"  :rules="newsAddDataarules" ref="AddruleForm">
    <el-form-item label="新闻类型" :label-width="formLabelWidth"  prop="stye">
        <el-select v-model="newsAddData.stye" placeholder="请选择">
          <el-option v-for="item in styeList" :key="item.val" :label="item.name" :value="item.val">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="新闻标题" :label-width="formLabelWidth"  prop="title">
      <el-input v-model="newsAddData.title" placeholder="请输入标题" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="新闻简介" :label-width="formLabelWidth"  prop="intro">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newsAddData.intro"></el-input>
    </el-form-item>
    <el-form-item label="新闻作者" :label-width="formLabelWidth"  prop="author">
      <el-input v-model="newsAddData.author" placeholder="请输入作者" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth" prop="itemImg">
        <div class="avatar-uploader" @click="UpLoadShow(1,1)">
            <img v-if="newsAddData.back_img" :src="newsAddData.back_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
    </el-form-item>
    <el-form-item label="新闻正文" :label-width="formLabelWidth"  prop="subject">
      <Editors v-model="newsAddData.subject" ref="Editor"/>
    </el-form-item> 
  </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>


      <UpLoadImg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
  </div>
</template>

<script>
import UpLoadImg from '@/components/UpLoadImg/UpLoadImg';
import Editors from "@/components/Editor/Editor";
import {newsAdd} from "@/api/new"
export default {
  components:{Editors,UpLoadImg},
  data() {
    return {
      newsAddData: {
       title:'',
       back_img:''
      },
      newsAddDataarules:{
        title:[
        { required: true, message: '请输入标题', trigger: 'blur' },
        ],
         stye:[
        { required: true, message: '请输入类型', trigger: 'blur' },
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
      styeList:[{name:'公司新闻',val:'1'},{name:'行业新闻',val:'2'}],
      formLabelWidth:'120px',
      ImgType:1,
      proportion:1,

    }
  },
  methods: {
    //新闻添加
     submit(){
       newsAdd(this.newsAddData).then(res => {
         if(res == ''){
            that.$message({ message: '添加成功', type: 'success'});
         }
       }).catch(err => {
          that.$message.error('失败');
       })
     },

    //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
    UpLoadShow(type,proportion){
        this.ImgType = type;
        this.proportion = proportion;
        // IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>

