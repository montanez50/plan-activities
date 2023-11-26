import{j as s,q as n,a as x,d as m}from"./app-a8716644.js";import{I as o,a as h,b as p,A as g}from"./AppLayout-dedf3cbe.js";import{c as j}from"./createReactComponent-762429e4.js";function d({title:a,icon:l,subtitle:i,className:t,children:r,color:e}){return s.jsx("div",{className:`${t} bg-white p-4 rounded-lg shadow`,children:s.jsxs("div",{className:"flex justify-between items-center gap-4",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:`p-2 rounded-lg ${e}`,children:l}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx("div",{className:"font-semibold",children:a}),s.jsx("div",{className:"text-xs text-gray-500",children:i})]})]}),s.jsx("div",{className:"font-semibold text-lg font-mono p-2",children:r})]})})}var v=j("arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]]);function u(){const{auth:a,users:l,users_count:i,roles_count:t,permissions_count:r}=n().props;return s.jsxs(s.Fragment,{children:[s.jsx(x,{title:"Dashboard"}),s.jsx("div",{className:"font-bold text-sky-600 text-xl mb-5",children:"OVERVIEW"}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[s.jsx("div",{className:"col-span-12 lg:col-span-2",children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[s.jsx(d,{title:"Users",subtitle:"Total users",color:"bg-sky-100 text-sky-700",icon:s.jsx(o,{size:"20",strokeWidth:"1.5"}),className:"shadow-sky-300",children:i}),s.jsx(d,{title:"Roles",subtitle:"Total roles",color:"bg-indigo-100 text-indigo-700",icon:s.jsx(h,{size:"20",strokeWidth:"1.5"}),className:"shadow-indigo-300",children:t}),s.jsx(d,{title:"Permissions",subtitle:"Total permissions",color:"bg-teal-100 text-teal-700",icon:s.jsx(p,{size:"20",strokeWidth:"1.5"}),className:"shadow-teal-300",children:r})]})}),s.jsx("div",{className:"col-span-12 lg:col-span-1",children:s.jsxs("div",{className:"bg-white rounded-lg",children:[s.jsx("div",{className:"border-b px-6 py-3",children:s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(o,{strokeWidth:"1.5",size:"20"}),s.jsx("h1",{className:"font-semibold text-sm uppercase",children:"List Users"})]})}),s.jsx("div",{className:"px-6 py-4",children:s.jsx("div",{className:"flex flex-col flex-wrap divide-y divide-dashed gap-2",children:l.map((e,c)=>s.jsxs("div",{className:`flex flex-row gap-4 items-center ${c===0?"pb-2":"py-2"}`,children:[s.jsx("img",{src:e.avatar,className:"w-12 h-12 rounded-full"}),s.jsxs("div",{className:"",children:[s.jsx("span",{className:"font-semibold text-sm",children:e.name}),s.jsx("p",{className:"text-xs text-gray-400",children:e.email})]})]},c))})}),s.jsx("div",{className:"border-t px-6 py-3",children:s.jsxs(m,{href:"/apps/users",className:"flex items-center gap-1 justify-center group font-semibold text-gray-600 hover:text-sky-500",children:["View all users ",s.jsx(v,{size:"20",strokeWidth:"1.5",className:"group-hover:text-sky-500 group-hover:translate-x-1 duration-300"})]})})]})})]})]})}u.layout=a=>s.jsx(g,{children:a});export{u as default};
