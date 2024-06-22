import{q as u,W as x,j as s,a as f}from"./app-fbac857a.js";import{B as i}from"./Button-429df1c9.js";import{C as b}from"./Card-a17e4b6a.js";import{I as h}from"./Input-554d95c0.js";import{M as j}from"./MultiSelect-ea46ba4a.js";import{e as v,_ as g,A as y}from"./AppLayout-cc157e47.js";import{I as D}from"./IconPencilPlus-69ec0e00.js";import{I}from"./IconPencilX-173fb6bd.js";import"./react-select.esm-8b7c4e16.js";import"./createReactComponent-a8208e3e.js";function k(){const{role:r,permissions:n}=u().props,{data:o,setData:a,post:l,transform:m,errors:t}=x({name:r.name,permissionsData:r.permissions,_method:"put"}),c=e=>{a("permissionsData",e)};m(e=>({...e,permissions:e.permissionsData.map(d=>d.value)}));const p=async e=>{e.preventDefault(),l(`/apps/roles/${r.id}`,{onSuccess:()=>{g.success("Data successfully updated!",{icon:"👏",style:{borderRadius:"10px",background:"#333",color:"#fff"}})}})};return s.jsxs(s.Fragment,{children:[s.jsx(f,{title:"Editar Rol"}),s.jsx(b,{title:"Editar Rol",icon:s.jsx(v,{size:"20",strokeWidth:"1.5"}),children:s.jsxs("form",{onSubmit:p,children:[s.jsx("div",{className:"mb-4",children:s.jsx(h,{label:"Nombre",type:"text",value:o.name,onChange:e=>a("name",e.target.value),errors:t.name})}),s.jsx("div",{className:"mb-4",children:s.jsx(j,{label:"Permisos",options:n,value:o.permissionsData,onChange:c,errors:t.permissions})}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(i,{label:"Guardar",icon:s.jsx(D,{strokeWidth:"1.5",size:"20"}),className:"bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500"}),s.jsx(i,{label:"Cancelar",icon:s.jsx(I,{strokeWidth:"1.5",size:"20"}),className:"bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500",type:"link",href:"/apps/roles"})]})]})})]})}k.layout=r=>s.jsx(y,{children:r});export{k as default};
