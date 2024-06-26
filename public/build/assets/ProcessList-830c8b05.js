import{q as c,j as e,a as n}from"./app-cf7ce22d.js";import{A as d}from"./AppLayout-281e5e8d.js";import{h as t}from"./moment-a9aaa855.js";import{T as s}from"./Table-3b1f3018.js";import{S as h,I as m,P as x}from"./Search-3240ca1e.js";import{A as _}from"./ActionButton-97794a0c.js";import{I as p}from"./IconArrowBadgeUp-c4ea6fa8.js";import"./createReactComponent-7828f558.js";import"./IconSearch-adedca47.js";import"./sweetalert2.all-436c71e2.js";import"./IconTrash-80b30a03.js";function j(){t.updateLocale("es",{months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:"Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),weekdays:"Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_")});const{planifications:r,process:l}=c().props,i={PR:{color:"blue",label:"Preparado"},RV:{color:"yellow",label:"Revisado"},AP:{color:"green",label:"Aprobado"},CR:{color:"gray",label:"Cerrado"},AN:{color:"red",label:"Anulado"}};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"Planificaciones"}),e.jsx("div",{className:"mb-5",children:e.jsx("div",{className:"flex flex-row items-center md:justify-between gap-5",children:e.jsx("div",{className:"w-full",children:e.jsx(h,{url:"/planification",placeholder:"Buscar planificación..."})})})}),e.jsx(s.Card,{title:`LISTADO DE PLANIFICACIONES POR ${l.label}`,icon:e.jsx(p,{strokeWidth:"1.5",size:"20"}),children:e.jsxs(s,{children:[e.jsx(s.Thead,{children:e.jsxs("tr",{children:[e.jsx(s.Th,{className:"w-10",children:"#"}),e.jsx(s.Th,{children:"Periodo"}),e.jsx(s.Th,{children:"Actividades"}),e.jsx(s.Th,{children:"Estado"}),e.jsx(s.Th,{children:"Usuario"}),e.jsx(s.Th,{children:"Creación"}),e.jsx(s.Th,{children:"Acción"})]})}),e.jsx(s.Tbody,{children:r.data.length?r.data.map((a,o)=>e.jsxs("tr",{children:[e.jsx(s.Td,{children:++o+(r.current_page-1)*r.per_page}),e.jsx(s.Td,{children:a.period}),e.jsx(s.Td,{children:a.details.length}),e.jsx(s.Td,{children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:`h-2.5 w-2.5 rounded-full bg-${i[a.status].color}-500 me-2`}),i[a.status].label]})}),e.jsx(s.Td,{children:a.user.name}),e.jsx(s.Td,{children:t(a.created_at).format("MMMM Do YYYY")}),e.jsx(s.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(_,{type:"process",url:route("planification.process",[a,l.status])})})})]},o)):e.jsx(s.Empty,{colSpan:7,message:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center items-center text-center mb-2",children:e.jsx(m,{className:"w-10 h-10 text-gray-400",strokeWidth:"1.2"})}),e.jsx("span",{className:"text-gray-500",children:"datos de planificaciones"})," ",e.jsx("span",{className:"text-rose-500 underline underline-offset-2",children:"no encontrados."})]})})})]})}),r.last_page!==1&&e.jsx(x,{links:r.links})]})}j.layout=r=>e.jsx(d,{children:r});export{j as default};
