document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("typewriter");
  new Typewriter(e, { loop: !0, delay: 75 })
    .typeString("Software Developer")
    .pauseFor(2e3)
    .deleteAll()
    .typeString("Web Designer")
    .pauseFor(2e3)
    .deleteAll()
    .typeString("Frontend Developer")
    .pauseFor(2e3)
    .start();
});