(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},19:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=(t(19),t(2)),l=t(3),i=t.n(l),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},s=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:e.value,onChange:e.onChange}))},p=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.valueName,onChange:e.onChangeName})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.valueNumber,onChange:e.onChangeNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.filter,t=e.persons,a=e.deletePerson,u=""===n?t:t.filter((function(e){return e.name.toLowerCase().includes(n)})),o={marginLeft:30};return u.map((function(e){return r.a.createElement("li",{key:e.name,style:o},e.name," ",e.number,"\u2003",r.a.createElement("button",{onClick:function(){return a(e.id)}},"Delete contact"))}))},g=function(e){var n=e.message,t={color:e.color,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:3,padding:10,marginBottom:10};return null===n?null:r.a.createElement("div",{style:t},n)},E=(t(37),function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),l=Object(c.a)(o,2),i=l[0],m=l[1],E=Object(a.useState)(""),w=Object(c.a)(E,2),j=w[0],C=w[1],O=Object(a.useState)(""),y=Object(c.a)(O,2),N=y[0],S=y[1],k=Object(a.useState)([null,""]),T=Object(c.a)(k,2),P=T[0],D=T[1];Object(a.useEffect)((function(){d().then((function(e){u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:P[0],color:P[1]}),r.a.createElement(b,{value:N,onChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(p,{addPerson:function(e){e.preventDefault();var n={name:i,number:j},a=t.find((function(e){return e.name===i}));void 0!==a?window.confirm("".concat(a.name," is already added to the phonebook,\n                replace the old number with a new one?"))&&s(a.id,n).then((function(e){u(t.map((function(n){return n.id!==e.id?n:e}))),D(["".concat(e.name,"'s number updated"),"green"]),setTimeout((function(){D([null,""])}),3e3)})).catch((function(e){D(["the person '".concat(a.name,"' was already deleted from the server"),"red"]),setTimeout((function(){D([null,""])}),3e3),u(t.filter((function(e){return e.id!==a.id})))})):f(n).then((function(e){u(t.concat(e)),D(["Added ".concat(e.name),"green"]),setTimeout((function(){D([null,""])}),3e3)})).catch((function(e){D([e.response.data.error,"red"]),setTimeout((function(){D([null,""])}),5e3)})),m(""),C("")},valueName:i,onChangeName:function(e){m(e.target.value)},valueNumber:j,onChangeNumber:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(v,{filter:N,persons:t,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&h(e).then((function(){u(t.filter((function(n){return n.id!==e}))),D(["Deleted ".concat(n.name),"green"]),setTimeout((function(){D([null,""])}),3e3)})).catch((function(a){D(["the person '".concat(n.name,"' was already deleted from the server"),"red"]),setTimeout((function(){D([null,""])}),3e3),u(t.filter((function(n){return n.id!==e})))}))}}))});o.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.34d01cd1.chunk.js.map