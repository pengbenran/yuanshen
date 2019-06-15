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
      <el-input v-model="AddData.sales" placeholder="请输入销量" autocomplete="off">
      </el-input>
    </el-form-item>     
    <el-form-item label="商品数量" :label-width="formLabelWidth"  prop="amount" v-if="goodType==1">
      <el-input v-model="AddData.amount" placeholder="请输入总量" autocomplete="off">
      </el-input>
    </el-form-item>  
    <el-form-item label="尺寸" :label-width="formLabelWidth"  prop="measure" v-if="goodType==1">
      <el-input v-model="AddData.measure" placeholder="请输入尺寸" autocomplete="off">
      </el-input>
    </el-form-item>
    <el-form-item label="面积" :label-width="formLabelWidth"  prop="measure" v-if="goodType==2">
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
    </el-form-item>
    <el-form-item label="材质" :label-width="formLabelWidth"  prop="texture" v-if="goodType==1">
      <el-input v-model="AddData.texture" placeholder="请输入材质" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="整体特色" :label-width="formLabelWidth"  prop="texture" v-if="goodType==2">
      <el-input v-model="AddData.texture" placeholder="请输入整体特色" autocomplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="轮播背景图" :label-width="formLabelWidth" v-if="goodType==3">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in imgReels" :key="index" :index='index' @click="UpLoadShow(index)">
        <img :src="item" class="boxImg">
      </div>
      <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(-1)">
            <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
        </div>
    </el-form-item>

    <el-form-item label="产品理念" :label-width="formLabelWidth"  prop="productDeclare" v-if="goodType==3">
      <!-- <el-input v-model="AddData.productDeclare" placeholder="请输入产品理念" autocomplete="off"></el-input> -->
       <el-input type="textarea"  v-model="AddData.productDeclare" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入产品理念" autocomplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="商品说明" :label-width="formLabelWidth"  prop="productDeclare" v-else>
      <el-input v-model="AddData.productDeclare" placeholder="请输入商品说明" autocomplete="off"></el-input>
    </el-form-item> 
     
    <el-form-item label="商品图片" :label-width="formLabelWidth"  prop="imgUrls">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imgUrls" :key="item" :index='index'  @click="UpLoadShow(index)">
        <img :src="item" class="avatar boxImg">
        <span @click.stop='deleImg(index)'><i class="el-icon-error"></i></span>
      </div>
      <upImg @UpListImg='UpListImg'  ref='upImg' />
    </el-form-item>      

    <el-form-item label="淘宝连接" :label-width="formLabelWidth"  prop="taobaoLink" v-if="AddData.type==1">
      <el-input v-model="AddData.taobaoLink" placeholder="请输入淘宝连接" autocomplete="off"></el-input>
    </el-form-item>  

    <el-form-item label="标签" :label-width="formLabelWidth"  prop="labels" v-if="goodType==1||goodType==2">
     <el-checkbox-group v-model="AddData.labels">
        <el-checkbox v-for="item in labelListData" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="ClcikUpdataData">修改商品</el-button>
  </div>

    <UpLoadImg ref='UploadImg' @GetDataImg='GetDataImg'  :proportion='proportion'/>
