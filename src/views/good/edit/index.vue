<template>
<!--用户等级新增,编辑分离-->
<div class="app-container">
  <el-form :model="editData"  :rules="editDatarules" ref="AddruleForm">
    <el-form-item label="商品编号" :label-width="formLabelWidth"  prop="sn">
      <div class="generateSn">
        <el-input v-model="editData.sn" placeholder="请输入商品编号" autocomplete="off" disabled>
        </el-input>
      </div>
    </el-form-item>   
    <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="goodName">
      <el-input v-model="editData.goodName" placeholder="请输入商品名称" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth"  prop="price">
      <el-input v-model="editData.price" placeholder="请输入价格" autocomplete="off">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>     
    <el-form-item label="所属分类" :label-width="formLabelWidth"  prop="catName">
      <el-select v-model="editData.catName1" clearable placeholder="请选择">
        <el-option v-for="item in goodsCatRoot" :key="item.value" :label="item.name" :value="item.catId"></el-option>
      </el-select>
      <el-select v-model="editData.catName2" clearable placeholder="请选择" :disabled = "goodCatChilerBool">
        <el-option v-for="item in goodCatChiler" :key="item.value" :label="item.name" :value="item.catId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="展示销售量" :label-width="formLabelWidth"  prop="showSales">
      <el-input v-model="editData.showSales" placeholder="请输入销量" autocomplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="材质" :label-width="formLabelWidth"  prop="material">
      <el-input v-model="editData.material" placeholder="请输入材质" autocomplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="尺寸" :label-width="formLabelWidth"  prop="size">
      <el-input v-model="editData.size" placeholder="请输入尺寸" autocomplete="off"></el-input>
    </el-form-item>      
    <el-form-item label="说明" :label-width="formLabelWidth"  prop="intro">
      <el-input v-model="editData.intro" placeholder="请输入商品说明" autocomplete="off"></el-input>
    </el-form-item>          
    <el-form-item label="商品图片" :label-width="formLabelWidth"  prop="images">
      <div class="avatar-uploader imagesBoxList" v-for="(item,index) in editData.imagesList" :key="item" :index='index'>
        <img :src="item" class="avatar boxImg">
      </div>
      <div class="avatar-uploader imagesBoxList" >
        <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
      </div>
    </el-form-item>   
      
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary">上架商品</el-button>
  </div>
</div>
</template>
<script>
export default {
    name: 'GoodsCreate',
    components:{},
    data () {
        return {
           editData:{
             catName: "实木家具",
             createTime: 1554628359302,
             goodName: "测试商品",
             images: "https://image.etuetf.com/advImage/7a67c24e-3686-4d56-8ba7-b219eebb3e42.jpg",
             price: 1,
             showSales: 1,
             sn: "1554628284936893062",
             thumbnail: "https://image.etuetf.com/advImage/48e19f1d-cb72-468e-8eb6-dffa304343cb.jpg" ,
             size:'20*37*78',
             intro:'次建设bas客户',
             material:'木质',
           },
           formLabelWidth:'120px',
           editDatarules:{
             sn:[
                { required: true, message: '请输入编号', trigger: 'blur' },
             ],
             goodName:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
             ],
             material:[
                { required: true, message: '请输入商品材质', trigger: 'blur' },
             ],
             size:[
                { required: true, message: '请输入商品尺寸', trigger: 'blur' },
             ],
             intro:[
                { required: true, message: '请输入商品说明', trigger: 'blur' },
             ],
             price:[
                { required: true, message: '请输入价格', trigger: 'blur' },
             ],
             catName:[
                { required: true, message: '请设置分类', trigger: 'blur' },
             ],
             images:[
                { required: true, message: '请设置商品图片', trigger: 'blur' },
             ],
             showSales:[
                { required: true, message: '请设置展示销量', trigger: 'blur' },
             ],
           },
           goodsCatRoot:[],
           goodCatChiler:[],
           proportion:1, //设置图片比例
           imageIndex:'',//轮播时指定的下标
        }
    },
    computed:{
       
    },
    mounted () {
      // this.GetGoodsCatData(); //获取所有的分类
      // this.GetShareDataList(); //获取所有的等级
      // this.GetShopDataList(); //获取所有店铺
      // this.GetDictionaryData(); //获取字典数据
    },
    methods: {  
       
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
    display: inline-block;height: 189px;width: 336px;
}
.generateSn{
    display: flex;
    align-items: center;
}

.imagesBoxList{
    display: inline-block;height: 189px;width: 336px;
}




</style>
