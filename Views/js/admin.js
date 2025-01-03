document.addEventListener("DOMContentLoaded", () => {
    // Load default content (Dashboard)
    loadContent("dashboard");
  });



  const dataContainerHTML = `
  <div class="data-container">
    <div class="text-section">
      <p class="title">Total Orders</p>
      <p class="duration">Last 7 days</p>
      <p class="amount">25.7K</p>
      <p class="change">
        <span class="arrow up">↑</span>
        <span class="percentage up">6%</span> vs last 7 days
      </p>
    </div>
    <div class="graph-section">
      <svg class="graph" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 Q25,20 50,30 T100,20" stroke="green" fill="none" stroke-width="2" />
      </svg>
    </div>
  </div>
`;
  
  // Pages Content
  const pages = {
    dashboard:`
    <header class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="m-0">Dashboard</h2>
      <div class="header-icons">
        <button class="btn btn-light"><i class="bi bi-bell"></i></button>
        <button class="btn btn-light"><i class="bi bi-person-circle"></i></button>
      </div>
    </header>
    <div class="container-fluid">
      <!-- First Row -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
      </div>
      <!-- Second Row -->
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
      </div>
      <!-- Third Row -->
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              ${dataContainerHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    products: `<h1>Products</h1><p>Manage your product listings, inventory, and details here.</p>`,
    orders: `<h1>Orders</h1><p>Track and manage customer orders from this section.</p>`,
    transactions: `<h1>Transactions</h1><p>View and track all your financial transactions here.</p>`,
    accounts: `<h1>Accounts</h1><p>Manage customer accounts and view their details here.</p>`,
    "customer-service": `<h1>Customer Service</h1><p>Provide and track customer support activities here.</p>`,
    sellers: `<h1>Sellers</h1><p>Manage seller profiles and their listings here.</p>`,
    profile: `<h1>Profile</h1><p>View and edit your profile information.</p>`,
    home: `<h1>Home</h1><p>Welcome to the Home Page! Navigate to the main sections using the menu.</p>`,
  };
  
  // Load Content Function
  function loadContent(section) {
    const content = document.getElementById("content");
  
    // Update content dynamically
    content.innerHTML = pages[section];
  
    // Update active class for navigation items
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
    });
    event.target.classList.add("active");
  }
  