document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    function activateSection(targetId) {
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active');
    }

    function activateLink(targetId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === targetId) link.classList.add('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            activateSection(targetId);
            activateLink(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        activateSection(currentHash);
        activateLink(currentHash);
    } else if (sections.length > 0) {
        sections[0].classList.add('active');
        links[0].classList.add('active');
    }

    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            activateSection(currentHash);
            activateLink(currentHash);
        } else if (sections.length > 0) {
            sections[0].classList.add('active');
            links[0].classList.add('active');
        }
    });
});