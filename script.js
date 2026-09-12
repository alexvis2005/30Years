document.addEventListener("DOMContentLoaded",()=>{
  const items=[...document.querySelectorAll(".hero-text,.hero-image-wrap,.details-title,.fact,.story-head,.photo-grid figure,.quote,.final-photo,.rsvp")];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.animate(
          [{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0)"}],
          {duration:750,easing:"cubic-bezier(.2,.7,.2,1)",fill:"both"}
        );
        observer.unobserve(e.target);
      }
    });
  },{threshold:.08});
  items.forEach(x=>observer.observe(x));

  document.getElementById("yesBtn").addEventListener("click",()=>{
    const btn=document.getElementById("yesBtn"), answer=document.getElementById("answer");
    btn.textContent="Я БУДУ";
    answer.textContent="Отлично. До встречи 14 октября ✦";
    btn.animate([{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],{duration:450});
    const layer=document.createElement("div");
    Object.assign(layer.style,{position:"fixed",inset:0,zIndex:99999,pointerEvents:"none",overflow:"hidden"});
    document.body.appendChild(layer);
    const colors=["#fff","#e0e2e4","#c2c6ca","#969ba0","#f4f4f4"];
    for(let i=0;i<120;i++){
      const p=document.createElement("i"),s=4+Math.random()*7;
      p.style.cssText=`position:absolute;left:50%;top:58%;width:${s}px;height:${s*1.7}px;background:${colors[i%colors.length]};`;
      layer.appendChild(p);
      const x=(Math.random()-.5)*innerWidth*1.2,y=innerHeight*(.35+Math.random()*.7);
      p.animate([{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${x}px,${y}px) rotate(${360+Math.random()*900}deg)`,opacity:0}],{duration:1700+Math.random()*1100,easing:"cubic-bezier(.1,.65,.2,1)"});
    }
    setTimeout(()=>layer.remove(),3000);
  });
});

/* Полноэкранный просмотр всех фотографий */
(() => {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImage");
  const close = document.getElementById("lightboxClose");
  const prev = document.getElementById("lightboxPrev");
  const next = document.getElementById("lightboxNext");
  const counter = document.getElementById("lightboxCounter");

  const sources = [
    ...document.querySelectorAll(".hero-image, .photo-grid img, .final-photo-image img")
  ];

  let current = 0;

  function show(index) {
    current = (index + sources.length) % sources.length;
    const source = sources[current];
    image.src = source.src;
    image.alt = source.alt || "Фото";
    counter.textContent = `${String(current + 1).padStart(2,"0")} / ${String(sources.length).padStart(2,"0")}`;
    image.animate(
      [{opacity:.35, transform:"scale(.97)"},{opacity:1, transform:"scale(1)"}],
      {duration:280,easing:"ease-out"}
    );
  }

  function open(index) {
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  function shut() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }

  sources.forEach((img, index) => {
    img.closest("figure, .hero-image-wrap, .final-photo-image")?.addEventListener("click", () => open(index));
  });

  close.addEventListener("click", shut);
  prev.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) shut();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") shut();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Свайп на телефоне
  let startX = 0;
  lightbox.addEventListener("touchstart", e => {
    startX = e.changedTouches[0].screenX;
  }, {passive:true});
  lightbox.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].screenX - startX;
    if (Math.abs(dx) < 45) return;
    if (dx < 0) show(current + 1);
    else show(current - 1);
  }, {passive:true});
})();
