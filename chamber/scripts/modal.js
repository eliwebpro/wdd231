function openModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("show");
    }
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  };
  
