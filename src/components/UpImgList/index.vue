<template>
    <div style="margin-top:20px;margin-right:100px;">
        <input type="file" name="file" id="file" class="inputfile" accept="image/png, image/jpeg, image/gif, image/jpg" @change="changepic" ref="Elinput"   multiple /> 
        <el-button type="primary"  size="mini" @click="choiceImg">选取文件</el-button>
        <img :src="item.url" style="width:100px;height:100px;float:left;" v-for="(item,index) in fileList" :key="index" v-if='item.upbool'/>
        <el-button type="success" size="mini" @click='Upclick'>开始上传</el-button>
    </div>
</template>

<script>
  import {imageUpload} from "@/api/imgUpLoad"
    export default{
      data(){
        return{
            imgUrl:'',
            fileList:[]
        }
      },
      methods:{
        choiceImg(){
          this.$refs.Elinput.dispatchEvent(new MouseEvent('click')) 
        },
        fn(e){
             let self = this              
             let reads= new FileReader();
             let img = this.$refs['Elinput']
              reads.readAsDataURL(img.files[0]);
              reads.onload=function (e) {
              
              self.imgUrl=this.result;
        }
        },
          changepic(obj) {
        // console.log(obj);//这里可以获取上传文件的name
        let img = this.$refs['Elinput']
        let files = img.files
        let urls = Array.from(files).map((v,index)=>{
         let  url=this.getObjectURL(v)          
          return {url,obj:files[index],upbool:true}
        })
       this.fileList.push(...urls)
       
    }
    //建立一個可存取到該file的url
    ,getObjectURL(file) {
        var url = null ;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    },

    Upclick(){
        let that = this;
        this.fileList.map((v,index) => {
            console.log("你好世界",v)
            that.UpLoadImgList(v,index)
        })
    },

    UpLoadImgList(v,index){
        let that = this;
        var formData = new FormData(); 
        formData.append("file", v.obj);  
        // formData.append("token", token_value); // 其他参数按这样子加入

        imageUpload(formData).catch(err => {
            this.$notify.error({
                title:'上传失败',
                message:'上传失败请重新上传'
            })
        }).then(res => {
            console.log(index,"上传图片的返回值",res)
            that.fileList[index].upbool = false;
            console.log("上传图片的返回值asdasd",that.fileList)
            this.$emit('UpListImg',res)
            this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
            });
        })
    },

    

    uploadImg(progress,path,callback){
        var formData = new FormData(); 
        formData.append("file", document.getElementById('file').files[0]);  
        formData.append("token", token_value); // 其他参数按这样子加入

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadurl');
        // 上传完成后的回调函数
        xhr.onload = function () {
        if (xhr.status === 200) {
        　　console.log('上传成功');
            xhr
        } else {
        　console.log('上传出错');
        }
        };
        // 获取上传进度
        xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var percent = Math.floor(event.loaded / event.total * 100) ;
            progress = percent
            // 设置进度显示
            console.log(percent)
        }
        };
        xhr.send(formData);
    }
    }
    }
</script>

<style>
.inputfile {
            opacity: 0;
            display: none;
        }
        .btn{
          padding: 15px;
        } 
        .btn-success{
          background: green;
        }
</style>