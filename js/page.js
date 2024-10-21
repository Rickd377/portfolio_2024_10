document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    const filterProjects = document.querySelector('.filter-projects');
    const nav = document.querySelector('nav');

    function activateSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'flex';
        }
    }

    function activateLink(targetId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === targetId) link.classList.add('active');
        });
    }

    function moveDropdownButton(targetId) {
        if (targetId === 'projects') {
            nav.appendChild(filterProjects);
            filterProjects.classList.add('in-nav');
            filterProjects.style.display = 'flex';
            nav.classList.add('in-projects');
            nav.style.padding = '0 0 0 60px'; // Add padding to the left
        } else {
            document.body.appendChild(filterProjects);
            filterProjects.classList.remove('in-nav');
            filterProjects.style.display = 'none';
            nav.classList.remove('in-projects');
            nav.style.padding = '0 60px'; // Reset padding
        }
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            activateSection(targetId);
            activateLink(targetId);
            moveDropdownButton(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    const currentHash = window.location.hash.substring(1);
    const initialPage = currentHash || 'home';

    activateSection(initialPage);
    activateLink(initialPage);
    moveDropdownButton(initialPage);

    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            activateSection(currentHash);
            activateLink(currentHash);
            moveDropdownButton(currentHash);
        } else {
            activateSection('home');
            activateLink('home');
        }
    });
});