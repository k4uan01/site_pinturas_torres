const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = [...document.querySelectorAll("main section[id]")];

const services = {
  cimento: {
    title: "Cimento Queimado",
    kicker: "Acabamento contemporâneo",
    image: "imagens/cimento-queimado.jpg",
    position: "50% 42%",
    text: "O cimento queimado da Pinturas Torres entrega um visual moderno, contínuo e sofisticado. Indicado para paredes, pisos e detalhes internos, valoriza o ambiente com textura elegante e alta durabilidade."
  },
  projetada: {
    title: "Pintura Projetada",
    kicker: "Resistência e acabamento",
    image: "imagens/textura-projetada.png",
    position: "18% 36%",
    text: "A pintura projetada oferece cobertura uniforme, produtividade e excelente acabamento em fachadas e grandes superfícies. Uma solução resistente, com visual limpo e profissional."
  },
  laca: {
    title: "Laca",
    kicker: "Brilho e precisão",
    image: "imagens/servicos/laca.jpg",
    text: "O acabamento em laca é indicado para móveis, portas e superfícies que pedem um toque fino. O resultado é liso, elegante e com alto padrão de capricho em cada detalhe."
  },
  isolamento: {
    title: "Isolamento",
    kicker: "Proteção do ambiente",
    image: "imagens/isolamento.png",
    position: "50% 48%",
    text: "Antes de pintar, isolamos e protegemos móveis, pisos e demais superfícies. Assim o serviço é feito com capricho, sem sujeira desnecessária e sem danificar o que já está no ambiente."
  },
  marmore: {
    title: "Efeito Mármore",
    kicker: "Exclusividade visual",
    image: "imagens/efeito-marmore.png",
    position: "40% 38%",
    text: "O efeito mármore reproduz a sofisticação da pedra natural com pintura decorativa de alto padrão. Ideal para quem busca exclusividade e um ponto focal marcante no ambiente."
  },
  lixamento: {
    title: "Lixamento",
    kicker: "Preparação impecável",
    image: "imagens/lixamento.png",
    position: "22% 50%",
    text: "A preparação da superfície é o que garante o resultado final. Fazemos lixamento e correção profissional para que a pintura e os acabamentos especiais fiquem nivelados, aderentes e duráveis."
  }
};

const gallery = [
  { src: "imagens/portfolio-fachada-varanda.png", caption: "Fachada Residencial" },
  { src: "imagens/portfolio-fachada-construcao.png", caption: "Fachada em Execução" },
  { src: "imagens/portfolio-reforma-andaimes.png", caption: "Reforma Externa" },
  { src: "imagens/portfolio-sala-duplex.png", caption: "Sala Duplex" },
  { src: "imagens/portfolio-consultorio.png", caption: "Consultório Odontológico" }
];

let galleryIndex = 0;

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  const current = [...sections].reverse().find((section) => window.scrollY >= section.offsetTop - 120);
  if (!current) return;
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.hidden = true;
  });
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const serviceModal = document.getElementById("modal-servico");
    if (!serviceModal.hidden) serviceModal.hidden = true;
    openModal(button.dataset.openModal);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModals);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModals();
    closeLightbox();
  }
  if (!document.getElementById("lightbox").hidden) {
    if (event.key === "ArrowRight") showGallery(galleryIndex + 1);
    if (event.key === "ArrowLeft") showGallery(galleryIndex - 1);
  }
});

function openService(key) {
  const data = services[key];
  if (!data) return;
  document.getElementById("servico-title").textContent = data.title;
  document.getElementById("servico-kicker").textContent = data.kicker;
  document.getElementById("servico-text").textContent = data.text;
  const img = document.getElementById("servico-img");
  img.src = data.image;
  img.alt = data.title;
  img.style.objectPosition = data.position || "center";
  openModal("servico");
}

document.querySelectorAll("[data-open-service]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openService(button.dataset.openService);
  });
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", () => openService(card.dataset.service));
});

document.getElementById("form-orcamento").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const nome = form.get("nome");
  const telefone = form.get("telefone");
  const email = form.get("email") || "Não informado";
  const servico = form.get("servico");
  const mensagem = form.get("mensagem") || "Gostaria de um orçamento.";
  const text = `Olá, Pinturas Torres! Meu nome é ${nome}.%0ATelefone: ${telefone}%0AE-mail: ${email}%0AServiço: ${servico}%0AMensagem: ${mensagem}`;
  window.open(`https://wa.me/5541996712413?text=${text}`, "_blank");
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

function showGallery(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const item = gallery[galleryIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption;
  lightboxCaption.textContent = item.caption;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-gallery]").forEach((card) => {
  card.addEventListener("click", () => showGallery(Number(card.dataset.gallery)));
});

document.getElementById("open-gallery").addEventListener("click", () => showGallery(0));
document.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox__prev").addEventListener("click", () => showGallery(galleryIndex - 1));
document.querySelector(".lightbox__next").addEventListener("click", () => showGallery(galleryIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealGroups = [
  [".section__head", 0],
  [".service-card", 70],
  [".about__photo", 0, "reveal--left"],
  [".about__content", 0],
  [".about__years", 0, "reveal--right"],
  [".process__grid li", 80],
  [".portfolio-card", 55],
  [".review-card", 0],
  [".reviews__summary", 90],
  [".cta__copy", 0],
  [".cta__inner > .btn", 80],
  [".cta__whatsapp", 140]
];

if (!reduceMotion) {
  revealGroups.forEach(([selector, stagger, extra]) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add("reveal");
      if (extra) el.classList.add(extra);
      if (stagger) el.style.setProperty("--d", `${index * stagger}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -48px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add("is-in");
    } else {
      observer.observe(el);
    }
  });
}

const years = document.querySelector(".about__years-number");
if (years) {
  const target = Number(years.textContent) || 20;
  if (!reduceMotion) {
    years.textContent = "0";
    const countObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1100, 1);
        years.textContent = String(Math.round(progress * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.disconnect();
    }, { threshold: 0.45 });
    countObserver.observe(years);
  }
}
