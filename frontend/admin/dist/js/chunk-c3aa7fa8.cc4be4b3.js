(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3aa7fa8"],{"1e6d":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"create-product"},[r("div",{staticClass:"back"},[r("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-left":"5px"},on:{click:t.backProductsList}},[t._v("Back to Products List")])]),r("el-row",{staticClass:"muiGrid"},[r("el-form",{ref:"productForm",staticClass:"demo-ruleForm",attrs:{model:t.productForm,rules:t.rules}},[r("el-col",{attrs:{span:16}},[r("div",{staticClass:"general-inf"},[r("div",{staticClass:"title"},[t._v("General Information")]),r("el-form-item",{attrs:{label:"Product name",prop:"name"}},[r("el-input",{model:{value:t.productForm.name,callback:function(e){t.$set(t.productForm,"name",e)},expression:"productForm.name"}})],1),r("el-form-item",{attrs:{label:"Quantity",prop:"quantity"}},[r("el-input",{attrs:{type:"number"},model:{value:t.productForm.quantity,callback:function(e){t.$set(t.productForm,"quantity",e)},expression:"productForm.quantity"}})],1)],1),r("div",{staticClass:"price"},[r("div",{staticClass:"title"},[t._v("Product Price")]),r("el-form-item",{attrs:{label:"Product price",prop:"price"}},[r("el-input",{attrs:{type:"number"},model:{value:t.productForm.price,callback:function(e){t.$set(t.productForm,"price",e)},expression:"productForm.price"}})],1)],1),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("productForm")}}},[t._v("Save")])],1),r("el-col",{attrs:{span:8}},[r("div",{staticClass:"additional-inf"},[r("div",{staticClass:"title"},[t._v("Additional Information")]),r("el-form-item",{attrs:{label:"Product Type",prop:"type"}},[r("el-select",{attrs:{placeholder:"Select product type"},model:{value:t.productForm.type,callback:function(e){t.$set(t.productForm,"type",e)},expression:"productForm.type"}},t._l(t.options,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("div",{staticStyle:{padding:"20px"}},[t._v("Product Image")]),r("div",{staticStyle:{padding:"20px"}},[r("input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"file",accept:"image/*"},on:{change:t.saveImg}}),t.productForm.img?[r("img",{staticClass:"form-control-file",attrs:{src:t.productForm.img}})]:r("div",{staticClass:"upload-img",staticStyle:{width:"100%","text-align":"center"},attrs:{type:"file",accept:"image/*"},on:{change:t.saveImg}},[r("i",{staticClass:"el-icon-plus",staticStyle:{"line-height":"300px"}})])],2)],1)])],1)],1)],1)},s=[],i=r("1da1"),o=(r("96cf"),r("bc3a")),l=r.n(o),c={data:function(){return{image:{size:0},productForm:{name:"",quantity:null,type:"",price:null,img:null},options:[{value:"berries",label:"Berries"},{value:"milk",label:"Milk"},{value:"vegetables",label:"Vegetables"},{value:"nuts",label:"Nuts"},{value:"cereals",label:"Cereals"}],rules:{name:[{required:!0,message:"Please input Product name",trigger:"blur"},{min:2,message:"Length should be larger than 1",trigger:"blur"}],quantity:[{required:!0,message:"Please input quantity",trigger:"blur"}],price:[{required:!0,message:"Please input price",trigger:"blur"}],type:[{required:!0,message:"Please select type",trigger:"change"}]},imageUrl:""}},methods:{backProductsList:function(){this.$router.go(-1)},saveImg:function(t){var e=this,r=t.target;if(r.files){var a=new FileReader;a.onload=function(t){e.productForm.img=t.target.result},this.image=r.files[0],a.readAsDataURL(r.files[0])}},submitForm:function(t){var e=this;this.$refs[t].validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(r&&e.image.size/1024<60)){t.next=8;break}return e.productForm.quantity=parseInt(e.productForm.quantity),e.productForm.price=parseFloat(e.productForm.price),t.next=5,l.a.put("https://gv-grocery-api.herokuapp.com/addProduct",{productForm:e.productForm}).then((function(t){e.alertSuccess(),console.log(t)})).catch((function(t){return e.alertErr(t.response.data)}));case 5:e.$router.push("/dashboard/product"),t.next=10;break;case 8:return e.alertErr({message:"File ảnh không được vượt quá 60KB"}),t.abrupt("return",!1);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},alertErr:function(t){console.log(t),this.$message({showClose:!0,message:t.message||"Đã có lỗi xảy ra!",type:"error"})},alertSuccess:function(){this.$message({showClose:!0,message:"Thêm sản phẩm thành công!",type:"success"})}}},n=c,u=(r("9057"),r("a608"),r("2877")),p=Object(u["a"])(n,a,s,!1,null,null,null);e["default"]=p.exports},"31be":function(t,e,r){},"43b4":function(t,e,r){},9057:function(t,e,r){"use strict";r("43b4")},a608:function(t,e,r){"use strict";r("31be")}}]);
//# sourceMappingURL=chunk-c3aa7fa8.cc4be4b3.js.map