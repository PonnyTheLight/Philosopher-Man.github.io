function scrollToSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
}

function openEmail() {
    window.location.href = "mailto:your.email@example.com";
}

