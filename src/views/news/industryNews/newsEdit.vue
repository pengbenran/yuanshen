<template>
  <div class="app-container">
   <el-form :model="newsEditData"  :rules="newsEditDataarules" ref="AddruleForm">
    <el-form-item label="行业新闻标题" :label-width="formLabelWidth"  prop="title">
      <el-input v-model="newsEditData.title" placeholder="请输入商品名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="行业新闻背景图" :label-width="formLabelWidth"  prop="bcgImg">
                <div class="avatar-uploader" @click="UpLoadShow(3,1)">
                    <img v-if="newsEditData.bcgImg" :src="newsEditData.bcgImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item>
    <el-form-item label="新闻正文" :label-width="formLabelWidth"  prop="content">
      <Editor ref="Editor"  @Set_Content="Get_ContentValue"/>
    </el-form-item> 
  </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Editor/Editor";
export default {
  data() {
    return {
      newsEditData: {
       title:'我是一条新闻',
       content:'<p>我是一个p标签</p>',
       bcgImg:'https://1875.etuetf.com/banner/40730b86-c072-4e7c-a963-a37304b45f8d.jpg',
      },
      newsEditDataarules:[],
      formLabelWidth:'120px'
    }
  },
  components:{Editor},
  methods: {
      //Conten字段赋值
      Get_ContentValue(data){
        console.log("过来了吗",data)
        this.newsEditData.content = data
      },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

