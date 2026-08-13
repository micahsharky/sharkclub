const contentUrl = new URL("content/site.json", document.baseURI);

const renderRichText = (container, text) => {
  container.replaceChildren();
  String(text || "")
    .split(/\n\s*\n/)
    .filter(Boolean)
    .forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph.replace(/\n/g, " ");
      container.appendChild(p);
    });
};

const setTextContent = (content) => {
  document.querySelectorAll("[data-content]").forEach((element) => {
    const value = content[element.dataset.content];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-content-rich]").forEach((element) => {
    const value = content[element.dataset.contentRich];
    if (value) renderRichText(element, value);
  });

  document.querySelectorAll("[data-content-link]").forEach((element) => {
    const value = content[element.dataset.contentLink];
    if (value) element.href = value;
  });

  document.querySelectorAll("[data-content-image]").forEach((element) => {
    const value = content[element.dataset.contentImage];
    if (value) element.src = value;
  });
};

const renderSections = (sections = []) => {
  const root = document.querySelector("#dynamic-sections");
  root.replaceChildren();
  sections.forEach((item, index) => {
    const section = document.createElement("section");
    section.className = "content-section";
    section.id = item.anchor || (index === 0 ? "science" : `section-${index + 1}`);

    if (item.eyebrow) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = item.eyebrow;
      section.appendChild(eyebrow);
    }

    const heading = document.createElement("h2");
    heading.textContent = item.title;
    section.appendChild(heading);

    const body = document.createElement("div");
    renderRichText(body, item.body);
    section.appendChild(body);

    if (item.items?.length) {
      const list = document.createElement("ul");
      list.className = "feature-list";
      item.items.forEach((itemText) => {
        const li = document.createElement("li");
        li.textContent = itemText;
        list.appendChild(li);
      });
      section.appendChild(list);
    }
    root.appendChild(section);
  });
};

const renderList = (selector, items = []) => {
  const root = document.querySelector(selector);
  root.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    root.appendChild(li);
  });
};

const renderSocials = (items = []) => {
  const root = document.querySelector("#social-links");
  root.replaceChildren();
  items.forEach(({ label, url }) => {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    if (/^https?:/.test(url)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    root.appendChild(link);
  });
};

fetch(contentUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    return response.json();
  })
  .then((content) => {
    setTextContent(content);
    renderSections(content.sections);
    renderList("#benefits-list", content.benefits);
    renderSocials(content.socialLinks);
    document.title = `${content.siteName} — ${content.tagline}`;
  })
  .catch((error) => console.warn("Using built-in content because the CMS content could not be loaded.", error));

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
