var k=Object.defineProperty;var m=Object.getOwnPropertySymbols;var V=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var _=(s,e,a)=>e in s?k(s,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[e]=a,g=(s,e)=>{for(var a in e||(e={}))V.call(e,a)&&_(s,a,e[a]);if(m)for(var a of m(e))b.call(e,a)&&_(s,a,e[a]);return s};import{_ as S,d as y,a as E,u as R,r as c,c as f,b as F,w as N,e as P,f as t,g as r,v as p,h as d,i as C,j as I,p as $,k as B,l as U,o as D,m as T}from"./index.29837664.js";import{n as j,e as M,p as q}from"./validation.8d3fc97a.js";import{a as z}from"./swal.8f416532.js";import{_ as A}from"./img.bb5a32de.js";import{_ as G}from"./MetaWall.7732a473.js";const H=y({name:"PublishPost",components:{},setup(){const s=E(),e=R(),a=c(!0),n=c(!0),l=c(!0),u=c(!1);f(()=>e.getters["user/accountStatus"]);const o=F({nickname:"",email:"",password:""}),i=f(()=>e.getters["user/verifyResponse"]),h=async()=>{!o.nickname||!j(o.nickname)?a.value=!1:a.value=!0,!o.email||!M(o.email)?n.value=!1:n.value=!0,!o.password||!q(o.password)?l.value=!1:l.value=!0,await e.dispatch("user/register",g({},o))};return N(i.value,w=>{w.status==="success"&&(z("\u8A3B\u518A\u6210\u529F\uFF01"),s.push({path:"/login"}),e.dispatch("user/setDefaultResponse"))}),{registerForm:o,isVerifiedNickname:a,isVerifiedEmail:n,isEmailRegistered:u,isVerifiedPassword:l,register:h}}}),v=s=>($("data-v-fcaf7c68"),s=s(),B(),s),J={class:"container"},K={class:"row"},L=v(()=>t("div",{class:"col"},[t("img",{src:A,alt:""})],-1)),O={class:"col"},Q={class:"login-block"},W=v(()=>t("div",{class:"login-title"},[t("img",{src:G,alt:""}),t("p",{class:"text"},"\u8A3B\u518A")],-1)),X={class:"login-input"},Y={class:"nickname-msg"},Z={class:"email-msg"},x={class:"email-msg"},ss={class:"password-msg"},es={class:"btn-block"},ts=T("\u767B\u5165");function as(s,e,a,n,l,u){const o=U("router-link");return D(),P("div",J,[t("div",K,[L,t("div",O,[t("div",Q,[W,t("div",X,[t("p",null,[r(t("input",{"onUpdate:modelValue":e[0]||(e[0]=i=>s.registerForm.nickname=i),type:"text",class:"nickname",placeholder:"\u66B1\u7A31"},null,512),[[p,s.registerForm.nickname]]),r(t("span",Y,"\u66B1\u7A31\u81F3\u5C11 2 \u500B\u5B57\u5143\u4EE5\u4E0A",512),[[d,!s.isVerifiedNickname]])]),t("p",null,[r(t("input",{"onUpdate:modelValue":e[1]||(e[1]=i=>s.registerForm.email=i),type:"email",class:"email",placeholder:"Email"},null,512),[[p,s.registerForm.email]]),r(t("span",Z,"Email \u683C\u5F0F\u932F\u8AA4",512),[[d,!s.isVerifiedEmail]]),r(t("span",x,"\u5E33\u865F\u5DF2\u88AB\u8A3B\u518A\uFF0C\u8ACB\u66FF\u63DB\u65B0\u7684 Email\uFF01",512),[[d,s.isEmailRegistered]])]),t("p",null,[r(t("input",{"onUpdate:modelValue":e[2]||(e[2]=i=>s.registerForm.password=i),type:"password",class:"password",placeholder:"Password"},null,512),[[p,s.registerForm.password]]),r(t("span",ss,"\u5BC6\u78BC\u9700\u81F3\u5C11 8 \u78BC\u4EE5\u4E0A\uFF0C\u4E26\u82F1\u6587\u3001\u6578\u5B57\u6DF7\u5408",512),[[d,!s.isVerifiedPassword]])])]),t("div",es,[t("button",{type:"button",class:"btn-signup",onClick:e[3]||(e[3]=(...i)=>s.register&&s.register(...i))},"\u8A3B\u518A"),C(o,{to:"/login",class:"btn-login"},{default:I(()=>[ts]),_:1})])])])])])}var ds=S(H,[["render",as],["__scopeId","data-v-fcaf7c68"]]);export{ds as default};