var Q=Object.defineProperty;var T=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var L=(i,e,t)=>e in i?Q(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,I=(i,e)=>{for(var t in e||(e={}))X.call(e,t)&&L(i,t,e[t]);if(T)for(var t of T(e))ee.call(e,t)&&L(i,t,e[t]);return i};var A=(i,e,t)=>new Promise((a,l)=>{var s=h=>{try{n(t.next(h))}catch(r){l(r)}},o=h=>{try{n(t.throw(h))}catch(r){l(r)}},n=h=>h.done?a(h.value):Promise.resolve(h.value).then(s,o);n((t=t.apply(i,e)).next())});import{I as N,r as c,h as te,i as k,s as ae,n as D,c as S,J as j,K as le,q as _,o as u,b as m,e as p,u as b,k as E,d as f,t as g,L as H,w as x,f as F,M as se,N as W,H as C,O as oe,p as ie,F as q,y as J,l as z,z as ne,A as de,m as O,_ as P,j as ce,D as R}from"./index.0e3c50f7.js";import{F as re}from"./FileUploader.a62e684a.js";class ue{constructor(){this.callbacks={},this.callbacks.base={}}on(e,t){const a=this;return typeof e=="undefined"||e===""?(console.warn("wrong names"),!1):typeof t=="undefined"?(console.warn("wrong callback"),!1):(this.resolveNames(e).forEach(function(s){const o=a.resolveName(s);a.callbacks[o.namespace]instanceof Object||(a.callbacks[o.namespace]={}),a.callbacks[o.namespace][o.value]instanceof Array||(a.callbacks[o.namespace][o.value]=[]),a.callbacks[o.namespace][o.value].push(t)}),this)}off(e){const t=this;return typeof e=="undefined"||e===""?(console.warn("wrong name"),!1):(this.resolveNames(e).forEach(function(l){const s=t.resolveName(l);if(s.namespace!=="base"&&s.value==="")delete t.callbacks[s.namespace];else if(s.namespace==="base")for(const o in t.callbacks)t.callbacks[o]instanceof Object&&t.callbacks[o][s.value]instanceof Array&&(delete t.callbacks[o][s.value],Object.keys(t.callbacks[o]).length===0&&delete t.callbacks[o]);else t.callbacks[s.namespace]instanceof Object&&t.callbacks[s.namespace][s.value]instanceof Array&&(delete t.callbacks[s.namespace][s.value],Object.keys(t.callbacks[s.namespace]).length===0&&delete t.callbacks[s.namespace])}),this)}trigger(e,t){if(typeof e=="undefined"||e==="")return console.warn("wrong name"),!1;const a=this;let l=null;console.log("before args",t);const s=t instanceof Array?t:[t];console.log("after args",s);let o=this.resolveNames(e);if(o=this.resolveName(o[0]),o.namespace==="base")for(const n in a.callbacks)a.callbacks[n]instanceof Object&&a.callbacks[n][o.value]instanceof Array&&a.callbacks[n][o.value].forEach(function(h){h.apply(a,s)});else if(this.callbacks[o.namespace]instanceof Object){if(o.value==="")return console.warn("wrong name"),this;a.callbacks[o.namespace][o.value].forEach(function(n){n.apply(a,s)})}return l}resolveNames(e){let t=e;return t=t.replace(/[^a-zA-Z0-9 ,/.]/g,""),t=t.replace(/[,/]+/g," "),t=t.split(" "),t}resolveName(e){const t={},a=e.split(".");return t.original=e,t.value=a[0],t.namespace="base",a.length>1&&a[1]!==""&&(t.namespace=a[1]),t}}class fe extends ue{constructor(e,t,a=null){super(),this.doctype=e,this.name=a,this.fields=N([]),this.dirty=!1,this.Frm=t,this.Docstatus=c(0),this.Saved=c(0),this.Submit=c(0),this.Amend=c(0),this.workflowStatus=c(!1),this.workflow_state=c(""),this.roles=[],this.style=c(""),this.status=c([]),this.router=te(),this.transition=c([]),this.username=k(()=>ae.user),this.attachValues=N([]),this.action=c(""),this.doc=N({docstatus:0}),this.submitable=c(0),this.on("name",l=>{this.dirty=!0})}initFields(){return A(this,null,function*(){const e=D({doctype:"Workflow",fields:["*"],filters:{document_type:this.doctype}});e.reload().then(()=>{e.data.forEach(l=>{if(l.is_active){this.workflowStatus=!0;const s=S({url:"frappe.desk.form.load.getdoc",method:"GET",params:{doctype:"Workflow",name:l.name,_:Date.now()}});s.fetch().then(()=>{this.status=s.data.docs[0].states,this.transition=s.data.docs[0].transitions})}})});const t=S({url:"frappe.desk.form.load.getdoc",method:"GET",params:{doctype:"User",name:this.username,_:Date.now()}});t.fetch().then(()=>{t.data.docs[0].roles.forEach(l=>{this.roles.push(l.roles)})});const a=S({url:"pwa_build.utils.get_form_meta",method:"POST",params:{form:this.Frm,doctype:this.doctype}});a.fetch().then(()=>{if(this.fields=a.data.fields,this.submitable=a.data.is_submittable,this.doc={},this.name!=null){const l=D({doctype:this.doctype,fields:["*"],filters:{name:this.name}});l.reload().then(()=>{const s=l.data[0];l.data[0].docstatus==0?(this.Docstatus=l.data[0].docstatus,this.Saved=1):(l.data[0].docstatus==1||l.data[0].docstatus==2)&&(this.Docstatus=l.data[0].docstatus,this.Submit=1,this.Saved=1),this.workflowStatus&&(this.workflow_state=l.data[0].workflow_state,this.styles()),Object.keys(s).forEach(o=>{this.doc[o]=s[o]}),this.updateFields()})}})})}workflow(){this.doc.doctype=this.doctype;const e=S({url:"frappe.model.workflow.apply_workflow",method:"POST",params:{doc:this.doc,action:this.action}});e.fetch().then(()=>{Object.entries(e.data).forEach(([t,a])=>{this.doc[t]=a}),this.actions(e.data)})}actions(e){this.doc.doctype=this.doctype;const t=S({url:"frappe.model.workflow.get_transitions",method:"POST",params:{doc:e}});t.fetch().then(()=>t.data.length>0?(this.workflow_state=t.data[0].state,this.action=t.data[0].action,this.styles(),!0):(this.workflow_state=this.doc.workflow_state,this.action="",this.styles(),!0))}styles(){const e=D({doctype:"Workflow State",fields:["style"],filters:{name:this.workflow_state}});e.reload().then(()=>{this.style=e.data[0].style})}updateFields(){this.fields.forEach(e=>{this.doc.hasOwnProperty(e.fieldname)&&(e.value=this.doc[e.fieldname]),this.actions(this.doc)})}getValue(e){return this.doc[e]||null}setValue(e,t){this.dirty=!0,this.doc[e]=t}isNew(){return!!this.name}save(){if(this.validateMandatory()){this.dirty=!1;const e=D({doctype:this.doctype});if(["creation","docstatus","idx","modified","modified_by","owner","doctype"].forEach(a=>{delete this.doc[a]}),this.doc.name){let a=this.doc.name;this.doc.amended_from=a;let l=a.split("-"),s=l[0],o=l.length>1?parseInt(l[1])+1:1;this.doc.name=`${s}-${o}`}return e.insert.submit(this.doc).then(a=>(Object.assign(this.doc,a),this.Saved=1,this.updateFields(),this.name=this.doc.name,this.Docstatus=0,this.fields.some(l=>l.fieldtype==="Attach")&&this.attachValues.forEach(l=>{l.FeildName&&D({doctype:"File",filters:{name:l.name}}).setValue.submit({name:l.name,attached_to_doctype:this.doctype,attached_to_name:a.name,attached_to_field:l.FeildName})}),a.name)).catch(a=>{throw console.log(a),new Error("Error saving document")})}else return Promise.reject(new Error("Validation failed"))}update(){const e=I({},this.doc);delete e.modified_by,delete e.modified,console.log(e),D({doctype:this.doctype,filters:{name:this.name}}).setValue.submit(e).then(()=>this.Saved=1)}submit(e){if(this.validateMandatory()){this.dirty=!1;const t=D({doctype:this.doctype,filters:{name:e}});return t.reload().then(()=>t.setValue.submit({name:e,docstatus:1})).then(a=>(this.Docstatus=1,this.Submit=1,a.docstatus)).catch(a=>{throw console.log(a),new Error("Error submitting document")})}else return Promise.reject(new Error("Validation failed"))}delete(e){const t=c("");return j({doctype:this.doctype,name:e}).delete.submit().then(l=>(t.value="Document Deleted successfully",t.value)).catch(l=>(console.error(l),t.value="Error deleting document",t.value))}cancel(e){this.dirty=!1;const t=D({doctype:this.doctype,filters:{name:e}});return t.reload().then(()=>t.setValue.submit({name:e,docstatus:2})).then(a=>(this.Docstatus=2,a.docstatus)).catch(a=>{throw console.log(a),new Error("Error Canceling document")})}amend(){return A(this,null,function*(){["creation","docstatus","idx","modified","modified_by","owner","doctype"].forEach(t=>{delete this.doc[t]}),j({doctype:this.doctype,name:this.name});try{this.Docstatus=0,this.Saved=0,this.router.push({name:"Form",query:{frmname:this.Frm,doctype:this.doctype}})}catch(t){console.error("Error:",t)}})}isDirty(){return this.dirty}validateMandatory(){for(let e of this.fields)if(e.reqd&&!this.doc[e.fieldname])return alert(`Error: ${this.doctype} has no value in ${e.label}`),!1;return!0}}const vt=le("form",{state:()=>({form:N(new fe("Sampel"))}),actions:{initForm(){return A(this,null,function*(){yield this.form.initFields()})},setForm(i){this.form=N(i)}}}),me={class:"p-2"},B={__name:"Text",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(""),l=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(t,s=>{e.value&&(a.value=e.value)}),_(a,s=>{t.setValue(e.fieldname,s),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(s,o)=>(u(),m("div",me,[p(b(E),{type:"text",size:"sm",variant:"subtle",label:i.field.label,placeholder:i.field.label,disabled:l.value,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=n=>a.value=n)},null,8,["label","placeholder","disabled","modelValue"])]))}},he={class:"p-2"},ve={class:"text-[12px] text-gray-600"},M={__name:"Select",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(()=>e.value,l=>{var o;const s=(o=l==null?void 0:l.value)!=null?o:l;e.value=s,t.setValue(e.fieldname,s),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(l,s)=>(u(),m("div",he,[f("p",ve,g(i.field.label),1),p(b(H),{class:"mt-1",options:i.field.options,modelValue:i.field.value,"onUpdate:modelValue":s[0]||(s[0]=o=>i.field.value=o),size:"sm",variant:"subtle",label:i.field.label,placeholder:i.field.label,disabled:a.value,"hide-search":"true"},null,8,["options","modelValue","label","placeholder","disabled"])]))}},pe={class:"p-2"},be={__name:"Badge",props:["field","frm"],setup(i){const{field:e,frm:t}=i;return t.setValue(e.fieldname,e.label),(a,l)=>(u(),m("div",pe,[p(b(se),{type:"text",size:"lg",theme:"gray",variant:"ghost",label:a.value},{default:x(()=>[F(g(i.field.label),1)]),_:1},8,["label"])]))}},_e={class:"p-2"},ye={class:"text-[12px] text-gray-600"},ge={__name:"Int",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(""),l=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(a,s=>{const o=parseInt(s,10);t.setValue(e.fieldname,isNaN(o)?"":o),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),_(t,s=>{e.value&&(a.value=e.value)}),(s,o)=>(u(),m("div",_e,[f("p",ye,g(i.field.label),1),p(b(W),{type:"number",size:"sm",variant:"subtle",placeholder:i.field.label,disabled:l.value,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=n=>a.value=n),class:"mt-1"},null,8,["placeholder","disabled","modelValue"])]))}},ke={class:"p-2"},we={__name:"DateTime",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(e.value||""),l=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(a,s=>{t.setValue(e.fieldname,s),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),C(()=>{t.Saved==1&&(a.value=e.value)}),_(t,s=>{e.value&&(a.value=e.value)}),(s,o)=>(u(),m("div",ke,[p(b(E),{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=n=>a.value=n),type:"datetime-local",size:"sm",variant:"subtle",label:i.field.label,placeholder:i.field.label,disabled:l.value},null,8,["modelValue","label","placeholder","disabled"])]))}},xe={class:"p-2"},Ve={class:"text-[12px] text-gray-600"},De={__name:"Autocomplete",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(()=>e.value,l=>{var o;const s=(o=l==null?void 0:l.value)!=null?o:l;e.value=s,t.setValue(e.fieldname,s),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(l,s)=>(u(),m("div",xe,[f("p",Ve,g(i.field.label),1),p(b(H),{options:i.field.options,modelValue:i.field.value,"onUpdate:modelValue":s[0]||(s[0]=o=>i.field.value=o),size:"sm",variant:"subtle",label:i.field.label,placeholder:i.field.label,disabled:a.value,class:"mt-1"},null,8,["options","modelValue","label","placeholder","disabled"])]))}},$e={class:"p-2"},Se={__name:"Date",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(e.value||""),l=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);return _(a,s=>{t.setValue(e.fieldname,s),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(s,o)=>(u(),m("div",$e,[p(b(E),{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=n=>a.value=n),type:"date",size:"sm",variant:"subtle",label:i.field.label,placeholder:i.field.label,disabled:l.value},null,8,["modelValue","label","placeholder","disabled"])]))}},Fe={class:"p-3"},Ne={__name:"Checkbox",props:{field:Object,frm:Object},setup(i){const e=i,t=c(0),a=k(()=>e.field.read_only==1||e.frm.Docstatus==1||e.frm.Docstatus==2);return _(t,l=>{e.frm.setValue(e.field.fieldname,l),e.field.value&&e.frm.doc[e.field.fieldname]!=e.field.value&&(e.field.value=null,e.frm.Saved=0,e.frm.Submit=0,e.frm.Amend=0)}),_(()=>e.field.value,l=>{l===0?t.value=0:t.value=l},{immediate:!0}),C(()=>{e.field.value&&(t.value=e.field.value)}),(l,s)=>(u(),m("div",Fe,[p(b(oe),{modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=o=>t.value=o),size:"sm",label:i.field.label,disabled:a.value},null,8,["modelValue","label","disabled"])]))}},Ee={class:"p-2"},G={__name:"Textarea",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c("");return k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2),_(t,l=>{e.value&&(a.value=e.value)}),_(a,l=>{t.setValue(e.fieldname,l),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(l,s)=>(u(),m("div",Ee,[p(b(E),{type:"textarea",size:"sm",variant:"subtle",placeholder:i.field.label,disabled:i.field.read_only,label:i.field.label,modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=o=>a.value=o)},null,8,["placeholder","disabled","label","modelValue"])]))}},Ae={class:"p-2"},Oe={class:"text-[12px] text-gray-600"},Ce={__name:"Float",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(""),l=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2);C(()=>{if(e.value!==void 0&&e.value!==null){const o=parseFloat(e.value);isNaN(o)||(a.value=o.toFixed(3))}}),_(a,o=>{const n=parseFloat(o);isNaN(n)||t.setValue(e.fieldname,n.toFixed(3)),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)});const s=()=>{if(a.value!==""){const o=parseFloat(a.value);isNaN(o)||(a.value=o.toFixed(3))}};return _(t,o=>{if(e.value){const n=parseFloat(e.value);isNaN(n)||(a.value=n.toFixed(3))}}),(o,n)=>(u(),m("div",Ae,[f("p",Oe,g(i.field.label),1),p(b(W),{type:"text",size:"sm",variant:"subtle",placeholder:i.field.label,disabled:l.value,modelValue:a.value,"onUpdate:modelValue":n[0]||(n[0]=h=>a.value=h),onBlur:s,class:"mt-1"},null,8,["placeholder","disabled","modelValue"])]))}};const Ue={class:"p-2"},je={class:"text-[12px] text-gray-600"},ze={class:"relative w-full mt-1"},Te={key:0,class:"absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-20 max-h-48 overflow-y-auto no-scrollbar"},Le=["onClick"],Ie={key:1,class:"p-2 hover:bg-gray-200 cursor-pointer text-[12px] text-gray-600"},Pe={__name:"Link",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(""),l=c(!1),s=c([]);_(t,r=>{e.value&&(a.value=e.value)});const o=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2),n=r=>{a.value=r.doctype_name,e.value=r.name,t.setValue(e.fieldname,r.name),l.value=!1},h=(r="")=>{const v=S({url:"frappe.desk.search.search_link",method:"POST",params:{doctype:e.options,ignore_user_permissions:0,page_length:10,reference_doctype:t.doctype,txt:r}});v.fetch().then(()=>{const y=v.data;y?s.value=y.map(V=>({name:V.value,doctype_name:V.value})):s.value=[]})};return _(a,r=>{h(r)}),C(()=>{h()}),document.addEventListener("click",r=>{r.target.closest(".relative")||(l.value=!1)}),(r,v)=>(u(),m("div",Ue,[f("p",je,g(i.field.label),1),f("div",ze,[p(b(E),{type:"text",size:"sm",variant:"subtle",placeholder:i.field.label,disabled:o.value,modelValue:a.value,"onUpdate:modelValue":v[0]||(v[0]=y=>a.value=y),onFocus:v[1]||(v[1]=y=>l.value=!0),class:"flex-grow w-full pt-[3px]"},null,8,["placeholder","disabled","modelValue"]),l.value?(u(),m("div",Te,[s.value.length>0?(u(!0),m(q,{key:0},J(s.value,y=>(u(),m("div",{key:y.name,class:"p-2 hover:bg-gray-200 cursor-pointer",onClick:V=>n(y)},g(y.doctype_name),9,Le))),128)):(u(),m("div",Ie," No Record Found "))])):z("",!0)])]))}};var Re=ie(Pe,[["__scopeId","data-v-46c5a233"]]);const Be={class:"p-2"},Me={__name:"Currency",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=c(""),l=c(""),s=c([]),o=k(()=>e.read_only==1||t.Docstatus==1||t.Docstatus==2),n=()=>A(this,null,function*(){const r=D({doctype:"Company",fields:["default_currency"],orderBy:"creation desc"});yield r.reload();const v=r.data;if(v.length>0)for(const y of v){const V=D({doctype:"Currency",fields:["symbol"],filters:{name:y.default_currency},orderBy:"creation desc"});yield V.reload();const U=V.data;U.length>0&&s.value.push(U[0].symbol)}});_(t,r=>{if(e.value){e.value==null?(l.value=null,a.value=0):(l.value=e.value,a.value=e.value);const v=s.value.length>0?s.value[0]:"";l.value=`${v}${a.value}`}}),_(l,r=>{const v=r.replace(/[^0-9]/g,"");a.value=v;const V=(s.value.length>0?s.value[0]:"")+v;t.setValue(e.fieldname,V),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)});const h=r=>{const y=r.target.value.replace(/[^0-9]/g,"");a.value=y;const V=s.value.length>0?s.value[0]:"";l.value=`${V}${y}`};return C(()=>{n()}),(r,v)=>(u(),m("div",Be,[p(b(E),{type:"text",size:"sm",variant:"subtle",placeholder:i.field.label,disabled:o.value,modelValue:l.value,"onUpdate:modelValue":v[0]||(v[0]=y=>l.value=y),onInput:h,label:i.field.label},null,8,["placeholder","disabled","modelValue","label"])]))}},Ge={class:"p-2 border-2 border-gray-300 rounded-md mb-4"},He={class:"font-semibold text-gray-600 mb-2"},pt={__name:"SectionBreak",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a={Data:B,Select:M,Int:ge,Autocomplete:De,Dynamic_Link:M,Heading:be,Datetime:we,"Section Break":null,Date:Se,Check:Ne,Text:B,"Long Text":G,"Small Text":G,Float:Ce,Link:Re,Currency:Me},l=k(()=>{const s=t.fields,o=s.indexOf(e),n=[];for(let h=o+1;h<s.length&&s[h].fieldtype!=="Section Break";h++)n.push(s[h]);return n});return(s,o)=>(u(),m("div",Ge,[f("h1",He,g(i.field.label),1),f("div",null,[(u(!0),m(q,null,J(l.value,n=>(u(),ne(de(a[n.fieldtype]),{key:n.fieldname,field:n,frm:i.frm},null,8,["field","frm"]))),128))])]))}},We={key:0,class:"p-2"},qe={class:"text-[12px] text-gray-600 mb-1"},Je={key:1,class:"p-2"},Ke={class:"text-[12px] text-gray-600 mb-1"},Ye={class:"w-full h-[2rem] border-[1.5px] border-gray-200 rounded-lg"},Ze={class:"flex"},Qe={class:"pl-2 text-[10px] p-2 truncate w-[7rem] text-gray-600"},Xe={class:"pl-2 text-[10px] p-2 truncate w-[5rem] text-gray-600"},et={class:"pl-2 text-[10px] p-2 truncate w-[5rem] text-gray-600"},tt={class:"font-semibold truncate w-[10rem]"},at={key:0},lt=["src"],st={key:1},ot=["src"],it={key:2},nt=f("p",null,"Unsupported file type",-1),dt=[nt],ct={class:"w-full bg"},rt=f("h3",{class:"font-semibold"},"Confirm Deletion",-1),ut={class:"w-full bg"},bt={__name:"Attach",props:["field","frm"],setup(i){const{field:e,frm:t}=i,a=N({content_hash:"",creation:"",docstatus:0,doctype:"File",file_name:"",file_size:0,file_type:"",file_url:e.value,folder:"Home",idx:0,is_attachments_folder:0,is_folder:0,is_home_folder:0,is_private:0,modified:"",modified_by:"Administrator",name:"",owner:"Administrator",uploaded_to_dropbox:0,uploaded_to_google_drive:0});if(t.name){const w=D({doctype:"File",filters:{attached_to_doctype:t.doctype,attached_to_field:e.fieldname,attached_to_name:t.name},fields:["*"]});w.reload().then(()=>{if(w.data.length>0){const d=w.data[0];Object.assign(a,{content_hash:d.content_hash||"",creation:d.creation||"",docstatus:d.docstatus||0,doctype:d.doctype||"File",file_name:d.file_name||"",file_size:d.file_size||0,file_type:d.file_type||"",file_url:d.file_url||"",folder:d.folder||"Home",idx:d.idx||0,is_attachments_folder:d.is_attachments_folder||0,is_folder:d.is_folder||0,is_home_folder:d.is_home_folder||0,is_private:d.is_private||0,modified:d.modified||"",modified_by:d.modified_by||"Administrator",name:d.name||"",owner:d.owner||"Administrator",uploaded_to_dropbox:d.uploaded_to_dropbox||0,uploaded_to_google_drive:d.uploaded_to_google_drive||0}),l.value=!0}}).catch(d=>{console.error("Error loading file data:",d)})}const l=c(!1),s=c(!1),o=c(!1),n=k(()=>{if(a.file_url){const w=new URL(window.location.href);return`${w.protocol}//${w.hostname}:8001${a.file_url}`}return""}),h=k(()=>a.file_type==="JPG"||a.file_type==="PNG"||a.file_type==="SVG"),r=k(()=>a.file_type==="PDF"),v=w=>{Object.assign(a,w),l.value=!0},y=()=>{o.value=!0},V=()=>{s.value=!0},U=()=>{o.value=!0},K=()=>{t.attachValues=t.attachValues.filter(d=>d.FeildName===e.fieldname),j({doctype:"File",name:a.name}).delete.submit().then(()=>{l.value=!1,Object.keys(a).forEach(d=>{a[d]=""}),t.attachValues=t.attachValues.filter(d=>d.name&&d.FeildName!==e.fieldname),o.value=!1}).catch(d=>{console.error("Error deleting file:",d)})};return _(a,w=>{t.setValue(e.fieldname,w.file_url),t.attachValues.push({name:w.name,FeildName:e.fieldname}),e.value&&t.doc[e.fieldname]!=e.value&&(e.value=null,t.Saved=0,t.Submit=0,t.Amend=0)}),(w,d)=>(u(),m("div",null,[l.value?z("",!0):(u(),m("div",We,[f("p",qe,g(i.field.label),1),p(b(re),{fileTypes:["image/*","application/pdf"],validateFile:$=>{},onSuccess:v},{default:x(({openFileSelector:$,uploading:Y,progress:Z})=>[p(b(O),{onClick:$,loading:Y},{default:x(()=>[F(" Attach "+g(Z)+"% ",1)]),_:2},1032,["onClick","loading"])]),_:1})])),l.value?(u(),m("div",Je,[f("p",Ke,g(i.field.label),1),f("div",Ye,[f("div",{class:"flex hover:cursor-pointer",onClick:V},[f("div",Ze,[p(b(P),{name:"link-2",class:"w-4 h-4 mt-2 ml-2 text-gray-600 hover:text-black hover:cursor-pointer"}),f("p",Qe,"Name: "+g(a.file_name),1),f("p",Xe,"Size: "+g(a.file_size),1),f("p",et,"URL: "+g(a.file_url),1)]),p(b(P),{name:"x",class:"w-4 h-4 mt-2 ml-auto mr-2 text-gray-600 hover:text-black hover:cursor-pointer",onClick:ce(y,["stop"])})])])])):z("",!0),p(b(R),{modelValue:s.value,"onUpdate:modelValue":d[1]||(d[1]=$=>s.value=$)},{"body-title":x(()=>[f("h3",tt,g(a.file_name),1)]),"body-content":x(()=>[h.value?(u(),m("div",at,[f("img",{src:n.value,alt:"Uploaded Image",class:"w-52 h-52"},null,8,lt)])):r.value?(u(),m("div",st,[f("iframe",{src:n.value,class:"w-full h-[500px]",frameborder:"0"},null,8,ot)])):(u(),m("div",it,dt))]),actions:x(()=>[f("div",ct,[p(b(O),{variant:"solid",onClick:U},{default:x(()=>[F(" Delete ")]),_:1}),p(b(O),{class:"ml-2",onClick:d[0]||(d[0]=$=>s.value=!1)},{default:x(()=>[F(" Close ")]),_:1})])]),_:1},8,["modelValue"]),p(b(R),{modelValue:o.value,"onUpdate:modelValue":d[3]||(d[3]=$=>o.value=$)},{"body-title":x(()=>[rt]),"body-content":x(()=>[f("p",null,"Are you sure you want to delete this "+g(a.file_name)+" file?",1)]),actions:x(()=>[f("div",ut,[p(b(O),{variant:"solid",onClick:K},{default:x(()=>[F(" Yes, Delete ")]),_:1}),p(b(O),{class:"ml-2",onClick:d[2]||(d[2]=$=>o.value=!1)},{default:x(()=>[F(" Cancel ")]),_:1})])]),_:1},8,["modelValue"])]))}};export{Re as L,B as _,M as a,ge as b,De as c,be as d,we as e,Se as f,pt as g,Ne as h,G as i,Ce as j,Me as k,bt as l,vt as u};
