import{q as c,j as e,a as x}from"./app-a8716644.js";import{a as o,A as m}from"./AppLayout-dedf3cbe.js";import{S as p,T as s,I as h,P as j}from"./Search-91aad80c.js";import{B as f}from"./Button-fdc24431.js";import{A as i}from"./ActionButton-987cb1fd.js";import{c as u}from"./createReactComponent-762429e4.js";import{I as l}from"./IconCheck-577b1e33.js";var g=u("circle-plus","IconCirclePlus",[["path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",key:"svg-0"}],["path",{d:"M9 12h6",key:"svg-1"}],["path",{d:"M12 9v6",key:"svg-2"}]]);function y(){const{roles:a}=c().props;return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Data Roles"}),e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-row items-center md:justify-between gap-5",children:[e.jsx("div",{className:"lg:w-2/6 xl:w-1/6",children:e.jsx(f,{label:"Add New Role",type:"link",icon:e.jsx(g,{size:"20",strokeWidth:"1.5"}),className:"bg-white text-gray-700 border hover:border-sky-500",href:"/apps/roles/create",added:!0})}),e.jsx("div",{className:"w-full",children:e.jsx(p,{url:"/apps/roles",placeholder:"Search data roles by name..."})})]})}),e.jsx(s.Card,{title:"LIST ROLES",icon:e.jsx(o,{strokeWidth:"1.5",size:"20"}),children:e.jsxs(s,{children:[e.jsx(s.Thead,{children:e.jsxs("tr",{children:[e.jsx(s.Th,{className:"w-10",children:"#"}),e.jsx(s.Th,{children:"Role Name"}),e.jsx(s.Th,{children:"Permissions"}),e.jsx(s.Th,{children:"Action"})]})}),e.jsx(s.Tbody,{children:a.data.length?a.data.map((r,t)=>e.jsxs("tr",{children:[e.jsx(s.Td,{children:++t+(a.current_page-1)*a.per_page}),e.jsx(s.Td,{children:r.name}),e.jsx(s.Td,{children:r.name!=="super-admin"?e.jsx("div",{className:"flex flex-wrap gap-x-3 gap-y-2 items-center",children:r.permissions.map((n,d)=>e.jsxs("div",{className:"px-3 py-0.5 bg-sky-100 text-sky-500 rounded-xl flex items-center gap-1",children:[e.jsx(l,{size:"15",strokeWidth:"2"})," ",n.name]},d))}):e.jsxs("div",{className:"px-3 py-0.5 bg-sky-100 text-sky-500 rounded-xl flex items-center gap-1 w-fit",children:[e.jsx(l,{size:"15",strokeWidth:"2"})," all permissions"]})}),e.jsx(s.Td,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{url:`/apps/roles/${r.id}/edit`}),e.jsx(i,{type:"delete",url:"/apps/roles",id:r.id})]})})]},t)):e.jsx(s.Empty,{colSpan:8,message:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center items-center text-center mb-2",children:e.jsx(h,{className:"w-10 h-10 text-gray-400",strokeWidth:"1.2"})}),e.jsx("span",{className:"text-gray-500",children:"roles data"})," ",e.jsx("span",{className:"text-rose-500 underline underline-offset-2",children:"not found."})]})})})]})}),a.last_page!==1&&e.jsx(j,{links:a.links})]})}y.layout=a=>e.jsx(m,{children:a});export{y as default};
