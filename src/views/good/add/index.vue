<template>
<!--用户等级新增,编辑分离-->
<div class="app-container">
  <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
    <el-form-item label="商品类型" :label-width="formLabelWidth"  prop="type">
      <el-select v-model="AddData.type" clearable placeholder="请选择">
        <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>   
    <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="AddData.name" placeholder="请输入商品名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth"  prop="price">
      <el-input v-model="AddData.price" placeholder="请输入价格" autocomplete="off">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>    
    <el-form-item label="商品销量" :label-width="formLabelWidth"  prop="sales">
      <el-input v-model="AddData.sales" placeholder="请输入销量" autocomplete="off">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>     
    <el-form-item label="商品数量" :label-width="formLabelWidth"  prop="amount">
      <el-input v-model="AddData.amount" placeholder="请输入总量" autocomplete="off">
        <template slot="append">个</template>
      </el-input>
    </el-form-item>  
    <el-form-item label="尺寸" :label-width="formLabelWidth"  prop="measure">
      <el-input v-model="AddData.measure" placeholder="请输入测量" autocomplete="off">
      </el-input>
    </el-form-item>

    <el-form-item label="分类" :label-width="formLabelWidth"  prop="price">
      <el-select v-model="AddData.itemId1" clearable placeholder="请选择" @change='changeCatSelect($event,1)'>
        <el-option v-for="item in GoodsCatList" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="AddData.itemId2" clearable placeholder="请选择" @change='changeCatSelect($event,2)' v-if="ChilerGoodsCatList.length > 0">
        <el-option v-for="item in ChilerGoodsCatList" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="材质" :label-width="formLabelWidth"  prop="texture">
      <el-input v-model="AddData.texture" placeholder="请输入质地" autocomplete="off"></el-input>
    </el-form-item> 

    <el-form-item label="商品详情" :label-width="formLabelWidth"  prop="productDeclare">
       <Editors v-model="AddData.productDeclare" ref="Editor"/>
      <el-input v-model="AddData.productDeclare" placeholder="请输入商品详情" autocomplete="off"></el-input>
    </el-form-item>      
        
    <el-form-item label="商品图片" :label-width="formLabelWidth"  prop="imgUrls">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imgUrls" :key="item" :index='index'  @click="UpLoadShow(2,1.777,index)">
        <img :src="item" class="avatar boxImg">
      </div>
      <div class="avatar-uploader imagesBoxList"  @click="UpLoadShow(2,1.777)">
        <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
      </div>
    </el-form-item>      

    <el-form-item label="淘宝连接" :label-width="formLabelWidth"  prop="taobaoLink">
      <el-input v-model="AddData.taobaoLink" placeholder="请输入淘宝连接" autocomplete="off"></el-input>
    </el-form-item>  

    <el-form-item label="标签" :label-width="formLabelWidth"  prop="labels">
      <el-tag v-for="item in AddData.labels">{{item}}</el-tag>
      <el-select v-model="AddData.labelsList" clearable placeholder="请选择" @change="LabelSelect">
        <el-option v-for="item in labelListData" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" @click="ClcikAddData">上架商品</el-button>
  </div>

    <UpLoadImg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
</div>
</template>
<script>
import UpLoadImg from '@/components/UpLoadImg/UpLoadImg';
import Editors from "@/components/Editor/Editor";
import {GetList,GetRootList,GetRootParent} from "@/api/kind";
import {labelList} from '@/api/label'
import {GoodAdd} from '@/api/good'

export default {
    name: 'GoodsCreate',
    components:{UpLoadImg,Editors},
    data () {
        return {
           AddData:{
               productDeclare:'',
               imgUrls:[],
               itemId:'',
               labels:[],
               labelsList:'',

           },
           formLabelWidth:'120px',
           AddDatarules:{
             type:[
                { required: true, message: '请输入编号', trigger: 'blur' },
             ],
             name:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
             ],
             price:[
                { required: true, message: '请输入商品价格', trigger: 'blur' },
             ],
             sales:[
                { required: true, message: '请输入商品销量', trigger: 'blur' },
             ],
             amount:[
                { required: true, message: '请输入商品总量', trigger: 'blur' },
             ],
             measure:[
                { required: true, message: '请输入测量', trigger: 'blur' },
             ],
             texture:[
                { required: true, message: '请设置质地', trigger: 'blur' },
             ],
             productDeclare:[
                { required: true, message: '请设置商品详情', trigger: 'blur' },
             ],
             imgUrls:[
                { required: true, message: '请设置图片', trigger: 'blur' },
             ],
             taobaoLink:[
                { required: true, message: '请设置淘宝连接', trigger: 'blur' },
             ],
             itemId:[
                { required: true, message: '请设置分类', trigger: 'blur' },
             ],
             labels:[
                { required: true, message: '请设置标签', trigger: 'blur' },
             ],
           },
           typeList:['普通商品','整装商品'],
           GoodsCatList:[],
           ChilerGoodsCatList:[],
           labelListData:[],
           proportion:1, //设置图片比例
           imageIndex:'',//轮播时指定的下标
           ImgType:1
        }
    },
    computed:{
       
    },
    mounted () {
       this.GetDataLits();//拿到分类
       this.GetDataLable();//拿到标签的数据
    },
    methods: {  
      //点击保存
      ClcikAddData(){
        let that = this;
        GoodAdd(that.AddData).then(res => {
          if(res == ''){
            that.$message({ message: '添加成功', type: 'success'});
            that.$router.push({path:'/good/list'})
          }
        }).catch(err => {
          that.$message.error('失败');
        })
      },
      
      //获取标签数据
      GetDataLable(){
        let that = this;
        labelList().then(res => {
          that.labelListData = res;
        })
      },

      //获取分类数据
      GetDataLits(){ 
          let that = this;
          GetRootList().then(res =>{
              console.log("拿到分类",res)
              if(res != undefined){
                that.GoodsCatList = res
              }else{
                that.$message.error('失败');
              }
          }).catch(err => {
              that.$message.error('失败');
          })
      },

      //分类数据赋值
      changeCatSelect(id,index){
        let that = this;
        if(index == 1){
          GetRootParent({parentId:id}).then(res => {
            if(res != ''){
             that.ChilerGoodsCatList = res;
            }else{
             that.AddData.itemId = id 
            }
          }).catch(err => {
            that.$message.error('失败');  
          })
        }else if(index == 2){
          that.AddData.itemId = id 
        }
      },

      //标签数据的赋值
      LabelSelect(e){
        let that = this;
        that.AddData.labels.includes(e) ? that.$message.error('已经添加') : that.AddData.labels.push(e);
      },


        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
        UpLoadShow(type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
            this.$refs.UploadImg.showDialog(true)
        },

        //图片返回赋值
        GetDataImg(ImgUrl){
            let that = this;
            that.imageIndex== undefined ? that.AddData.imgUrls.push(ImgUrl) : that.AddData.imgUrls[that.imageIndex] = ImgUrl;
            }
        },
    }

</script>
<style >
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
.avatar-uploader .boxImg{
    display: inline-block;height: 189px;width: 336px;
}
.generateSn{
    display: flex;
    align-items: center;
}

.imagesBoxList{
    display: inline-block;height: 189px;width: 336px;
}

.YongMoney{
    display: flex;align-items: center;
}
.FlexWarp{
    display: flex;
    align-items: center;
}

</style>
