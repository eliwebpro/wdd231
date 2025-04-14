export function toggleMenu() {
  const menuBtn = document.querySelector("#menu");
  const nav = document.querySelector(".navigation");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("show");
  });
}
