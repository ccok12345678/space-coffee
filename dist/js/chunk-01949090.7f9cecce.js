(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01949090"],{"072f":function(e,t,c){"use strict";c.r(t);var n=c("7a23"),a=c("7f00"),r=c.n(a),o={class:"container-lg my-4"},l={class:"row justify-content-center"},s={key:0,class:"col-md-10 d-flex flex-column align-items-center"},i=Object(n["createElementVNode"])("div",{class:"mb-2 text-center w-30"},[Object(n["createElementVNode"])("img",{class:"spinner-slow mb-4",src:r.a}),Object(n["createElementVNode"])("h4",{class:"fs-4 text-gray-700"},"尚未建立訂單!")],-1),d=[i],b={key:1,class:"col-md-10 d-flex flex-column align-items-center"},m=Object(n["createElementVNode"])("h4",{class:"text-gray-700"},"所有訂單",-1),j=Object(n["createElementVNode"])("div",{class:"devider w-25 boder-dark my-3"},null,-1),p={class:"row w-100 gy-3"},O={class:"card"},g={class:"card-header"},u={class:"card-body pb-2"},k=Object(n["createElementVNode"])("div",{class:"mb-2"},"訂單編號：",-1),f={class:"text-end"},E=Object(n["createElementVNode"])("div",{class:"devider w-100 border-gray-300 my-2"},null,-1),v={class:"mb-2 d-flex justify-content-between"},N=Object(n["createElementVNode"])("span",null,"訂單金額：",-1),V={class:"mb-2 d-flex justify-content-between"},h=Object(n["createTextVNode"])("付款狀態："),y={key:0,class:"text-info"},w={key:1,class:"text-danger"},x=Object(n["createElementVNode"])("div",{class:"devider w-100 border-gray-300 my-3"},null,-1),B=Object(n["createTextVNode"])("檢視"),C={class:"col-12 d-flex"};function P(e,t,c,a,r,i){var P=Object(n["resolveComponent"])("router-link"),_=Object(n["resolveComponent"])("Pagination");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",o,[Object(n["createElementVNode"])("div",l,[0===r.orders.length?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",s,d)):Object(n["createCommentVNode"])("",!0),r.orders.length>0?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",b,[m,j,Object(n["createElementVNode"])("main",p,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(r.orders,(function(t,c){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"col-sm-6 col-md-4",key:t.id},[Object(n["createElementVNode"])("div",O,[Object(n["createElementVNode"])("div",g,"下單日期："+Object(n["toDisplayString"])(e.$filters.date(t.create_at)),1),Object(n["createElementVNode"])("div",u,[k,Object(n["createElementVNode"])("div",f,Object(n["toDisplayString"])(t.id),1),E,Object(n["createElementVNode"])("div",v,[N,Object(n["createElementVNode"])("span",null,"NT$ "+Object(n["toDisplayString"])(e.$filters.currency(t.total)),1)]),Object(n["createElementVNode"])("div",V,[h,Object(n["createElementVNode"])("div",null,[t.is_paid?(Object(n["openBlock"])(),Object(n["createElementBlock"])("span",y,"已付款")):(Object(n["openBlock"])(),Object(n["createElementBlock"])("span",w,"未付款"))])]),x,Object(n["createVNode"])(P,{class:"btn btn-outline-gray-600 w-100",to:"/order/".concat(t.id)},{default:Object(n["withCtx"])((function(){return[B]})),_:2},1032,["to"])])])])})),128))])])):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("div",C,[Object(n["createVNode"])(_,{class:"mx-auto",pages:r.pagination,onEmitPage:i.getOrders},null,8,["pages","onEmitPage"])])])])}var _=c("1da1"),T=(c("96cf"),c("99af"),c("d3b7"),c("1799")),D={data:function(){return{orders:[],pagination:{},currentPage:1}},components:{Pagination:T["a"]},inject:["scrollTop"],methods:{getOrders:function(){var e=arguments,t=this;return Object(_["a"])(regeneratorRuntime.mark((function c(){var n,a,r,o;return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:1,t.currentPage=n,a="\n        ".concat("https://vue3-course-api.hexschool.io","/api/").concat("ccok-api","/orders?page=").concat(t.currentPage,"\n      "),c.next=5,fetch(a);case 5:return r=c.sent,c.next=8,r.json();case 8:o=c.sent,o.success&&(t.orders=o.orders,t.pagination=o.pagination);case 10:case"end":return c.stop()}}),c)})))()}},created:function(){document.title="檢視訂單｜宇宙咖啡",this.scrollTop(),this.getOrders()}},S=c("6b0d"),$=c.n(S);const M=$()(D,[["render",P]]);t["default"]=M},1799:function(e,t,c){"use strict";var n=c("7a23"),a={key:0,class:"mt-3"},r={class:"pagination justify-content-center"},o={key:0,class:"page-item"},l=Object(n["createElementVNode"])("span",null,"⫷",-1),s=[l],i=["onClick"],d={key:1,class:"page-item"},b=Object(n["createElementVNode"])("span",null,"⫸",-1),m=[b];function j(e,t,c,l,b,j){return c.pages.total_pages>1?(Object(n["openBlock"])(),Object(n["createElementBlock"])("nav",a,[Object(n["createElementVNode"])("ul",r,[c.pages.has_pre?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",o,[Object(n["createElementVNode"])("a",{class:"page-link",href:"#",onClick:t[0]||(t[0]=Object(n["withModifiers"])((function(e){return j.changePage(c.pages.current_page-1)}),["prevent"]))},s)])):Object(n["createCommentVNode"])("",!0),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(c.pages.total_pages,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{class:Object(n["normalizeClass"])(["page-item",{active:e===c.pages.current_page}]),key:e},[Object(n["createElementVNode"])("a",{class:"page-link",href:"#",onClick:Object(n["withModifiers"])((function(t){return j.changePage(e)}),["prevent"])},Object(n["toDisplayString"])(e),9,i)],2)})),128)),c.pages.has_next?(Object(n["openBlock"])(),Object(n["createElementBlock"])("li",d,[Object(n["createElementVNode"])("a",{class:"page-link",href:"#",onClick:t[1]||(t[1]=Object(n["withModifiers"])((function(e){return j.changePage(c.pages.current_page+1)}),["prevent"]))},m)])):Object(n["createCommentVNode"])("",!0)])])):Object(n["createCommentVNode"])("",!0)}var p=c("7d47"),O={props:["pages"],methods:{changePage:function(e){this.$emit("emit-page",e),Object(p["a"])()}}},g=c("6b0d"),u=c.n(g);const k=u()(O,[["render",j]]);t["a"]=k},"7f00":function(e,t,c){e.exports=c.p+"img/galaxy_icon.0c74ab1c.svg"}}]);
//# sourceMappingURL=chunk-01949090.7f9cecce.js.map