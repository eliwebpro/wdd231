const url = 'data/members.json';
const spotlightContainer = document.querySelector('.business-spotlight');

async function getBusinesses() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
  
      console.log("All Businesses:", data.members); // Debugging: Show all businesses
  
      // Select Gold/Silver businesses
      const eligibleBusinesses = data.members.filter(business => 
        business.membership_level && (business.membership_level === 3 || business.membership_level === 2)
      );
  
      console.log("Eligible Businesses:", eligibleBusinesses); // Debugging: Show filtered businesses
  
      if (eligibleBusinesses.length === 0) {
        console.warn("No eligible spotlight businesses found!");
        return;
      }
  
      const spotlightBusinesses = getRandomBusinesses(eligibleBusinesses, 2);
      displaySpotlights(spotlightBusinesses);
    } catch (error) {
      console.error('Error loading business data:', error);
    }
  }
  

function getRandomBusinesses(businesses, count) {
  let selected = [];
  while (selected.length < count && businesses.length > 0) {
    let randomIndex = Math.floor(Math.random() * businesses.length);
    selected.push(...businesses.splice(randomIndex, 1));
  }
  return selected;
}

function displaySpotlights(businesses) {
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

    const description = document.createElement('p');
    description.textContent = business.description || "Supporting the community with excellence.";

    const website = document.createElement('a');
    website.href = business.website;
    website.target = '_blank';
    website.textContent = business.website;

    spotlight.appendChild(img);
    spotlight.appendChild(name);
    spotlight.appendChild(description);
    spotlight.appendChild(website);

    spotlightContainer.appendChild(spotlight);
  });
}

// Ensure script only runs on index.html
if (document.body.classList.contains('home')) {
  document.addEventListener('DOMContentLoaded', getBusinesses);
}
