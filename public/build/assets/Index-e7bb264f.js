import{q as n,j as s,a as i}from"./app-336f10bd.js";import{A as o}from"./AppLayout-6fd92f89.js";import{T as e}from"./Table-dd66f4a1.js";import{S as l,I as c,P as d}from"./Search-7d4b3c95.js";import{I as m}from"./IconUserBolt-0b4eedf8.js";import"./createReactComponent-4195aa5e.js";import"./IconSearch-ba83f05d.js";function x(){const{permissions:r}=n().props;return s.jsxs(s.Fragment,{children:[s.jsx(i,{title:"Permisos"}),s.jsx("div",{className:"mb-5",children:s.jsx(l,{url:"/apps/permissions",placeholder:"Buscar permisos por su nombre..."})}),s.jsx(e.Card,{title:"LISTA DE PERMISOS",icon:s.jsx(m,{strokeWidth:"1.5",size:"20"}),children:s.jsxs(e,{children:[s.jsx(e.Thead,{children:s.jsxs("tr",{children:[s.jsx(e.Th,{className:"w-10",children:"#"}),s.jsx(e.Th,{children:"Nombre del Permiso"})]})}),s.jsx(e.Tbody,{children:r.data.length?r.data.map((t,a)=>s.jsxs("tr",{children:[s.jsx(e.Td,{children:++a+(r.current_page-1)*r.per_page}),s.jsx(e.Td,{children:t.name})]},a)):s.jsx(e.Empty,{colSpan:8,message:s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"flex justify-center items-center text-center mb-2",children:s.jsx(c,{className:"w-10 h-10 text-gray-400",strokeWidth:"1.2"})}),s.jsx("span",{className:"text-gray-500",children:"Permissions data"})," ",s.jsx("span",{className:"text-rose-500 underline underline-offset-2",children:"not found."})]})})})]})}),r.last_page!==1&&s.jsx(d,{links:r.links})]})}x.layout=r=>s.jsx(o,{children:r});export{x as default};
