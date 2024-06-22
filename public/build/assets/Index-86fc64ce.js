import{q as n,j as e,a as l}from"./app-fbac857a.js";import{g as d,A as c}from"./AppLayout-cc157e47.js";import{T as s}from"./Table-8bfe4792.js";import{S as o,I as x,P as m}from"./Search-c8ce9415.js";import{B as h}from"./Button-429df1c9.js";import{A as i}from"./ActionButton-321d9a2c.js";import{I as p}from"./IconPlus-f84e897e.js";import"./createReactComponent-a8208e3e.js";import"./IconSearch-41c2d221.js";import"./IconTrash-05d0a7be.js";import"./IconArrowBadgeUp-0bab2865.js";function j(){const{dependencies:a}=n().props;return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Dependencias"}),e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-row items-center md:justify-between gap-5",children:[e.jsx("div",{className:"lg:w-2/6 xl:w-1/6",children:e.jsx(h,{label:"Agregar Nueva Dependencia",type:"link",icon:e.jsx(p,{size:"20",strokeWidth:"1.5"}),className:"bg-white text-gray-700 border hover:border-sky-500",href:"/apps/dependencies/create",added:!0})}),e.jsx("div",{className:"w-full",children:e.jsx(o,{url:"/apps/users",placeholder:"Buscar dependencias por su nombre..."})})]})}),e.jsx(s.Card,{title:"LISTADO DE DEPENDENCIAS",icon:e.jsx(d,{strokeWidth:"1.5",size:"20"}),children:e.jsxs(s,{children:[e.jsx(s.Thead,{children:e.jsxs("tr",{children:[e.jsx(s.Th,{className:"w-10",children:"#"}),e.jsx(s.Th,{children:"Nombre"}),e.jsx(s.Th,{children:"Codigo Interno"}),e.jsx(s.Th,{children:"Responsable"}),e.jsx(s.Th,{children:"Dependencia Padre"}),e.jsx(s.Th,{children:"Acción"})]})}),e.jsx(s.Tbody,{children:a.data.length?a.data.map((r,t)=>e.jsxs("tr",{children:[e.jsx(s.Td,{children:++t+(a.current_page-1)*a.per_page}),e.jsx(s.Td,{children:r.name}),e.jsx(s.Td,{children:"123456"}),e.jsx(s.Td,{children:r.user&&`${r.user.name} ${r.user.last_name}`}),e.jsx(s.Td,{children:r.parent_id&&`${r.parent_name}`}),e.jsx(s.Td,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{url:`/apps/dependencies/${r.id}/edit`}),e.jsx(i,{type:"delete",url:"/apps/users",id:r.id}),e.jsx(i,{type:"config",url:route("apps.alert.form",r),id:r.id})]})})]},t)):e.jsx(s.Empty,{colSpan:5,message:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center items-center text-center mb-2",children:e.jsx(x,{className:"w-10 h-10 text-gray-400",strokeWidth:"1.2"})}),e.jsx("span",{className:"text-gray-500",children:"datos de dependencias"})," ",e.jsx("span",{className:"text-rose-500 underline underline-offset-2",children:"no encontrados."})]})})})]})}),a.last_page!==1&&e.jsx(m,{links:a.links})]})}j.layout=a=>e.jsx(c,{children:a});export{j as default};
