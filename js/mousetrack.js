document.addEventListener('mousemove', function (e) {
    const blurCircle = document.getElementById('blur-circle');
    blurCircle.style.left = `${e.clientX - 50}px`;
    blurCircle.style.top = `${e.clientY - 50}px`;
});