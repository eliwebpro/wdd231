import { toggleMenu } from './hamburguer.js';
import { updateFooter } from './footer.js';
import { setActiveLink } from './active.js';

toggleMenu();
updateFooter();
setActiveLink();


const messageBox = document.createElement("p");
const main = document.querySelector("main");
main.prepend(messageBox); // mostra no topo do main

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome to Sunlit Homes! This is your first visit.";
} else {
  const days = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    messageBox.textContent = "Welcome back! You visited earlier today.";
  } else if (days === 1) {
    messageBox.textContent = "Welcome back! You visited 1 day ago.";
  } else {
    messageBox.textContent = `Welcome back! You visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", currentVisit);
