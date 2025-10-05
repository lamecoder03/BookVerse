document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = toggleBtn.querySelector("i");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  icon.className = currentTheme === "dark" ? "bi bi-sun" : "bi bi-moon";

  toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    icon.className = newTheme === "dark" ? "bi bi-sun" : "bi bi-moon";
  });
});
