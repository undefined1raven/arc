import{s as S,n as N,r as O}from"../chunks/scheduler.e108d1fd.js";import{S as U,i as j,g as b,m as d,s as k,h as y,n as v,c as w,y as B,k as P,a as o,z as h,A as C,B as c,o as I,f}from"../chunks/index.77302298.js";function q(i){let n,u,e,l,p,m,a,_="Calculate",r,T;return{c(){n=b("input"),u=d(` +
  `),e=b("input"),l=d(` =
  `),p=d(i[2]),m=k(),a=b("button"),a.textContent=_,this.h()},l(t){n=y(t,"INPUT",{type:!0}),u=v(t,` +
  `),e=y(t,"INPUT",{type:!0}),l=v(t,` =
  `),p=v(t,i[2]),m=w(t),a=y(t,"BUTTON",{"data-svelte-h":!0}),B(a)!=="svelte-lb7mh7"&&(a.textContent=_),this.h()},h(){P(n,"type","number"),P(e,"type","number")},m(t,s){o(t,n,s),h(n,i[0]),o(t,u,s),o(t,e,s),h(e,i[1]),o(t,l,s),o(t,p,s),o(t,m,s),o(t,a,s),r||(T=[C(n,"input",i[4]),C(e,"input",i[5]),C(a,"click",i[3])],r=!0)},p(t,[s]){s&1&&c(n.value)!==t[0]&&h(n,t[0]),s&2&&c(e.value)!==t[1]&&h(e,t[1]),s&4&&I(p,t[2])},i:N,o:N,d(t){t&&(f(n),f(u),f(e),f(l),f(p),f(m),f(a)),r=!1,O(T)}}}function z(i,n,u){let e=0,l=0,p=0;async function m(){const r=await fetch("/api/add",{method:"POST",body:JSON.stringify({a:e,b:l}),headers:{"content-type":"application/json"}});u(2,p=await r.json())}function a(){e=c(this.value),u(0,e)}function _(){l=c(this.value),u(1,l)}return[e,l,p,m,a,_]}class D extends U{constructor(n){super(),j(this,n,z,q,S,{})}}export{D as component};
