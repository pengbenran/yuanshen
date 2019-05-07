<template>   
  <!--商品分类添加-->
  <el-dialog title="商品分类编辑" :visible.sync="EditShow" >
    <el-form :model="EdiData"  :rules="EdiDatarules"  ref="EditruleForm">
      <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="name">
        <el-input v-model="EdiData.name" placeholder="请输入内容" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否为根级" :label-width="formLabelWidth"  prop="root">
        <el-radio v-model="EdiData.root" label="1"  @change = 'EditchangeRadio'>是</el-radio>
        <el-radio v-model="EdiData.root" label="2"  @change = 'EditchangeRadio'>否</el-radio>
        <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert>
      </el-form-item>
      <el-form-item label="父级Id" :label-width="formLabelWidth" prop="parentId"  v-if="EdiData.root == 2">
        <el-select v-model="EdiData.parentId" >
          <el-option
          v-for="item in GoodsCatList"
          :key="item.catId"
          :label="item.name"
          :value="item.catId">
          <span style="float: left">{{ item.name }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
      <el-input v-model="EdiData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
      <el-alert style="padding:0px" title="注：越大代表排在越后" type="success"></el-alert>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
      <div class="avatar-uploader" @click="UpLoadShow(3,1,2)">
        <img v-if="EdiData.img" :src="EdiData.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="EditShow = false">取 消</el-button>
    <el-button type="primary" @click="editData">确 定</el-button>
  </div>
</el-dialog>
    <!--商品分类编辑-->
    <!-- <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/> -->
    <!--图片上传 end-->
</template>
<script>
// import API from "@/api/goods";
// import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
export default {
    props:{
      GoodsCatList:{
          type:Array,
          default:[]
      }
    },
    watch:{
    },
    components:{},
    data () {
        return {
           EditShow:false,
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
           EdiData:{
            parentId:'',
            root:'2',
            img:''
           },
           formLabelWidth:'120px',
           EdiDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             root:[
                { required: true, message: '请设置根级', trigger: 'blur' },
             ],
             parentId:[
                { required: true, message: '请设置父级', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             showed:[
                { required: true, message: '请设置是否展示', trigger: 'blur' },
             ],
             img:[
                { required: true, message: '请设置分类图片', trigger: 'blur' },
             ],
           }
        }
    },
    methods: {
        //编辑用户等级EditruleForm
        editData(){
            // let that = this;
            // this.$refs['EditruleForm'].validate((valid) => {
            // if (valid) {
            //     API.UpdataGoodsCat(that.EdiData).then(res => {
            //         if(res.code == 0){
            //             that.$message({message:'编辑成功',type:'success'})
            //             that.$parent.GetGoodsCatList();
            //             that.EditShow = false;
            //         }else{
            //             that.$message.error('添加失败');                    
            //         }
            //     }).catch(err => {})
            // } else {
            //     console.log('error submit!!');
            //     return false;
            // }
            // });            
        },
        //编辑选择父级
        EditchangeRadio(){
            this.EdiData.root == 1 ? this.EdiData.parentId = '0' : this.EdiData.parentId = ''           },
        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.root = row.root+''
            row.parentId = row.parentId*1
            row.showed = row.showed+''
            this.EdiData = Object.assign({},row);
        },
        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:是删除还是编辑的标识
        UpLoadShow(type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            this.IMAGE_iNDEX = IMAGE_iNDEX;
            this.$refs.UploadImg.showDialog(true)
        },

        //图片赋值
        GetDataImg(ImgUrl){  
          this.EdiData.img = ImgUrl;  
        },
    }
}
</script>
<style scoped>
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



