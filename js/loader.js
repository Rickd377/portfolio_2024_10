window.addEventListener("load", () => {
  const e = document.getElementById("loader");
  (e.style.opacity = "0"),
    setTimeout(() => {
      e.style.display = "none";
    }, 600);
});
