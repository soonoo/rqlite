(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[336],{3456:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/menu/query-runner",function(){return n(1794)}])},1794:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var s=n(5893),l=n(7294),r=n(1737),i=n(6863),a=n(9211),d=n(7685),o=n(4630),c=n(7421),u=n(6262);let x=e=>{let{config:t,saveEditorContent:n}=(0,u.Z)();return(0,s.jsx)(d.ZP,{height:"100%",value:t.editorContent,style:{height:"calc(100% - 100px)",overflow:"scroll"},extensions:[(0,o.i6)({dialect:o.ey}),c.$f.of([{key:"Shift-Enter",run:()=>(e.onSubmit(),!0)}])],onChange:t=>{n(t),e.onChange(t)}})};var h=n(6486),p=n(2333);let f=e=>"columns"in e,g=e=>"rows_affected"in e,m=e=>"time"in e,j=e=>"error"in e;var y=n(5537),v=n(7720),b=n(6447),w=n(9226),Z=n(1703),C=n(44),E=n(3946);n(5521);var k=n(6081);let S=e=>{let{data:t}=e,[n,r]=(0,l.useState)(0);(0,l.useEffect)(()=>{r(0)},[t]);let i=(0,l.useCallback)(()=>{if((0,h.isEmpty)(t))return null;let{results:e,q:l,time:r}=t[n],i=l.replaceAll("\n","");return f(e[0])?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{style:{padding:"4px"},children:[(1e3*e[0].time).toFixed(2),"ms",(0,s.jsx)("pre",{style:{display:"inline",backgroundColor:"#ddd",padding:"4px",borderRadius:"4px",marginLeft:"10px"},children:i})]}),(0,s.jsx)(k.ZP,{style:{height:"calc(100% - 80px)",flexGrow:1,overflow:"scroll"},columns:e[0].columns.map(e=>({key:e,name:e})),renderers:{noRowsFallback:(0,s.jsx)("div",{style:{padding:"10px"},children:"No data found."})},rows:(e[0].values||[]).map(t=>t.reduce((t,n,s)=>(t[e[0].columns[s]]=String(n),t),{}))})]}):g(e[0])||m(e[0])||j(e[0])?(0,s.jsxs)("div",{style:{padding:"4px"},children:[(0,s.jsxs)("div",{children:[(1e3*r).toFixed(2),"ms",(0,s.jsx)("pre",{style:{display:"inline",backgroundColor:"#ddd",padding:"4px",borderRadius:"4px",marginLeft:"10px"},children:i})]}),(0,s.jsx)(v.Z,{sx:{marginY:"4px"}}),JSON.stringify(e[0])]}):null},[t,n]);return(0,s.jsx)("div",{style:{backgroundColor:"#fafafa",borderTop:"6px solid #ddd",flexGrow:1,display:"flex",flexDirection:"column",height:"100%"},children:(0,h.isEmpty)(t)?(0,s.jsx)(b.Z,{justifyContent:"center",alignItems:"center",height:"100%",children:"Query results will be displayed here."}):(0,s.jsxs)(w.Z,{height:"100%",children:[(0,s.jsx)(Z.Z,{variant:"scrollable",value:n,onChange:(e,t)=>r(t),scrollButtons:"auto",children:t.map((n,l)=>{let{q:i}=n;return(0,s.jsx)(C.Z,{label:(0,s.jsxs)("span",{style:{display:"flex",alignItems:"center"},children:["RESULT ",t.length-l,(0,s.jsx)(E.Z,{size:"small",style:{marginLeft:"8px"},onClick:t=>{t.stopPropagation(),e.onRemoveTab(l),r(0)},children:(0,s.jsx)(y.Z,{sx:{fontSize:"16px"}})})]}),value:l},l)})}),(0,s.jsx)(v.Z,{}),i()]})})};var _=n(6312),R=n(1370),I=n(154),L=n(6571),T=n(8046),z=n(4707),q=n(5254),B=n(7e3),N=n(7669),F=n(8377);let A=e=>{let t="SELECT name FROM sqlite_master WHERE type='table'",{data:n,isError:l,error:r,refetch:i}=(0,B.a)([t],()=>p.B.read([t])),a=(0,h.flatten)(null==n?void 0:n.data.results[0].values),d=(0,N.h)({queries:a.map(e=>{let t="PRAGMA table_info(".concat(e,")");return{queryKey:[t],queryFn:()=>p.B.read([t]),enabled:!1}})}),o=async()=>{i(),d.forEach(e=>{e.refetch()})};return(0,s.jsxs)("div",{style:{backgroundColor:"#eee",height:"100%",overflow:"scroll"},children:[(0,s.jsx)(F.Z,{sx:{padding:"2px",display:"flex",alignItems:"center",justifyContent:"flex-end"},children:(0,s.jsx)(E.Z,{onClick:o,children:(0,s.jsx)(I.Z,{})})}),(0,h.isEmpty)(a)&&(0,s.jsx)("div",{style:{padding:"10px",alignItems:"center",justifyContent:"center",display:"flex"},children:l?(0,h.get)(r,"message","Unknown error occurred while fetching data"):"No tables found"}),(0,s.jsx)(z.Z,{defaultCollapseIcon:(0,s.jsx)(L.Z,{}),defaultExpandIcon:(0,s.jsx)(T.Z,{}),children:a.map((t,n)=>{var l;return(0,s.jsxs)(q.Z,{nodeId:t,label:(0,s.jsx)("span",{style:{fontWeight:600,fontSize:"15px"},children:t}),onClick:()=>d[n].refetch(),children:[(0,s.jsx)(q.Z,{nodeId:t+"/data",label:"data",onClick:()=>e.onLoadTableData(t)}),(0,s.jsx)(q.Z,{nodeId:t+"/columns",label:"columns",children:((null===(l=d[n].data)||void 0===l?void 0:l.data.results[0].values)||[]).map((e,n)=>(0,s.jsx)(q.Z,{nodeId:t+"/columns/"+n,label:(0,s.jsxs)("span",{style:{fontSize:"14px"},children:[e[1]," ",(0,s.jsx)("span",{style:{color:"#777",fontSize:"12px"},children:e[2]})]})},n))})]},t)})})]})};var P=n(8987);let G=()=>{let[e,t]=(0,l.useState)(""),[n,d]=(0,l.useState)([]),[o,c]=(0,l.useState)(!1),u=e=>{let t=[...n];t.splice(e,1),d(t)},f=async e=>e.startsWith("select ")||e.startsWith("pragma ")?await p.B.read([e]):await p.B.write([e]),g=async e=>{if(o)return;c(!0);let t=e.split(";").map(e=>(0,h.trim)(e,"\n").toLowerCase()).filter(e=>e.length>0),s=[];for(let l of t)try{let r=await f(l);s=[{q:l,...r.data},...s]}catch(i){s=[{q:l,results:[{error:i.message||"unknown error occurs"}],time:0},...s]}d([...s,...n]),c(!1)};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{style:{flexGrow:1,overflow:"hidden",display:"flex",flexDirection:"column"},children:[(0,s.jsx)(_.e,{maxHeight:"75vh",defaultSize:{width:"100%",height:"55vh"},children:(0,s.jsxs)(a.Z,{direction:"row",height:"100%",children:[(0,s.jsx)(_.e,{minWidth:"20px",defaultSize:{width:"200px",height:"100%"},children:(0,s.jsx)(A,{onLoadTableData:e=>{g("SELECT * FROM ".concat(e," LIMIT 500"))}})}),(0,s.jsxs)(a.Z,{justifyContent:"center",paddingX:"2px",width:"100%",children:[(0,s.jsx)(r.Z,{severity:"info",sx:{margin:"6px"},children:"Multiple queries must be separated by semicolon."}),(0,s.jsx)(i.Z,{sx:{marginBottom:"4px",marginX:"6px"},children:(0,s.jsx)(P.Z,{disableRipple:!0,startIcon:(0,s.jsx)(R.Z,{}),variant:"contained",onClick:()=>g(e),loading:o,children:"RUN (Shift + Enter)"})}),(0,s.jsx)(x,{onChange:t,onSubmit:()=>g(e)})]})]})}),(0,s.jsx)("div",{style:{overflow:"scroll",flexGrow:1},children:(0,s.jsx)(S,{data:n,onRemoveTab:u})})]})})};var M=G},2333:function(e,t,n){"use strict";n.d(t,{B:function(){return i}});var s=n(8945),l=n(6262);let r=s.Z.create({baseURL:""});r.interceptors.request.use(function(e){let t=(0,l.i)().accounts.find(e=>e.isActive);if(t){var n;let{username:s,password:r}=t;e.headers=null!==(n=e.headers)&&void 0!==n?n:{};let i=btoa(s+":"+r);e.headers.Authorization="Basic ".concat(i),e.headers["X-Rqlite-Authorization"]="Basic ".concat(i)}return e});let i={read:e=>r.post("/db/query?timings",e),write:e=>r.post("/db/execute?timings",e),status:()=>r.get("/status"),nodes:()=>r.get("/nodes"),readiness:()=>r.get("/readyz"),expvar:()=>r.get("/debug/vars")}}},function(e){e.O(0,[762,426,875,774,888,179],function(){return e(e.s=3456)}),_N_E=e.O()}]);