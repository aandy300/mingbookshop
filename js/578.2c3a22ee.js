"use strict";(self["webpackChunkshop"]=self["webpackChunkshop"]||[]).push([[578],{3246:function(t,e,a){a.d(e,{Z:function(){return f}});var i=a(6252),n=a(3577),o=a(9963);const s={"aria-label":"Page navigation example"},l={class:"pagination justify-content-center"},r=(0,i._)("span",{"aria-hidden":"true"},"«",-1),c=[r],p=["onClick"],d=(0,i._)("span",{"aria-hidden":"true"},"»",-1),g=[d];function u(t,e,a,r,d,u){return(0,i.wg)(),(0,i.iD)("nav",s,[(0,i._)("ul",l,[(0,i._)("li",{class:(0,n.C_)(["page-item",{disabled:!a.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:e[0]||(e[0]=(0,o.iM)((e=>t.$emit("get-data",d.inside_pages.current_page-1)),["prevent"]))},c)],2),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.pages.total_pages,(e=>((0,i.wg)(),(0,i.iD)("li",{class:(0,n.C_)(["page-item",{active:e===a.pages.current_page}]),key:e+"page"},[(0,i._)("a",{class:"page-link",href:"",onClick:(0,o.iM)((a=>t.$emit("get-data",e)),["prevent"])},(0,n.zw)(e),9,p)],2)))),128)),(0,i._)("li",{class:(0,n.C_)(["page-item",{disabled:!a.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:e[1]||(e[1]=(0,o.iM)((e=>t.$emit("get-data",d.inside_pages.current_page+1)),["prevent"]))},g)],2)])])}var h={data(){return{inside_pages:{}}},props:["pages"],updated(){this.inside_pages=this.pages}},v=a(3744);const m=(0,v.Z)(h,[["render",u]]);var f=m},578:function(t,e,a){a.r(e),a.d(e,{default:function(){return P}});var i=a(6252),n=a(3577),o=a(9963);const s={class:"navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom"},l={class:"navbar-nav flex-row overflow-auto navbar-custom-scroll"},r=(0,i.Uk)("其他用品"),c=(0,i._)("span",{class:"sr-only"},"(current)",-1),p=[r,c],d={class:"container mt-md-5 mt-3 mb-7",style:{"min-height":"100vh"}},g={class:"row"},u={class:"card border-0 mb-4 position-relative rounded"},h={style:{},class:"figure d-flex flex-column justify-content-center align-items-center position-relative pt-3"},v=["onClick"],m=["onClick"],f=["src"],_={class:"card-body d-flex flex-column justify-content-center align-items-center pt-0"},b={class:"mb-0"},w={class:"fs-5 mb-1",style:{color:"black",height:"1.5rem",overflow:"hidden"},onmouseover:"this.style.color='#B08968';",onmouseout:"this.style.color='';"},x={class:"card-text text-muted mb-0",style:{height:"4.5rem",overflow:"hidden"}},k={class:"d-flex justify-content-between align-items-center col-12"},y={class:""},D={style:{"white-space":"nowrap","text-align":"center"},class:"mb-0 text-muted text-end mt-2"},C={style:{"white-space":"nowrap","text-align":"center"},class:"h4 fw-bold text-end mt-1 fs-5"},$=["onClick"];function T(t,e,a,r,c,T){const z=(0,i.up)("router-link"),j=(0,i.up)("PaginationView");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("nav",s,[(0,i._)("div",l,[(0,i._)("a",{class:"nav-item nav-link text-nowrap px-2",onClick:e[0]||(e[0]=t=>T.getData()),onclick:"event.preventDefault()",href:"#"},"全部商品"),(0,i._)("a",{class:"nav-item nav-link text-nowrap px-2",onClick:e[1]||(e[1]=t=>(c.pagination={total_pages:1},T.getData(1,"分類一"))),onclick:"event.preventDefault()",href:"#"},"文物書籍"),(0,i._)("a",{class:"nav-item nav-link text-nowrap px-2",onClick:e[2]||(e[2]=t=>(c.pagination={total_pages:1},T.getData(1,"分類二"))),onclick:"event.preventDefault()",href:"#"},"周邊雜誌"),(0,i._)("a",{class:"nav-item nav-link text-nowrap px-2",onClick:e[3]||(e[3]=t=>(c.pagination={total_pages:1},T.getData(1,"分類三"))),onclick:"event.preventDefault()",href:"#"},p)])]),(0,i._)("div",d,[(0,i._)("div",g,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(c.products,(t=>((0,i.wg)(),(0,i.iD)("div",{class:"col-md-6 col-lg-4 col-xl-3",key:t.id,style:{height:"auto"}},[(0,i._)("div",u,[(0,i._)("figure",h,[c.favorite.includes(t.id)?((0,i.wg)(),(0,i.iD)("i",{key:0,onClick:e=>T.toggleFavorite(t.id),class:"bi bi-heart-fill position-absolute btn btn-lg",style:{right:"3px",top:"3px",color:"red"}},null,8,v)):((0,i.wg)(),(0,i.iD)("i",{key:1,onClick:e=>T.toggleFavorite(t.id),class:"bi bi-suit-heart position-absolute btn btn-lg",style:{right:"3px",top:"3px",color:"red"}},null,8,m)),(0,i.Wm)(z,{style:{"text-decoration":"none"},to:`/product/${t.id}`},{default:(0,i.w5)((()=>[(0,i._)("img",{style:{height:"200px"},src:t.imageUrl,alt:"",class:"figure-img img-fluid rounded"},null,8,f)])),_:2},1032,["to"])]),(0,i._)("div",_,[(0,i._)("h4",b,[(0,i.Wm)(z,{class:"card-text text-muted",to:`/product/${t.id}`,style:{"text-decoration":"none"}},{default:(0,i.w5)((()=>[(0,i._)("p",w,(0,n.zw)(t.title),1)])),_:2},1032,["to"])]),(0,i._)("p",x,(0,n.zw)(t.description),1),(0,i._)("div",k,[(0,i._)("div",y,[(0,i._)("p",D,[(0,i._)("del",null,"NT$ "+(0,n.zw)(t.origin_price)+" / "+(0,n.zw)(t.unit),1)]),(0,i._)("p",C,"NT$ "+(0,n.zw)(t.price)+" / "+(0,n.zw)(t.unit),1)]),(0,i._)("div",null,[(0,i._)("button",{onClick:(0,o.iM)((e=>T.addToCart(t)),["prevent"]),style:{"white-space":"nowrap"},type:"button",class:"btn btn-secondary text-end"},"加入購物車",8,$)])])])])])))),128))]),(0,i.Wm)(j,{class:"mt-6",pages:c.pagination,onGetData:T.getData},null,8,["pages","onGetData"])])],64)}var z=a(4902),j=a(3246),N={data(){return{category:"all",products:[],productsAll:[],pagination:"",favorite:JSON.parse(localStorage.getItem("favorite"))||[]}},components:{PaginationView:j.Z},methods:{getData(t=1,e){let a=`https://vue3-course-api.hexschool.io/v2/api/ming123/products/?page=${t}`;e&&(a=`https://vue3-course-api.hexschool.io/v2/api/ming123/products/?page=${t}&category=${e}`),this.$http.get(a).then((t=>{this.products=t.data.products,this.pagination=t.data.pagination})).catch((t=>{console.dir(t)}))},getDataAll(){this.$http.get("https://vue3-course-api.hexschool.io/v2/api/ming123/products/all").then((t=>{this.productsAll=t.data.products})).catch((t=>{console.dir(t)}))},addToCart(t,e=1){const a={product_id:t.id,qty:e};this.$http.post("https://vue3-course-api.hexschool.io/v2/api/ming123/cart",{data:a}).then((()=>{z.Z.emit("get-cart")})).catch((t=>{console.dir(t.data.message)}))},toggleFavorite(t){const e=this.favorite.findIndex((e=>e===t));-1===e?this.favorite.push(t):this.favorite.splice(e,1)},scrollToTop(){window.scrollTo(0,0)}},watch:{favorite:{handler(){localStorage.setItem("favorite",JSON.stringify(this.favorite))},deep:!0}},mounted(){this.getData(),this.scrollToTop()}},Z=a(3744);const M=(0,Z.Z)(N,[["render",T]]);var P=M}}]);
//# sourceMappingURL=578.2c3a22ee.js.map