</div>
</template>
<script>
import UpLoadImg from '@/components/UpLoadImg/UpLoadImg';
import {GetList,GetRootList,GetRootParent} from "@/api/kind";
import {labelList} from '@/api/label'
import {UpdataGood,getGoodInfo} from '@/api/good'
import upImg from '@/components/UpImgList/index'
export default {
    name: 'GoodsCreate',
    components:{UpLoadImg,upImg},
    data () {
        return {
           AddData:{
               productDeclare:'',
               imgUrls:[],
               itemId:"1558166313186119214",
               labels:[],
               labelsList:[],
           },
           imgReels:[],
           itemId1:'',
           formLabelWidth:'120px',
           AddDatarules:{
             type:[
                { required: true, message: '请输入编号', trigger: 'blur' },
             ],
             name:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
             ],
             texture:[
                { required: true, message: '请设置材质', trigger: 'blur' },
             ],
             productDeclare:[
                { required: true, message: '请设置商品详情', trigger: 'blur' },
             ],
             imgUrls:[
                { required: true, message: '请设置图片', trigger: 'blur' },
             ],
             itemId:[
                { required: true, message: '请设置分类', trigger: 'blur' },
             ],
             labels:[
                { required: true, message: '请设置标签', trigger: 'blur' },
             ],
           },
           typeList:[{value:'1',name:'普通商品'},{value:'2',name:'整装商品'},{value:'3',name:'大型工装'}],
           GoodsCatList:[],
           ChilerGoodsCatList:[],
           ChilerTwoGoodsCatList:[],
           labelListData:[],
           proportion:2.546, //设置图片比例
           selectIndex:'',//轮播时指定的下标
           goodType:1,
        }
    },
     watch: {
      "AddData.type": function (value) {
        let that=this
        that.goodType=value
      },
    },
    computed:{
      
    },
    mounted () {
       this.itemId1=this.$route.query.itemId1
       this.getRootParent(this.itemId1)
       this.getGoodInfo(this.$route.query.id)
       this.GetDataLits();//拿到分类
       this.GetDataLable();//拿到标签的数据

    },
    methods: {  
      //点击保存
      ClcikUpdataData(){
        let that = this;
        if(that.goodType==3){
          that.AddData.texture=that.imgReels.join(',')
        }
        UpdataGood(that.AddData).then(res => {
          if(res == ''){
            that.$message({ message: '修改成功', type: 'success'});
            that.$router.push({path:'/good/list'})
          }
        }).catch(err => {
          that.$message.error('失败');
        })
      },

      // 获取商品详情
      getGoodInfo(id){
        let params={}
        let that=this
        params.id=id
        getGoodInfo(params).then(function(res){
          if(res.type==3){
            that.imgReels=res.texture.split(',')
          }
          that.AddData=res
        })
      },
      UpListImg(ImgUrl){
        this.AddData.imgUrls.push(ImgUrl)
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
            console.log('res',res)
              if(res != undefined){
                that.GoodsCatList = res
              }else{
                that.$message.error('失败');
              }
          }).catch(err => {
              that.$message.error('失败');
          })
      },
      // 获取子分类的数据
      getRootParent(id,index){
        let that=this
        GetRootParent({parentId:id}).then(res => {
            if(res.length!=0){
              if(index==1){
                 that.ChilerGoodsCatList = res;
              }
              else if(index==2){
                that.ChilerTwoGoodsCatList = res;
              }
            }else{
             if(index==1){
                 that.ChilerGoodsCatList = [];
                 that.AddData.itemId = id 
              }
              else if(index==2){
                that.AddData.itemId = id 
                that.ChilerTwoGoodsCatList = [];
              } 
            }
          })
      },
      //分类数据赋值
      changeCatSelect(id,index){
        let that = this;
        if(index == 1){
          that.AddData.itemId=''
          that.getRootParent(id,index)
        }else if(index == 2){
          that.AddData.itemId = '' 
          that.getRootParent(id,index)
        }
        else{
          that.AddData.itemId = id 
        }
      },
        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
      UpLoadShow(index){
        let that=this
        that.selectIndex=index
        that.$refs.UploadImg.showDialog(true)
      },
      //删除
      deleImg(index){
        this.AddData.imgUrls.splice(index,1)
      },
      //图片返回赋值
      GetDataImg(ImgUrl){
        let that=this
        if(that.selectIndex==-1){
          that.imgReels.push(ImgUrl)
        }
        else{
           that.$set(that.imgReels,that.selectIndex,ImgUrl)
        }   
      },
    }
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
    display: inline-block;height: 178px;width: 178px;
}
.generateSn{
    display: flex;
    align-items: center;
}

.imagesBoxList{
    display: inline-block;height: 178px;width: 178px;
}
.imagesBoxList span{width: 3rem;height: 3rem;position: absolute;right:0;top:0;}
.imagesBoxList span i{font-size: 1.4rem;}
.YongMoney{
    display: flex;align-items: center;
}
.FlexWarp{
    display: flex;
    align-items: center;
}

</style>
