import{q as j,W as b,j as e,a as f}from"./app-a8716644.js";import{I as v,_ as g,A as y}from"./AppLayout-dedf3cbe.js";import{C as N,I as m}from"./Input-81a2a475.js";import{B as n}from"./Button-fdc24431.js";import{I as d}from"./IconPointFilled-63906df0.js";import{I as k,a as C}from"./IconPencilX-e7dbf19b.js";import"./createReactComponent-762429e4.js";function I(){const{user:t,roles:c}=j().props,{data:l,setData:o,post:x,errors:i}=b({name:t.name,email:t.email,rolesData:t.roles.map(s=>s.name),password:"",_method:"put"}),p=s=>{let a=l.rolesData;a.some(r=>r===s.target.value)?a=a.filter(r=>r!==s.target.value):a.push(s.target.value),o("rolesData",a)},h=async s=>{s.preventDefault(),x(`/apps/users/${t.id}`,{onSuccess:()=>{g.success("Data successfully updated!",{icon:"👏",style:{borderRadius:"10px",background:"#333",color:"#fff"}})}})};return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"Edit User"}),e.jsx(N,{title:"Edit User",icon:e.jsx(v,{size:"20",strokeWidth:"1.5"}),children:e.jsxs("form",{onSubmit:h,children:[e.jsx("div",{className:"mb-4",children:e.jsx(m,{label:"Name",type:"text",value:l.name,onChange:s=>o("name",s.target.value),errors:i.name})}),e.jsx("div",{className:"mb-4",children:e.jsx(m,{label:"Email",type:"email",value:l.email,onChange:s=>o("email",s.target.value),errors:i.email})}),e.jsx("div",{className:"mb-4",children:e.jsx(m,{label:"Password",type:"password",value:l.password,onChange:s=>o("password",s.target.value),errors:i.password})}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-gray-600 text-sm",children:"Roles"}),e.jsx("div",{className:"grid grid-cols-1 gap-x-3 gap-y-1.5 h-[400px] overflow-y-auto",children:c.map((s,a)=>e.jsxs("div",{className:"border-b px-4 py-2 border-dashed",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1.5",children:[e.jsx("input",{type:"checkbox",className:"rounded-full",value:s.name,defaultChecked:l.rolesData.some(r=>r===s.name),onChange:p,id:`check-${s.id}`}),e.jsx("div",{className:"font-semibold",children:s.name})]}),s.name!=="super-admin"?e.jsx("div",{className:"flex flex-wrap items-center gap-4 ml-5",children:s.permissions.map((r,u)=>e.jsxs("div",{className:"text-sm text-gray-500 flex items-center gap-1",children:[e.jsx(d,{strokeWidth:"1.5",size:"15"}),r.name]},u))}):e.jsxs("div",{className:"text-sm text-gray-500 flex items-center gap-1 ml-5",children:[e.jsx(d,{strokeWidth:"1.5",size:"15"})," all permissions"]})]},a))})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(n,{label:"Save Data",icon:e.jsx(k,{strokeWidth:"1.5",size:"20"}),className:"bg-teal-200 text-teal-500 border border-teal-300 hover:border-teal-500"}),e.jsx(n,{label:"Cancel",icon:e.jsx(C,{strokeWidth:"1.5",size:"20"}),className:"bg-rose-200 text-rose-500 border border-rose-300 hover:border-rose-500",type:"link",href:"/apps/users"})]})]})})]})}I.layout=t=>e.jsx(y,{children:t});export{I as default};
