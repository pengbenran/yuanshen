<template>   
    <el-dialog title="分类新增" :visible.sync="AddShow">
        <el-form :model="addFrom"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="itemName">
                <el-input v-model="addFrom.itemName" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为根级" :label-width="formLabelWidth"  prop="isRoot">
                <el-radio v-model="addFrom.isRoot" label="1"  @change = 'changeRadio'>是</el-radio>
                <el-radio v-model="addFrom.isRoot" label="2"  @change = 'changeRadio'>否</el-radio>
                <el-alert style="padding:0px" title="注：根级也就是一级分类" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="关联父级" :label-width="formLabelWidth" prop="parentId" v-if="addFrom.isRoot == 2">
                <el-select v-model="addFrom.parentId" @change='changSelect'>
                    <el-option
                    v-for="(item,index) in parentList"
                    :key="index"
                    :label="item.itemName"
                    :value="item.id">
                    <span style="float: left">{{ item.itemName }}</span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类背景图片" :label-width="formLabelWidth" prop="itemImg" v-if="addFrom.isRoot == 1">
            <div class="avatar-uploader" @click="UpLoadShow">
                <img v-if="addFrom.itemImg" :src="addFrom.itemImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="AddShow = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
    </div>
</el-dialog>
    </div>
</template>
<script>
 import {kindAdd} from "@/api/kind";
export default {
    props: ['addFrom'],
    data () {
        return {
           AddShow:false,
           parentList:[],
           formLabelWidth:'120px',
           AddDatarules:{
             itemName:[
                { required: true, message: '分类名称', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addData(){
            let that = this;
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                console.log('that.addFrom',that.addFrom);
                kindAdd(that.addFrom).then(res => {
                    if(res == ''){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.$parent.GetDataLits();
                        that.AddShow = false
                        
                    }else{
                    that.$message.error('添加失败');
                    }
                }).catch(err => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        //父级名称赋值
        changSelect(e){
            let that = this;
            that.addFrom.parentName = this.parentList.find(Fres => Fres.id == e).itemName
        },
        

        //选择父级
        changeRadio(){
            this.addFrom.root == 1 ? this.addFrom.parentId = '0' : this.addFrom.parentId = ''
        },
        //添加显示
        DiaLogShow(list){
            this.AddShow = true;
            this.parentList = list;
            console.log("查看列表",list)
        },
        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:是删除还是编辑的标识
        UpLoadShow(){
         this.$emit('ImgClick');
        }
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
    height: 307px;
    line-height: 307px;
    text-align: center;
}
</style>
