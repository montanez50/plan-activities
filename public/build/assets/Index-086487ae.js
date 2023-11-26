import{q as n,j as e,a as c}from"./app-a8716644.js";import{I as x,A as o}from"./AppLayout-dedf3cbe.js";import{S as h,T as s,I as m,P as j}from"./Search-91aad80c.js";import{B as p}from"./Button-fdc24431.js";import{A as i}from"./ActionButton-987cb1fd.js";import{I as f}from"./IconPlus-1f8dff00.js";import{I as u}from"./IconCheck-577b1e33.js";import"./createReactComponent-762429e4.js";function g(){const{users:r}=n().props;return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Data Users"}),e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-row items-center md:justify-between gap-5",children:[e.jsx("div",{className:"lg:w-2/6 xl:w-1/6",children:e.jsx(p,{label:"Add New User",type:"link",icon:e.jsx(f,{size:"20",strokeWidth:"1.5"}),className:"bg-white text-gray-700 border hover:border-sky-500",href:"/apps/users/create",added:!0})}),e.jsx("div",{className:"w-full",children:e.jsx(h,{url:"/apps/users",placeholder:"Search data users by name..."})})]})}),e.jsx(s.Card,{title:"LIST USERS",icon:e.jsx(x,{strokeWidth:"1.5",size:"20"}),children:e.jsxs(s,{children:[e.jsx(s.Thead,{children:e.jsxs("tr",{children:[e.jsx(s.Th,{className:"w-10",children:"#"}),e.jsx(s.Th,{children:"Name"}),e.jsx(s.Th,{children:"Email"}),e.jsx(s.Th,{children:"Roles"}),e.jsx(s.Th,{children:"Action"})]})}),e.jsx(s.Tbody,{children:r.data.length?r.data.map((a,t)=>e.jsxs("tr",{children:[e.jsx(s.Td,{children:++t+(r.current_page-1)*r.per_page}),e.jsx(s.Td,{children:a.name}),e.jsx(s.Td,{children:a.email}),e.jsx(s.Td,{children:e.jsx("div",{className:"flex flex-wrap gap-x-3 gap-y-2 items-center",children:a.roles.map((l,d)=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"border border-sky-100 bg-sky-100 text-sky-500",children:e.jsx(u,{size:"15",strokeWidth:"2"})}),e.jsx("div",{children:l.name})]},d))})}),e.jsx(s.Td,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{url:`/apps/users/${a.id}/edit`}),e.jsx(i,{type:"delete",url:"/apps/users",id:a.id})]})})]},t)):e.jsx(s.Empty,{colSpan:8,message:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center items-center text-center mb-2",children:e.jsx(m,{className:"w-10 h-10 text-gray-400",strokeWidth:"1.2"})}),e.jsx("span",{className:"text-gray-500",children:"users data"})," ",e.jsx("span",{className:"text-rose-500 underline underline-offset-2",children:"not found."})]})})})]})}),r.last_page!==1&&e.jsx(j,{links:r.links})]})}g.layout=r=>e.jsx(o,{children:r});export{g as default};
