document.addEventListener("DOMContentLoaded", () => {
    const loadMapBtn = document.getElementById("load-map");
  
    if (loadMapBtn) {
      loadMapBtn.addEventListener("click", () => {
        const mapContainer = document.getElementById("map-placeholder");
  
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.4708670649693!2d-111.8981427239746!3d40.70764977139432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528ae44ab27fdf%3A0x87e0bfdd63194304!2sAladdin%20Industries!5e0!3m2!1sen!2sus!4v1734175110192!5m2!1sen!2sus";
        iframe.width = "100%";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.title = "Map showing location of Aladdin Skylights in Utah";
  
        mapContainer.innerHTML = ""; // remove botão e texto
        mapContainer.appendChild(iframe);
      });
    }
  });
  