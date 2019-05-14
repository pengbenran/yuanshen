<template>   
    <el-dialog title="分类新增" :visible.sync="AddShow">
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为根级" :label-width="formLabelWidth"  prop="root">
                <el-radio v-model="AddData.root" label="1"  @change = 'changeRadio'>是</el-radio>
                <el-radio v-model="AddData.root" label="2"  @change = 'changeRadio'>否</el-radio>
                <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="关联父级" :label-width="formLabelWidth" prop="parentId" v-if="AddData.root == 2">
                <el-select v-model="AddData.parentId" >
                    <el-option
                    v-for="item in GoodsCatList"
                    :key="item.catId"
                    :label="item.name"
                    :value="item.catId">
                    <span style="float: left">{{ item.name }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="AddData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
            <el-alert style="padding:0px" title="注：越大代表排序越靠后" type="success"></el-alert>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
            <div class="avatar-uploader" @click="UpLoadShow(3,1,1)">
                <img v-if="AddData.img" :src="AddData.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="AddShow = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
    </div>
</el-dialog>
    <!--商品分类编辑-->

    <!-- <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/> -->
    <!--图片上传 end-->
    </div>
</template>
<script>
 import {kindAdd} from "@/api/kind.js";
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
           AddShow:false,
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
           AddData:{
             parentId:'',
             root:'2',
             img:''
           },
           formLabelWidth:'120px',
           AddDatarules:{
             name:[
                { required: true, message: '分类名称', trigger: 'blur' },
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
        //添加用户的等级
        // addData(){
        //     let that = this;
        //     this.$refs['AddruleForm'].validate((valid) => {
        //     if (valid) {
        //         API.AddGoodsCat(that.AddData).then(res => {
        //             if(res.code == 0){
        //                 that.$message({ message: '添加成功', type: 'success'});
        //                 that.$parent.GetGoodsCatList();
        //                 that.AddShow = false
        //                 that.AddData = {
        //                     img:'',
        //                     parentId:'',
        //                     root:'2'
        //                 }
        //             }else{
        //             that.$message.error('添加失败');
        //             }
        //         }).catch(err => {})
        //     } else {
        //         console.log('error submit!!');
        //         return false;
        //     }
        //     });
        // },
        //选择父级
        changeRadio(){
            this.AddData.root == 1 ? this.AddData.parentId = '0' : this.AddData.parentId = ''
        },
        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
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
          this.AddData.img = ImgUrl;     
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
