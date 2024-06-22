import{q as g,j as e,a as N,y as b}from"./app-fbac857a.js";import{B as j}from"./Button-429df1c9.js";import{_ as f,A}from"./AppLayout-cc157e47.js";import{T as a}from"./Table-8bfe4792.js";import{I as D}from"./IconArrowBadgeUp-0bab2865.js";import{I}from"./IconPencilPlus-69ec0e00.js";import{I as T}from"./IconPencilX-173fb6bd.js";import"./createReactComponent-a8208e3e.js";const y=({status:t,...c})=>e.jsx(a.TdNumber,{className:`px-2 ${t?"bg-green-600":""}`,...c}),v=({id:t,numbers:c,item:r})=>e.jsxs("tr",{children:[e.jsx(a.Td,{scope:"row",children:t+1}),e.jsx(a.Td,{children:r.name}),c.map((o,n)=>e.jsx(y,{status:r.days?r.days[o]:!1},n))]}),w=({id:t,numbers:c,item:r})=>e.jsxs("tr",{children:[e.jsx(a.Td,{scope:"row",children:t+1}),e.jsx(a.Td,{children:r.name}),c.map((o,n)=>e.jsx(y,{status:r.days_execute?r.days_execute[o]:!1},n))]}),S=(t,c=null)=>{const r=[],o=[],n=["D","L","M","M","J","V","S"],l=new Date,m=c??l.getFullYear(),u=new Date(m,t,0).getDate(),p=Array(u).fill().map((i,x)=>x+1);l.setDate(1),l.setFullYear(m),l.setMonth(t-1);const h=l.getDay();for(let i=0;i<u;i++){let x=new Date(l),s=(h+i)%7;x.setDate(i+1),r.push(n[s]),(s===0||s===6)&&o.push(i+1)}return{monthDays:r,colorDays:o,numbers:p,year:m}};function P(){const{planification:t,activities:c,process:r,noPlanActivities:o}=g().props,n=t.month,{monthDays:l,colorDays:m,numbers:u,year:p}=S(n,t.year),h=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],i=s=>{s.preventDefault(),b.post(route("planification.update-status",t),{status:r.status},{onSuccess:()=>{f.success("Planificación procesada correctamente!",{icon:"👏",style:{borderRadius:"10px",background:"#333",color:"#fff"}})}})},x=()=>{b.post(route("planification.update-status",t),{status:"AN"},{onSuccess:()=>{f.success("Planificación anulada correctamente!",{icon:"👏",style:{borderRadius:"10px",background:"#333",color:"#fff"}})}})};return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"Crear Planificación"}),e.jsx("div",{className:"mb-5",children:e.jsx("div",{className:"flex flex-row items-center md:justify-between gap-5",children:e.jsx("div",{className:"w-full",children:e.jsxs("h3",{className:"font-semibold text-l text-gray-800 leading-tight mb-2",children:["Mes de ",h[n-1]," del ",p]})})})}),e.jsx(a.Card,{title:`${r.label} PLANIFICACIÓN`,icon:e.jsx(D,{strokeWidth:"1.5",size:"20"}),children:e.jsxs("form",{onSubmit:i,children:[e.jsxs(a,{children:[e.jsxs(a.Thead,{children:[e.jsxs("tr",{children:[e.jsx(a.Th,{rowSpan:2,scope:"col",children:"#"}),e.jsx(a.Th,{rowSpan:2,scope:"col",children:"Actividades"}),l.map((s,d)=>e.jsx(a.ThNumber,{scope:"col",className:` py-3 ${s==="S"||s==="D"?"bg-blue-500 dark:text-white":"bg-gray-100"}`,children:s},d))]}),e.jsx("tr",{children:u.map((s,d)=>e.jsx(a.ThNumber,{scope:"col",className:` py-3 ${m.includes(s)?"bg-blue-500 dark:text-white":"bg-gray-100"}`,children:s},d))})]}),e.jsxs(a.Tbody,{children:[c.map((s,d)=>e.jsx(v,{id:d,item:s,numbers:u},d)),o.length?e.jsx("tr",{children:e.jsx(a.Td,{className:"bg-gray-100",colSpan:35,children:"ACTIVIDADES NO PLANIFICADAS"})}):"",o.length?o.map((s,d)=>e.jsx(w,{id:d,item:s,numbers:u},s.id??s)):""]})]}),e.jsxs("div",{className:"flex items-center gap-4 mt-4 p-2",children:[e.jsx(j,{label:r.label,icon:e.jsx(I,{strokeWidth:"1.5",size:"20"}),className:"bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500"}),r.status!=="CR"&&e.jsx(j,{label:"Anular",icon:e.jsx(T,{strokeWidth:"1.5",size:"20"}),className:"bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500",onClick:x,noSubmit:1})]})]})})]})}P.layout=t=>e.jsx(A,{children:t});export{P as default};
