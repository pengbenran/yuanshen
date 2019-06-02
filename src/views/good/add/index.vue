<template>
<!--用户等级新增,编辑分离-->
<div class="app-container">
  <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
    <el-form-item label="商品类型" :label-width="formLabelWidth"  prop="type">
      <el-select v-model="AddData.type" clearable placeholder="请选择">
        <el-option v-for="(item,index) in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </el-form-item>   
    <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="AddData.name" placeholder="请输入商品名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth"  prop="price" v-if="goodType==1">
      <el-input v-model="AddData.price" placeholder="请输入价格" autocomplete="off">
      </el-input>
    </el-form-item>    
    <el-form-item label="商品销量" :label-width="formLabelWidth"  prop="sales" v-if="goodType==1">
      <el-input v-model="AddData.sales" placeholder="请输入商品销量" autocomplete="off">
      </el-input>
    </el-form-item>     
    <el-form-item label="商品数量" :label-width="formLabelWidth"  prop="amount" v-if="goodType==1">
      <el-input v-model="AddData.amount" placeholder="请输入商品数量" autocomplete="off">
      </el-input>
    </el-form-item>  
    <el-form-item label="尺寸" :label-width="formLabelWidth"  prop="measure" v-if="goodType==1">
      <el-input v-model="AddData.measure" placeholder="请输入尺寸" autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item label="面积" :label-width="formLabelWidth"  prop="measure" v-else>
      <el-input v-model="AddData.measure" placeholder="请输入面积" autocomplete="off">
      </el-input>
    </el-form-item>

    <el-form-item label="分类" :label-width="formLabelWidth"  prop="itemId">
      <el-select v-model="AddData.itemId1" clearable placeholder="请选择" @change='changeCatSelect($event,1)'>
        <el-option v-for="item in GoodsCatList" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="AddData.itemId2" clearable placeholder="请选择" @change='changeCatSelect($event,2)' v-if="ChilerGoodsCatList.length > 0">
        <el-option v-for="item in ChilerGoodsCatList" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="AddData.itemId3" clearable placeholder="请选择" @change='changeCatSelect($event,3)' v-if="ChilerTwoGoodsCatList.length > 0">
        <el-option v-for="item in ChilerTwoGoodsCatList" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="材质" :label-width="formLabelWidth"  prop="texture" v-if="goodType==1">
      <el-input v-model="AddData.texture" placeholder="请输入材质" autocomplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="整体特色" :label-width="formLabelWidth"  prop="texture" v-if="goodType==2">
      <el-input v-model="AddData.texture" placeholder="请输入整体特色" autocomplete="off"></el-input>
    </el-form-item> 

    <el-form-item label="商品说明" :label-width="formLabelWidth"  prop="productDeclare">
      <el-input v-model="AddData.productDeclare" placeholder="请输入商品说明" autocomplete="off"></el-input>
    </el-form-item>      
        
    <el-form-item label="商品图片" :label-width="formLabelWidth"  prop="imgUrls">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imgUrls" :key="index">
        <img :src="item" class="avatar boxImg">
        <span @click.stop='deleImg(index)'><i class="el-icon-error"></i></span>
      </div>
      <upImg @UpListImg='UpListImg'  ref='upImg' />
    </el-form-item>      

    <el-form-item label="淘宝连接" :label-width="formLabelWidth"  prop="taobaoLink" v-if="goodType==1">
      <el-input v-model="AddData.taobaoLink" placeholder="请输入淘宝连接" autocomplete="off"></el-input>
    </el-form-item>  

    <el-form-item label="标签" :label-width="formLabelWidth"  prop="labels">
      <el-checkbox-group v-model="AddData.labels">
        <el-checkbox v-for="item in labelListData" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
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
import upImg from '@/components/UpImgList/index'

export default {
    name: 'GoodsCreate',
    components:{UpLoadImg,Editors,upImg},
    data () {
        return {
           AddData:{
               productDeclare:'',
               imgUrls:[],
               itemId:'',
               labels:[],
               type:''

           },
           goodType:1,
           formLabelWidth:'120px',
           AddDatarules:{
            type:[
                { required: true, message: '请输选择商品类型', trigger: 'blur' },
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
                { required: true, message: '请输入尺寸', trigger: 'blur' },
             ],
             texture:[
                { required: true, message: '请输入材质', trigger: 'blur' },
             ],
             productDeclare:[
                { required: true, message: '请设置商品简介', trigger: 'blur' },
             ],
             imgUrls:[
                { required: true, message: '请设置图片', trigger: 'blur' },
             ],
           },
           typeList:[{value:'1',name:'普通商品'},{value:'2',name:'整装商品'}],
           GoodsCatList:[],
           ChilerGoodsCatList:[],
           ChilerTwoGoodsCatList:[],
           labelListData:[],
           proportion:1, //设置图片比例
           imageIndex:'',//轮播时指定的下标
           ImgType:1,
           selectIndex:''
        }
    },
    watch: {
      "AddData.type": function (value) {
        let that=this
        that.goodType=value
      },
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
      //删除
      deleImg(index){
        this.AddData.imgUrls.splice(index,1)
      },
      //分类数据赋值
      changeCatSelect(id,index){
        let that = this;
        if(index == 1){
          GetRootParent({parentId:id}).then(res => {
            if(res.length!=0){
              that.AddData.itemId=''
              that.ChilerGoodsCatList = res;
            }else{
              that.ChilerGoodsCatList = []
              that.AddData.itemId = id 
            }
          }).catch(err => {
            that.$message.error('失败');  
          })
        }else if(index == 2){
          GetRootParent({parentId:id}).then(res => {
            if(res.length!=0){
              that.AddData.itemId=''
              that.ChilerTwoGoodsCatList = res;
            }else{
             that.ChilerTwoGoodsCatList = [];
             that.AddData.itemId = id 
            }
          }).catch(err => {
            that.$message.error('失败');  
          })
        }
        else{
          that.AddData.itemId = id 
        }
      },


      //标签数据的赋值
      LabelSelect(e){
        let that = this;
        that.AddData.labels.includes(e) ? that.$message.error('已经添加') : that.AddData.labels.push(e);
      },

      //批量上传回调
      UpListImg(ImgUrl){
        this.AddData.imgUrls.push(ImgUrl)
        console.log();
      },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
        UpLoadShow(index){
          let that=this
          that.selectIndex=index
          // that.$refs.upImg.choiceImg()
          that.$refs.UploadImg.showDialog(true)
        },

        //图片返回赋值
        GetDataImg(ImgUrl){
          let that = this;
          if(that.selectIndex==0){
            that.AddData.imgUrls.push(ImgUrl)
          }
          else{
            that.AddData.imgUrls[that.selectIndex]=ImgUrl
          } 
        } 
        },
    }

</script>
<style >
.YongMoney{
    display: flex;align-items: center;
}
.FlexWarp{
    display: flex;
    align-items: center;
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
