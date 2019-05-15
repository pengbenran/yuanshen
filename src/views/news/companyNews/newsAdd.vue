<template>
  <div class="app-container">
   <el-form :model="newsAddData"  :rules="newsAddDataarules" ref="AddruleForm">
    <el-form-item label="新闻标题" :label-width="formLabelWidth"  prop="title">
      <el-input v-model="newsAddData.title" placeholder="请输入商品名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新闻正文" :label-width="formLabelWidth"  prop="content">
      <Editor ref="Editor"/>
    </el-form-item> 
  </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/Editor";
export default {
  data() {
    return {
      newsAddData: {
       title:''
      },
      newsAddDataarules:[],
      formLabelWidth:'120px'
    }
  },
  components:{Editor},
  methods: {
   
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

