function iniciarApp(){crearGaleria(),scrollNav(),navegacionFija(),botonIrArriba()}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=12;t++){const n=document.createElement("picture");n.innerHTML=`<source srcset="build/img/thumb/${t}.avif" type="image/avif" />\n    <source srcset="build/img/thumb/${t}.webp" type="image/webp" /><img loading="lazy" width="200" height="300" src="build/img/thumb/${t}.jpg" alt="imagen galería"/>`,n.onclick=function(){mostrarImagen(t)},e.appendChild(n)}}function mostrarImagen(e){const t=document.createElement("picture");t.innerHTML=`<source srcset="build/img/grande/${e}.avif" type="image/avif" />\n    <source srcset="build/img/grande/${e}.webp" type="image/webp" /><img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg" alt="imagen galería"/>`;const n=document.createElement("DIV");n.appendChild(t),n.classList.add("overlay"),n.onclick=function(){o.appendChild(n),o.classList.remove("fijar-body"),n.remove()};const i=document.createElement("P");i.textContent="X",i.classList.add("btn-cerrar"),i.onclick=function(){o.appendChild(n),o.classList.remove("fijar-body"),n.remove()},n.appendChild(i);const o=document.querySelector("body");o.appendChild(n),o.classList.add("fijar-body")}function navegacionFija(){const e=document.querySelector(".header"),t=document.querySelector(".sobre-festival"),n=document.querySelector("body");window.addEventListener("scroll",(function(){t.getBoundingClientRect().bottom<0?(e.classList.add("fijo"),n.classList.add("body-scroll")):(e.classList.remove("fijo"),n.classList.remove("body-scroll"))}))}function scrollNav(){document.querySelectorAll(".navegacion-principal a").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault();const t="."+e.target.attributes.href.value.substr(1);document.querySelector(t).scrollIntoView({behaviour:"smooth"})}))})}function botonIrArriba(){const e=document.getElementById("volverArriba"),t=document.querySelector(".sobre-festival");window.addEventListener("scroll",(function(){window.scrollY;t.getBoundingClientRect().bottom<0?e.classList.add("visible"):e.classList.remove("visible")})),e.addEventListener("click",(function(){document.documentElement.scrollTop=0}))}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map
