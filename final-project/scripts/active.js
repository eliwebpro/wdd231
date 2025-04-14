export function setActiveLink() {
    document.addEventListener("DOMContentLoaded", () => {
      const currentPage = window.location.pathname.split("/").pop();
      const links = document.querySelectorAll(".navigation a");
  
      links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    });
  }
  