document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-hidden');
    });

    // Close sidebar when clicking outside on mobile
    body.addEventListener('click', function(event) {
        if (window.innerWidth <= 767.98 && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.add('sidebar-hidden');
        }
    });

    // Update sidebar visibility on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767.98) {
            sidebar.classList.remove('sidebar-hidden');
        }
    });

    // Highlight active nav item
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});




