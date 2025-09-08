(() => {
  // src/js/main.js
  async function loadJSON(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
    return res.json();
  }
  function byId(id) {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Elemento #${id} no encontrado`);
    return el;
  }
  function renderBasics(b) {
    byId("avatar").src = b.avatar;
    byId("name").textContent = b.name;
    byId("footerName").textContent = b.name;
    byId("headline").textContent = b.headline;
    const links = byId("links");
    links.innerHTML = "";
    b.links.forEach((l) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = l.label;
      li.appendChild(a);
      links.appendChild(li);
    });
  }
  function renderExperience(items) {
    const container = byId("experience");
    container.innerHTML = "";
    items.forEach((it) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
      <h3>${it.role} \xB7 <span class="muted">${it.company}</span></h3>
      <p class="muted">${it.period}</p>
      <ul>${it.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
    `;
      container.appendChild(card);
    });
  }
  function renderEducation(items) {
    const ul = byId("education");
    ul.innerHTML = items.map((e) => `<li><strong>${e.degree}</strong> \u2014 ${e.institution} (${e.year})</li>`).join("");
  }
  function renderSkills(skills) {
    const ul = byId("skills");
    ul.innerHTML = skills.map((s) => `<li class="tag">${s}</li>`).join("");
  }
  function renderProjects(ps) {
    const grid = byId("projects");
    grid.innerHTML = "";
    ps.forEach((p) => {
      const a = document.createElement("a");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "project";
      a.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div class="project__body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>`;
      grid.appendChild(a);
    });
  }
  function setupContactForm(cv) {
    const form = byId("contactForm");
    const status = byId("formStatus");
    if (cv.contact.provider === "formsubmit") {
      form.action = `https://formsubmit.co/${encodeURIComponent(cv.contact.emailTo)}`;
      form.method = "POST";
      const redirect = document.createElement("input");
      redirect.type = "hidden";
      redirect.name = "_next";
      redirect.value = window.location.href;
      form.appendChild(redirect);
    }
    form.addEventListener("submit", (ev) => {
      status.textContent = "";
      const name = (byId("nameInput").value || "").trim();
      const email = (byId("emailInput").value || "").trim();
      const message = (byId("messageInput").value || "").trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const errors = [];
      if (name.length < 2) errors.push("El nombre debe tener al menos 2 caracteres.");
      if (!emailOk) errors.push("Ingresa un correo v\xE1lido.");
      if (message.length < 10) errors.push("El mensaje debe tener al menos 10 caracteres.");
      if (errors.length) {
        ev.preventDefault();
        status.textContent = errors.join(" ");
        status.classList.add("error");
        return;
      }
      status.textContent = "Enviando\u2026";
      status.classList.remove("error");
    });
  }
  function setYear() {
    byId("year").textContent = String((/* @__PURE__ */ new Date()).getFullYear());
  }
  async function main() {
    try {
      const cv = await loadJSON("./data/cv.json");
      byId("summary").textContent = cv.basics.summary;
      renderBasics(cv.basics);
      renderExperience(cv.experience);
      renderEducation(cv.education);
      renderSkills(cv.skills);
      renderProjects(cv.projects);
      setupContactForm(cv);
      setYear();
    } catch (err) {
      console.error(err);
      alert("No fue posible cargar el CV. Revisa la consola.");
    }
  }
  main();
})();
//# sourceMappingURL=main.js.map
