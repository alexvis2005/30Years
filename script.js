window.addEventListener("load",()=>setTimeout(()=>document.querySelector(".preloader").classList.add("hide"),700));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("seen")}),{threshold:.1});
document.querySelectorAll("section").forEach(e=>io.observe(e));
document.querySelectorAll(".buttons button").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".buttons button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 document.querySelector(".answer").textContent=b.dataset.answer;
}));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const x=document.querySelector(a.getAttribute("href"));if(x){e.preventDefault();x.scrollIntoView({behavior:"smooth"})}}));