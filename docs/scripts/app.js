console.log("E-Commerce Website Loaded");
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-badge').textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartCount);

function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    document.getElementById("login-link").style.display = isLoggedIn ? "none" : "inline";
    document.getElementById("profile").style.display = isLoggedIn ? "inline" : "none";
});

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
}

function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    document.getElementById("login-link").style.display = isLoggedIn ? "none" : "inline";
    document.getElementById("profile").style.display = isLoggedIn ? "inline" : "none";
});
document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profileIcon");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        // Show "logged in" profile image with logout on click
        profileIcon.innerHTML = `
            <img src="assests/profile.svg" alt="Profile Icon"
                class="profileicon" style="cursor:pointer;" title="Click to logout" id="logoutImg" />
        `;
        document.getElementById("logoutImg").addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.reload();
        });
    } else {
        // Show default login link with profile image
        profileIcon.innerHTML = `
            <a href="login.html">
                <img src="assests/profile.svg" alt="Login Icon" class="profileicon" />
            </a>
        `;
    }
});

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html"; // Redirect after login
}

document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName") || "User";
    if (localStorage.getItem("loggedIn") === "true") {
        console.log(`Welcome back, ${name}`);
        // Optional: Show name on UI
        // document.getElementById("greeting").textContent = `Welcome, ${name}`;
    }
});
