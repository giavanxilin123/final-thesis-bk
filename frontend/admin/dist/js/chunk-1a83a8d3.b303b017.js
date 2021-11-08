(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a83a8d3"],{"18ba":function(t,e,r){},"4cfb":function(t,e,r){"use strict";r("6b59")},"4d54":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"update-product"},[r("div",{staticClass:"back"},[r("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-left":"5px"},on:{click:t.backProductsList}},[t._v("Back to Products List")])]),r("el-row",{staticClass:"muiGrid"},[r("el-form",{ref:"productForm",staticClass:"demo-ruleForm",attrs:{model:t.productForm,rules:t.rules}},[r("el-col",{attrs:{span:16}},[r("div",{staticClass:"general-inf"},[r("div",{staticClass:"title"},[t._v("General Information")]),r("el-form-item",{attrs:{label:"Product name",prop:"name"}},[r("el-input",{model:{value:t.productForm.name,callback:function(e){t.$set(t.productForm,"name",e)},expression:"productForm.name"}})],1),r("el-form-item",{attrs:{label:"Quantity",prop:"quantity"}},[r("el-input",{attrs:{type:"number"},model:{value:t.productForm.quantity,callback:function(e){t.$set(t.productForm,"quantity",e)},expression:"productForm.quantity"}})],1)],1),r("div",{staticClass:"price"},[r("div",{staticClass:"title"},[t._v("Product Price")]),r("el-form-item",{attrs:{label:"Product price",prop:"price"}},[r("el-input",{attrs:{type:"number"},model:{value:t.productForm.price,callback:function(e){t.$set(t.productForm,"price",e)},expression:"productForm.price"}})],1)],1),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("productForm")}}},[t._v("Save")])],1),r("el-col",{attrs:{span:8}},[r("div",{staticClass:"additional-inf"},[r("div",{staticClass:"title"},[t._v("Additional Information")]),r("el-form-item",{attrs:{label:"Product Type",prop:"type"}},[r("el-select",{attrs:{placeholder:"Select product type"},model:{value:t.productForm.type,callback:function(e){t.$set(t.productForm,"type",e)},expression:"productForm.type"}},t._l(t.options,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("div",{staticStyle:{padding:"20px"}},[t._v("Product Image")]),r("div",{staticStyle:{padding:"20px"}},[r("input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"file",accept:"image/*"},on:{change:t.saveImg}}),t.productForm.img?[r("img",{staticClass:"form-control-file",attrs:{src:t.productForm.img}})]:r("div",{staticClass:"upload-img",staticStyle:{width:"100%","text-align":"center"},attrs:{type:"file",accept:"image/*"},on:{change:t.saveImg}},[r("i",{staticClass:"el-icon-plus",staticStyle:{"line-height":"300px"}})])],2)],1)])],1)],1)],1)},i=[],s=r("1da1"),o=(r("b0c0"),r("96cf"),r("bc3a")),c=r.n(o),n={data:function(){return{image:null,productForm:{name:"",quantity:null,type:"",price:null,img:null},options:[{value:"berries",label:"Berries"},{value:"milk",label:"Milk"},{value:"vegetables",label:"Vegetables"},{value:"nuts",label:"Nuts"},{value:"cereals",label:"Cereals"}],rules:{name:[{required:!0,message:"Please input Product name",trigger:"blur"},{min:2,message:"Length should be larger than 1",trigger:"blur"}],quantity:[{required:!0,message:"Please input quantity",trigger:"blur"}],price:[{required:!0,message:"Please input price",trigger:"blur"}],type:[{required:!0,message:"Please select type",trigger:"change"}]}}},methods:{backProductsList:function(){this.$router.go(-1)},saveImg:function(t){var e=this,r=t.target;if(r.files){var a=new FileReader;a.onload=function(t){e.productForm.img=t.target.result},this.image=r.files[0],a.readAsDataURL(r.files[0])}},submitForm:function(t){var e=this,r=this.$route.query.id;this.$refs[t].validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=7;break}return t.next=3,c.a.put("https://gv-grocery-api.herokuapp.com/api.updateProduct/".concat(r),e.productForm).then((function(t){e.alertSuccess(),console.log(t)})).catch((function(t){return e.alertErr(t.response.data)}));case 3:e.$router.push("/dashboard/product"),console.log(e.productForm),t.next=9;break;case 7:return e.alertErr({message:"File ảnh không được vượt quá 60KB"}),t.abrupt("return",!1);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},alertErr:function(t){console.log(t),this.$message({showClose:!0,message:t.message||"Đã có lỗi xảy ra!",type:"error"})},alertSuccess:function(){this.$message({showClose:!0,message:"Sửa sản phẩm thành công!",type:"success"})}},created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.$route.query.id,e.next=3,t.$store.dispatch("getProductById",r);case 3:t.productForm.name=t.productUpdate.name,t.productForm.img=t.productUpdate.img,t.productForm.quantity=t.productUpdate.quantity,t.productForm.type=t.productUpdate.type,t.productForm.price=t.productUpdate.price;case 8:case"end":return e.stop()}}),e)})))()},computed:{productUpdate:function(){return this.$store.state.productById}}},u=n,l=(r("4cfb"),r("ae21"),r("2877")),p=Object(l["a"])(u,a,i,!1,null,null,null);e["default"]=p.exports},"6b59":function(t,e,r){},ae21:function(t,e,r){"use strict";r("18ba")}}]);
//# sourceMappingURL=chunk-1a83a8d3.b303b017.js.map