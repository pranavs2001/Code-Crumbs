(this["webpackJsonpextension-test"]=this["webpackJsonpextension-test"]||[]).push([[0],{30:function(e,t,n){},31:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),s=n(19),c=n.n(s),l=(n(30),n.p,n(31),n(10)),i=n(9),o=n(7),u=n.n(o),b=n(11),d=n(21),m=n(22),j=n(25),p=n(24),h=n(17),x=n(14);n(38),n(43);x.a.initializeApp({apiKey:"AIzaSyAxAxnARXfjoB33h2lTUXq_wpD7BNFOkic",authDomain:"codecrumbs.firebaseapp.com",projectId:"codecrumbs",storageBucket:"codecrumbs.appspot.com",messagingSenderId:"678789643037",appId:"1:678789643037:web:a8ca99ad7761309b4abff4",measurementId:"G-VBFKZZRSQ7"});var f=x.a.auth(),O=x.a.firestore(),g=new x.a.auth.GoogleAuthProvider,w=function(){f.signInWithPopup(g)},v=function(){var e=Object(b.a)(u.a.mark((function e(t,n){var r,a,s,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return r=O.doc("users/".concat(t.uid)),e.next=5,r.get();case 5:if(e.sent.exists){e.next=16;break}return a=t.email,s=t.displayName,c=t.photoURL,e.prev=8,e.next=11,r.set(Object(h.a)({displayName:s,email:a,photoURL:c},n));case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(8),console.error("Error creating user document",e.t0);case 16:return e.abrupt("return",y(t.uid));case 17:case"end":return e.stop()}}),e,null,[[8,13]])})));return function(t,n){return e.apply(this,arguments)}}(),y=function(){var e=Object(b.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",null);case 2:return e.prev=2,e.next=5,O.doc("users/".concat(t)).get();case 5:return n=e.sent,e.abrupt("return",Object(h.a)({uid:t},n.data()));case 9:e.prev=9,e.t0=e.catch(2),console.error("Error fetching user",e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}(),N=n(1),k=Object(r.createContext)({user:null}),S=function(e){Object(j.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(d.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={user:null},e.componentDidMount=Object(b.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:f.onAuthStateChanged(function(){var t=Object(b.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v(n);case 2:r=t.sent,e.setState({user:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)}))),e}return Object(m.a)(n,[{key:"render",value:function(){return Object(N.jsx)(k.Provider,{value:this.state.user,children:this.props.children})}}]),n}(r.Component),E=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(""),c=Object(i.a)(s,2),o=c[0],u=c[1],b=Object(r.useState)(null),d=Object(i.a)(b,2),m=d[0],j=d[1],p=function(e){var t=e.currentTarget,n=t.name,r=t.value;"userEmail"===n?a(r):"userPassword"===n&&u(r)};return Object(N.jsxs)("div",{className:"mt-8",children:[Object(N.jsx)("h1",{className:"text-3xl mb-2 text-center font-bold",children:"Sign In"}),Object(N.jsxs)("div",{className:"border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8",children:[null!==m&&Object(N.jsx)("div",{className:"py-4 bg-red-600 w-full text-white text-center mb-3",children:m}),Object(N.jsxs)("form",{className:"",children:[Object(N.jsx)("label",{htmlFor:"userEmail",className:"block",children:"Email:"}),Object(N.jsx)("input",{type:"email",className:"my-1 p-1 w-full",name:"userEmail",value:n,placeholder:"E.g: joebruin1919@gmail.com",id:"userEmail",onChange:function(e){return p(e)}}),Object(N.jsx)("label",{htmlFor:"userPassword",className:"block",children:"Password:"}),Object(N.jsx)("input",{type:"password",className:"mt-1 mb-3 p-1 w-full",name:"userPassword",value:o,placeholder:"Your Password",id:"userPassword",onChange:function(e){return p(e)}}),Object(N.jsx)("button",{className:"bg-green-400 hover:bg-green-500 w-full py-2 text-white",onClick:function(e){!function(e,t,n){e.preventDefault(),f.signInWithEmailAndPassword(t,n).catch((function(e){j("Error signing in with password and email!"),console.error("Error signing in with password and email",e)}))}(e,n,o)},children:"Sign in"})]}),Object(N.jsx)("p",{className:"text-center my-3",children:"or"}),Object(N.jsx)("button",{className:"bg-red-500 hover:bg-red-600 w-full py-2 text-white",onClick:function(){return w()},children:"Sign in with Google"}),Object(N.jsxs)("p",{className:"text-center my-3",children:["Don't have an account?"," ",Object(N.jsx)(l.a,{to:"signUp",className:"text-blue-500 hover:text-blue-600",children:"Sign up here"})," ",Object(N.jsx)("br",{})," ",Object(N.jsx)(l.a,{to:"passwordReset",className:"text-blue-500 hover:text-blue-600",children:"Forgot Password?"})]})]})]})},P=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(""),c=Object(i.a)(s,2),o=c[0],d=c[1],m=Object(r.useState)(""),j=Object(i.a)(m,2),p=j[0],h=j[1],x=Object(r.useState)(null),O=Object(i.a)(x,2),g=O[0],y=O[1],k=function(){var e=Object(b.a)(u.a.mark((function e(t,n,r,s){var c,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,f.createUserWithEmailAndPassword(r,s);case 4:c=e.sent,l=c.user,v(l,{displayName:n}),chrome.storage.local.set({displayName:n},(function(){console.log("Value is set to "+n)})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),y("Error Signing up with email and password");case 13:a(""),d(""),h("");case 16:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,n,r,a){return e.apply(this,arguments)}}(),S=function(e){var t=e.currentTarget,n=t.name,r=t.value;"userEmail"===n?a(r):"userPassword"===n?d(r):"displayName"===n&&h(r)};return Object(N.jsxs)("div",{className:"mt-8",children:[Object(N.jsx)("h1",{className:"text-3xl mb-2 text-center font-bold",children:"Sign Up"}),Object(N.jsxs)("div",{className:"border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8",children:[null!==g&&Object(N.jsx)("div",{className:"py-4 bg-red-600 w-full text-white text-center mb-3",children:g}),Object(N.jsxs)("form",{className:"",children:[Object(N.jsx)("label",{htmlFor:"displayName",className:"block",children:"Username:"}),Object(N.jsx)("input",{type:"text",className:"my-1 p-1 w-full ",name:"displayName",value:p,placeholder:"E.g: joebruin1919",id:"displayName",onChange:function(e){return S(e)}}),Object(N.jsx)("label",{htmlFor:"userEmail",className:"block",children:"Email:"}),Object(N.jsx)("input",{type:"email",className:"my-1 p-1 w-full",name:"userEmail",value:n,placeholder:"E.g: joebruin1919@gmail.com",id:"userEmail",onChange:function(e){return S(e)}}),Object(N.jsx)("label",{htmlFor:"userPassword",className:"block",children:"Password:"}),Object(N.jsx)("input",{type:"password",className:"mt-1 mb-3 p-1 w-full",name:"userPassword",value:o,placeholder:"Your Password",id:"userPassword",onChange:function(e){return S(e)}}),Object(N.jsx)("button",{className:"bg-green-400 hover:bg-green-500 w-full py-2 text-white",color:"#a10505",onClick:function(e){k(e,p,n,o)},children:"Sign up"})]}),Object(N.jsx)("p",{className:"text-center my-3",children:"or"}),Object(N.jsx)("button",{className:"bg-red-500 hover:bg-red-600 w-full py-2 text-white",onClick:function(){return w()},children:"Sign In with Google"}),Object(N.jsxs)("p",{className:"text-center my-3",children:["Already have an account?"," ",Object(N.jsx)(l.a,{to:"/",className:"text-blue-500 hover:text-blue-600",children:"Sign in here"})]})]})]})},C=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(!1),c=Object(i.a)(s,2),o=c[0],u=c[1],b=Object(r.useState)(null),d=Object(i.a)(b,2),m=d[0],j=d[1];return Object(N.jsxs)("div",{className:"mt-8",children:[Object(N.jsx)("h1",{className:"text-xl text-center font-bold mb-3",children:"Reset your Password"}),Object(N.jsxs)("div",{className:"border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8",children:[Object(N.jsxs)("form",{action:"",children:[o&&Object(N.jsx)("div",{className:"py-3 bg-green-400 w-full text-white text-center mb-3",children:"An email has been sent to you!"}),null!==m&&Object(N.jsx)("div",{className:"py-3 bg-red-600 w-full text-white text-center mb-3",children:m}),Object(N.jsx)("label",{htmlFor:"userEmail",className:"w-full block",children:"Email:"}),Object(N.jsx)("input",{type:"email",name:"userEmail",id:"userEmail",value:n,placeholder:"Input your email",onChange:function(e){var t=e.currentTarget,n=t.name,r=t.value;"userEmail"===n&&a(r)},className:"mb-3 w-full px-1 py-2"}),Object(N.jsx)("button",{className:"w-full bg-blue-400 text-white py-3",onClick:function(e){return function(e){e.preventDefault(),f.sendPasswordResetEmail(n).then((function(){u(!0),setTimeout((function(){u(!1)}),3e3)})).catch((function(){j("Error resetting password")})),console.log("Haha yes")}(e)},children:"Send me a reset link"})]}),Object(N.jsx)(l.a,{to:"/",className:"my-2 text-blue-700 hover:text-blue-800 text-center block",children:"\u2190 back to sign in page"})]})]})};var A=function(){return chrome.storage.local.get(["displayName"],(function(e){console.log("Value currently is "+e.value)})),Object(N.jsxs)("div",{children:[Object(N.jsxs)("nav",{children:[Object(N.jsx)(l.a,{to:"/",children:"Sign In"}),Object(N.jsx)("br",{}),Object(N.jsx)(l.a,{to:"signUp",children:"Sign Up"}),Object(N.jsx)("br",{}),Object(N.jsx)(l.a,{to:"passwordReset",children:"Reset Password"})]}),Object(N.jsxs)(l.b,{children:[Object(N.jsx)(P,{path:"signUp"}),Object(N.jsx)(E,{path:"/"}),Object(N.jsx)(C,{path:"passwordReset"})]})]})};var F=function(){return Object(N.jsx)("div",{className:"App",children:Object(N.jsx)(S,{children:Object(N.jsx)(A,{})})})},I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(F,{})}),document.getElementById("root")),I()}},[[42,1,2]]]);