const url = 'data/members.json'; 
const spotlightContainer = document.querySelector('.business-spotlight');

async function getBusinesses() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();

    console.log("Todos os membros:", data.members); 

    // filter leel"
    const eligibleBusinesses = data.members.filter(business => 
      business.membership_level === 3 || business.membership_level === 2
    );

    console.log("Membros qualificados:", eligibleBusinesses);

    if (eligibleBusinesses.length === 0) {
      console.warn("Nenhum membro Gold ou Silver disponível para spotlight!");
      return;
    }

// random
    const spotlightBusinesses = getRandomBusinesses(eligibleBusinesses, Math.floor(Math.random() * 1) + 2);
    
    console.log("Membros selecionados para spotlight:", spotlightBusinesses); 

    displaySpotlights(spotlightBusinesses);
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

// unique
function getRandomBusinesses(businesses, count) {
  let selected = [];
  let available = [...businesses];

  while (selected.length < count && available.length > 0) {
    let randomIndex = Math.floor(Math.random() * available.length);
    selected.push(...available.splice(randomIndex, 1));
  }
  return selected;
}

//  spotlight
function displaySpotlights(businesses) {
  if (!businesses || businesses.length === 0) {
      console.warn("No businesses found for spotlight.");
      return;
  }

  if (!spotlightContainer) {
      console.error("Error: .business-spotlight section was not found.");
      return;
  }

  spotlightContainer.innerHTML = '<h2>Business Spotlights</h2>'; 

  businesses.forEach((business) => {
      const spotlight = document.createElement('div');
      spotlight.classList.add('spotlight');

      const img = document.createElement('img');
      img.src = `images/${business.image}`;
      img.alt = `${business.name} logo`;
      img.loading = 'lazy';

      const name = document.createElement('h3');
      name.textContent = business.name;

      const address = document.createElement('p');
      address.textContent = `${business.address}`;

      const phone = document.createElement('p');
      phone.textContent = `${business.phone}`;

      const membership = document.createElement('p');
      membership.textContent = `Membership Level: ${business.membership_level === 3 ? "Gold" : "Silver"}`;

      const website = document.createElement('a');
      website.href = business.website;
      website.target = '_blank';
      website.textContent = website;

      spotlight.appendChild(img);
      spotlight.appendChild(name);
      spotlight.appendChild(address);
      spotlight.appendChild(phone);
      spotlight.appendChild(membership);
      spotlight.appendChild(website);

      spotlightContainer.appendChild(spotlight);
  });
}


getBusinesses();
displaySpotlights();