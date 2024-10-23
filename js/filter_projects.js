document.addEventListener("DOMContentLoaded", function () {
  const e = document.querySelector(".filter-projects"),
    t = e.querySelector(".dropdown"),
    o = document.querySelectorAll(".filter-checkbox"),
    n = document.querySelectorAll('input[name="sort"]'),
    c = document.querySelector(".filter-count"),
    r = document.querySelectorAll(".project");
  function s() {
    const e = Array.from(o)
      .filter((e) => e.checked)
      .map((e) => e.value);
    (c.textContent = e.length),
      r.forEach((t) => {
        const o = Array.from(t.classList),
          n = e.every((e) => o.includes(e));
        t.style.display = n ? "block" : "none";
      });
    const t = document.querySelector('input[name="sort"]:checked').value,
      n = document.querySelector(".project-container");
    Array.from(r).sort((e, o) =>
      "newest" === t ? n.appendChild(o) : n.appendChild(e)
    );
  }
  e.addEventListener("click", function (o) {
    o.stopPropagation();
    const n = "block" === t.style.display;
    (t.style.display = n ? "none" : "block"),
      e.classList.toggle("dropdown-active", !n);
  }),
    t.addEventListener("click", function (e) {
      e.stopPropagation();
    }),
    document.addEventListener("click", function (o) {
      e.contains(o.target) ||
        ((t.style.display = "none"), e.classList.remove("dropdown-active"));
    }),
    o.forEach((e) => {
      e.addEventListener("change", s);
    }),
    n.forEach((e) => {
      e.addEventListener("change", s);
    });
  const a = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        e.isIntersecting
          ? (e.target.classList.add("visible"),
            e.target.classList.remove("hidden"))
          : (e.target.classList.add("hidden"),
            e.target.classList.remove("visible"));
      });
    },
    { threshold: 0.1 }
  );
  r.forEach((e) => {
    a.observe(e);
  }),
    setTimeout(() => {
      r.forEach((e) => {
        e.classList.add("visible");
      });
    }, 100);
});