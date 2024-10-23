document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelectorAll("nav a"),
    t = document.querySelectorAll(".section"),
    s = document.querySelector(".filter-projects"),
    n = document.querySelector("nav"),
    i = document.querySelector(".main-dropdown"),
    o = document.querySelectorAll(".dropdown-content-header a");
  function a(e) {
    t.forEach((e) => {
      e.classList.remove("active"), (e.style.display = "none");
    });
    const s = document.getElementById(e);
    s && (s.classList.add("active"), (s.style.display = "flex"));
  }
  function c(t) {
    e.forEach((e) => {
      e.classList.remove("active"),
        e.getAttribute("href").substring(1) === t && e.classList.add("active");
    }),
      o.forEach((e) => {
        e.classList.remove("active"),
          e.getAttribute("href").substring(1) === t &&
            e.classList.add("active");
      });
  }
  function r(e) {
    "projects" === e
      ? (n.appendChild(s),
        s.classList.add("in-nav"),
        (s.style.display = "flex"),
        n.classList.add("in-projects"),
        (n.style.padding = "0 0 0 60px"))
      : (document.body.appendChild(s),
        s.classList.remove("in-nav"),
        (s.style.display = "none"),
        n.classList.remove("in-projects"),
        (n.style.padding = "0 60px"));
  }
  e.forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault();
      const s = e.getAttribute("href").substring(1);
      a(s), c(s), r(s), history.pushState(null, "", `#${s}`);
    });
  }),
    o.forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault();
        const s = e.getAttribute("href").substring(1);
        a(s),
          c(s),
          r(s),
          history.pushState(null, "", `#${s}`),
          i.classList.remove("active");
      });
    }),
    i.addEventListener("click", (e) => {
      e.stopPropagation(), i.classList.toggle("active");
    }),
    document.addEventListener("click", () => {
      i.classList.remove("active");
    });
  let l = window.location.hash.substring(1);
  l || ((l = "home"), history.replaceState(null, "", `#${l}`)),
    a(l),
    c(l),
    r(l),
    window.addEventListener("popstate", () => {
      const e = window.location.hash.substring(1);
      e ? (a(e), c(e), r(e)) : (a("home"), c("home"));
    });
});
