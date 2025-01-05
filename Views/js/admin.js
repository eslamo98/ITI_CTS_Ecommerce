document.addEventListener("DOMContentLoaded", () => {
  // Load default content (Dashboard)
  loadContent("admin_dashboard.html");

  // Add event listeners to all nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault(); // Prevent page reload
      const sectionFile = event.currentTarget.dataset.section;

      if (sectionFile === "home") {
        // Navigate to the Home Page
        window.location.href = "../../index.html"; // Replace with the correct home page URL
      } else {
        // Dynamically load content for other sections
        loadContent(sectionFile);
        updateActiveLink(event.currentTarget); // Update active class
      }
    });
  });
});

// Load Content Function
function loadContent(file) {
  const content = document.getElementById("content");

  // Fetch the HTML file and load it into the content area
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading ${file}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      content.innerHTML = html; // Update content with fetched HTML
    })
    .catch(error => {
      content.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
    });
}

// Update Active Link
function updateActiveLink(activeLink) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}
