const menuButton = document.getElementById("menu");
const navMenu = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  navMenu.classList.toggle("show");
});
