document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    const filterProjects = document.querySelector('.filter-projects');
    const nav = document.querySelector('nav');
    const homeSection = document.getElementById('home');

    function activateSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
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

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            activateSection(targetId);
            activateLink(targetId);
            moveDropdownButton(targetId);
            setCookie('activePage', targetId, 1);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    const currentHash = window.location.hash.substring(1);
    const savedPage = getCookie('activePage');
    const initialPage = currentHash || savedPage || 'home';

    activateSection(initialPage);
    activateLink(initialPage);
    moveDropdownButton(initialPage);

    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            activateSection(currentHash);
            activateLink(currentHash);
            moveDropdownButton(currentHash);
            setCookie('activePage', currentHash, 1);
        } else {
            activateSection('home');
            activateLink('home');
            setCookie('activePage', 'home', 1);
        }
    });
});