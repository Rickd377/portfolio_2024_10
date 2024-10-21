document.addEventListener('DOMContentLoaded', function() {
    const filterProjects = document.querySelector('.filter-projects');
    const dropdown = filterProjects.querySelector('.dropdown');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const sortOptions = document.querySelectorAll('input[name="sort"]');
    const filterCount = document.querySelector('.filter-count');
    const projects = document.querySelectorAll('.project');

    // Toggle dropdown visibility
    filterProjects.addEventListener('click', function(event) {
        event.stopPropagation();
        const isActive = dropdown.style.display === 'block';
        dropdown.style.display = isActive ? 'none' : 'block';
        filterProjects.classList.toggle('dropdown-active', !isActive);
    });

    // Prevent dropdown from hiding when clicking inside it
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Hide dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!filterProjects.contains(event.target)) {
            dropdown.style.display = 'none';
            filterProjects.classList.remove('dropdown-active');
        }
    });

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    sortOptions.forEach(option => {
        option.addEventListener('change', applyFilters);
    });

    function applyFilters() {
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        filterCount.textContent = selectedFilters.length;

        projects.forEach(project => {
            const projectClasses = Array.from(project.classList);
            const matchesFilter = selectedFilters.every(filter => projectClasses.includes(filter));
            project.style.display = matchesFilter ? 'block' : 'none';
        });

        const sortOption = document.querySelector('input[name="sort"]:checked').value;
        const projectContainer = document.querySelector('.project-container');
        const sortedProjects = Array.from(projects).sort((a, b) => {
            if (sortOption === 'newest') {
                return projectContainer.appendChild(b);
            } else {
                return projectContainer.appendChild(a);
            }
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    projects.forEach(project => {
        observer.observe(project);
    });
});