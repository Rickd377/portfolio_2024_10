document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');

    const typewriter = new Typewriter(typewriterElement, {
        loop: true,
        delay: 75,
    });

    typewriter
        .typeString('Software Developer')
        .pauseFor(2000)
        .deleteAll()
        .typeString('Web Designer')
        .pauseFor(2000)
        .deleteAll()
        .typeString('Frontend Developer')
        .pauseFor(2000)
        .start();
});